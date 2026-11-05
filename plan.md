# AutoCar Sistema Integrado — plano do protótipo

## Direção aprovada

Criar um protótipo em HTML, CSS e JavaScript, 100% offline, sem APIs externas, fontes remotas, CDN, banco gerenciado ou dependência de Internet. A referência visual enviada define a direção: painel escuro de oficina, azul-marinho profundo, laranja como cor de ação, superfícies grafite, textos claros e ícones automotivos em SVG inline/local.

## Arquitetura do sistema

O produto será um monólito modular: uma aplicação única, um processo local e um banco SQLite compartilhado. Cada módulo terá sua própria camada de rotas, serviços, regras e telas, mas todos usarão o mesmo núcleo de autenticação, auditoria e acesso a dados. O administrador poderá criar logins e liberar módulos individualmente.

Quando o backend Python/SQLite for conectado, a base deverá conter usuários, credenciais com hash, perfis, permissões por módulo, sessões, logs de auditoria e os dados operacionais. A interface atual simula esse fluxo em memória para validar a experiência.

## Objetivo do protótipo

Demonstrar a navegação, o login e a hierarquia visual do sistema antes da implementação do backend Python/SQLite. O protótipo terá dados demonstrativos em memória, busca local, alternância entre módulos, filtros de OS, atualização visual de status, criação de usuários, seleção de permissões por módulo, bloqueio de telas não autorizadas, modal para nova ordem e toast de confirmação. Nenhuma alteração será persistida ainda.

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
- `public/manus-routes.json`: manifesto da rota principal para o Preview.

## Implementação e entrega

Usar servidor estático local na porta 3000. Configurar diagnóstico JavaScript/HTML/CSS, validar sintaxe e verificar o manifesto de rotas. Depois, iniciar o Preview e criar um checkpoint com os arquivos do protótipo.

## Estoque e peças

O módulo de estoque deverá controlar cadastro de itens, código interno, categoria, fornecedor, localização, custo, preço de venda, saldo atual, mínimo e máximo. Cada item terá uma unidade configurável, incluindo `un.`, `pc`, `jogo`, `par`, `kit`, `cx`, `m`, `cm`, `mm`, `ml`, `l`, `g`, `kg` e `rolo`, com possibilidade de acrescentar outras unidades. O fluxo também contempla entradas, saídas vinculadas a ordens de serviço, ajustes de inventário físico, histórico de movimentações, alertas de reposição, valorização do estoque e relatórios exportáveis localmente.
