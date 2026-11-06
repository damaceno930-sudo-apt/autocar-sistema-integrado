
## Clientes, veículos e vendas

- [x] O cadastro de cliente inclui nome, CPF/CNPJ, nascimento, telefone, e-mail e endereço.
- [x] O cadastro permite vincular diretamente um veículo com placa, marca, modelo, ano, cor, chassi/VIN e quilometragem.
- [x] A ficha do cliente mostra os veículos vinculados e oferece acesso direto ao painel de vendas.
- [x] O módulo individualizado de Vendas e Nova OS permite escolher cliente e veículo.
- [x] O painel pesquisa serviços e produtos por descrição, código ou categoria.
- [x] O painel monta uma venda com itens, quantidades e total.
- [x] A venda gera uma nova OS vinculada ao cliente, veículo, serviços e produtos selecionados.
- [ ] Na próxima etapa, persistir clientes, veículos, vendas, itens da OS e histórico no SQLite.
- [x] A ficha do cliente permite vincular veículos adicionais ao mesmo cadastro, mantendo todos disponíveis para vendas e OS.

## Serviços e preços

- [x] O módulo possui uma aba de catálogo e uma aba de cadastro de novo serviço.
- [x] O cadastro aceita nome, código, categoria, preço, duração estimada e descrição.
- [x] O serviço salvo aparece no catálogo e fica disponível para pesquisa no painel de Vendas e Nova OS.
- [ ] Na próxima etapa, persistir o catálogo de serviços no SQLite com histórico de alterações e regras de preço.

## Mecânicos e responsável nas OS

- [x] Configurações possui uma aba Mecânicos para indicar quais usuários cadastrados são mecânicos.
- [x] Novas OS possuem seleção de mecânico responsável.
- [x] O painel de Vendas e Nova OS também permite indicar o mecânico antes de gerar a OS.
- [x] Apenas usuários marcados como mecânicos aparecem nas seleções de responsável.
- [ ] Na próxima etapa, persistir o vínculo por ID de usuário no SQLite e registrar histórico de alterações.

## Cadastro da empresa e documentos

- [x] Configurações possui uma aba Empresa para razão social, nome fantasia, CPF/CNPJ, contatos, endereço, cidade, UF, CEP e regime tributário.
- [x] A tela exibe uma prévia do cabeçalho que será usado em documentos.
- [x] OS e relatórios exibem a identificação da empresa configurada no cabeçalho do módulo.
- [ ] Na próxima etapa, aplicar os dados da empresa aos layouts imprimíveis de OS, orçamento e relatórios em PDF.

## Importação, exportação e limpeza de dados

- [x] Configurações possui uma aba Dados e backup.
- [x] Existem ações separadas para exportar banco SQLite, tabelas CSV e estrutura JSON.
- [x] A exportação JSON e CSV funciona no protótipo offline por download local.
- [x] Existe seleção de arquivo para importação de SQLite, CSV ou JSON.
- [x] Existe botão de limpeza completa protegido por confirmação, preservando o administrador para um novo cadastro.
- [ ] Na próxima etapa, conectar importação/exportação binária SQLite real ao backend Python e validar migrações.
