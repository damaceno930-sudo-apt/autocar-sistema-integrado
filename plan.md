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
