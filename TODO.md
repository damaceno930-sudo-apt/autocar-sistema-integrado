
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
- [x] Integrar baixa de contas automaticamente ao movimento do caixa aberto, com entrada para recebimentos e saída para pagamentos.
- [x] Implementar cancelamento lógico auditado de lançamentos e formas de pagamento com parcelamento nas vendas.
- [x] Criar CRUD inicial de categorias financeiras persistentes.
- [x] Gerar conta a pagar automaticamente a partir de entrada manual de estoque e importação XML/NF-e, vinculando fornecedor, documento, vencimento e forma de pagamento.
- [x] Impedir a importação duplicada da mesma NF/documento de compra.
- [x] Persistir histórico de entradas, saídas, devoluções e ajustes de estoque com saldo anterior/resultante, motivo, referência e auditoria.
- [x] Conectar o ajuste físico de inventário ao SQLite e exibir o histórico real no módulo de estoque.
- [x] Implementar conferência de inventário físico em lote, com cálculo automático de divergências, ajuste transacional dos saldos e auditoria por sessão.
- [x] Implementar relatório de estoque por período com entradas, consumo, ajustes, valor armazenado, giro, cobertura e curva ABC.
- [x] Permitir exportação local do relatório de estoque em JSON e CSV.
- [x] Implementar impressão A4 do relatório de estoque com cabeçalho da empresa e opção nativa de salvar como PDF.
- [x] Persistir itens vendidos, baixar produtos do estoque e implementar reversão completa de vendas canceladas.
- [x] Na reversão, devolver produtos ao estoque, cancelar parcelas e comissão, cancelar o lançamento financeiro e registrar estorno dos valores recebidos no caixa aberto.
- [x] Implementar relatório financeiro por período com fluxo de caixa, receitas, despesas, resultado líquido, categorias e pendências.
- [x] Implementar consolidação diária e exportação local do relatório financeiro em JSON e CSV.
- [x] Implementar impressão A4 dos relatórios financeiros com cabeçalho da empresa e opção nativa de salvar como PDF.
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
- [x] Gerar e validar o executável nativo do backend para Linux ARM64 no Ubuntu ARM64, incluindo execução do binário e resposta do endpoint de saúde.
- [ ] Gerar e validar o executável nativo do backend para Windows x64 em uma máquina Windows x64; o script PowerShell e o empacotamento já recusam arquiteturas ou binários ausentes.

## Instalação offline para testes

- [x] O alvo Windows usa Electron 22.3.27 e gera instalador NSIS e executável portátil para Windows 7, Windows 8 e Windows 10 em diante.
- [x] O alvo Ubuntu gera pacote `.deb` na arquitetura do computador de build usando `dpkg-deb`.
- [x] A aplicação instalada carrega HTML, CSS e JavaScript locais e não precisa de Internet durante a execução.
- [x] A atualização automática/publicação online foi desativada no empacotamento.
- [ ] Gerar os instaladores Windows diretamente em uma máquina Windows e testar a instalação física em Windows 7, Windows 8, Windows 10 e Ubuntu.
- [x] Foi gerado um executável Windows x64 portátil real com o runtime Electron embutido.
- [x] A pasta portátil foi compactada em ZIP para extração simples pelo usuário.
- [ ] Gerar o instalador NSIS `.exe` de arquivo único em uma máquina Windows, pois o host Linux ARM64 não possui Wine compatível para esse alvo.
