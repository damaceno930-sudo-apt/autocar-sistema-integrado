
## Funções identificadas na referência visual

- [x] Vendas diretas de peças e acessórios sem abertura obrigatória de OS.
- [x] Pesquisa rápida por produto, serviço, marca e código.
- [x] Visualização de estoque, preço, unidade e marca no catálogo.
- [x] Carrinho com desconto individual por item.
- [x] Seleção de vendedor e cálculo de comissão.
- [x] Cálculo automático de troco a partir do valor recebido.
- [x] Financeiro com abas de caixa, contas a receber, contas a pagar, despesas e comissões.
- [x] Controle demonstrativo de abertura, entrada, sangria e fechamento de caixa.
- [x] Clientes classificados como PF ou PJ.
- [x] Produtos com custo, preço de venda, marca e unidade.
- [x] Cadastro e listagem de fornecedores.
- [x] Funcionários com níveis de acesso por módulo.
- [x] Importação local de XML de NF-e com leitura de código, descrição, quantidade, unidade e preço para entrada no inventário.
- [x] Relatórios de vendas por período, serviços prestados, curva ABC, fluxo de caixa, estoque e aniversariantes.
- [ ] Persistir no backend SQLite os lançamentos financeiros, comissões, vendas diretas e fornecedores; nesta versão os dados continuam em memória no protótipo offline.
- [x] O cadastro de produtos aceita foto local opcional e o catálogo exibe a miniatura sem depender da Internet.

## Empacotamento desktop

- [x] O projeto possui configuração Electron para abrir o sistema como aplicativo local sem servidor.
- [x] O processo desktop bloqueia navegação externa e mantém a aplicação offline em execução.
- [x] Existe script Bash para gerar `.deb` e AppImage no Ubuntu/Linux.
- [x] Existe script PowerShell para gerar instalador NSIS e executável portátil no Windows.
- [x] O `package.json` fixa Electron, electron-builder e `@electron/packager`, com alvos Windows e Linux; o `.deb` é montado por `dpkg-deb`.
- [x] A documentação explica requisitos, comandos, artefatos e a limitação atual de persistência em memória.
- [ ] Na próxima etapa, ligar a aplicação empacotada ao backend Python com SQLite real e definir armazenamento de dados do usuário.

## Instalação offline para testes

- [x] O alvo Windows usa Electron 22.3.27 e gera instalador NSIS e executável portátil para Windows 7, Windows 8 e Windows 10 em diante.
- [x] O alvo Ubuntu gera pacote `.deb` na arquitetura do computador de build usando `dpkg-deb`.
- [x] A aplicação instalada carrega HTML, CSS e JavaScript locais e não precisa de Internet durante a execução.
- [x] A atualização automática/publicação online foi desativada no empacotamento.
- [ ] Gerar os instaladores Windows diretamente em uma máquina Windows e testar a instalação física em Windows 7, Windows 8, Windows 10 e Ubuntu.
