# Implantação AutoCar — VPS Linux com HTTPS

Este modelo instala o backend SQLite em uma única VPS Ubuntu, publica a interface web no Nginx e expõe a API apenas atrás do proxy HTTPS. O backend fica vinculado a `127.0.0.1:8765`; não abra essa porta na Internet. A aplicação segue usando SQLite local no servidor e não depende de serviços externos durante a operação.

> **Não execute em banco já existente sem revisar migração e backups.** O seed seguro de produção é aplicado apenas ao criar um banco novo: uma conta administradora, sem dados demonstrativos. Configure domínio, certificado e uma senha exclusiva antes de iniciar.

## Arquivos deste repositório

- `deploy/autocar.service.example`: unidade systemd com usuário sem privilégios, reinício e diretórios graváveis limitados.
- `deploy/autocar.env.example`: modelo de variáveis sensíveis; nunca coloque o arquivo real no Git.
- `deploy/nginx-site.example.conf`: hospedagem dos arquivos web e proxy `/api/` em HTTPS.
- `deploy/backup-sqlite.sh`: backup consistente via SQLite `.backup` e retenção local de 14 dias.

## Instalação resumida

1. Crie um usuário de sistema `autocar`, instale Python 3, SQLite CLI, Nginx e Certbot. Copie o repositório para `/opt/autocar`, e os arquivos `index.html`, `styles.css`, `app.js` e `public/` para `/var/www/autocar`.
2. Crie `/var/lib/autocar` e `/var/backups/autocar`, pertencentes ao usuário apropriado. Instale a unidade do modelo como `/etc/systemd/system/autocar.service`.
3. Crie `/etc/autocar/autocar.env` a partir do exemplo, substitua o domínio e gere uma senha longa, aleatória e exclusiva (pelo menos 12 caracteres; não deixe o campo vazio nem use o valor-modelo). Proteja o arquivo: `chown root:autocar /etc/autocar/autocar.env` e `chmod 640 /etc/autocar/autocar.env`. O banco deve ser novo e `AUTOCAR_DATA_DIR` deve apontar para o diretório vazio antes da primeira inicialização.
4. Edite a configuração Nginx com seu domínio; obtenha e configure o certificado TLS com Certbot. Permita entrada apenas em 80/443 no firewall. A porta 8765 deve permanecer inacessível externamente.
5. Ative com `systemctl daemon-reload && systemctl enable --now autocar`. Verifique `systemctl status autocar`, `journalctl -u autocar` e `https://SEU_DOMINIO/api/health`. Faça login com `AUTOCAR_ADMIN_LOGIN` e a senha que você definiu. A interface web usa automaticamente a origem HTTPS atual para a API, portanto o navegador cliente não cria banco local. Os clientes remotos devem abrir o site por um navegador moderno em HTTPS. O Electron 22 fixado para preservar compatibilidade legada fica restrito ao modo local/offline; a auditoria de dependências identificou vulnerabilidades no runtime antigo e, portanto, não é recomendável carregar conteúdo remoto nele. O alvo Windows 7 usa backend empacotado com Python 3.8.10 (linha sem suporte de segurança); trate-o como legado e valide em máquina real antes de distribuir. LAN e VPS devem apresentar HTTPS por um proxy reverso confiável.
6. Configure backup diário do diretório SQLite usando `deploy/backup-sqlite.sh` e retenção fora da VPS (o backup local sozinho não protege contra perda do servidor). Teste uma restauração em uma instância separada antes de depender do backup.

O Nginx serve a interface e encaminha `/api/` na mesma origem HTTPS. Isso evita CORS amplo e permite que vários navegadores usem a base central sem SQLite local. O pacote Electron continua restrito ao backend local/offline. A operação remota usa a interface em navegador HTTPS, com a API na mesma origem e sem SQLite local. Não carregue o frontend remoto dentro do Electron 22.

## Limites e validação pendente

Este repositório contém os templates, não o domínio, certificado, firewall nem credenciais de uma VPS real. A publicação em produção e a restauração de desastre só ficam verificadas após serem executadas no servidor contratado. A implantação direta do backend em uma LAN sem TLS não é recomendada, porque o token de sessão atravessaria a rede em HTTP.
