const icons = {
  dashboard: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  clipboard: '<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 4V3h6v1M8 9h8M8 13h6M8 17h3"/>',
  users: '<path d="M16 19v-1.2a3.8 3.8 0 0 0-3.8-3.8H7.8A3.8 3.8 0 0 0 4 17.8V19M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 5.2a3 3 0 0 1 0 5.6M17 14.2a3.8 3.8 0 0 1 3 3.6V19"/>',
  box: '<path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10M8 5l8 4"/>',
  wrench: '<path d="m14.7 6.3 3-3a5 5 0 0 0-6.4 6.4L4 17a2.1 2.1 0 1 0 3 3l7.3-7.3a5 5 0 0 0 6.4-6.4l-3 3-3.1-.9-.9-3.1Z"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M7 14h3M14 14h3M7 17h3"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 12h8M12 8v8"/>',
  wallet: '<path d="M4 6h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13"/><path d="M16 13h5M16 13a2 2 0 1 0 0 4h5v-4"/>',
  car: '<path d="m5 16-1 3h2M19 16l1 3h-2M4 16h16l-1.1-5.1A2.4 2.4 0 0 0 16.6 9H7.4a2.4 2.4 0 0 0-2.3 1.9L4 16Z"/><path d="M7 9 8.5 5h7L17 9M7 16h.1M17 16h.1"/>',
  chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 3-4 3 2 5-7"/><path d="M17 6h3v3"/>',
  settings: '<path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4 4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  trend: '<path d="m4 16 5-5 3 3 7-8M15 6h4v4"/>',
  alert: '<path d="M10.3 4.2 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3ZM8 8h8M8 12h8M8 16h4"/>',
  fuel: '<path d="M6 20V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15M4 20h14M9 7h4M18 8l2 2v7a2 2 0 0 1-2 2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>'
};

const state = {
  view: 'dashboard',
  authenticated: false,
  currentUser: null,
  search: '',
  status: 'all',
  inventoryCategory: 'all',
  inventoryStatus: 'all',
  saleClientId: 1,
  saleVehicleId: 101,
  saleSearch: '',
  saleCart: [],
  servicesTab: 'catalog',
  users: [
    { id: 1, name: 'Rafael Costa', login: 'admin@autocar.local', password: 'admin123', role: 'Administrador', admin: true, permissions: ['all'] },
    { id: 2, name: 'João Mendes', login: 'joao.mendes', password: 'oficina123', role: 'Técnico', admin: false, permissions: ['dashboard', 'orders', 'customers', 'diagnostics'] },
    { id: 3, name: 'Camila Prado', login: 'camila.prado', password: 'oficina123', role: 'Recepção', admin: false, permissions: ['dashboard', 'orders', 'customers', 'sales', 'schedule'] }
  ],
  orders: [
    { id: 'OS-0248', customer: 'Marcos Almeida', plate: 'RZD-4H81', vehicle: 'Toyota Corolla 2020', service: 'Revisão preventiva', technician: 'João Mendes', status: 'progress', statusLabel: 'Em serviço', delivery: 'Hoje, 16:30', total: 1280.5 },
    { id: 'OS-0247', customer: 'Camila Rocha', plate: 'GKA-9B62', vehicle: 'Honda HR-V 2022', service: 'Freios e suspensão', technician: 'Lucas Ferreira', status: 'waiting', statusLabel: 'Aguardando peça', delivery: 'Hoje, 18:00', total: 845.0 },
    { id: 'OS-0246', customer: 'André Carvalho', plate: 'QWE-3D17', vehicle: 'Jeep Renegade 2019', service: 'Diagnóstico eletrônico', technician: 'Bruno Santos', status: 'done', statusLabel: 'Pronto para entrega', delivery: 'Hoje, 14:00', total: 540.0 },
    { id: 'OS-0245', customer: 'Patrícia Nunes', plate: 'FTR-8C44', vehicle: 'Volkswagen T-Cross 2021', service: 'Troca de óleo e filtros', technician: 'João Mendes', status: 'late', statusLabel: 'Atrasado', delivery: 'Ontem, 17:30', total: 390.0 },
    { id: 'OS-0244', customer: 'Eduardo Lima', plate: 'MNO-1A09', vehicle: 'Chevrolet Onix 2023', service: 'Alinhamento e balanceamento', technician: 'Lucas Ferreira', status: 'progress', statusLabel: 'Em serviço', delivery: 'Amanhã, 10:00', total: 260.0 }
  ],
  clients: [
    { id: 1, name: 'Marcos Almeida', cpf: '248.913.760-12', email: 'marcos.almeida@email.com', phone: '(11) 99842-1200', birth: '18/04/1987', address: 'Rua das Flores, 120 • São Paulo/SP', vehicles: [{ id: 101, plate: 'RZD-4H81', brand: 'Toyota', model: 'Corolla XEi', year: '2020', color: 'Prata', vin: '9BRBD3HE5L4012345', mileage: 68420 }], visits: 8, last: 'Hoje' },
    { id: 2, name: 'Camila Rocha', cpf: '327.541.880-05', email: 'camila.rocha@email.com', phone: '(11) 99102-3771', birth: '02/09/1991', address: 'Av. Central, 845 • Santo André/SP', vehicles: [{ id: 102, plate: 'GKA-9B62', brand: 'Honda', model: 'HR-V EXL', year: '2022', color: 'Cinza', vin: '93HRV3F58NY501234', mileage: 39210 }], visits: 4, last: 'Hoje' },
    { id: 3, name: 'André Carvalho', cpf: '119.708.440-66', email: 'andre.carvalho@email.com', phone: '(11) 99810-4453', birth: '26/11/1979', address: 'Rua do Comércio, 60 • São Paulo/SP', vehicles: [{ id: 103, plate: 'QWE-3D17', brand: 'Jeep', model: 'Renegade Longitude', year: '2019', color: 'Preto', vin: '98861115XKT601234', mileage: 92100 }], visits: 11, last: 'Ontem' },
    { id: 4, name: 'Patrícia Nunes', cpf: '451.632.990-40', email: 'patricia.nunes@email.com', phone: '(11) 98831-2220', birth: '11/06/1994', address: 'Rua do Sol, 48 • São Bernardo/SP', vehicles: [{ id: 104, plate: 'FTR-8C44', brand: 'Volkswagen', model: 'T-Cross Comfortline', year: '2021', color: 'Branco', vin: '9BWBH6BF7M401234', mileage: 55800 }], visits: 3, last: 'Ontem' }
  ],
  inventory: [
    { name: 'Óleo 5W30 sintético', code: 'LUB-5W30-1L', category: 'Lubrificantes', stock: 4, min: 10, max: 40, unit: 'un.', price: 42.9, cost: 28.5, location: 'Prateleira A1', supplier: 'LubriMax' },
    { name: 'Pastilha de freio dianteira', code: 'FR-DI-482', category: 'Freios', stock: 2, min: 6, max: 20, unit: 'jogo', price: 189.9, cost: 125.0, location: 'Gaveta B3', supplier: 'AutoParts Brasil' },
    { name: 'Filtro de óleo Tecfil', code: 'FO-153', category: 'Filtros', stock: 18, min: 8, max: 35, unit: 'pc', price: 28.5, cost: 16.9, location: 'Prateleira A2', supplier: 'Tecfil' },
    { name: 'Fluido de freio DOT 4', code: 'FL-DOT4-500', category: 'Fluidos', stock: 7, min: 5, max: 20, unit: 'ml', price: 31.9, cost: 18.2, location: 'Armário C1', supplier: 'Bosch' },
    { name: 'Mangueira cristal 8 mm', code: 'MAN-08-CR', category: 'Materiais', stock: 42, min: 15, max: 100, unit: 'm', price: 12.5, cost: 7.1, location: 'Rolo D1', supplier: 'HidroFlex' },
    { name: 'Abraçadeira metálica 12 mm', code: 'ABR-12-M', category: 'Materiais', stock: 3, min: 10, max: 60, unit: 'cx', price: 48.0, cost: 31.0, location: 'Gaveta D2', supplier: 'FixParts' }
  ],
  units: ['un.', 'pc', 'jogo', 'par', 'kit', 'cx', 'm', 'cm', 'mm', 'ml', 'l', 'g', 'kg', 'rolo']
};

const titles = {
  dashboard: ['Visão geral', 'Dashboard'], orders: ['Operação', 'Ordens de serviço'], customers: ['Operação', 'Clientes e veículos'], sales: ['Operação', 'Vendas e nova OS'], inventory: ['Operação', 'Estoque e peças'], services: ['Operação', 'Serviços e preços'], schedule: ['Operação', 'Agendamentos'], diagnostics: ['Gestão', 'Diagnóstico'], finance: ['Gestão', 'Financeiro'], reports: ['Gestão', 'Relatórios'], settings: ['Sistema', 'Configurações'], backup: ['Sistema', 'Backup local']
};

const moduleCatalog = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' }, { id: 'orders', label: 'Ordens de serviço', icon: 'clipboard' }, { id: 'customers', label: 'Clientes e veículos', icon: 'users' }, { id: 'sales', label: 'Vendas e nova OS', icon: 'receipt' }, { id: 'inventory', label: 'Estoque e peças', icon: 'box' }, { id: 'services', label: 'Serviços e preços', icon: 'wrench' }, { id: 'schedule', label: 'Agendamentos', icon: 'calendar' }, { id: 'diagnostics', label: 'Diagnóstico', icon: 'scan' }, { id: 'finance', label: 'Financeiro', icon: 'wallet' }, { id: 'reports', label: 'Relatórios', icon: 'chart' }, { id: 'settings', label: 'Configurações', icon: 'settings' }, { id: 'backup', label: 'Backup local', icon: 'database' }
];

const serviceCatalog = [
  { id: 'svc-1', kind: 'service', name: 'Revisão preventiva', code: 'SRV-001', category: 'Serviço', price: 480 },
  { id: 'svc-2', kind: 'service', name: 'Troca de óleo e filtros', code: 'SRV-002', category: 'Serviço', price: 249 },
  { id: 'svc-3', kind: 'service', name: 'Freios e suspensão', code: 'SRV-003', category: 'Serviço', price: 320 },
  { id: 'svc-4', kind: 'service', name: 'Diagnóstico eletrônico', code: 'SRV-004', category: 'Serviço', price: 180 }
];

function icon(name, className = '') {
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.dashboard}</svg>`;
}
function money(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function esc(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function matches(item) { return JSON.stringify(item).toLowerCase().includes(state.search.trim().toLowerCase()); }
function statusPill(status, label) { return `<span class="status-pill ${status}">${esc(label)}</span>`; }
function pageHeader(eyebrow, title, subtitle, action = '') { return `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p class="subtitle">${subtitle}</p></div>${action ? `<div class="heading-actions">${action}</div>` : ''}</div>`; }
function buttonNewOrder() { return `<button class="button button-primary" data-action="new-order">${icon('plus')} Nova ordem</button>`; }
function panelHeader(title, subtitle = '', action = '') { return `<div class="panel-header"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>${action}</div>`; }

function renderIcons() {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.dataset.icon;
    if (!el.querySelector('svg')) el.innerHTML = icon(name);
  });
}

function canAccess(view) { return Boolean(state.currentUser && (state.currentUser.admin || state.currentUser.permissions.includes(view))); }
function permissionLabel(id) { return moduleCatalog.find((module) => module.id === id)?.label || id; }
function initials(name) { return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(); }
function updateSessionUI() {
  if (!state.currentUser) return;
  document.getElementById('session-user-name').textContent = state.currentUser.name;
  document.getElementById('session-user-role').textContent = state.currentUser.role;
  document.getElementById('session-avatar').textContent = initials(state.currentUser.name);
  document.querySelectorAll('.nav-item').forEach((item) => { item.style.display = canAccess(item.dataset.view) ? 'flex' : 'none'; });
}
function login(user) {
  state.currentUser = user;
  state.authenticated = true;
  document.getElementById('auth-screen').classList.add('is-hidden');
  document.getElementById('app-shell').classList.remove('is-hidden');
  document.getElementById('login-error').textContent = '';
  state.view = 'dashboard';
  updateSessionUI();
  renderView();
  showToast(`Olá, ${user.name.split(' ')[0]}. Acesso liberado.`);
}
function logout() {
  state.authenticated = false;
  state.currentUser = null;
  document.getElementById('app-shell').classList.add('is-hidden');
  document.getElementById('auth-screen').classList.remove('is-hidden');
  document.getElementById('login-form').reset();
  document.querySelector('#login-form input[name="login"]').focus();
}

function renderDashboard() {
  const recent = state.orders.filter(matches).slice(0, 4);
  return `${pageHeader('Visão geral', 'Bom dia, Rafael.', 'Acompanhe a operação da Auto Service Prime em tempo real.', buttonNewOrder())}
    <section class="hero-panel"><div class="hero-copy"><span class="eyebrow">Operação da oficina</span><h2>Seu dia começa com tudo sob controle.</h2><p>Você tem <strong>4 veículos</strong> em atendimento e <strong>2 entregas</strong> programadas para hoje. O estoque está atualizado até agora.</p></div><div class="hero-metrics"><div class="hero-metric"><strong>08</strong><span>OS abertas</span><em>+12% este mês</em></div><div class="hero-metric"><strong>R$ 18,4k</strong><span>faturamento no mês</span><em>+8,6% este mês</em></div></div></section>
    <section class="kpi-grid"><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon orange">${icon('clipboard')}</span><span class="kpi-change">+12,5%</span></div><strong class="kpi-value">08</strong><span class="kpi-label">Ordens em andamento</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon cyan">${icon('car')}</span><span class="kpi-change">+3 hoje</span></div><strong class="kpi-value">24</strong><span class="kpi-label">Veículos no mês</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon green">${icon('wallet')}</span><span class="kpi-change">+8,6%</span></div><strong class="kpi-value">R$ 18,4k</strong><span class="kpi-label">Receita acumulada</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon amber">${icon('box')}</span><span class="kpi-change down">4 alertas</span></div><strong class="kpi-value">12</strong><span class="kpi-label">Itens em estoque crítico</span></article></section>
    <section class="dashboard-grid"><article class="panel">${panelHeader('Fluxo de serviços', 'Distribuição das ordens abertas hoje.', '<button class="text-link" data-view="orders">Ver detalhes →</button>')}<div class="progress-list"><div class="progress-line"><span>Em serviço</span><div class="progress-track"><div class="progress-fill" style="width:72%"></div></div><b>6</b></div><div class="progress-line"><span>Aguardando peça</span><div class="progress-track"><div class="progress-fill amber" style="width:34%"></div></div><b>2</b></div><div class="progress-line"><span>Diagnóstico</span><div class="progress-track"><div class="progress-fill cyan" style="width:48%"></div></div><b>3</b></div><div class="progress-line"><span>Pronto / entrega</span><div class="progress-track"><div class="progress-fill green" style="width:25%"></div></div><b>2</b></div></div></article><article class="panel">${panelHeader('Agenda de hoje', 'Próximos movimentos da oficina.', '<button class="text-link" data-view="schedule">Abrir agenda →</button>')}<div class="timeline"><div class="timeline-item"><span class="timeline-time">09:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrada • QWE-3D17</strong><span>Jeep Renegade • André Carvalho</span></div></div><div class="timeline-item"><span class="timeline-time">11:00</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Diagnóstico • MNO-1A09</strong><span>Chevrolet Onix • Baia 02</span></div></div><div class="timeline-item"><span class="timeline-time">16:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrega • RZD-4H81</strong><span>Toyota Corolla • OS-0248</span></div></div></div></article></section>
    <section class="panel table-panel">${panelHeader('Ordens em acompanhamento', 'Últimas movimentações da equipe.', '<button class="text-link" data-view="orders">Ver todas →</button>')}<div class="table-wrap"><table><thead><tr><th>Ordem / cliente</th><th>Veículo</th><th>Serviço</th><th>Status</th><th>Entrega</th><th></th></tr></thead><tbody>${recent.map(orderRow).join('')}</tbody></table></div></section>`;
}

function orderRow(order) { return `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>${esc(order.id)}<span class="cell-secondary">${esc(order.customer)}</span></div></div></td><td>${esc(order.plate)}<span class="cell-secondary">${esc(order.vehicle)}</span></td><td>${esc(order.service)}<span class="cell-secondary">${esc(order.technician)}</span></td><td>${statusPill(order.status, order.statusLabel)}</td><td>${esc(order.delivery)}</td><td><button class="action-dots" data-order-id="${esc(order.id)}" title="Concluir ordem">•••</button></td></tr>`; }

function renderOrders() {
  const visible = state.orders.filter((item) => (state.status === 'all' || item.status === state.status) && matches(item));
  return `${pageHeader('Operação', 'Ordens de serviço', 'Acompanhe cada veículo desde a entrada até a entrega.', buttonNewOrder())}<div class="filter-bar"><div class="filter-group"><span class="filter-label">Exibir:</span><select class="select-control" id="status-filter"><option value="all" ${state.status === 'all' ? 'selected' : ''}>Todos os status</option><option value="progress" ${state.status === 'progress' ? 'selected' : ''}>Em serviço</option><option value="waiting" ${state.status === 'waiting' ? 'selected' : ''}>Aguardando peça</option><option value="done" ${state.status === 'done' ? 'selected' : ''}>Pronto para entrega</option><option value="late" ${state.status === 'late' ? 'selected' : ''}>Atrasado</option></select></div><span class="filter-label">${visible.length} ordens encontradas</span></div><section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Ordem / cliente</th><th>Veículo</th><th>Serviço</th><th>Técnico</th><th>Status</th><th>Previsão</th><th>Valor</th><th></th></tr></thead><tbody>${visible.length ? visible.map(orderRowExtended).join('') : `<tr><td colspan="8"><div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>Nenhuma ordem encontrada</h3><p>Tente ajustar a busca ou selecionar outro status.</p></div></td></tr>`}</tbody></table></div></section>`;
}
function orderRowExtended(order) { return `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('receipt')}</span><div>${esc(order.id)}<span class="cell-secondary">${esc(order.customer)}</span></div></div></td><td>${esc(order.plate)}<span class="cell-secondary">${esc(order.vehicle)}</span></td><td>${esc(order.service)}</td><td>${esc(order.technician)}</td><td>${statusPill(order.status, order.statusLabel)}</td><td>${esc(order.delivery)}</td><td><strong style="color:var(--slate-300)">${money(order.total)}</strong></td><td><button class="action-dots" data-order-id="${esc(order.id)}" title="Concluir ordem">•••</button></td></tr>`; }

function renderCustomers() {
  const visible = state.clients.filter((client) => JSON.stringify(client).toLowerCase().includes(state.search.trim().toLowerCase()));
  const selected = state.clients.find((client) => client.id === state.saleClientId) || state.clients[0];
  const vehicle = selected?.vehicles[0];
  return `${pageHeader('Operação', 'Clientes e veículos', 'Cadastro completo, histórico e veículos vinculados em um único relacionamento.', '<button class="button button-primary" data-action="new-client">'+icon('plus')+' Novo cliente</button>')}<section class="split-layout"><div class="panel table-panel" style="margin-top:0">${panelHeader('Base de clientes', `${state.clients.length} clientes cadastrados e ${state.clients.reduce((sum, client) => sum + client.vehicles.length, 0)} veículos vinculados.`, '<button class="text-link" data-view="sales">Abrir vendas →</button>')}<div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Contato</th><th>Veículos</th><th>Último atendimento</th><th></th></tr></thead><tbody>${visible.map((client) => `<tr class="is-clickable" data-select-client="${client.id}"><td><div class="cell-primary"><span class="user-avatar">${initials(client.name)}</span><div>${esc(client.name)}<span class="cell-secondary">CPF ${esc(client.cpf)}</span></div></div></td><td>${esc(client.phone)}<span class="cell-secondary">${esc(client.email)}</span></td><td><strong style="color:var(--slate-300)">${client.vehicles.length}</strong><span class="cell-secondary">${client.vehicles.map((car) => esc(car.plate)).join(' • ')}</span></td><td>${esc(client.last)}</td><td><button class="action-dots" data-select-client="${client.id}">•••</button></td></tr>`).join('')}</tbody></table></div></div><div class="card-list"><article class="panel">${panelHeader('Ficha do cliente', 'Dados cadastrais e contato principal.')}<div class="profile-summary"><span class="user-avatar large">${initials(selected.name)}</span><div><h3>${esc(selected.name)}</h3><p>${esc(selected.email)}</p><p>${esc(selected.phone)} • ${esc(selected.address)}</p></div></div><div class="detail-grid"><div><span>CPF</span><b>${esc(selected.cpf)}</b></div><div><span>Nascimento</span><b>${esc(selected.birth)}</b></div></div></article><article class="panel">${panelHeader('Veículo vinculado', 'Acessível diretamente na abertura da OS.', '<button class="text-link" data-action="new-vehicle">Adicionar veículo →</button>')}<div class="vehicle-card"><span class="vehicle-symbol">${icon('car')}</span><div><strong>${esc(vehicle?.brand || '')} ${esc(vehicle?.model || '')}</strong><span>${esc(vehicle?.plate || '')} • ${esc(vehicle?.year || '')} • ${esc(vehicle?.color || '')}</span><small>Chassi ${esc(vehicle?.vin || 'Não informado')} • ${vehicle?.mileage || 0} km</small></div></div><button class="button button-primary full-action" data-view="sales">Vender serviço para este cliente ${icon('arrow')}</button></article></div></section>`;
}

function renderSales() {
  const client = state.clients.find((item) => item.id === Number(state.saleClientId)) || state.clients[0];
  if (!client) return `${pageHeader('Operação', 'Vendas e nova OS', 'Cadastre um cliente antes de iniciar uma venda.')}<div class="empty-state"><h3>Nenhum cliente cadastrado</h3></div>`;
  const vehicle = client.vehicles.find((item) => item.id === Number(state.saleVehicleId)) || client.vehicles[0];
  state.saleVehicleId = vehicle.id;
  const catalog = [...serviceCatalog, ...state.inventory.map((item) => ({ id: `prod-${item.code}`, kind: 'product', name: item.name, code: item.code, category: 'Produto', price: item.price, unit: item.unit }))];
  const results = catalog.filter((item) => JSON.stringify(item).toLowerCase().includes(state.saleSearch.trim().toLowerCase()));
  const total = state.saleCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return `${pageHeader('Operação', 'Vendas e nova OS', 'Localize serviços e produtos, monte o atendimento e gere a ordem para o cliente.', '<button class="button button-ghost" data-action="new-client">'+icon('plus')+' Novo cliente</button>')}<section class="sale-context panel"><div><span class="eyebrow">Cliente do atendimento</span><div class="context-selects"><select class="select-control" id="sale-client">${state.clients.map((item) => `<option value="${item.id}" ${item.id === client.id ? 'selected' : ''}>${esc(item.name)} • ${esc(item.phone)}</option>`).join('')}</select><select class="select-control" id="sale-vehicle">${client.vehicles.map((item) => `<option value="${item.id}" ${item.id === vehicle.id ? 'selected' : ''}>${esc(item.plate)} • ${esc(item.brand)} ${esc(item.model)}</option>`).join('')}</select></div><p class="context-detail">CPF ${esc(client.cpf)} • ${esc(client.email)} • ${esc(client.address)}</p></div><button class="text-link" data-view="customers">Ver cadastro completo →</button></section><section class="sale-grid"><article class="panel catalog-panel">${panelHeader('Catálogo de serviços e produtos', 'Pesquise por descrição, código ou categoria.')}<label class="search-box sale-search"><span class="search-icon" data-icon="search"></span><input id="sale-search" type="search" value="${esc(state.saleSearch)}" placeholder="Buscar serviço, peça ou código..." autocomplete="off" /></label><div class="catalog-list">${results.map((item) => `<div class="catalog-item"><div class="catalog-item-icon ${item.kind === 'product' ? 'cyan' : 'orange'}">${icon(item.kind === 'product' ? 'box' : 'wrench')}</div><div class="catalog-item-copy"><strong>${esc(item.name)}</strong><span>${esc(item.code)} • ${esc(item.category)}${item.unit ? ` • ${esc(item.unit)}` : ''}</span></div><b>${money(item.price)}</b><button class="button button-ghost compact-button" data-add-sale="${esc(item.id)}">Adicionar</button></div>`).join('') || '<div class="empty-state"><h3>Nenhum resultado</h3><p>Altere os termos da busca para localizar um item.</p></div>'}</div></article><article class="panel sale-cart-panel">${panelHeader('Itens da venda', `${state.saleCart.length} itens adicionados.`)}<div class="sale-cart">${state.saleCart.length ? state.saleCart.map((item) => `<div class="cart-item"><div><strong>${esc(item.name)}</strong><span>${esc(item.code)} • ${item.quantity} ${esc(item.unit || 'serviço')}</span></div><b>${money(item.price * item.quantity)}</b><button class="action-dots" data-remove-sale="${esc(item.id)}">×</button></div>`).join('') : '<div class="cart-empty">Adicione serviços ou produtos do catálogo para montar a OS.</div>'}</div><div class="cart-total"><span>Total da OS</span><strong>${money(total)}</strong></div><button class="button button-primary full-action" data-action="generate-os" ${state.saleCart.length ? '' : 'disabled'}>${icon('clipboard')} Gerar ordem de serviço</button></article></section>`;
}

function renderInventory() {
  const categories = [...new Set(state.inventory.map((item) => item.category))];
  const filtered = state.inventory.filter((item) => { const low = item.stock <= item.min; return matches(item) && (state.inventoryCategory === 'all' || item.category === state.inventoryCategory) && (state.inventoryStatus === 'all' || (state.inventoryStatus === 'low' ? low : !low)); });
  const lowStock = state.inventory.filter((item) => item.stock <= item.min).length;
  const totalUnits = state.inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = state.inventory.reduce((sum, item) => sum + item.stock * item.cost, 0);
  return `${pageHeader('Operação', 'Estoque e peças', 'Controle completo de cadastro, inventário, movimentações e reposição.', '<button class="button button-ghost" data-action="inventory-report">'+icon('chart')+' Relatório</button><button class="button button-primary" data-action="new-stock">'+icon('plus')+' Cadastrar item</button>')}<section class="kpi-grid"><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon amber">${icon('alert')}</span><span class="kpi-change down">atenção</span></div><strong class="kpi-value">${String(lowStock).padStart(2, '0')}</strong><span class="kpi-label">Itens abaixo do mínimo</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon cyan">${icon('box')}</span><span class="kpi-change">+18 hoje</span></div><strong class="kpi-value">${totalUnits}</strong><span class="kpi-label">Unidades em estoque</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon green">${icon('trend')}</span><span class="kpi-change">custo atual</span></div><strong class="kpi-value">${money(totalValue)}</strong><span class="kpi-label">Valor de custo armazenado</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon orange">${icon('receipt')}</span><span class="kpi-change">este mês</span></div><strong class="kpi-value">R$ 8,6k</strong><span class="kpi-label">Consumo em ordens</span></article></section><section class="filter-bar"><div class="filter-group"><span class="filter-label">Categoria:</span><select class="select-control" id="inventory-category"><option value="all">Todas as categorias</option>${categories.map((category) => `<option value="${esc(category)}" ${state.inventoryCategory === category ? 'selected' : ''}>${esc(category)}</option>`).join('')}</select><span class="filter-label">Situação:</span><select class="select-control" id="inventory-status"><option value="all" ${state.inventoryStatus === 'all' ? 'selected' : ''}>Todos</option><option value="low" ${state.inventoryStatus === 'low' ? 'selected' : ''}>Reposição necessária</option><option value="normal" ${state.inventoryStatus === 'normal' ? 'selected' : ''}>Estoque normal</option></select></div><span class="filter-label">${filtered.length} itens exibidos • ${state.units.length} unidades disponíveis</span></section><section class="panel table-panel" style="margin-top:0">${panelHeader('Inventário de peças e materiais', 'Controle por unidade, localização, estoque mínimo e máximo.', '<button class="text-link" data-action="inventory-adjust">Ajustar inventário →</button>')}<div class="table-wrap"><table><thead><tr><th>Item / código</th><th>Categoria</th><th>Saldo</th><th>Unidade</th><th>Localização</th><th>Reposição</th><th>Custo unit.</th><th>Situação</th><th></th></tr></thead><tbody>${filtered.length ? filtered.map((item) => `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('box')}</span><div>${esc(item.name)}<span class="cell-secondary">${esc(item.code)} • ${esc(item.supplier)}</span></div></div></td><td>${esc(item.category)}</td><td><strong style="color:${item.stock <= item.min ? 'var(--red)' : 'var(--slate-300)'}">${item.stock}</strong><span class="cell-secondary">máx. ${item.max}</span></td><td><span class="permission-chip">${esc(item.unit)}</span></td><td>${esc(item.location)}</td><td>${item.min} ${esc(item.unit)}</td><td>${money(item.cost)}</td><td>${item.stock <= item.min ? statusPill('late', 'Repor') : statusPill('done', 'Normal')}</td><td><button class="action-dots" data-action="show-toast">•••</button></td></tr>`).join('') : `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>Nenhum item encontrado</h3><p>Ajuste os filtros ou cadastre uma nova peça.</p></div></td></tr>`}</tbody></table></div></section><section class="dashboard-grid"><article class="panel">${panelHeader('Unidades cadastradas', 'Use a unidade correta para cada tipo de material.', '<button class="text-link" data-action="new-unit">Cadastrar unidade →</button>')}<div class="permission-list">${state.units.map((unit) => `<span class="permission-chip">${esc(unit)}</span>`).join('')}</div></article><article class="panel">${panelHeader('Resumo de movimentações', 'Últimas entradas e saídas registradas.')}<div class="timeline"><div class="timeline-item"><span class="timeline-time">Hoje</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrada • Óleo 5W30</strong><span>+20 un. • NF 003842 • LubriMax</span></div></div><div class="timeline-item"><span class="timeline-time">Ontem</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Saída • Filtro de óleo</strong><span>-4 pc • OS-0248 • Toyota Corolla</span></div></div></div></article></section>`;
}

function renderServices() {
  const catalogView = `<section class="module-grid">${serviceCatalog.map((service) => `<article class="module-card"><span class="module-icon ${service.id === 'svc-1' ? 'cyan' : service.id === 'svc-2' ? 'orange' : service.id === 'svc-3' ? 'amber' : 'green'}">${icon(service.id === 'svc-4' ? 'scan' : service.id === 'svc-3' ? 'settings' : service.id === 'svc-1' ? 'car' : 'wrench')}</span><h3>${esc(service.name)}</h3><p>${esc(service.description || 'Serviço padronizado para orçamento e ordem de serviço.')}</p><div class="metric-inline"><b>${money(service.price)}</b><span>${esc(service.duration || 'sob consulta')}</span></div><small class="service-code">${esc(service.code)} • ${esc(service.category)}</small></article>`).join('')}</section>`;
  const formView = `<section class="panel service-form-panel"><div class="form-section-title"><span>Novo serviço</span><small>Cadastre o serviço que ficará disponível no catálogo e nas vendas.</small></div><form id="new-service-form"><div class="form-grid"><label class="field field-span-2"><span>Nome do serviço</span><input name="name" required placeholder="Ex.: Higienização completa do ar-condicionado" /></label><label class="field"><span>Código</span><input name="code" required placeholder="SRV-005" /></label><label class="field"><span>Categoria</span><input name="category" required placeholder="Ex.: Higienização" /></label><label class="field"><span>Preço de venda</span><input name="price" type="number" min="0" step="0.01" required placeholder="0,00" /></label><label class="field"><span>Duração estimada</span><input name="duration" required placeholder="Ex.: 2h30" /></label><label class="field field-span-2"><span>Descrição</span><textarea name="description" rows="4" required placeholder="Explique o que está incluído no serviço."></textarea></label></div><div class="modal-footer"><button type="button" class="button button-ghost" data-service-tab="catalog">Cancelar</button><button type="submit" class="button button-primary">${icon('check')} Salvar serviço</button></div></form></section>`;
  return `${pageHeader('Operação', 'Serviços e preços', 'Catálogo padronizado para orçamentos mais rápidos.', '<button class="button button-primary" data-action="new-service">'+icon('plus')+' Novo serviço</button>')}<div class="service-tabs"><button class="service-tab ${state.servicesTab === 'catalog' ? 'active' : ''}" data-service-tab="catalog">${icon('wrench')} Catálogo de serviços <span>${serviceCatalog.length}</span></button><button class="service-tab ${state.servicesTab === 'new' ? 'active' : ''}" data-service-tab="new">${icon('plus')} Cadastrar novo serviço</button></div>${state.servicesTab === 'catalog' ? catalogView : formView}`;
}

function renderSchedule() { return `${pageHeader('Operação', 'Agendamentos', 'Organize baias, técnicos e horários de entrega.', '<button class="button button-primary" data-action="show-toast">'+icon('plus')+' Novo agendamento</button>')}<section class="split-layout"><div class="panel" style="min-height:380px">${panelHeader('Quarta-feira, 05 de novembro', 'Agenda de baias e compromissos da equipe.', '<span class="status-pill progress">Hoje</span>')}<div class="timeline"><div class="timeline-item"><span class="timeline-time">08:00</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrada • Revisão preventiva</strong><span>RZD-4H81 • Marcos Almeida • Baia 01 • João Mendes</span></div></div><div class="timeline-item"><span class="timeline-time">09:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Diagnóstico eletrônico</strong><span>QWE-3D17 • André Carvalho • Baia 03 • Bruno Santos</span></div></div><div class="timeline-item"><span class="timeline-time">11:00</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Troca de óleo e filtros</strong><span>MNO-1A09 • Eduardo Lima • Baia 02 • Lucas Ferreira</span></div></div><div class="timeline-item"><span class="timeline-time">16:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrega prevista • OS-0248</strong><span>RZD-4H81 • Marcos Almeida • Recepção</span></div></div></div></div><div class="card-list"><article class="panel">${panelHeader('Baias disponíveis')}<div class="progress-list"><div class="progress-line"><span>Baia 01</span><div class="progress-track"><div class="progress-fill" style="width:90%"></div></div><b>ocupada</b></div><div class="progress-line"><span>Baia 02</span><div class="progress-track"><div class="progress-fill amber" style="width:55%"></div></div><b>livre 13h</b></div><div class="progress-line"><span>Baia 03</span><div class="progress-track"><div class="progress-fill cyan" style="width:75%"></div></div><b>ocupada</b></div></div></article></div></section>`; }

function renderDiagnostics() { return `${pageHeader('Gestão', 'Diagnóstico', 'Transforme sintomas em decisões técnicas rastreáveis.', '<button class="button button-primary" data-action="show-toast">'+icon('plus')+' Iniciar diagnóstico</button>')}<section class="module-grid"><article class="module-card"><span class="module-icon cyan">${icon('scan')}</span><h3>Fila de diagnósticos</h3><p>Veículos aguardando avaliação técnica.</p><div class="metric-inline"><b>03</b><span>na fila</span></div></article><article class="module-card"><span class="module-icon amber">${icon('alert')}</span><h3>Itens reprovados</h3><p>Recomendações aguardando aprovação do cliente.</p><div class="metric-inline"><b>07</b><span>pendências</span></div></article><article class="module-card"><span class="module-icon green">${icon('check')}</span><h3>Laudos concluídos</h3><p>Diagnósticos fechados nos últimos 30 dias.</p><div class="metric-inline"><b>42</b><span>laudos</span></div></article></section><section class="panel table-panel">${panelHeader('Últimos diagnósticos', 'Histórico de avaliações técnicas.')}<div class="table-wrap"><table><thead><tr><th>Veículo</th><th>Sintoma informado</th><th>Técnico</th><th>Resultado</th><th>Data</th></tr></thead><tbody><tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>QWE-3D17<span class="cell-secondary">Jeep Renegade 2019</span></div></div></td><td>Luz da injeção acesa</td><td>Bruno Santos</td><td>${statusPill('done', 'Laudo pronto')}</td><td>Hoje, 09:42</td></tr><tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>FTR-8C44<span class="cell-secondary">Volkswagen T-Cross 2021</span></div></div></td><td>Ruído na suspensão</td><td>João Mendes</td><td>${statusPill('waiting', 'Aguardando aprovação')}</td><td>Ontem, 16:20</td></tr></tbody></table></div></section>`; }

function renderFinance() { return `${pageHeader('Gestão', 'Financeiro', 'Visão clara do caixa, recebimentos e compromissos.', '<button class="button button-primary" data-action="show-toast">'+icon('plus')+' Novo lançamento</button>')}<section class="kpi-grid"><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon green">${icon('wallet')}</span><span class="kpi-change">+8,6%</span></div><strong class="kpi-value">R$ 18.420</strong><span class="kpi-label">Recebido no mês</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon amber">${icon('receipt')}</span><span class="kpi-change down">06 contas</span></div><strong class="kpi-value">R$ 4.280</strong><span class="kpi-label">A receber</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon red">${icon('alert')}</span><span class="kpi-change down">atenção</span></div><strong class="kpi-value">R$ 1.160</strong><span class="kpi-label">Em atraso</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon cyan">${icon('trend')}</span><span class="kpi-change">meta 82%</span></div><strong class="kpi-value">76%</strong><span class="kpi-label">Margem operacional</span></article></section><section class="dashboard-grid"><article class="panel">${panelHeader('Movimentação do mês', 'Entradas confirmadas por semana.')}<div class="progress-list"><div class="progress-line"><span>Semana 01</span><div class="progress-track"><div class="progress-fill cyan" style="width:64%"></div></div><b>R$ 4,2k</b></div><div class="progress-line"><span>Semana 02</span><div class="progress-track"><div class="progress-fill cyan" style="width:82%"></div></div><b>R$ 5,3k</b></div><div class="progress-line"><span>Semana 03</span><div class="progress-track"><div class="progress-fill" style="width:74%"></div></div><b>R$ 4,8k</b></div><div class="progress-line"><span>Semana 04</span><div class="progress-track"><div class="progress-fill green" style="width:63%"></div></div><b>R$ 4,1k</b></div></div></article><article class="panel">${panelHeader('Próximos recebimentos')}<div class="alert-list"><div class="alert-item"><div class="alert-icon" style="background:var(--green-soft);color:var(--green)">${icon('check')}</div><div class="alert-copy"><strong>OS-0246 • André Carvalho</strong><span>Pix • hoje</span></div><b style="color:var(--green)">${money(540)}</b></div><div class="alert-item warning"><div class="alert-icon">${icon('receipt')}</div><div class="alert-copy"><strong>OS-0247 • Camila Rocha</strong><span>Cartão • hoje</span></div><b>${money(845)}</b></div></div></article></section>`; }

function renderReports() { return `${pageHeader('Gestão', 'Relatórios', 'Indicadores operacionais para decisões mais rápidas.')}<section class="module-grid"><article class="module-card"><span class="module-icon orange">${icon('chart')}</span><h3>Desempenho financeiro</h3><p>Receita, margem, ticket médio e evolução mensal.</p><button class="text-link" data-action="show-toast">Gerar relatório →</button></article><article class="module-card"><span class="module-icon cyan">${icon('clipboard')}</span><h3>Produtividade da oficina</h3><p>Tempo por OS, técnico, baia e tipo de serviço.</p><button class="text-link" data-action="show-toast">Gerar relatório →</button></article><article class="module-card"><span class="module-icon amber">${icon('box')}</span><h3>Movimentação de estoque</h3><p>Consumo, perdas, compras e itens abaixo do mínimo.</p><button class="text-link" data-action="show-toast">Gerar relatório →</button></article></section><div class="empty-state" style="margin-top:18px"><div><div class="empty-state-icon" style="margin-left:auto;margin-right:auto">${icon('chart')}</div><h3>Relatórios detalhados entram na próxima etapa</h3><p>O protótipo já reservou os espaços para gráficos e exportação local em PDF/CSV.</p></div></div>`; }
function renderSettings() { return `${pageHeader('Sistema', 'Usuários e permissões', 'Crie logins e determine quais módulos cada pessoa poderá acessar.', '<button class="button button-primary" data-action="new-user">'+icon('plus')+' Novo login</button>')}<section class="panel table-panel" style="margin-top:0">${panelHeader('Acessos da equipe', 'Cada login possui permissões próprias dentro do mesmo sistema.')}<div class="table-wrap"><table><thead><tr><th>Usuário</th><th>Login</th><th>Perfil</th><th>Módulos liberados</th><th>Status</th><th></th></tr></thead><tbody>${state.users.map((user) => `<tr><td><div class="cell-primary"><span class="user-row-avatar">${initials(user.name)}</span><div>${esc(user.name)}<span class="cell-secondary">ID ${String(user.id).padStart(3, '0')}</span></div></div></td><td>${esc(user.login)}</td><td><span class="role-label">${esc(user.role)}<small>${user.admin ? 'Acesso administrativo total' : 'Permissões personalizadas'}</small></span></td><td><div class="permission-list">${user.admin ? '<span class="permission-chip admin">Todos os módulos</span>' : user.permissions.map((permission) => `<span class="permission-chip">${esc(permissionLabel(permission))}</span>`).join('')}</div></td><td>${statusPill('done', 'Ativo')}</td><td><button class="action-dots" data-action="show-toast">•••</button></td></tr>`).join('')}</tbody></table></div></section><div class="access-note">${icon('database')}<span>Arquitetura planejada: monólito modular com um único banco SQLite. O administrador controla usuários, permissões e auditoria; cada módulo permanece isolado em sua própria camada de negócio.</span></div>`; }

function renderBackup() { return `${pageHeader('Sistema', 'Backup local', 'Proteja os dados da oficina com cópias simples e restauráveis.', '<button class="button button-primary" data-action="backup">'+icon('database')+' Fazer backup agora</button>')}<section class="split-layout"><article class="panel">${panelHeader('Status do banco local', 'O SQLite ficará armazenado neste computador quando o backend for conectado.')}<div class="offline-status" style="padding:9px 0 17px"><span class="status-pulse"></span><div><strong style="font-size:12px">Banco local protegido</strong><small style="font-size:10px">Última sincronização: hoje às 08:14</small></div></div><div class="progress-list"><div class="progress-line"><span>Uso do armazenamento</span><div class="progress-track"><div class="progress-fill cyan" style="width:28%"></div></div><b>28%</b></div></div></article><article class="panel">${panelHeader('Histórico de backups')}<div class="alert-list"><div class="alert-item"><div class="alert-icon" style="background:var(--green-soft);color:var(--green)">${icon('check')}</div><div class="alert-copy"><strong>backup-2026-11-05-0814.db</strong><span>Hoje • 2,4 MB</span></div><button class="text-link" data-action="show-toast">Restaurar</button></div><div class="alert-item"><div class="alert-icon" style="background:rgba(139,215,245,.1);color:var(--cyan)">${icon('database')}</div><div class="alert-copy"><strong>backup-2026-11-04-1810.db</strong><span>Ontem • 2,3 MB</span></div><button class="text-link" data-action="show-toast">Restaurar</button></div></div></article></section>`; }

function renderGeneric(view) { const [section, title] = titles[view]; return `${pageHeader(section, title, 'Módulo preparado para a próxima etapa do sistema offline.')}<div class="empty-state"><div><div class="empty-state-icon" style="margin-left:auto;margin-right:auto">${icon('settings')}</div><h3>Área em construção</h3><p>Esta tela já faz parte da navegação do protótipo e receberá os fluxos completos conectados ao SQLite.</p></div></div>`; }

function renderView() {
  if (!state.authenticated || !state.currentUser) return;
  if (!canAccess(state.view)) state.view = 'dashboard';
  const views = { dashboard: renderDashboard, orders: renderOrders, customers: renderCustomers, sales: renderSales, inventory: renderInventory, services: renderServices, schedule: renderSchedule, diagnostics: renderDiagnostics, finance: renderFinance, reports: renderReports, settings: renderSettings, backup: renderBackup };
  document.getElementById('view').innerHTML = (views[state.view] || (() => renderGeneric(state.view)))();
  const [section, current] = titles[state.view] || titles.dashboard;
  document.getElementById('breadcrumb-section').textContent = section;
  document.getElementById('breadcrumb-current').textContent = current;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === state.view));
  updateSessionUI();
  renderIcons();
}

function showToast(message, type = 'success') { const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.innerHTML = `${icon(type === 'success' ? 'check' : 'alert')}<span>${esc(message)}</span>`; document.getElementById('toast-region').appendChild(toast); setTimeout(() => toast.remove(), 3400); }
function openModal() { const modal = document.getElementById('modal-backdrop'); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => modal.querySelector('input')?.focus(), 50); }
function closeModal() { const modal = document.getElementById('modal-backdrop'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function completeOrder(id) { const order = state.orders.find((item) => item.id === id); if (!order) return; order.status = 'done'; order.statusLabel = 'Pronto para entrega'; renderView(); showToast(`${id} marcada como pronta para entrega.`); }
function openUserModal() {
  const grid = document.getElementById('permission-grid');
  grid.innerHTML = moduleCatalog.map((module) => `<label class="permission-option"><input type="checkbox" name="permission" value="${module.id}" /><span>${icon(module.icon)}${module.label}</span></label>`).join('');
  const modal = document.getElementById('user-modal-backdrop');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('select-all-permissions').checked = false;
  setTimeout(() => modal.querySelector('input[name="name"]')?.focus(), 50);
  renderIcons();
}
function closeUserModal() { const modal = document.getElementById('user-modal-backdrop'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function openStockModal() {
  document.getElementById('stock-unit-select').innerHTML = state.units.map((unit) => `<option value="${esc(unit)}">${esc(unit)}</option>`).join('');
  const modal = document.getElementById('stock-modal-backdrop');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(() => modal.querySelector('input[name="name"]')?.focus(), 50);
}
function closeStockModal() { const modal = document.getElementById('stock-modal-backdrop'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function openCustomerModal() { const modal = document.getElementById('customer-modal-backdrop'); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => modal.querySelector('input[name="name"]')?.focus(), 50); }
function closeCustomerModal() { const modal = document.getElementById('customer-modal-backdrop'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function openVehicleModal() { const client = state.clients.find((item) => item.id === Number(state.saleClientId)) || state.clients[0]; if (!client) { showToast('Cadastre um cliente antes de vincular um veículo.', 'error'); return; } state.saleClientId = client.id; document.getElementById('vehicle-client-name').textContent = client.name; const modal = document.getElementById('vehicle-modal-backdrop'); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => modal.querySelector('input[name="plate"]')?.focus(), 50); }
function closeVehicleModal() { const modal = document.getElementById('vehicle-modal-backdrop'); modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
function catalogItemById(id) { const service = serviceCatalog.find((item) => item.id === id); if (service) return service; const product = state.inventory.find((item) => `prod-${item.code}` === id); return product ? { id, kind: 'product', name: product.name, code: product.code, category: 'Produto', price: product.price, unit: product.unit } : null; }
function addSaleItem(id) { const item = catalogItemById(id); if (!item) return; const existing = state.saleCart.find((entry) => entry.id === id); if (existing) existing.quantity += 1; else state.saleCart.push({ ...item, quantity: 1 }); renderView(); showToast(`${item.name} adicionado à venda.`); }
function removeSaleItem(id) { state.saleCart = state.saleCart.filter((item) => item.id !== id); renderView(); }
function generateOrderFromSale() { const client = state.clients.find((item) => item.id === Number(state.saleClientId)); const vehicle = client?.vehicles.find((item) => item.id === Number(state.saleVehicleId)); if (!client || !vehicle || !state.saleCart.length) { showToast('Selecione cliente, veículo e pelo menos um item.', 'error'); return; } const total = state.saleCart.reduce((sum, item) => sum + item.price * item.quantity, 0); const nextNumber = 249 + state.orders.length - 5; state.orders.unshift({ id: `OS-${String(nextNumber).padStart(4, '0')}`, customer: client.name, plate: vehicle.plate, vehicle: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`, service: state.saleCart.map((item) => `${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(', '), technician: 'A definir', status: 'waiting', statusLabel: 'Aguardando triagem', delivery: 'A definir', total }); state.saleCart = []; state.saleSearch = ''; state.view = 'orders'; renderView(); showToast(`OS criada para ${client.name}: venda de ${money(total)}.`); }
function registerUnit() { const unit = window.prompt('Informe a nova unidade. Ex.: lata, tubo ou frasco'); if (!unit) return; const normalized = unit.trim().toLowerCase(); if (!normalized || state.units.includes(normalized)) { showToast('Essa unidade já está cadastrada ou é inválida.', 'error'); return; } state.units.push(normalized); renderView(); showToast(`Unidade ${normalized} adicionada ao catálogo.`); }
function adjustInventory() { const code = window.prompt('Digite o código do item para ajustar o saldo'); if (!code) return; const item = state.inventory.find((entry) => entry.code.toLowerCase() === code.trim().toLowerCase()); if (!item) { showToast('Item não encontrado no inventário.', 'error'); return; } const quantity = window.prompt(`Novo saldo para ${item.name} (${item.unit})`, String(item.stock)); if (quantity === null || Number.isNaN(Number(quantity)) || Number(quantity) < 0) { showToast('Saldo inválido para o ajuste.', 'error'); return; } item.stock = Number(quantity); renderView(); showToast(`Inventário ajustado: ${item.name}.`); }
function syncPermissionSelection() {
  const role = document.getElementById('user-role').value;
  const isAdmin = role === 'admin';
  document.querySelectorAll('#permission-grid input[name="permission"]').forEach((input) => { input.checked = isAdmin || input.checked; input.disabled = isAdmin; input.closest('.permission-option').classList.toggle('is-locked', isAdmin); });
  document.getElementById('select-all-permissions').checked = isAdmin || [...document.querySelectorAll('#permission-grid input[name="permission"]')].every((input) => input.checked);
  document.getElementById('select-all-permissions').disabled = isAdmin;
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-view]');
    if (nav) { if (!canAccess(nav.dataset.view)) { showToast('Seu login não possui acesso a este módulo.', 'error'); return; } state.view = nav.dataset.view; state.status = 'all'; renderView(); return; }
    if (event.target.closest('[data-action="new-order"]')) { openModal(); return; }
    if (event.target.closest('[data-action="new-service"]')) { state.servicesTab = 'new'; renderView(); return; }
    const serviceTab = event.target.closest('[data-service-tab]');
    if (serviceTab) { state.servicesTab = serviceTab.dataset.serviceTab; renderView(); return; }
    if (event.target.closest('[data-action="new-user"]')) { if (!state.currentUser?.admin) { showToast('Apenas o administrador pode criar novos logins.', 'error'); return; } openUserModal(); return; }
    if (event.target.closest('[data-action="new-stock"]')) { openStockModal(); return; }
    if (event.target.closest('[data-action="inventory-report"]')) { showToast('Relatório de estoque preparado para exportação local em PDF/CSV.'); return; }
    if (event.target.closest('[data-action="inventory-adjust"]')) { adjustInventory(); return; }
    if (event.target.closest('[data-action="new-unit"]')) { registerUnit(); return; }
    if (event.target.closest('[data-action="logout"]')) { logout(); return; }
    if (event.target.closest('[data-action="new-client"]')) { openCustomerModal(); return; }
    if (event.target.closest('[data-action="new-vehicle"]')) { openVehicleModal(); return; }
    const selectedClient = event.target.closest('[data-select-client]');
    if (selectedClient) { state.saleClientId = Number(selectedClient.dataset.selectClient); const client = state.clients.find((item) => item.id === state.saleClientId); state.saleVehicleId = client?.vehicles[0]?.id || null; renderView(); return; }
    const addSale = event.target.closest('[data-add-sale]');
    if (addSale) { addSaleItem(addSale.dataset.addSale); return; }
    const removeSale = event.target.closest('[data-remove-sale]');
    if (removeSale) { removeSaleItem(removeSale.dataset.removeSale); return; }
    if (event.target.closest('[data-action="generate-os"]')) { generateOrderFromSale(); return; }
    if (event.target.closest('[data-action="backup"]')) { showToast('Backup demonstrativo criado localmente.'); return; }
    if (event.target.closest('[data-action="show-toast"]')) { showToast('Ação demonstrativa registrada no protótipo.'); return; }
    const orderAction = event.target.closest('[data-order-id]');
    if (orderAction) { completeOrder(orderAction.dataset.orderId); return; }
    if (event.target.closest('[data-close-modal]') || event.target.id === 'modal-backdrop') closeModal();
    if (event.target.closest('[data-close-user-modal]') || event.target.id === 'user-modal-backdrop') closeUserModal();
    if (event.target.closest('[data-close-stock-modal]') || event.target.id === 'stock-modal-backdrop') closeStockModal();
    if (event.target.closest('[data-close-customer-modal]') || event.target.id === 'customer-modal-backdrop') closeCustomerModal();
    if (event.target.closest('[data-close-vehicle-modal]') || event.target.id === 'vehicle-modal-backdrop') closeVehicleModal();
  });
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = state.users.find((item) => item.login.toLowerCase() === String(data.get('login')).trim().toLowerCase() && item.password === data.get('password'));
    if (!user) { document.getElementById('login-error').textContent = 'Login ou senha inválidos. Tente o acesso demonstrativo abaixo.'; return; }
    login(user);
  });
  document.getElementById('global-search').addEventListener('input', (event) => { state.search = event.target.value; renderView(); });
  document.addEventListener('input', (event) => { if (event.target.id === 'sale-search') { state.saleSearch = event.target.value; renderView(); const search = document.getElementById('sale-search'); search?.focus(); search?.setSelectionRange(state.saleSearch.length, state.saleSearch.length); } });
  document.addEventListener('change', (event) => { if (event.target.id === 'status-filter') { state.status = event.target.value; renderView(); } });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'inventory-category') { state.inventoryCategory = event.target.value; renderView(); }
    if (event.target.id === 'inventory-status') { state.inventoryStatus = event.target.value; renderView(); }
  });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'user-role') syncPermissionSelection();
    if (event.target.id === 'select-all-permissions') document.querySelectorAll('#permission-grid input[name="permission"]').forEach((input) => { input.checked = event.target.checked; });
    if (event.target.id === 'sale-client') { state.saleClientId = Number(event.target.value); const client = state.clients.find((item) => item.id === state.saleClientId); state.saleVehicleId = client?.vehicles[0]?.id || null; state.saleCart = []; renderView(); }
    if (event.target.id === 'sale-vehicle') { state.saleVehicleId = Number(event.target.value); renderView(); }
  });
  document.getElementById('new-user-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!state.currentUser?.admin) { closeUserModal(); showToast('Apenas o administrador pode criar novos logins.', 'error'); return; }
    const data = new FormData(event.target);
    const loginValue = String(data.get('login')).trim().toLowerCase();
    if (state.users.some((user) => user.login.toLowerCase() === loginValue)) { showToast('Este login já está em uso.', 'error'); return; }
    const role = data.get('role');
    const roleNames = { reception: 'Recepção', technician: 'Técnico', finance: 'Financeiro', manager: 'Gestor', admin: 'Administrador' };
    const admin = role === 'admin';
    const permissions = admin ? ['all'] : [...document.querySelectorAll('#permission-grid input[name="permission"]:checked')].map((input) => input.value);
    state.users.push({ id: state.users.length + 1, name: data.get('name'), login: loginValue, password: data.get('password'), role: roleNames[role], admin, permissions });
    event.target.reset(); closeUserModal(); renderView(); showToast(`Login de ${String(data.get('name')).split(' ')[0]} criado com sucesso.`);
  });
  document.addEventListener('submit', (event) => {
    if (event.target.id !== 'new-service-form') return;
    event.preventDefault();
    const data = new FormData(event.target);
    const code = String(data.get('code')).trim().toUpperCase();
    if (serviceCatalog.some((service) => service.code.toUpperCase() === code)) { showToast('Este código de serviço já está cadastrado.', 'error'); return; }
    serviceCatalog.push({ id: `svc-${Date.now()}`, kind: 'service', name: data.get('name'), code, category: data.get('category'), price: Number(data.get('price')), duration: data.get('duration'), description: data.get('description') });
    event.target.reset(); state.servicesTab = 'catalog'; renderView(); showToast('Novo serviço cadastrado e liberado para vendas.');
  });
  document.getElementById('new-stock-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const code = String(data.get('code')).trim().toUpperCase();
    if (state.inventory.some((item) => item.code.toUpperCase() === code)) { showToast('Este código de item já está cadastrado.', 'error'); return; }
    state.inventory.push({ name: data.get('name'), code, category: data.get('category'), stock: Number(data.get('stock')), min: Number(data.get('min')), max: Number(data.get('max')), unit: data.get('unit'), price: Number(data.get('price')), cost: Number(data.get('cost')), location: data.get('location'), supplier: data.get('supplier') || 'Não informado' });
    event.target.reset(); closeStockModal(); state.view = 'inventory'; renderView(); showToast('Item cadastrado no estoque local.');
  });
  document.getElementById('new-customer-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const plate = String(data.get('plate')).trim().toUpperCase();
    if (state.clients.some((client) => client.vehicles.some((vehicle) => vehicle.plate === plate))) { showToast('Esta placa já está vinculada a outro cadastro.', 'error'); return; }
    const id = Math.max(...state.clients.map((client) => client.id), 0) + 1;
    const vehicleId = Math.max(...state.clients.flatMap((client) => client.vehicles.map((vehicle) => vehicle.id)), 100) + 1;
    state.clients.push({ id, name: data.get('name'), cpf: data.get('cpf'), email: data.get('email'), phone: data.get('phone'), birth: data.get('birth') || 'Não informado', address: data.get('address'), vehicles: [{ id: vehicleId, plate, brand: data.get('brand'), model: data.get('model'), year: data.get('year'), color: data.get('color') || 'Não informado', vin: data.get('vin') || 'Não informado', mileage: Number(data.get('mileage')) || 0 }], visits: 0, last: 'Novo cadastro' });
    state.saleClientId = id; state.saleVehicleId = vehicleId; event.target.reset(); closeCustomerModal(); state.view = 'customers'; renderView(); showToast(`Cliente ${String(data.get('name')).split(' ')[0]} cadastrado com veículo vinculado.`);
  });
  document.getElementById('new-vehicle-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const client = state.clients.find((item) => item.id === Number(state.saleClientId));
    const data = new FormData(event.target);
    const plate = String(data.get('plate')).trim().toUpperCase();
    if (!client) { closeVehicleModal(); showToast('Cliente não encontrado.', 'error'); return; }
    if (state.clients.some((item) => item.vehicles.some((vehicle) => vehicle.plate === plate))) { showToast('Esta placa já está vinculada a outro cadastro.', 'error'); return; }
    const vehicleId = Math.max(...state.clients.flatMap((item) => item.vehicles.map((vehicle) => vehicle.id)), 100) + 1;
    client.vehicles.push({ id: vehicleId, plate, brand: data.get('brand'), model: data.get('model'), year: data.get('year'), color: data.get('color') || 'Não informado', vin: data.get('vin') || 'Não informado', mileage: Number(data.get('mileage')) || 0 });
    state.saleVehicleId = vehicleId; event.target.reset(); closeVehicleModal(); renderView(); showToast(`Veículo ${plate} vinculado a ${client.name}.`);
  });
  document.getElementById('new-order-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const nextNumber = 249 + state.orders.length - 5;
    const delivery = data.get('delivery') ? new Date(`${data.get('delivery')}T12:00:00`).toLocaleDateString('pt-BR') : 'A definir';
    state.orders.unshift({ id: `OS-${String(nextNumber).padStart(4, '0')}`, customer: data.get('customer'), plate: String(data.get('plate')).toUpperCase(), vehicle: data.get('vehicle'), service: data.get('service'), technician: 'A definir', status: 'waiting', statusLabel: 'Aguardando triagem', delivery, total: 0 });
    event.target.reset(); closeModal(); state.view = 'orders'; state.status = 'all'; renderView(); showToast('Nova ordem criada no protótipo offline.');
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); closeUserModal(); closeStockModal(); closeCustomerModal(); closeVehicleModal(); } });
}

bindEvents();
renderIcons();
renderView();
