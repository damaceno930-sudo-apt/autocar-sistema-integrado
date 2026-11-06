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
  saleMechanicId: 2,
  saleSellerId: 3,
  saleReceived: 0,
  salePaymentMethod: 'PIX',
  saleInstallments: 1,
  saleSearch: '',
  saleCart: [],
  servicesTab: 'catalog',
  financeTab: 'cash',
  financeSummary: null,
  financeData: { transactions: [], receivables: [], payables: [], movements: [], commissions: [] },
  settingsTab: 'company',
  company: { legalName: 'Auto Service Prime Serviços Automotivos Ltda.', tradeName: 'Auto Service Prime', document: '12.345.678/0001-90', phone: '(11) 3333-9090', email: 'contato@autoserviceprime.local', address: 'Av. das Oficinas, 500 • Vila Mariana • São Paulo/SP', city: 'São Paulo', state: 'SP', zip: '04100-000', taxRegime: 'Simples Nacional' },
  users: [
    { id: 1, name: 'Rafael Costa', login: 'admin@autocar.local', password: 'admin123', role: 'Administrador', admin: true, isMechanic: false, permissions: ['all'] },
    { id: 2, name: 'João Mendes', login: 'joao.mendes', password: 'oficina123', role: 'Técnico', admin: false, isMechanic: true, permissions: ['dashboard', 'orders', 'customers', 'diagnostics'] },
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
  ,suppliers: [{ id: 1, name: 'AutoParts Brasil', document: '45.210.908/0001-20', phone: '(11) 3322-1190', category: 'Peças' }, { id: 2, name: 'LubriMax Distribuidora', document: '09.481.220/0001-44', phone: '(11) 4012-8830', category: 'Lubrificantes' }],
  sales: [],
  financeEntries: []
};

const API_BASE = 'http://127.0.0.1:8765/api';
let apiToken = '';
let backendOnline = false;
let stateHydrated = false;
let persistTimer = null;

async function apiRequest(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (apiToken) headers['X-AutoCar-Token'] = apiToken;
  if (options.body && typeof options.body !== 'string' && !(options.body instanceof Blob)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('json') ? await response.json() : await response.blob();
  if (!response.ok) throw new Error(data?.message || data?.error || `API ${response.status}`);
  return data;
}

function hydrateState(serverState) {
  const preserved = { view: state.view, search: state.search, status: state.status, inventoryCategory: state.inventoryCategory, inventoryStatus: state.inventoryStatus, saleCart: state.saleCart, saleSearch: state.saleSearch, saleReceived: state.saleReceived, salePaymentMethod: state.salePaymentMethod, saleInstallments: state.saleInstallments, servicesTab: state.servicesTab, financeTab: state.financeTab, settingsTab: state.settingsTab, financeSummary: state.financeSummary, financeData: state.financeData };
  ['company', 'clients', 'orders', 'inventory', 'services', 'units', 'suppliers', 'users'].forEach((key) => {
    if (serverState[key] !== undefined) state[key] = serverState[key];
  });
  if (Array.isArray(serverState.services)) {
    serviceCatalog.splice(0, serviceCatalog.length, ...serverState.services);
  }
  Object.assign(state, preserved);
  if (state.clients[0]) { state.saleClientId = state.saleClientId || state.clients[0].id; state.saleVehicleId = state.saleVehicleId || state.clients[0].vehicles?.[0]?.id || null; }
  stateHydrated = true;
}

async function loadFinanceData() {
  if (!backendOnline || !apiToken) return;
  try {
    const result = await apiRequest('/finance/summary');
    state.financeSummary = result.summary;
    state.financeData = { transactions: result.transactions || [], receivables: result.receivables || [], payables: result.payables || [], movements: result.movements || [], commissions: result.commissions || [] };
    if (state.view === 'finance') { document.getElementById('view').innerHTML = renderFinance(); renderIcons(); }
  } catch (error) { showToast(`Financeiro indisponível: ${error.message}`, 'error'); }
}

async function financeRequest(path, options = {}) {
  if (!backendOnline) throw new Error('O backend local precisa estar conectado.');
  const result = await apiRequest(path, options);
  await loadFinanceData();
  return result;
}

function queuePersist() {
  if (!backendOnline || !stateHydrated || !apiToken) return;
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    apiRequest('/state', { method: 'PUT', body: snapshotData() }).catch((error) => {
      backendOnline = false;
      console.warn('Persistência SQLite indisponível:', error.message);
    });
  }, 250);
}

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
async function loginWithBackend(loginValue, password) {
  const result = await apiRequest('/auth/login', { method: 'POST', body: { login: loginValue, password } });
  apiToken = result.token;
  backendOnline = true;
  hydrateState(result.state);
  login(result.user);
}
function logout() {
  if (apiToken) apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
  apiToken = '';
  backendOnline = false;
  stateHydrated = false;
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

function orderRow(order) { return `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>${esc(order.id)}<span class="cell-secondary">${esc(order.customer)}</span></div></div></td><td>${esc(order.plate)}<span class="cell-secondary">${esc(order.vehicle)}</span></td><td>${esc(order.service)}<span class="cell-secondary">${esc(order.technician)}</span></td><td>${statusPill(order.status, order.statusLabel)}</td><td>${esc(order.delivery)}</td><td><button class="action-dots" data-print-order="${esc(order.id)}" title="Imprimir OS">▣</button><button class="action-dots" data-order-id="${esc(order.id)}" title="Concluir ordem">•••</button></td></tr>`; }

function renderOrders() {
  const visible = state.orders.filter((item) => (state.status === 'all' || item.status === state.status) && matches(item));
  return `${pageHeader('Operação', 'Ordens de serviço', 'Acompanhe cada veículo desde a entrada até a entrega. Emitido por ' + esc(state.company.tradeName) + ' • ' + esc(state.company.document) + '.', buttonNewOrder())}<div class="filter-bar"><div class="filter-group"><span class="filter-label">Exibir:</span><select class="select-control" id="status-filter"><option value="all" ${state.status === 'all' ? 'selected' : ''}>Todos os status</option><option value="progress" ${state.status === 'progress' ? 'selected' : ''}>Em serviço</option><option value="waiting" ${state.status === 'waiting' ? 'selected' : ''}>Aguardando peça</option><option value="done" ${state.status === 'done' ? 'selected' : ''}>Pronto para entrega</option><option value="late" ${state.status === 'late' ? 'selected' : ''}>Atrasado</option></select></div><span class="filter-label">${visible.length} ordens encontradas</span></div><section class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>Ordem / cliente</th><th>Veículo</th><th>Serviço</th><th>Técnico</th><th>Status</th><th>Previsão</th><th>Valor</th><th></th></tr></thead><tbody>${visible.length ? visible.map(orderRowExtended).join('') : `<tr><td colspan="8"><div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>Nenhuma ordem encontrada</h3><p>Tente ajustar a busca ou selecionar outro status.</p></div></td></tr>`}</tbody></table></div></section>`;
}
function orderRowExtended(order) { return `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('receipt')}</span><div>${esc(order.id)}<span class="cell-secondary">${esc(order.customer)}</span></div></div></td><td>${esc(order.plate)}<span class="cell-secondary">${esc(order.vehicle)}</span></td><td>${esc(order.service)}</td><td>${esc(order.technician)}</td><td>${statusPill(order.status, order.statusLabel)}</td><td>${esc(order.delivery)}</td><td><strong style="color:var(--slate-300)">${money(order.total)}</strong></td><td><button class="action-dots" data-print-order="${esc(order.id)}" title="Imprimir OS">▣</button><button class="action-dots" data-order-id="${esc(order.id)}" title="Concluir ordem">•••</button></td></tr>`; }

function renderCustomers() {
  const visible = state.clients.filter((client) => JSON.stringify(client).toLowerCase().includes(state.search.trim().toLowerCase()));
  const selected = state.clients.find((client) => client.id === state.saleClientId) || state.clients[0];
  const vehicle = selected?.vehicles[0];
  return `${pageHeader('Operação', 'Clientes e veículos', 'Cadastro completo, histórico e veículos vinculados em um único relacionamento.', '<button class="button button-primary" data-action="new-client">'+icon('plus')+' Novo cliente</button>')}<section class="split-layout"><div class="panel table-panel" style="margin-top:0">${panelHeader('Base de clientes', `${state.clients.length} clientes cadastrados e ${state.clients.reduce((sum, client) => sum + client.vehicles.length, 0)} veículos vinculados.`, '<button class="text-link" data-view="sales">Abrir vendas →</button>')}<div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Contato</th><th>Veículos</th><th>Último atendimento</th><th></th></tr></thead><tbody>${visible.map((client) => `<tr class="is-clickable" data-select-client="${client.id}"><td><div class="cell-primary"><span class="user-avatar">${initials(client.name)}</span><div>${esc(client.name)}<span class="cell-secondary">${esc(client.type || 'PF')} • ${esc(client.cpf)}</span></div></div></td><td>${esc(client.phone)}<span class="cell-secondary">${esc(client.email)}</span></td><td><strong style="color:var(--slate-300)">${client.vehicles.length}</strong><span class="cell-secondary">${client.vehicles.map((car) => esc(car.plate)).join(' • ')}</span></td><td>${esc(client.last)}</td><td><button class="action-dots" data-select-client="${client.id}">•••</button></td></tr>`).join('')}</tbody></table></div></div><div class="card-list"><article class="panel">${panelHeader('Ficha do cliente', 'Dados cadastrais e contato principal.')}<div class="profile-summary"><span class="user-avatar large">${initials(selected.name)}</span><div><h3>${esc(selected.name)}</h3><p>${esc(selected.email)}</p><p>${esc(selected.phone)} • ${esc(selected.address)}</p></div></div><div class="detail-grid"><div><span>CPF</span><b>${esc(selected.cpf)}</b></div><div><span>Nascimento</span><b>${esc(selected.birth)}</b></div></div></article><article class="panel">${panelHeader('Veículo vinculado', 'Acessível diretamente na abertura da OS.', '<button class="text-link" data-action="new-vehicle">Adicionar veículo →</button>')}<div class="vehicle-card"><span class="vehicle-symbol">${icon('car')}</span><div><strong>${esc(vehicle?.brand || '')} ${esc(vehicle?.model || '')}</strong><span>${esc(vehicle?.plate || '')} • ${esc(vehicle?.year || '')} • ${esc(vehicle?.color || '')}</span><small>Chassi ${esc(vehicle?.vin || 'Não informado')} • ${vehicle?.mileage || 0} km</small></div></div><button class="button button-primary full-action" data-view="sales">Vender serviço para este cliente ${icon('arrow')}</button></article></div></section>`;
}

function renderSales() {
  const client = state.clients.find((item) => item.id === Number(state.saleClientId)) || state.clients[0];
  if (!client) return `${pageHeader('Operação', 'Vendas e nova OS', 'Cadastre um cliente antes de iniciar uma venda.')}<div class="empty-state"><h3>Nenhum cliente cadastrado</h3></div>`;
  const vehicle = client.vehicles.find((item) => item.id === Number(state.saleVehicleId)) || client.vehicles[0]; state.saleVehicleId = vehicle.id;
  const seller = state.users.find((item) => item.id === Number(state.saleSellerId)) || state.currentUser;
  const catalog = [...serviceCatalog, ...state.inventory.map((item) => ({ id: `prod-${item.code}`, kind: 'product', name: item.name, code: item.code, category: item.category || 'Produto', brand: item.brand, price: item.price, unit: item.unit, stock: item.stock }))];
  const results = catalog.filter((item) => JSON.stringify(item).toLowerCase().includes(state.saleSearch.trim().toLowerCase()));
  const subtotal = state.saleCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discounts = state.saleCart.reduce((sum, item) => sum + (Number(item.discount) || 0) * item.quantity, 0);
  const total = Math.max(0, subtotal - discounts);
  const change = Math.max(0, Number(state.saleReceived || 0) - total);
  const commission = total * ((seller?.commissionRate || 3) / 100);
  return `${pageHeader('Operação', 'Vendas e nova OS', 'Venda rápida de peças e serviços, com ou sem abertura de OS.', '<button class="button button-ghost" data-action="new-client">'+icon('plus')+' Novo cliente</button>')}<section class="sale-context panel"><div><span class="eyebrow">Atendimento</span><div class="context-selects"><select class="select-control" id="sale-client">${state.clients.map((item) => `<option value="${item.id}" ${item.id === client.id ? 'selected' : ''}>${esc(item.name)} • ${esc(item.type || 'PF')}</option>`).join('')}</select><select class="select-control" id="sale-vehicle">${client.vehicles.map((item) => `<option value="${item.id}" ${item.id === vehicle.id ? 'selected' : ''}>${esc(item.plate)} • ${esc(item.brand)} ${esc(item.model)}</option>`).join('')}</select><select class="select-control" id="sale-mechanic">${mechanicOptions(state.saleMechanicId)}</select><select class="select-control" id="sale-seller">${state.users.map((item) => `<option value="${item.id}" ${item.id === seller?.id ? 'selected' : ''}>Vendedor: ${esc(item.name)}</option>`).join('')}</select></div><p class="context-detail">CPF/CNPJ ${esc(client.cpf)} • ${esc(client.email)} • Comissão prevista: ${money(commission)}</p></div><button class="text-link" data-view="customers">Ver cadastro completo →</button></section><section class="sale-grid"><article class="panel catalog-panel">${panelHeader('Catálogo rápido de produtos e serviços', 'Pesquisa, estoque, preço e marca para vender sem abrir OS.')}<label class="search-box sale-search"><span class="search-icon" data-icon="search"></span><input id="sale-search" type="search" value="${esc(state.saleSearch)}" placeholder="Buscar produto, marca, código ou serviço..." autocomplete="off" /></label><div class="catalog-list">${results.map((item) => `<div class="catalog-item">${item.photo ? `<img class="catalog-product-photo" src="${item.photo}" alt="${esc(item.name)}" />` : `<div class="catalog-item-icon ${item.kind === 'product' ? 'cyan' : 'orange'}">${icon(item.kind === 'product' ? 'box' : 'wrench')}</div>`}<div class="catalog-item-copy"><strong>${esc(item.name)}</strong><span>${esc(item.code)} • ${esc(item.brand || item.category || 'Serviço')}${item.unit ? ` • ${esc(item.unit)}` : ''}${item.kind === 'product' ? ` • estoque: ${item.stock}` : ''}</span></div><b>${money(item.price)}</b><button class="button button-ghost compact-button" data-add-sale="${esc(item.id)}">Adicionar</button></div>`).join('') || '<div class="empty-state"><h3>Nenhum resultado</h3><p>Altere os termos da busca para localizar um item.</p></div>'}</div></article><article class="panel sale-cart-panel">${panelHeader('Carrinho da venda', `${state.saleCart.length} itens adicionados.`)}<div class="sale-cart">${state.saleCart.length ? state.saleCart.map((item) => `<div class="cart-item"><div><strong>${esc(item.name)}</strong><span>${esc(item.code)} • ${item.quantity} ${esc(item.unit || 'serviço')}</span><label class="discount-inline">Desconto por item <input type="number" min="0" step="0.01" value="${item.discount || 0}" data-sale-discount="${esc(item.id)}" /></label></div><b>${money(Math.max(0, item.price - (item.discount || 0)) * item.quantity)}</b><button class="action-dots" data-remove-sale="${esc(item.id)}">×</button></div>`).join('') : '<div class="cart-empty">Adicione serviços ou produtos do catálogo para montar a venda.</div>'}</div><div class="sale-summary"><div><span>Subtotal</span><b>${money(subtotal)}</b></div><div><span>Descontos</span><b class="discount-value">- ${money(discounts)}</b></div><div class="cart-total"><span>Total</span><strong>${money(total)}</strong></div><label class="field"><span>Valor recebido</span><input id="sale-received" type="number" min="0" step="0.01" value="${state.saleReceived || ''}" placeholder="0,00" /></label><label class="field"><span>Forma de pagamento</span><select id="sale-payment-method"><option ${state.salePaymentMethod === 'PIX' ? 'selected' : ''}>PIX</option><option ${state.salePaymentMethod === 'Dinheiro' ? 'selected' : ''}>Dinheiro</option><option ${state.salePaymentMethod === 'Cartão' ? 'selected' : ''}>Cartão</option><option ${state.salePaymentMethod === 'Boleto' ? 'selected' : ''}>Boleto</option></select></label><label class="field"><span>Parcelas</span><input id="sale-installments" type="number" min="1" max="48" step="1" value="${state.saleInstallments || 1}" /></label><div class="change-line"><span>Troco</span><strong>${money(change)}</strong></div><div class="change-line"><span>Comissão do vendedor</span><strong>${money(commission)}</strong></div></div><div class="sale-actions"><button class="button button-ghost" data-action="finalize-sale" ${state.saleCart.length ? '' : 'disabled'}>Finalizar venda direta</button><button class="button button-primary" data-action="generate-os" ${state.saleCart.length ? '' : 'disabled'}>${icon('clipboard')} Gerar OS</button></div></article></section>`;
}
function renderInventory() {
  const categories = [...new Set(state.inventory.map((item) => item.category))];
  const filtered = state.inventory.filter((item) => { const low = item.stock <= item.min; return matches(item) && (state.inventoryCategory === 'all' || item.category === state.inventoryCategory) && (state.inventoryStatus === 'all' || (state.inventoryStatus === 'low' ? low : !low)); });
  const lowStock = state.inventory.filter((item) => item.stock <= item.min).length;
  const totalUnits = state.inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = state.inventory.reduce((sum, item) => sum + item.stock * item.cost, 0);
  return `${pageHeader('Operação', 'Estoque e peças', 'Controle completo de cadastro, inventário, movimentações e reposição.', '<button class="button button-ghost" data-action="import-xml">'+icon('receipt')+' Importar XML</button><button class="button button-ghost" data-action="show-toast">'+icon('users')+' Fornecedores</button><button class="button button-ghost" data-action="inventory-report">'+icon('chart')+' Relatório</button><button class="button button-primary" data-action="new-stock">'+icon('plus')+' Cadastrar item</button>')}<section class="kpi-grid"><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon amber">${icon('alert')}</span><span class="kpi-change down">atenção</span></div><strong class="kpi-value">${String(lowStock).padStart(2, '0')}</strong><span class="kpi-label">Itens abaixo do mínimo</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon cyan">${icon('box')}</span><span class="kpi-change">+18 hoje</span></div><strong class="kpi-value">${totalUnits}</strong><span class="kpi-label">Unidades em estoque</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon green">${icon('trend')}</span><span class="kpi-change">custo atual</span></div><strong class="kpi-value">${money(totalValue)}</strong><span class="kpi-label">Valor de custo armazenado</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon orange">${icon('receipt')}</span><span class="kpi-change">este mês</span></div><strong class="kpi-value">R$ 8,6k</strong><span class="kpi-label">Consumo em ordens</span></article></section><section class="filter-bar"><div class="filter-group"><span class="filter-label">Categoria:</span><select class="select-control" id="inventory-category"><option value="all">Todas as categorias</option>${categories.map((category) => `<option value="${esc(category)}" ${state.inventoryCategory === category ? 'selected' : ''}>${esc(category)}</option>`).join('')}</select><span class="filter-label">Situação:</span><select class="select-control" id="inventory-status"><option value="all" ${state.inventoryStatus === 'all' ? 'selected' : ''}>Todos</option><option value="low" ${state.inventoryStatus === 'low' ? 'selected' : ''}>Reposição necessária</option><option value="normal" ${state.inventoryStatus === 'normal' ? 'selected' : ''}>Estoque normal</option></select></div><span class="filter-label">${filtered.length} itens exibidos • ${state.units.length} unidades disponíveis</span></section><section class="panel table-panel" style="margin-top:0">${panelHeader('Inventário de peças e materiais', 'Controle por unidade, localização, estoque mínimo e máximo.', '<button class="text-link" data-action="inventory-adjust">Ajustar inventário →</button>')}<div class="table-wrap"><table><thead><tr><th>Item / código</th><th>Categoria</th><th>Saldo</th><th>Unidade</th><th>Localização</th><th>Reposição</th><th>Custo unit.</th><th>Situação</th><th></th></tr></thead><tbody>${filtered.length ? filtered.map((item) => `<tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('box')}</span><div>${esc(item.name)}<span class="cell-secondary">${esc(item.code)} • ${esc(item.brand || 'Marca não informada')} • ${esc(item.supplier)}</span></div></div></td><td>${esc(item.category)}</td><td><strong style="color:${item.stock <= item.min ? 'var(--red)' : 'var(--slate-300)'}">${item.stock}</strong><span class="cell-secondary">máx. ${item.max}</span></td><td><span class="permission-chip">${esc(item.unit)}</span></td><td>${esc(item.location)}</td><td>${item.min} ${esc(item.unit)}</td><td>${money(item.cost)}</td><td>${item.stock <= item.min ? statusPill('late', 'Repor') : statusPill('done', 'Normal')}</td><td><button class="action-dots" data-action="show-toast">•••</button></td></tr>`).join('') : `<tr><td colspan="9"><div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>Nenhum item encontrado</h3><p>Ajuste os filtros ou cadastre uma nova peça.</p></div></td></tr>`}</tbody></table></div></section><section class="dashboard-grid"><article class="panel">${panelHeader('Unidades cadastradas', 'Use a unidade correta para cada tipo de material.', '<button class="text-link" data-action="new-unit">Cadastrar unidade →</button>')}<div class="permission-list">${state.units.map((unit) => `<span class="permission-chip">${esc(unit)}</span>`).join('')}</div></article><article class="panel">${panelHeader('Resumo de movimentações', 'Últimas entradas e saídas registradas.')}<div class="timeline"><div class="timeline-item"><span class="timeline-time">Hoje</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrada • Óleo 5W30</strong><span>+20 un. • NF 003842 • LubriMax</span></div></div><div class="timeline-item"><span class="timeline-time">Ontem</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Saída • Filtro de óleo</strong><span>-4 pc • OS-0248 • Toyota Corolla</span></div></div></div></article><section class="panel table-panel supplier-panel">${panelHeader('Fornecedores cadastrados', 'Parceiros e origens das peças e materiais.', '<button class="text-link" data-action="new-supplier">Novo fornecedor →</button>')}<div class="table-wrap"><table><thead><tr><th>Fornecedor</th><th>Documento</th><th>Telefone</th><th>Categoria</th></tr></thead><tbody>${state.suppliers.map((supplier) => `<tr><td><div class="cell-primary"><span class="user-row-avatar">${initials(supplier.name)}</span><div>${esc(supplier.name)}</div></div></td><td>${esc(supplier.document)}</td><td>${esc(supplier.phone)}</td><td><span class="permission-chip">${esc(supplier.category)}</span></td></tr>`).join('')}</tbody></table></div></section></section>`;
}

function renderServices() {
  const catalogView = `<section class="module-grid">${serviceCatalog.map((service) => `<article class="module-card"><span class="module-icon ${service.id === 'svc-1' ? 'cyan' : service.id === 'svc-2' ? 'orange' : service.id === 'svc-3' ? 'amber' : 'green'}">${icon(service.id === 'svc-4' ? 'scan' : service.id === 'svc-3' ? 'settings' : service.id === 'svc-1' ? 'car' : 'wrench')}</span><h3>${esc(service.name)}</h3><p>${esc(service.description || 'Serviço padronizado para orçamento e ordem de serviço.')}</p><div class="metric-inline"><b>${money(service.price)}</b><span>${esc(service.duration || 'sob consulta')}</span></div><small class="service-code">${esc(service.code)} • ${esc(service.category)}</small></article>`).join('')}</section>`;
  const formView = `<section class="panel service-form-panel"><div class="form-section-title"><span>Novo serviço</span><small>Cadastre o serviço que ficará disponível no catálogo e nas vendas.</small></div><form id="new-service-form"><div class="form-grid"><label class="field field-span-2"><span>Nome do serviço</span><input name="name" required placeholder="Ex.: Higienização completa do ar-condicionado" /></label><label class="field"><span>Código</span><input name="code" required placeholder="SRV-005" /></label><label class="field"><span>Categoria</span><input name="category" required placeholder="Ex.: Higienização" /></label><label class="field"><span>Preço de venda</span><input name="price" type="number" min="0" step="0.01" required placeholder="0,00" /></label><label class="field"><span>Duração estimada</span><input name="duration" required placeholder="Ex.: 2h30" /></label><label class="field field-span-2"><span>Descrição</span><textarea name="description" rows="4" required placeholder="Explique o que está incluído no serviço."></textarea></label></div><div class="modal-footer"><button type="button" class="button button-ghost" data-service-tab="catalog">Cancelar</button><button type="submit" class="button button-primary">${icon('check')} Salvar serviço</button></div></form></section>`;
  return `${pageHeader('Operação', 'Serviços e preços', 'Catálogo padronizado para orçamentos mais rápidos.', '<button class="button button-primary" data-action="new-service">'+icon('plus')+' Novo serviço</button>')}<div class="service-tabs"><button class="service-tab ${state.servicesTab === 'catalog' ? 'active' : ''}" data-service-tab="catalog">${icon('wrench')} Catálogo de serviços <span>${serviceCatalog.length}</span></button><button class="service-tab ${state.servicesTab === 'new' ? 'active' : ''}" data-service-tab="new">${icon('plus')} Cadastrar novo serviço</button></div>${state.servicesTab === 'catalog' ? catalogView : formView}`;
}

function renderSchedule() { return `${pageHeader('Operação', 'Agendamentos', 'Organize baias, técnicos e horários de entrega.', '<button class="button button-primary" data-action="show-toast">'+icon('plus')+' Novo agendamento</button>')}<section class="split-layout"><div class="panel" style="min-height:380px">${panelHeader('Quarta-feira, 05 de novembro', 'Agenda de baias e compromissos da equipe.', '<span class="status-pill progress">Hoje</span>')}<div class="timeline"><div class="timeline-item"><span class="timeline-time">08:00</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrada • Revisão preventiva</strong><span>RZD-4H81 • Marcos Almeida • Baia 01 • João Mendes</span></div></div><div class="timeline-item"><span class="timeline-time">09:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Diagnóstico eletrônico</strong><span>QWE-3D17 • André Carvalho • Baia 03 • Bruno Santos</span></div></div><div class="timeline-item"><span class="timeline-time">11:00</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Troca de óleo e filtros</strong><span>MNO-1A09 • Eduardo Lima • Baia 02 • Lucas Ferreira</span></div></div><div class="timeline-item"><span class="timeline-time">16:30</span><i class="timeline-marker"></i><div class="timeline-copy"><strong>Entrega prevista • OS-0248</strong><span>RZD-4H81 • Marcos Almeida • Recepção</span></div></div></div></div><div class="card-list"><article class="panel">${panelHeader('Baias disponíveis')}<div class="progress-list"><div class="progress-line"><span>Baia 01</span><div class="progress-track"><div class="progress-fill" style="width:90%"></div></div><b>ocupada</b></div><div class="progress-line"><span>Baia 02</span><div class="progress-track"><div class="progress-fill amber" style="width:55%"></div></div><b>livre 13h</b></div><div class="progress-line"><span>Baia 03</span><div class="progress-track"><div class="progress-fill cyan" style="width:75%"></div></div><b>ocupada</b></div></div></article></div></section>`; }

function renderDiagnostics() { return `${pageHeader('Gestão', 'Diagnóstico', 'Transforme sintomas em decisões técnicas rastreáveis.', '<button class="button button-primary" data-action="show-toast">'+icon('plus')+' Iniciar diagnóstico</button>')}<section class="module-grid"><article class="module-card"><span class="module-icon cyan">${icon('scan')}</span><h3>Fila de diagnósticos</h3><p>Veículos aguardando avaliação técnica.</p><div class="metric-inline"><b>03</b><span>na fila</span></div></article><article class="module-card"><span class="module-icon amber">${icon('alert')}</span><h3>Itens reprovados</h3><p>Recomendações aguardando aprovação do cliente.</p><div class="metric-inline"><b>07</b><span>pendências</span></div></article><article class="module-card"><span class="module-icon green">${icon('check')}</span><h3>Laudos concluídos</h3><p>Diagnósticos fechados nos últimos 30 dias.</p><div class="metric-inline"><b>42</b><span>laudos</span></div></article></section><section class="panel table-panel">${panelHeader('Últimos diagnósticos', 'Histórico de avaliações técnicas.')}<div class="table-wrap"><table><thead><tr><th>Veículo</th><th>Sintoma informado</th><th>Técnico</th><th>Resultado</th><th>Data</th></tr></thead><tbody><tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>QWE-3D17<span class="cell-secondary">Jeep Renegade 2019</span></div></div></td><td>Luz da injeção acesa</td><td>Bruno Santos</td><td>${statusPill('done', 'Laudo pronto')}</td><td>Hoje, 09:42</td></tr><tr><td><div class="cell-primary"><span class="vehicle-symbol">${icon('car')}</span><div>FTR-8C44<span class="cell-secondary">Volkswagen T-Cross 2021</span></div></div></td><td>Ruído na suspensão</td><td>João Mendes</td><td>${statusPill('waiting', 'Aguardando aprovação')}</td><td>Ontem, 16:20</td></tr></tbody></table></div></section>`; }

function financePill(status) { const labels = { pending: 'Pendente', partial: 'Parcial', paid: 'Pago', late: 'Atrasado' }; return statusPill(status === 'paid' ? 'done' : status === 'late' ? 'late' : 'waiting', labels[status] || status); }
function financeDate(value) { return value ? new Date(`${String(value).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR') : '—'; }
function renderFinance() {
  const summary = state.financeSummary || { register: null, receivable_total: 0, receivable_count: 0, payable_total: 0, payable_count: 0, today_entries: 0, today_exits: 0, today_result: 0 };
  const data = state.financeData || { transactions: [], receivables: [], payables: [], movements: [], commissions: [] };
  const tabs = `<div class="finance-tabs"><button class="finance-tab ${state.financeTab === 'cash' ? 'active' : ''}" data-finance-tab="cash">${icon('wallet')} Caixa</button><button class="finance-tab ${state.financeTab === 'receivable' ? 'active' : ''}" data-finance-tab="receivable">${icon('arrow')} A receber</button><button class="finance-tab ${state.financeTab === 'payable' ? 'active' : ''}" data-finance-tab="payable">${icon('receipt')} A pagar</button><button class="finance-tab ${state.financeTab === 'expenses' ? 'active' : ''}" data-finance-tab="expenses">${icon('chart')} Despesas e comissões</button></div>`;
  const kpis = `<section class="kpi-grid"><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon green">${icon('wallet')}</span><span class="kpi-change">${summary.register ? 'aberto' : 'fechado'}</span></div><strong class="kpi-value">${money(summary.register?.current_balance || 0)}</strong><span class="kpi-label">Saldo atual do caixa</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon cyan">${icon('arrow')}</span><span class="kpi-change">hoje</span></div><strong class="kpi-value">${money(summary.today_entries)}</strong><span class="kpi-label">Entradas do dia</span></article><article class="kpi-card"><div class="kpi-top"><span class="kpi-icon red">${icon('alert')}</span><span class="kpi-change down">${summary.payable_count} contas</span></div><strong class="kpi-value">${money(summary.payable_total)}</strong><span class="kpi-label">Compromissos em aberto</span></article></section>`;
  const cashForm = summary.register ? `<form id="cash-movement-form" class="inline-finance-form"><input name="description" required placeholder="Descrição da movimentação" /><select name="kind"><option value="entry">Entrada</option><option value="supply">Suprimento</option><option value="bleed">Sangria</option><option value="withdrawal">Saída</option></select><select name="paymentMethod"><option>Dinheiro</option><option>PIX</option><option>Cartão</option><option>Transferência</option></select><input name="amount" type="number" min="0.01" step="0.01" required placeholder="Valor" /><button class="button button-primary" type="submit">Registrar</button></form><button class="button button-ghost" data-action="finance-close-cash">Fechar caixa</button>` : `<form id="cash-open-form" class="inline-finance-form"><input name="openingBalance" type="number" min="0" step="0.01" required placeholder="Saldo inicial" /><input name="notes" placeholder="Observação opcional" /><button class="button button-primary" type="submit">Abrir caixa</button></form>`;
  const cash = `${kpis}<section class="dashboard-grid"><article class="panel">${panelHeader('Controle de caixa', summary.register ? 'Caixa aberto e pronto para movimentações.' : 'Nenhum caixa aberto no momento.')}${cashForm}</article><article class="panel">${panelHeader('Resumo do dia', 'Valores calculados a partir do caixa local.')}<div class="progress-list"><div class="progress-line"><span>Entradas</span><b>${money(summary.today_entries)}</b></div><div class="progress-line"><span>Saídas</span><b>${money(summary.today_exits)}</b></div><div class="progress-line"><span>Resultado</span><b>${money(summary.today_result)}</b></div></div></article></section><section class="panel table-panel">${panelHeader('Movimentações recentes', `${data.movements.length} registros`)}<div class="table-wrap"><table><thead><tr><th>Descrição</th><th>Tipo</th><th>Forma</th><th>Valor</th><th>Data</th></tr></thead><tbody>${data.movements.length ? data.movements.map((item) => `<tr><td>${esc(item.description)}</td><td>${esc(item.kind)}</td><td>${esc(item.payment_method || '—')}</td><td>${money(item.amount)}</td><td>${financeDate(item.created_at)}</td></tr>`).join('') : '<tr><td colspan="5">Nenhuma movimentação registrada.</td></tr>'}</tbody></table></div></section>`;
  const accountForm = (type) => `<form id="finance-account-form" data-account-type="${type}" class="inline-finance-form"><input name="description" required placeholder="Descrição" /><input name="${type === 'receivable' ? 'customer' : 'supplier'}" placeholder="${type === 'receivable' ? 'Cliente' : 'Fornecedor'}" /><input name="amount" type="number" min="0.01" step="0.01" required placeholder="Valor" /><input name="dueDate" type="date" required /><select name="paymentMethod"><option>PIX</option><option>Dinheiro</option><option>Cartão</option><option>Boleto</option><option>Transferência</option></select><button class="button button-primary" type="submit">Cadastrar</button></form>`;
  const accountsTable = (items, kind) => `<section class="panel table-panel">${panelHeader(kind === 'receivable' ? 'Contas a receber' : 'Contas a pagar', `${items.length} registros`)}<div class="table-wrap"><table><thead><tr><th>${kind === 'receivable' ? 'Cliente' : 'Fornecedor'}</th><th>Descrição</th><th>Vencimento</th><th>Valor</th><th>Status</th><th></th></tr></thead><tbody>${items.length ? items.map((item) => `<tr><td>${esc(item[kind === 'receivable' ? 'customer' : 'supplier'] || '—')}</td><td>${esc(item.description)}</td><td>${financeDate(item.due_date)}</td><td>${money(item.amount - (item.paid_amount || 0))}</td><td>${financePill(item.status)}</td><td>${item.status !== 'paid' ? `<button class="button button-ghost compact-button" data-finance-settle="${esc(item.id)}" data-finance-kind="${kind}">Baixar</button>` : ''}</td></tr>`).join('') : `<tr><td colspan="6">Nenhuma conta cadastrada.</td></tr>`}</tbody></table></div></section>`;
  const receivable = `${kpis}<section class="panel">${panelHeader('Nova conta a receber', 'Registre parcelas, vendas ou outros valores futuros.')}${accountForm('receivable')}</section>${accountsTable(data.receivables, 'receivable')}`;
  const payable = `${kpis}<section class="panel">${panelHeader('Nova conta a pagar', 'Registre fornecedores, despesas e compromissos futuros.')}${accountForm('payable')}</section>${accountsTable(data.payables, 'payable')}`;
  const transactionForm = `<form id="finance-transaction-form" class="inline-finance-form"><select name="kind"><option value="expense">Despesa</option><option value="income">Receita</option></select><input name="category" required placeholder="Categoria" /><input name="description" required placeholder="Descrição" /><input name="amount" type="number" min="0.01" step="0.01" required placeholder="Valor" /><select name="status"><option value="pending">Pendente</option><option value="paid">Pago</option></select><button class="button button-primary" type="submit">Lançar</button></form>`;
  const expenses = `<section class="panel">${panelHeader('Novo lançamento', 'Receita ou despesa manual com auditoria local.')}${transactionForm}</section><section class="panel table-panel">${panelHeader('Lançamentos recentes', `${data.transactions.length} registros`)}<div class="table-wrap"><table><thead><tr><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Valor</th><th>Status</th><th></th></tr></thead><tbody>${data.transactions.length ? data.transactions.map((item) => `<tr><td>${item.kind === 'income' ? 'Receita' : 'Despesa'}</td><td>${esc(item.category)}</td><td>${esc(item.description)}</td><td>${money(item.amount)}</td><td>${financePill(item.status)}</td><td>${item.sale_id && item.status !== 'cancelled' ? `<button class="button button-ghost compact-button" data-cancel-sale="${esc(item.sale_id)}">Reverter venda</button>` : ''}</td></tr>`).join('') : '<tr><td colspan="6">Nenhum lançamento manual.</td></tr>'}</tbody></table></div></section><section class="panel table-panel">${panelHeader('Comissões', 'Comissões registradas por vendas concluídas.')}<div class="table-wrap"><table><thead><tr><th>Vendedor</th><th>Base</th><th>Percentual</th><th>Valor</th><th>Status</th></tr></thead><tbody>${data.commissions.length ? data.commissions.map((item) => `<tr><td>${esc(item.seller_name || '—')}</td><td>${money(item.base_amount)}</td><td>${item.rate}%</td><td>${money(item.amount)}</td><td>${financePill(item.status)}</td></tr>`).join('') : '<tr><td colspan="5">Nenhuma comissão registrada.</td></tr>'}</tbody></table></div></section>`;
  const content = state.financeTab === 'cash' ? cash : state.financeTab === 'receivable' ? receivable : state.financeTab === 'payable' ? payable : expenses;
  return `${pageHeader('Gestão', 'Financeiro', 'Caixa, contas, despesas, faturamento e comissões em um só lugar.')} ${tabs}${content}`;
}
function renderReports() {
  return `${pageHeader('Gestão', 'Relatórios estratégicos', 'Decisões baseadas em números: vendas, serviços, caixa e estoque.', '<button class="button button-primary" data-action="show-toast">'+icon('chart')+' Exportar relatório</button>')}<section class="report-grid"><article class="report-card"><span class="module-icon orange">${icon('trend')}</span><h3>Vendas por período</h3><strong>${money(18420)}</strong><p>Faturamento acumulado no mês</p><button class="text-link" data-action="show-toast">Abrir relatório →</button></article><article class="report-card"><span class="module-icon cyan">${icon('wrench')}</span><h3>Serviços prestados</h3><strong>86 OS</strong><p>Revisões e manutenções concluídas</p><button class="text-link" data-action="show-toast">Detalhar serviços →</button></article><article class="report-card"><span class="module-icon amber">${icon('box')}</span><h3>Curva ABC de produtos</h3><strong>72% classe A</strong><p>Valor concentrado nos itens críticos</p><button class="text-link" data-action="show-toast">Ver curva ABC →</button></article></section><section class="dashboard-grid"><article class="panel">${panelHeader('Fluxo de caixa', 'Entradas e saídas por semana.')}<div class="progress-list"><div class="progress-line"><span>Entradas</span><div class="progress-track"><div class="progress-fill green" style="width:86%"></div></div><b>R$ 18,4k</b></div><div class="progress-line"><span>Saídas</span><div class="progress-track"><div class="progress-fill amber" style="width:44%"></div></div><b>R$ 9,1k</b></div><div class="progress-line"><span>Resultado líquido</span><div class="progress-track"><div class="progress-fill cyan" style="width:68%"></div></div><b>R$ 9,3k</b></div></div></article><article class="panel">${panelHeader('Aniversariantes', 'Ações de relacionamento com clientes.')}<div class="alert-list"><div class="alert-item"><div class="user-avatar">MA</div><div class="alert-copy"><strong>Marcos Almeida</strong><span>Aniversário em 18/04 • enviar mensagem</span></div><button class="text-link" data-action="show-toast">Ação</button></div><div class="alert-item"><div class="user-avatar">CR</div><div class="alert-copy"><strong>Camila Rocha</strong><span>Aniversário em 02/09 • enviar mensagem</span></div><button class="text-link" data-action="show-toast">Ação</button></div></div></article></section><section class="panel table-panel">${panelHeader('Relatório de estoque', 'Itens, custo, venda e classificação de giro.')}<div class="table-wrap"><table><thead><tr><th>Produto</th><th>Marca</th><th>Estoque</th><th>Custo</th><th>Venda</th><th>Classe ABC</th></tr></thead><tbody>${state.inventory.slice(0, 6).map((item, index) => `<tr><td>${esc(item.name)}<span class="cell-secondary">${esc(item.code)}</span></td><td>${esc(item.brand || 'Não informada')}</td><td>${item.stock} ${esc(item.unit)}</td><td>${money(item.cost)}</td><td>${money(item.price)}</td><td><span class="permission-chip ${index < 2 ? 'admin' : ''}">Classe ${index < 2 ? 'A' : index < 4 ? 'B' : 'C'}</span></td></tr>`).join('')}</tbody></table></div></section>`;
}
function renderSettings() {
  const tabs = `<div class="settings-tabs"><button class="settings-tab ${state.settingsTab === 'company' ? 'active' : ''}" data-settings-tab="company">${icon('settings')} Empresa</button><button class="settings-tab ${state.settingsTab === 'users' ? 'active' : ''}" data-settings-tab="users">${icon('users')} Usuários e permissões</button><button class="settings-tab ${state.settingsTab === 'mechanics' ? 'active' : ''}" data-settings-tab="mechanics">${icon('wrench')} Mecânicos</button><button class="settings-tab ${state.settingsTab === 'data' ? 'active' : ''}" data-settings-tab="data">${icon('database')} Dados e backup</button></div>`;
  const company = `<section class="panel settings-form-panel"><div class="settings-panel-heading"><div><span class="eyebrow">Cadastro da empresa</span><h2>Dados da prestadora</h2><p>Estas informações serão usadas nas OS, orçamentos e relatórios.</p></div><span class="status-pill ${state.company.legalName ? 'done' : 'waiting'}">${state.company.legalName ? 'Cadastro preenchido' : 'Configuração inicial'}</span></div><form id="company-form"><div class="form-grid"><label class="field field-span-2"><span>Razão social</span><input name="legalName" required value="${esc(state.company.legalName)}" /></label><label class="field"><span>Nome fantasia</span><input name="tradeName" required value="${esc(state.company.tradeName)}" /></label><label class="field"><span>CPF / CNPJ</span><input name="document" required value="${esc(state.company.document)}" /></label><label class="field"><span>Telefone</span><input name="phone" required value="${esc(state.company.phone)}" /></label><label class="field"><span>E-mail</span><input name="email" type="email" required value="${esc(state.company.email)}" /></label><label class="field field-span-2"><span>Endereço completo</span><input name="address" required value="${esc(state.company.address)}" /></label><label class="field"><span>Cidade</span><input name="city" required value="${esc(state.company.city)}" /></label><label class="field"><span>UF</span><input name="state" required maxlength="2" value="${esc(state.company.state)}" /></label><label class="field"><span>CEP</span><input name="zip" required value="${esc(state.company.zip)}" /></label><label class="field"><span>Regime tributário</span><select name="taxRegime"><option ${state.company.taxRegime === 'Simples Nacional' ? 'selected' : ''}>Simples Nacional</option><option ${state.company.taxRegime === 'Lucro Presumido' ? 'selected' : ''}>Lucro Presumido</option><option ${state.company.taxRegime === 'Lucro Real' ? 'selected' : ''}>Lucro Real</option><option ${state.company.taxRegime === 'MEI' ? 'selected' : ''}>MEI</option></select></label></div><div class="company-output-preview"><span class="eyebrow">Cabeçalho dos documentos</span><strong>${esc(state.company.tradeName || 'Nome da empresa')}</strong><small>${esc(state.company.legalName || 'Razão social')} • ${esc(state.company.document || 'CNPJ')} • ${esc(state.company.phone || 'Telefone')}</small><small>${esc(state.company.address || 'Endereço')}</small></div><div class="modal-footer"><button type="submit" class="button button-primary">${icon('check')} Salvar dados da empresa</button></div></form></section>`;
  const users = `<section class="panel table-panel" style="margin-top:0">${panelHeader('Acessos da equipe', 'Cada login possui permissões próprias dentro do mesmo sistema.', '<button class="button button-primary" data-action="new-user">'+icon('plus')+' Novo login</button>')}<div class="table-wrap"><table><thead><tr><th>Usuário</th><th>Login</th><th>Perfil</th><th>Módulos liberados</th><th>Status</th></tr></thead><tbody>${state.users.map((user) => `<tr><td><div class="cell-primary"><span class="user-row-avatar">${initials(user.name)}</span><div>${esc(user.name)}<span class="cell-secondary">ID ${String(user.id).padStart(3, '0')}</span></div></div></td><td>${esc(user.login)}</td><td><span class="role-label">${esc(user.role)}<small>${user.admin ? 'Acesso administrativo total' : 'Permissões personalizadas'}</small></span></td><td><div class="permission-list">${user.admin ? '<span class="permission-chip admin">Todos os módulos</span>' : user.permissions.map((permission) => `<span class="permission-chip">${esc(permissionLabel(permission))}</span>`).join('')}</div></td><td>${statusPill('done', 'Ativo')}</td></tr>`).join('')}</tbody></table></div></section>`;
  const mechanics = `<section class="panel table-panel" style="margin-top:0">${panelHeader('Equipe mecânica', 'Marque quais usuários podem ser indicados como responsáveis técnicos nas OS.')}<div class="mechanic-list">${state.users.map((user) => `<div class="mechanic-row"><div class="cell-primary"><span class="user-row-avatar">${initials(user.name)}</span><div><strong>${esc(user.name)}</strong><span class="cell-secondary">${esc(user.role)} • ${esc(user.login)}</span></div></div><label class="mechanic-toggle"><input type="checkbox" data-toggle-mechanic="${user.id}" ${user.isMechanic ? 'checked' : ''} ${user.admin || !state.currentUser?.admin ? 'disabled' : ''} /><span>${user.isMechanic ? 'Mecânico habilitado' : 'Não é mecânico'}</span></label></div>`).join('')}</div><div class="access-note">${icon('wrench')}<span>Somente usuários marcados como mecânicos aparecerão na seleção de responsável das novas OS e vendas.</span></div></section>`;
  const data = `<section class="data-settings-grid"><article class="panel">${panelHeader('Importar e exportar dados', 'Formatos previstos para migração e backup local.')}<div class="data-actions"><button class="quick-action" data-action="export-sqlite">${icon('database')} Exportar banco SQLite <span>→</span></button><button class="quick-action" data-action="export-csv">${icon('receipt')} Exportar tabelas CSV <span>→</span></button><button class="quick-action" data-action="export-json">${icon('clipboard')} Exportar estrutura JSON <span>→</span></button><button class="quick-action" data-action="import-data">${icon('arrow')} Importar SQLite, CSV ou JSON <span>→</span></button><input id="import-data-file" type="file" accept=".sqlite,.db,.csv,.json,application/json,text/csv" hidden /></div><div class="access-note">${icon('database')}<span>O fluxo definitivo usará o banco SQLite local. CSV e JSON ficam disponíveis para intercâmbio de tabelas e migração.</span></div></article><article class="panel danger-panel">${panelHeader('Limpeza completa do sistema', 'Apaga os dados operacionais para iniciar um novo cadastro.')}<p>Remove clientes, veículos, ordens, estoque, serviços cadastrados e usuários não administradores. O login administrador permanece para permitir a configuração inicial.</p><button class="button button-danger" data-action="clear-data">${icon('alert')} Limpar todos os dados</button></article></section>`;
  const content = state.settingsTab === 'company' ? company : state.settingsTab === 'users' ? users : state.settingsTab === 'mechanics' ? mechanics : data;
  return `${pageHeader('Sistema', 'Configurações', 'Cadastre a empresa, controle mecânicos e administre os dados locais.')} ${tabs}${content}`;
}
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
  queuePersist();
  if (state.view === 'finance' && backendOnline && !state.financeSummary) loadFinanceData();
}

function printOrder(id) {
  const order = state.orders.find((item) => item.id === id); if (!order) return;
  const company = state.company;
  const printRoot = document.getElementById('print-root');
  printRoot.innerHTML = `<div class="print-document"><header class="print-header"><div><div class="print-brand">Auto<span>Car</span></div><div class="print-brand-subtitle">SISTEMA INTEGRADO</div></div><div class="print-company"><strong>${esc(company.tradeName || 'Empresa prestadora')}</strong><span>${esc(company.legalName || '')}</span><span>${esc(company.document || '')} • ${esc(company.phone || '')}</span><span>${esc(company.address || '')}</span></div></header><div class="print-title-row"><div><span class="print-eyebrow">Documento de atendimento</span><h1>Ordem de Serviço</h1></div><strong class="print-number">${esc(order.id)}</strong></div><section class="print-meta-grid"><div><span>Cliente</span><strong>${esc(order.customer)}</strong></div><div><span>Veículo</span><strong>${esc(order.vehicle)}</strong></div><div><span>Placa</span><strong>${esc(order.plate)}</strong></div><div><span>Mecânico responsável</span><strong>${esc(order.technician || 'Não definido')}</strong></div><div><span>Status</span><strong>${esc(order.statusLabel)}</strong></div><div><span>Previsão de entrega</span><strong>${esc(order.delivery)}</strong></div></section><section class="print-services"><div class="print-section-heading"><h2>Serviços e itens</h2><span>Descrição do atendimento</span></div><table><thead><tr><th>Descrição</th><th>Responsável</th><th class="print-align-right">Valor</th></tr></thead><tbody><tr><td>${esc(order.service)}</td><td>${esc(order.technician || 'Não definido')}</td><td class="print-align-right">${money(order.total)}</td></tr></tbody></table><div class="print-total"><span>Total da OS</span><strong>${money(order.total)}</strong></div></section><section class="print-notes"><h2>Observações e autorização</h2><p>Declaro estar ciente dos serviços descritos nesta ordem e autorizo a execução conforme avaliação e aprovação da oficina.</p><div class="print-lines"><div>Assinatura do cliente</div><div>Data de aprovação</div></div></section><footer class="print-footer"><span>${esc(company.tradeName || 'Empresa prestadora')} • ${esc(company.document || '')}</span><span>Emitido em ${new Date().toLocaleDateString('pt-BR')}</span></footer></div>`;
  document.body.classList.add('is-printing'); printRoot.setAttribute('aria-hidden', 'false');
  const cleanup = () => { document.body.classList.remove('is-printing'); printRoot.setAttribute('aria-hidden', 'true'); printRoot.innerHTML = ''; window.removeEventListener('afterprint', cleanup); };
  window.addEventListener('afterprint', cleanup); window.print();
}
function showToast(message, type = 'success') { const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.innerHTML = `${icon(type === 'success' ? 'check' : 'alert')}<span>${esc(message)}</span>`; document.getElementById('toast-region').appendChild(toast); setTimeout(() => toast.remove(), 3400); }
function mechanicOptions(selected = '') { const mechanics = state.users.filter((user) => user.isMechanic); return `<option value="">Não definido</option>${mechanics.map((user) => `<option value="${user.id}" ${String(user.id) === String(selected) ? 'selected' : ''}>${esc(user.name)}</option>`).join('')}`; }
function openModal() { document.getElementById('order-mechanic').innerHTML = mechanicOptions(); const modal = document.getElementById('modal-backdrop'); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => modal.querySelector('input')?.focus(), 50); }
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
function addSaleItem(id) { const item = catalogItemById(id); if (!item) return; const existing = state.saleCart.find((entry) => entry.id === id); if (existing) existing.quantity += 1; else state.saleCart.push({ ...item, quantity: 1, discount: 0 }); renderView(); showToast(`${item.name} adicionado à venda.`); }
async function finalizeDirectSale() {
  if (!state.saleCart.length) return;
  const total = state.saleCart.reduce((sum, item) => sum + Math.max(0, item.price - (item.discount || 0)) * item.quantity, 0);
  const seller = state.users.find((user) => user.id === Number(state.saleSellerId)) || state.currentUser;
  try {
    if (backendOnline) await financeRequest('/finance/sales', { method: 'POST', body: { saleType: 'direct', clientId: state.saleClientId, customer: state.clients.find((client) => client.id === Number(state.saleClientId))?.name, total, received: Number(state.saleReceived || 0), sellerId: seller?.id, mechanicId: state.saleMechanicId, commissionRate: seller?.commissionRate || 3, description: `Venda direta para ${state.clients.find((client) => client.id === Number(state.saleClientId))?.name || 'cliente'}`, dueDate: new Date().toISOString().slice(0, 10), paymentMethod: state.salePaymentMethod, installments: state.saleInstallments, items: state.saleCart.map((item) => ({ kind: item.kind, code: item.code, name: item.name, quantity: item.quantity, price: item.price, discount: item.discount || 0 })) } });
    state.saleCart = []; state.saleReceived = 0; renderView(); showToast(`Venda direta finalizada no valor de ${money(total)}.`);
  } catch (error) { showToast(error.message, 'error'); }
}
function removeSaleItem(id) { state.saleCart = state.saleCart.filter((item) => item.id !== id); renderView(); }
function generateOrderFromSale() { const client = state.clients.find((item) => item.id === Number(state.saleClientId)); const vehicle = client?.vehicles.find((item) => item.id === Number(state.saleVehicleId)); if (!client || !vehicle || !state.saleCart.length) { showToast('Selecione cliente, veículo e pelo menos um item.', 'error'); return; } const total = state.saleCart.reduce((sum, item) => sum + Math.max(0, item.price - (item.discount || 0)) * item.quantity, 0); const nextNumber = 249 + state.orders.length - 5; state.orders.unshift({ id: `OS-${String(nextNumber).padStart(4, '0')}`, customer: client.name, plate: vehicle.plate, vehicle: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`, service: state.saleCart.map((item) => `${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(', '), technician: state.users.find((user) => user.id === Number(state.saleMechanicId))?.name || 'A definir', status: 'waiting', statusLabel: 'Aguardando triagem', delivery: 'A definir', total }); state.saleCart = []; state.saleSearch = ''; state.view = 'orders'; renderView(); showToast(`OS criada para ${client.name}: venda de ${money(total)}.`); }
function registerUnit() { const unit = window.prompt('Informe a nova unidade. Ex.: lata, tubo ou frasco'); if (!unit) return; const normalized = unit.trim().toLowerCase(); if (!normalized || state.units.includes(normalized)) { showToast('Essa unidade já está cadastrada ou é inválida.', 'error'); return; } state.units.push(normalized); renderView(); showToast(`Unidade ${normalized} adicionada ao catálogo.`); }
function adjustInventory() { const code = window.prompt('Digite o código do item para ajustar o saldo'); if (!code) return; const item = state.inventory.find((entry) => entry.code.toLowerCase() === code.trim().toLowerCase()); if (!item) { showToast('Item não encontrado no inventário.', 'error'); return; } const quantity = window.prompt(`Novo saldo para ${item.name} (${item.unit})`, String(item.stock)); if (quantity === null || Number.isNaN(Number(quantity)) || Number(quantity) < 0) { showToast('Saldo inválido para o ajuste.', 'error'); return; } item.stock = Number(quantity); renderView(); showToast(`Inventário ajustado: ${item.name}.`); }
function registerSupplier() { const name = window.prompt('Nome do fornecedor'); if (!name) return; const document = window.prompt('CNPJ do fornecedor', '00.000.000/0001-00') || 'Não informado'; const phone = window.prompt('Telefone do fornecedor', '(00) 0000-0000') || 'Não informado'; const category = window.prompt('Categoria principal', 'Peças') || 'Geral'; state.suppliers.push({ id: Date.now(), name: name.trim(), document, phone, category }); renderView(); showToast(`Fornecedor ${name.trim()} cadastrado.`); }
function snapshotData() { return { company: state.company, users: state.users, clients: state.clients, orders: state.orders, inventory: state.inventory, services: serviceCatalog, units: state.units, suppliers: state.suppliers, sales: state.sales || [], financeEntries: state.financeEntries || [] }; }
function downloadData(filename, content, type) { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); }
function exportJson() { if (backendOnline) { apiRequest('/backup/json').then((data) => data instanceof Blob ? downloadData('autocar-backup.json', data, 'application/json') : null).catch(() => downloadData('autocar-backup.json', JSON.stringify(snapshotData(), null, 2), 'application/json')); } else downloadData('autocar-backup.json', JSON.stringify(snapshotData(), null, 2), 'application/json'); showToast('Backup JSON exportado.'); }
function exportCsv() { const rows = [['tipo', 'id', 'nome', 'codigo', 'categoria', 'quantidade', 'unidade', 'valor']]; state.inventory.forEach((item) => rows.push(['produto', '', item.name, item.code, item.category, item.stock, item.unit, item.price])); serviceCatalog.forEach((item) => rows.push(['servico', item.id, item.name, item.code, item.category, '', '', item.price])); const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(';')).join('\n'); downloadData('autocar-catalogo.csv', csv, 'text/csv;charset=utf-8'); showToast('Tabelas CSV exportadas.'); }
function exportSqlite() { if (!backendOnline) { showToast('Faça login com o backend local disponível para exportar o SQLite.', 'error'); return; } apiRequest('/backup/sqlite').then((blob) => { downloadData('autocar-backup.db', blob, 'application/vnd.sqlite3'); showToast('Banco SQLite exportado.'); }).catch((error) => showToast(error.message, 'error')); }
function importDataFile(file) { if (!file) return; const extension = file.name.split('.').pop().toLowerCase(); if ((extension === 'sqlite' || extension === 'db') && backendOnline) { file.arrayBuffer().then((buffer) => apiRequest('/backup/import', { method: 'POST', headers: { 'Content-Type': 'application/vnd.sqlite3' }, body: new Blob([buffer], { type: 'application/vnd.sqlite3' }) })).then((result) => { hydrateState(result.state); renderView(); showToast('Banco SQLite restaurado com sucesso.'); }).catch((error) => showToast(error.message, 'error')); return; } const reader = new FileReader(); reader.onload = () => { if (extension === 'json') { try { const data = JSON.parse(reader.result); if (backendOnline) apiRequest('/backup/import', { method: 'POST', body: data }).then((result) => { hydrateState(result.state); renderView(); showToast('Backup JSON restaurado.'); }).catch((error) => showToast(error.message, 'error')); else { hydrateState(data); renderView(); showToast('Backup JSON importado localmente.'); } } catch { showToast('JSON inválido ou incompatível.', 'error'); } } else { const rows = String(reader.result).trim().split(/\r?\n/).slice(1).map((line) => line.split(';').map((cell) => cell.replace(/^\"|\"$/g, '').replace(/\"\"/g, '\"'))); let imported = 0; rows.forEach((row) => { if (row[0] === 'produto' && row[2] && row[3]) { const existing = state.inventory.find((item) => item.code === row[3]); const item = { name: row[2], code: row[3], category: row[4] || 'Importados', stock: Number(row[5]) || 0, min: 0, max: Number(row[5]) || 0, unit: row[6] || 'un.', price: Number(row[7]) || 0, cost: 0, location: 'Importado', supplier: 'Importado' }; if (existing) Object.assign(existing, item); else state.inventory.push(item); imported += 1; } }); renderView(); showToast(`${imported} registros CSV importados.`); } }; reader.readAsText(file); }
function clearAllData() { if (!window.confirm('Esta ação apagará clientes, veículos, OS, estoque, serviços e usuários não administradores. Deseja continuar?')) return; if (backendOnline) { apiRequest('/admin/clear', { method: 'POST' }).then((result) => { hydrateState(result.state); state.currentUser = result.user || state.users.find((user) => user.admin); renderView(); showToast('Dados limpos no banco SQLite.'); }).catch((error) => showToast(error.message, 'error')); return; } const admin = state.users.find((user) => user.admin) || { id: 1, name: 'Administrador', login: 'admin@autocar.local', password: 'admin123', role: 'Administrador', admin: true, isMechanic: false, permissions: ['all'] }; state.users = [admin]; state.currentUser = admin; state.clients = []; state.orders = []; state.inventory = []; state.suppliers = []; state.units = ['un.', 'pc', 'jogo', 'par', 'kit', 'cx', 'm', 'cm', 'mm', 'ml', 'l', 'g', 'kg', 'rolo']; serviceCatalog.splice(0, serviceCatalog.length); state.company = { legalName: '', tradeName: '', document: '', phone: '', email: '', address: '', city: '', state: '', zip: '', taxRegime: 'Simples Nacional' }; state.settingsTab = 'company'; renderView(); showToast('Dados limpos. O sistema está pronto para um novo cadastro.'); }

async function settleFinanceAccount(id, kind) {
  const item = (state.financeData?.[kind === 'receivable' ? 'receivables' : 'payables'] || []).find((entry) => entry.id === id);
  if (!item) return;
  const amount = window.prompt(`Valor da baixa (saldo ${money(item.amount - (item.paid_amount || 0))}):`, String(item.amount - (item.paid_amount || 0)));
  if (amount === null) return;
  try { await financeRequest(`/finance/${kind === 'receivable' ? 'receivables' : 'payables'}/${encodeURIComponent(id)}`, { method: 'PUT', body: { paidAmount: Number(amount) } }); showToast('Conta baixada com sucesso.'); } catch (error) { showToast(error.message, 'error'); }
}

async function closeFinanceCash() {
  const summary = state.financeSummary?.register;
  if (!summary) return;
  const amount = window.prompt(`Saldo esperado ${money(summary.current_balance)}. Informe o saldo contado:`, String(summary.current_balance));
  if (amount === null) return;
  try { await financeRequest('/finance/cash/close', { method: 'POST', body: { closingBalance: Number(amount) } }); showToast('Caixa fechado e auditado.'); } catch (error) { showToast(error.message, 'error'); }
}

async function cancelSaleFrontend(saleId) {
  const reason = window.prompt('Informe o motivo do cancelamento da venda:', 'Cancelamento solicitado pelo cliente');
  if (!reason) return;
  try { const result = await financeRequest(`/finance/sales/${encodeURIComponent(saleId)}/cancel`, { method: 'POST', body: { reason, paymentMethod: 'Estorno' } }); showToast(`Venda cancelada. Estorno: ${money(result.refund || 0)}.`); } catch (error) { showToast(error.message, 'error'); }
}

function syncPermissionSelection() {
  const role = document.getElementById('user-role').value;
  const isAdmin = role === 'admin';
  document.querySelectorAll('#permission-grid input[name="permission"]').forEach((input) => { input.checked = isAdmin || input.checked; input.disabled = isAdmin; input.closest('.permission-option').classList.toggle('is-locked', isAdmin); });
  document.getElementById('select-all-permissions').checked = isAdmin || [...document.querySelectorAll('#permission-grid input[name="permission"]')].every((input) => input.checked);
  document.getElementById('select-all-permissions').disabled = isAdmin;
}

async function registerStockPurchase(data, localItem) {
  if (!backendOnline) return;
  const result = await apiRequest('/inventory/purchase', { method: 'POST', body: data });
  if (localItem) state.inventory.push(localItem);
  await apiRequest('/state', { method: 'PUT', body: state });
  return result;
}

async function importXmlPurchase(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    const doc = new DOMParser().parseFromString(String(reader.result), 'application/xml');
    const text = (node, tag) => node?.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
    const details = [...doc.getElementsByTagName('det')];
    const supplier = text(doc, 'xNome') || 'NF-e importada';
    const documentNumber = text(doc, 'nNF');
    const invoiceTotal = Number(text(doc, 'vNF')) || 0;
    const items = details.map((detail) => ({ code: text(detail, 'cProd'), name: text(detail, 'xProd'), quantity: Number(text(detail, 'qCom')) || 0, unitCost: Number(text(detail, 'vUnCom')) || 0, unit: text(detail, 'uCom') || 'un.', category: 'Importado XML', brand: 'Não informada', price: Number(text(detail, 'vUnCom')) || 0, location: 'Entrada XML', supplier })).filter((item) => item.code && item.name && item.quantity > 0);
    if (!items.length) { showToast('A NF-e não contém itens reconhecíveis.', 'error'); return; }
    try {
      if (backendOnline) await apiRequest('/inventory/purchase', { method: 'POST', body: { supplier, documentNumber, dueDate: new Date().toISOString().slice(0, 10), paymentMethod: 'Boleto', invoiceTotal, items } });
      items.forEach((incoming) => { const item = state.inventory.find((entry) => entry.code === incoming.code); if (item) { item.stock += incoming.quantity; item.cost = incoming.unitCost; item.supplier = supplier; } else state.inventory.push({ ...incoming, stock: incoming.quantity, min: 0, max: incoming.quantity }); });
      if (backendOnline) await apiRequest('/state', { method: 'PUT', body: state });
      renderView(); showToast(`XML processado: ${items.length} itens lançados e conta a pagar criada.`);
    } catch (error) { showToast(error.message, 'error'); }
  };
  reader.readAsText(file);
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-view]');
    if (nav) { if (!canAccess(nav.dataset.view)) { showToast('Seu login não possui acesso a este módulo.', 'error'); return; } state.view = nav.dataset.view; state.status = 'all'; renderView(); return; }
    if (event.target.closest('[data-action="new-order"]')) { openModal(); return; }
    if (event.target.closest('[data-action="new-service"]')) { state.servicesTab = 'new'; renderView(); return; }
    const serviceTab = event.target.closest('[data-service-tab]');
    if (serviceTab) { state.servicesTab = serviceTab.dataset.serviceTab; renderView(); return; }
    const settingsTab = event.target.closest('[data-settings-tab]');
    if (settingsTab) { state.settingsTab = settingsTab.dataset.settingsTab; renderView(); return; }
    const financeTab = event.target.closest('[data-finance-tab]');
    if (financeTab) { state.financeTab = financeTab.dataset.financeTab; renderView(); return; }
    if (event.target.closest('[data-action="finance-close-cash"]')) { closeFinanceCash(); return; }
    const cancelSaleButton = event.target.closest('[data-cancel-sale]');
    if (cancelSaleButton) { cancelSaleFrontend(cancelSaleButton.dataset.cancelSale); return; }
    const settleButton = event.target.closest('[data-finance-settle]');
    if (settleButton) { settleFinanceAccount(settleButton.dataset.financeSettle, settleButton.dataset.financeKind); return; }
    if (event.target.closest('[data-action="new-user"]')) { if (!state.currentUser?.admin) { showToast('Apenas o administrador pode criar novos logins.', 'error'); return; } openUserModal(); return; }
    if (event.target.closest('[data-action="new-stock"]')) { openStockModal(); return; }
    if (event.target.closest('[data-action="inventory-report"]')) { showToast('Relatório de estoque preparado para exportação local em PDF/CSV.'); return; }
    if (event.target.closest('[data-action="import-xml"]')) { document.getElementById('xml-import-file')?.click(); return; }
    if (event.target.closest('[data-action="inventory-adjust"]')) { adjustInventory(); return; }
    if (event.target.closest('[data-action="new-unit"]')) { registerUnit(); return; }
    if (event.target.closest('[data-action="new-supplier"]')) { registerSupplier(); return; }
    if (event.target.closest('[data-action="export-json"]')) { exportJson(); return; }
    if (event.target.closest('[data-action="export-csv"]')) { exportCsv(); return; }
    if (event.target.closest('[data-action="export-sqlite"]')) { exportSqlite(); return; }
    if (event.target.closest('[data-action="import-data"]')) { document.getElementById('import-data-file')?.click(); return; }
    if (event.target.closest('[data-action="clear-data"]')) { clearAllData(); return; }
    if (event.target.closest('[data-action="logout"]')) { logout(); return; }
    if (event.target.closest('[data-action="new-client"]')) { openCustomerModal(); return; }
    if (event.target.closest('[data-action="new-vehicle"]')) { openVehicleModal(); return; }
    const selectedClient = event.target.closest('[data-select-client]');
    if (selectedClient) { state.saleClientId = Number(selectedClient.dataset.selectClient); const client = state.clients.find((item) => item.id === state.saleClientId); state.saleVehicleId = client?.vehicles[0]?.id || null; renderView(); return; }
    const addSale = event.target.closest('[data-add-sale]');
    if (addSale) { addSaleItem(addSale.dataset.addSale); return; }
    const removeSale = event.target.closest('[data-remove-sale]');
    if (removeSale) { removeSaleItem(removeSale.dataset.removeSale); return; }
    if (event.target.closest('[data-action="finalize-sale"]')) { finalizeDirectSale(); return; }
    if (event.target.closest('[data-action="generate-os"]')) { generateOrderFromSale(); return; }
    if (event.target.closest('[data-action="backup"]')) { showToast('Backup demonstrativo criado localmente.'); return; }
    if (event.target.closest('[data-action="show-toast"]')) { showToast('Ação demonstrativa registrada no protótipo.'); return; }
    const printAction = event.target.closest('[data-print-order]');
    if (printAction) { printOrder(printAction.dataset.printOrder); return; }
    const orderAction = event.target.closest('[data-order-id]');
    if (orderAction) { completeOrder(orderAction.dataset.orderId); return; }
    if (event.target.closest('[data-close-modal]') || event.target.id === 'modal-backdrop') closeModal();
    if (event.target.closest('[data-close-user-modal]') || event.target.id === 'user-modal-backdrop') closeUserModal();
    if (event.target.closest('[data-close-stock-modal]') || event.target.id === 'stock-modal-backdrop') closeStockModal();
    if (event.target.closest('[data-close-customer-modal]') || event.target.id === 'customer-modal-backdrop') closeCustomerModal();
    if (event.target.closest('[data-close-vehicle-modal]') || event.target.id === 'vehicle-modal-backdrop') closeVehicleModal();
  });
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const loginValue = String(data.get('login')).trim();
    const password = String(data.get('password'));
    try {
      await loginWithBackend(loginValue, password);
    } catch (backendError) {
      const backendUnavailable = backendError.message === 'Failed to fetch' || backendError.name === 'TypeError';
      if (!backendUnavailable) { document.getElementById('login-error').textContent = backendError.message || 'Login ou senha inválidos.'; return; }
      backendOnline = false;
      const user = state.users.find((item) => item.login.toLowerCase() === loginValue.toLowerCase() && item.password === password);
      if (!user) { document.getElementById('login-error').textContent = backendError.message === 'Failed to fetch' ? 'Backend local indisponível e credenciais não conferem.' : 'Login ou senha inválidos.'; return; }
      login(user);
    }
  });
  document.getElementById('global-search').addEventListener('input', (event) => { state.search = event.target.value; renderView(); });
  document.addEventListener('input', (event) => { if (event.target.id === 'sale-search') { state.saleSearch = event.target.value; renderView(); const search = document.getElementById('sale-search'); search?.focus(); search?.setSelectionRange(state.saleSearch.length, state.saleSearch.length); } if (event.target.id === 'sale-received') { state.saleReceived = Number(event.target.value) || 0; renderView(); const received = document.getElementById('sale-received'); received?.focus(); received?.setSelectionRange(String(state.saleReceived).length, String(state.saleReceived).length); } });
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
    if (event.target.id === 'sale-mechanic') { state.saleMechanicId = Number(event.target.value) || null; renderView(); }
    if (event.target.id === 'sale-seller') { state.saleSellerId = Number(event.target.value) || null; renderView(); }
    if (event.target.id === 'sale-payment-method') { state.salePaymentMethod = event.target.value; }
    if (event.target.id === 'sale-installments') { state.saleInstallments = Math.max(1, Number(event.target.value) || 1); }
    if (event.target.dataset.saleDiscount) { const item = state.saleCart.find((entry) => entry.id === event.target.dataset.saleDiscount); if (item) { item.discount = Math.max(0, Number(event.target.value) || 0); renderView(); } }
    if (event.target.dataset.toggleMechanic) { const user = state.users.find((item) => item.id === Number(event.target.dataset.toggleMechanic)); if (user && !user.admin && state.currentUser?.admin) { user.isMechanic = event.target.checked; renderView(); showToast(`${user.name} ${user.isMechanic ? 'foi habilitado' : 'foi retirado'} da equipe mecânica.`); } }
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
    state.users.push({ id: state.users.length + 1, name: data.get('name'), login: loginValue, password: data.get('password'), role: roleNames[role], admin, isMechanic: false, permissions });
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
  document.addEventListener('submit', (event) => {
    if (event.target.id !== 'company-form') return;
    event.preventDefault();
    const data = new FormData(event.target);
    Object.keys(state.company).forEach((key) => { if (data.has(key)) state.company[key] = data.get(key); });
    renderView(); showToast('Dados da empresa salvos. Eles serão usados nos documentos do sistema.');
  });
  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!['finance-transaction-form', 'finance-account-form', 'cash-open-form', 'cash-movement-form'].includes(form.id)) return;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      let path = '/finance/transactions';
      if (form.id === 'finance-account-form') { const type = form.dataset.accountType; path = `/finance/${type === 'receivable' ? 'receivables' : 'payables'}`; if (type === 'receivable') data.origin = 'Manual'; }
      if (form.id === 'cash-open-form') path = '/finance/cash/open';
      if (form.id === 'cash-movement-form') path = '/finance/cash/movement';
      data.amount = Number(data.amount || 0); data.openingBalance = Number(data.openingBalance || 0);
      await financeRequest(path, { method: 'POST', body: data });
      form.reset();
      showToast('Registro financeiro salvo no SQLite.');
    } catch (error) { showToast(error.message, 'error'); }
  });
  document.addEventListener('change', (event) => { if (event.target.id === 'import-data-file') { importDataFile(event.target.files?.[0]); event.target.value = ''; } });
  document.addEventListener('change', (event) => { if (event.target.id === 'xml-import-file') { const file = event.target.files?.[0]; if (file) { importXmlPurchase(file); event.target.value = ''; } } });
  document.getElementById('new-stock-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const code = String(data.get('code')).trim().toUpperCase();
    if (state.inventory.some((item) => item.code.toUpperCase() === code)) { showToast('Este código de item já está cadastrado.', 'error'); return; }
    const saveItem = async (photo = '') => { const localItem = { name: data.get('name'), code, category: data.get('category'), brand: data.get('brand') || 'Não informada', photo, stock: Number(data.get('stock')), min: Number(data.get('min')), max: Number(data.get('max')), unit: data.get('unit'), price: Number(data.get('price')), cost: Number(data.get('cost')), location: data.get('location'), supplier: data.get('supplier') || 'Não informado' }; try { if (backendOnline) await registerStockPurchase({ supplier: localItem.supplier, documentNumber: data.get('documentNumber'), dueDate: data.get('dueDate'), paymentMethod: data.get('paymentMethod'), items: [{ ...localItem, quantity: localItem.stock, unitCost: localItem.cost }] }, localItem); else state.inventory.push(localItem); event.target.reset(); closeStockModal(); state.view = 'inventory'; renderView(); showToast(backendOnline ? 'Item lançado no estoque e conta a pagar criada.' : 'Item cadastrado no estoque local.'); } catch (error) { showToast(error.message, 'error'); } };
    const photo = data.get('photo');
    if (photo?.size) { const reader = new FileReader(); reader.onload = () => saveItem(String(reader.result)); reader.readAsDataURL(photo); } else saveItem();
  });
  document.getElementById('new-customer-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const plate = String(data.get('plate')).trim().toUpperCase();
    if (state.clients.some((client) => client.vehicles.some((vehicle) => vehicle.plate === plate))) { showToast('Esta placa já está vinculada a outro cadastro.', 'error'); return; }
    const id = Math.max(...state.clients.map((client) => client.id), 0) + 1;
    const vehicleId = Math.max(...state.clients.flatMap((client) => client.vehicles.map((vehicle) => vehicle.id)), 100) + 1;
    state.clients.push({ id, type: data.get('type') || 'PF', name: data.get('name'), cpf: data.get('cpf'), email: data.get('email'), phone: data.get('phone'), birth: data.get('birth') || 'Não informado', address: data.get('address'), vehicles: [{ id: vehicleId, plate, brand: data.get('brand'), model: data.get('model'), year: data.get('year'), color: data.get('color') || 'Não informado', vin: data.get('vin') || 'Não informado', mileage: Number(data.get('mileage')) || 0 }], visits: 0, last: 'Novo cadastro' });
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
    state.orders.unshift({ id: `OS-${String(nextNumber).padStart(4, '0')}`, customer: data.get('customer'), plate: String(data.get('plate')).toUpperCase(), vehicle: data.get('vehicle'), service: data.get('service'), technician: state.users.find((user) => user.id === Number(data.get('mechanicId')))?.name || 'A definir', status: 'waiting', statusLabel: 'Aguardando triagem', delivery, total: 0 });
    event.target.reset(); closeModal(); state.view = 'orders'; state.status = 'all'; renderView(); showToast('Nova ordem criada no protótipo offline.');
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); closeUserModal(); closeStockModal(); closeCustomerModal(); closeVehicleModal(); } });
}

bindEvents();
renderIcons();
renderView();
