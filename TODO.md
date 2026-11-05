# AutoCar Sistema Integrado — resultados do protótipo

## Dashboard com design system da referência

- [x] A interface inicial exibe dashboard de oficina com fundo azul-marinho, painéis grafite, destaque laranja, textos claros e ícones locais.
- [x] O dashboard mostra indicadores de ordens em andamento, faturamento, estoque crítico e agenda do dia.
- [x] A navegação lateral identifica o módulo ativo e permite acessar as áreas do sistema.

## Módulos navegáveis

- [x] O protótipo permite acessar Dashboard, Ordens de Serviço, Clientes e Veículos, Estoque e Peças, Serviços e Orçamentos, Agendamentos, Diagnóstico, Financeiro, Relatórios, Configurações e Backup.
- [x] Cada módulo possui conteúdo demonstrativo coerente com uma oficina mecânica; algumas telas são placeholders intencionais do protótipo.

## Interações locais

- [x] A busca filtra os registros demonstrativos sem Internet.
- [x] A lista de ordens permite filtrar status.
- [x] O protótipo permite abrir o modal de nova ordem e mostrar confirmação visual.
- [x] A interface oferece feedback por toast para ações simuladas.

## Offline e compatibilidade

- [x] O protótipo usa somente HTML, CSS e JavaScript locais.
- [x] Não carrega CDN, fonte remota, API, imagem externa ou biblioteca que exija Internet.
- [x] O conteúdo funciona com servidor estático local na porta 3000.
- [x] O manifesto `manus-routes.json` responde na rota `/manus-routes.json` e declara `/`.

## Entrega técnica

- [x] O código está separado em `index.html`, `styles.css` e `app.js`.
- [x] O diagnóstico automático está registrado para JavaScript, HTML e CSS.
- [x] O Preview responde na porta configurada e o JavaScript passou na validação de sintaxe.

## Autenticação e permissões

- [x] O protótipo exibe uma tela de login antes de liberar o sistema.
- [x] Existe um login administrador demonstrativo capaz de acessar todos os módulos.
- [x] O administrador pode criar outros logins pelo módulo Configurações.
- [x] A criação de login permite definir nome, login, senha, perfil e módulos autorizados.
- [x] Usuários sem permissão não visualizam o módulo na navegação e recebem bloqueio caso tentem acessá-lo.
- [x] O protótipo possui logout e identificação do usuário conectado.
- [x] A documentação registra a arquitetura de monólito modular com banco SQLite único.
- [ ] Na próxima etapa, substituir a autenticação em memória por sessões e senhas com hash no backend Python/SQLite.
