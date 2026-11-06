# Backend local do AutoCar

O backend é um servidor HTTP local escrito somente com a biblioteca padrão do Python. Ele não acessa a Internet, não usa APIs externas e não depende de pacotes Python de terceiros em tempo de execução.

## Execução

```bash
python3 backend/server.py
```

A API fica em `http://127.0.0.1:8765` e o banco padrão em `~/.autocar-sistema/autocar.db`. O Electron inicia e encerra o processo automaticamente. Para testes, a pasta pode ser alterada com `AUTOCAR_DATA_DIR` ou o arquivo com `AUTOCAR_DB`.

## Recursos implementados

- autenticação local com PBKDF2-HMAC-SHA256, salt individual e token de sessão em memória;
- usuários, perfis, permissões por módulo e identificação de mecânico;
- SQLite com tabelas normalizadas de usuários, clientes, veículos, estoque, catálogo de serviços, ordens, vendas, financeiro, fornecedores e auditoria;
- snapshot operacional compatível com o estado do frontend, permitindo persistir alterações sem conexão externa;
- backup binário SQLite e backup JSON, restauração administrativa, limpeza completa mantendo o administrador;
- CORS restrito ao uso local e cabeçalho `X-AutoCar-Token` para as chamadas do frontend.

## Endpoints principais

- `GET /api/health`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/state`
- `PUT /api/state`
- `GET /api/backup/sqlite`
- `GET /api/backup/json`
- `POST /api/backup/import`
- `POST /api/admin/clear`

## CRUD financeiro

O módulo financeiro exige administrador ou usuário com a permissão `finance`:

- `GET /api/finance/summary`: resumo do caixa e listas de contas, movimentos e comissões;
- `GET/POST /api/finance/transactions`: listar e criar receitas/despesas manuais;
- `GET/POST /api/finance/receivables`: listar e criar contas a receber;
- `GET/POST /api/finance/payables`: listar e criar contas a pagar;
- `PUT /api/finance/receivables/{id}` e `PUT /api/finance/payables/{id}`: baixa parcial ou total;
- `POST /api/finance/cash/open`: abrir caixa;
- `POST /api/finance/cash/movement`: registrar entrada, saída, sangria ou suprimento;
- `POST /api/finance/cash/close`: fechar caixa com saldo contado;
- `POST /api/finance/sales`: registrar venda, receita pendente, parcelas, conta a receber e comissão;
- `POST /api/finance/sales/{id}/cancel`: cancelar e reverter venda, estoque, parcelas, comissão e valores recebidos;
- `GET/POST /api/finance/categories`: consultar e cadastrar categorias de receita/despesa;
- `DELETE /api/finance/transactions/{id}`: cancelar logicamente um lançamento, mantendo auditoria.
- `POST /api/inventory/purchase`: registrar compra manual ou importação XML, atualizar estoque e criar conta a pagar vinculada.

Baixas exigem caixa aberto e criam automaticamente uma movimentação de entrada ou saída vinculada à conta. Todas as operações financeiras importantes geram auditoria no SQLite. O frontend usa esses endpoints na aba Financeiro e na finalização de venda direta, incluindo forma de pagamento e quantidade de parcelas.

Entradas de compra aceitam `supplier`, `documentNumber`, `dueDate`, `paymentMethod` e uma lista de `items` com código, quantidade e custo unitário. O número do documento é único para impedir a importação duplicada da mesma NF-e.

As vendas persistem seus itens em `sale_items`. Ao registrar um produto, o saldo é baixado; ao cancelar, o produto é devolvido ao estoque e os itens ficam marcados com `reversed_at`. Se houver valor recebido, o cancelamento exige caixa aberto e registra uma saída de estorno vinculada à venda.

## Backend nativo para instaladores

Para o aplicativo não depender de Python instalado na máquina do usuário, compile o backend no mesmo sistema operacional/arquitetura do instalador:

```bash
python3 -m pip install pyinstaller
npm run build:backend
npm run package:linux
```

No Windows, use `scripts/build-backend.ps1` em um ambiente Windows e depois `npm run package:windows`. O Electron procura primeiro `backend/bin/autocar-backend` ou `autocar-backend.exe`; se não encontrar, usa `python3`/`python` como fallback de desenvolvimento.
