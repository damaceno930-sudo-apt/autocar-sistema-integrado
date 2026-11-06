
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
- [x] Persistir no backend SQLite os lançamentos financeiros, comissões e vendas diretas com CRUD dedicado; a interface financeira agora consulta e grava dados reais nas tabelas normalizadas.
- [x] Implementar contas a receber e a pagar com cadastro, vencimento, status, baixa parcial/total e auditoria.
- [x] Implementar caixa com abertura, saldo inicial, entradas, saídas, sangria, suprimento, fechamento e saldo contado.
- [x] Integrar venda direta ao financeiro, criando receita, conta a receber para saldo pendente e comissão do vendedor.
- [ ] Integrar baixa de contas automaticamente ao movimento do caixa, implementar cancelamento/reversão e formas de pagamento por parcela.
- [ ] Criar CRUD de categorias financeiras e relatórios/exportações financeiras baseados nas consultas SQLite.
- [x] Persistir em SQLite, via API local, empresa, usuários, permissões, clientes, veículos, estoque, serviços, fornecedores e ordens de serviço, com hidratação do frontend e auditoria.
- [x] O cadastro de produtos aceita foto local opcional e o catálogo exibe a miniatura sem depender da Internet.

## Empacotamento desktop

- [x] O projeto possui configuração Electron para abrir o sistema como aplicativo local sem servidor.
- [x] O processo desktop bloqueia navegação externa e mantém a aplicação offline em execução.
- [x] Existe script Bash para gerar `.deb` e AppImage no Ubuntu/Linux.
- [x] Existe script PowerShell para gerar instalador NSIS e executável portátil no Windows.
- [x] O `package.json` fixa Electron, electron-builder e `@electron/packager`, com alvos Windows e Linux; o `.deb` é montado por `dpkg-deb`.
- [x] A documentação explica requisitos, comandos, artefatos e o backend local em `backend/README.md`.
- [x] O Electron inicia e encerra o backend Python local e guarda o banco no diretório de dados do usuário; há fallback para Python instalado e suporte a executável nativo compilado.
- [ ] Gerar e validar o executável nativo do backend para Linux ARM64 e Windows x64 no mesmo sistema operacional/arquitetura de cada instalador.

## Instalação offline para testes

- [x] O alvo Windows usa Electron 22.3.27 e gera instalador NSIS e executável portátil para Windows 7, Windows 8 e Windows 10 em diante.
- [x] O alvo Ubuntu gera pacote `.deb` na arquitetura do computador de build usando `dpkg-deb`.
- [x] A aplicação instalada carrega HTML, CSS e JavaScript locais e não precisa de Internet durante a execução.
- [x] A atualização automática/publicação online foi desativada no empacotamento.
- [ ] Gerar os instaladores Windows diretamente em uma máquina Windows e testar a instalação física em Windows 7, Windows 8, Windows 10 e Ubuntu.
- [x] Foi gerado um executável Windows x64 portátil real com o runtime Electron embutido.
- [x] A pasta portátil foi compactada em ZIP para extração simples pelo usuário.
- [ ] Gerar o instalador NSIS `.exe` de arquivo único em uma máquina Windows, pois o host Linux ARM64 não possui Wine compatível para esse alvo.
