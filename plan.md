# AutoCar Sistema Integrado — plano do protótipo

## Direção aprovada

Criar um protótipo em HTML, CSS e JavaScript, 100% offline, sem APIs externas, fontes remotas, CDN, banco gerenciado ou dependência de Internet. A referência visual enviada define a direção: painel escuro de oficina, azul-marinho profundo, laranja como cor de ação, superfícies grafite, textos claros e ícones automotivos em SVG inline/local.

## Arquitetura do sistema

O produto será um monólito modular: uma aplicação única, um processo local e um banco SQLite compartilhado. Cada módulo terá sua própria camada de rotas, serviços, regras e telas, mas todos usarão o mesmo núcleo de autenticação, auditoria e acesso a dados. O administrador poderá criar logins e liberar módulos individualmente.

O backend Python/SQLite local foi conectado: a base contém usuários com hash PBKDF2, perfis, permissões por módulo, logs de auditoria e tabelas operacionais de clientes, veículos, estoque, serviços, OS, fornecedores, vendas e financeiro. O frontend mantém um snapshot compatível para hidratação e persistência debounced, com fallback apenas para execução do protótipo sem servidor.

## Objetivo do protótipo e da fase persistente

Preservar a navegação e a hierarquia visual do protótipo, agora com persistência local. A interface usa dados demonstrativos seedados no SQLite, busca local, alternância entre módulos, filtros de OS, atualização de status, criação de usuários, permissões por módulo, bloqueio de telas não autorizadas, nova ordem, cadastro de estoque/clientes/serviços e toasts. Alterações feitas com o backend ativo são persistidas no banco local; se o servidor não estiver disponível, o fallback em memória continua útil para demonstração.

## Módulos representados

- Dashboard: visão de serviços em andamento, faturamento, estoque crítico e agenda do dia.
- Ordens de Serviço: lista filtrável com status, veículo, cliente, técnico e previsão.
- Clientes e Veículos: contatos recentes, veículos e histórico resumido.
- Estoque e Peças: itens críticos, entradas/saídas e níveis de reposição.
- Serviços e Orçamentos: catálogo de serviços e orçamentos pendentes.
- Agendamentos: agenda diária por baia e técnico.
- Diagnóstico: fila de diagnósticos e checklists.
- Financeiro: caixa, contas a receber e indicadores de pagamento.
- Relatórios, Configurações e Backup: telas de placeholder navegáveis.

## Design system

- Fundo: azul-marinho quase preto, com painéis em azul petróleo e grafite.
- Ação principal: laranja vibrante; usado em CTAs, foco e itens ativos.
- Informação: azul-claro e ciano suave.
- Estados: verde para concluído/pago, âmbar para atenção, vermelho para atrasos/crítico.
- Layout: navegação lateral fixa, cabeçalho contextual e conteúdo em cartões assimétricos; responsivo para notebook e telas menores.
- Tipografia: stack local `Segoe UI`, `Arial`, sans-serif; nenhum carregamento remoto.
- Ícones: SVG inline com traços locais, sem biblioteca externa.
- Movimento: transições curtas e discretas, sem depender de animação para compreender o conteúdo.

## Estrutura

- `index.html`: shell da aplicação e marcação principal.
- `styles.css`: tokens, componentes, responsividade e estados visuais.
- `app.js`: estado local, renderização dos módulos e interações.
- `backend/server.py`: API local, autenticação com hash, SQLite, backups, importação e auditoria.
- `backend/README.md`: execução, endpoints e empacotamento nativo.
- `desktop/main.cjs`: inicialização/encerramento do backend junto ao Electron.
- `scripts/build-backend.sh` / `scripts/build-backend.ps1`: compilação opcional do backend nativo por plataforma.
- `public/manus-routes.json`: manifesto da rota principal para o Preview.

## Fase financeira implementada

O backend agora possui CRUD protegido para lançamentos de receita/despesa, contas a receber, contas a pagar, abertura/movimentação/fechamento de caixa e consulta de comissões. O fechamento e as baixas geram auditoria. A venda direta integrada cria receita, conta a receber quando houver saldo pendente e comissão do vendedor. A interface financeira deixou de usar somente valores demonstrativos e carrega o resumo e as listas do SQLite.

Na segunda fase foram adicionados: formas de pagamento e parcelas nas vendas, baixa com geração automática de movimento no caixa aberto, cancelamento lógico auditado de lançamentos e CRUD de categorias financeiras. A entrada manual de estoque e a importação XML/NF-e agora usam a operação de compra persistente, atualizam o saldo, registram fornecedor/documento e geram conta a pagar. A reversão de vendas também é transacional: persiste itens vendidos, devolve produtos ao estoque, cancela parcelas e comissão e registra o estorno recebido no caixa aberto. O relatório financeiro por período agora consolida fluxo de caixa, receitas, despesas, categorias, pendências e visão diária, com exportação local em JSON/CSV e impressão A4/salvamento nativo em PDF. O estoque passou a registrar histórico persistente de entradas, saídas, devoluções e ajustes físicos, com auditoria e saldos anterior/resultante. O relatório operacional de estoque agora calcula consumo, valor movimentado, curva ABC, giro, cobertura estimada, saldo e valor armazenado por período, com exportação JSON/CSV e impressão A4/salvamento nativo em PDF. A conferência física agora aceita múltiplos itens em lote, calcula divergências e aplica os ajustes em uma transação auditada.

## Implementação e entrega

Usar servidor estático local na porta 3000 e backend local na porta 8765. Configurar diagnóstico JavaScript/HTML/CSS, validar sintaxe, verificar o manifesto de rotas, testar autenticação/persistência/backup/limpeza e criar um checkpoint com os arquivos do protótipo e do backend. Para instaladores sem Python no computador do usuário, compilar o backend com PyInstaller no mesmo sistema operacional/arquitetura antes do empacotamento.

## Estoque e peças

O módulo de estoque deverá controlar cadastro de itens, código interno, categoria, fornecedor, localização, custo, preço de venda, saldo atual, mínimo e máximo. Cada item terá uma unidade configurável, incluindo `un.`, `pc`, `jogo`, `par`, `kit`, `cx`, `m`, `cm`, `mm`, `ml`, `l`, `g`, `kg` e `rolo`, com possibilidade de acrescentar outras unidades. O fluxo também contempla entradas, saídas vinculadas a ordens de serviço, ajustes de inventário físico, histórico de movimentações, alertas de reposição, valorização do estoque e relatórios exportáveis localmente.

## Clientes, veículos e vendas

O cadastro de clientes terá identificação, CPF/CNPJ, nascimento, telefone, e-mail e endereço. Cada cliente terá uma coleção de veículos vinculados com placa, marca, modelo, ano, cor, chassi/VIN e quilometragem. O módulo comercial será separado, mas integrado ao mesmo monólito: seleciona cliente e veículo, pesquisa serviços e produtos do catálogo, monta o carrinho da venda, calcula o total e gera a OS vinculada ao cliente, veículo e itens vendidos.

## Serviços e preços

O módulo possui abas separadas para consultar o catálogo e cadastrar novos serviços. Cada serviço terá nome, código, categoria, preço, duração estimada e descrição. Ao salvar, ele passa a integrar imediatamente o catálogo comercial usado pelo painel de Vendas e Nova OS.

## Mecânicos e responsável técnico

A configuração terá uma aba própria para marcar quais usuários cadastrados são mecânicos. Apenas esses usuários aparecerão na seleção de responsável técnico das novas OS e vendas. A OS armazenará o mecânico responsável associado ao usuário.

## Empresa e documentos

A configuração terá o cadastro da prestadora com razão social, nome fantasia, CPF/CNPJ, contatos, endereço, cidade, UF, CEP e regime tributário. Esses dados serão usados no cabeçalho e identificação das OS, orçamentos e relatórios.

## Importação, exportação e limpeza

A central de dados terá ações para importar e exportar SQLite, CSV e JSON. O botão de limpeza exigirá confirmação, removerá os dados operacionais e usuários não administradores, preservando o acesso administrador para iniciar um novo cadastro.

## Impressão de OS e PDF

Cada OS terá uma impressão customizada em folha A4, com identidade AutoCar, cabeçalho da empresa cadastrada, número da OS, cliente, veículo, placa, mecânico responsável, status, previsão, serviços, valor total, observações e assinaturas. O navegador usará a impressão nativa para permitir salvar o documento como PDF, sem Internet ou dependências externas.


## Empacotamento desktop

A camada desktop usa Electron `22.3.27` fixado, carregando os arquivos locais diretamente com `BrowserWindow.loadFile`. O processo principal mantém `nodeIntegration` desativado, `contextIsolation` e sandbox ativados, bloqueia navegação externa e remove o menu da aplicação. O build Linux usa `@electron/packager` para gerar o AppImage e `dpkg-deb` para montar o `.deb`, evitando dependências de arquitetura do `fpm`; o build Windows usa electron-builder para NSIS e executável portátil. Os scripts `scripts/package-desktop.sh` e `scripts/package-desktop.ps1` automatizam a instalação das dependências de build e a geração dos artefatos. O runtime continua totalmente offline; a instalação de dependências é necessária apenas na máquina que empacota o aplicativo.
