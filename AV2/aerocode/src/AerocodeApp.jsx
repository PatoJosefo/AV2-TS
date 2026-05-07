import { useState } from "react";

const TipoAeronave = { COMERCIAL: "COMERCIAL", MILITAR: "MILITAR" };
const TipoPeca     = { NACIONAL: "NACIONAL", IMPORTADA: "IMPORTADA" };
const StatusPeca   = { EM_PRODUCAO: "EM_PRODUCAO", EM_TRANSPORTE: "EM_TRANSPORTE", PRONTA: "PRONTA" };
const StatusEtapa  = { PENDENTE: "PENDENTE", ANDAMENTO: "ANDAMENTO", CONCLUIDA: "CONCLUIDA" };
const NivelPermissao = { ADMINISTRADOR: "ADMINISTRADOR", ENGENHEIRO: "ENGENHEIRO", OPERADOR: "OPERADOR" };
const TipoTeste    = { ELETRICO: "ELETRICO", HIDRAULICO: "HIDRAULICO", AERODINAMICO: "AERODINAMICO" };
const ResultadoTeste = { APROVADO: "APROVADO", REPROVADO: "REPROVADO" };

const ORDERS = [
  { id: "OP-2401", aircraft: "ERJ-175",         client: "Embraer",           stage: "Montagem",  progress: 72, priority: "Alta",    start: "2024-01-10", end: "2024-08-30", engineers: ["Ana Lima", "Carlos Mota"] },
  { id: "OP-2402", aircraft: "A320neo",          client: "Airbus",            stage: "Inspeção",  progress: 91, priority: "Crítica", start: "2024-02-01", end: "2024-06-15", engineers: ["João Silva", "Beatriz Ramos"] },
  { id: "OP-2403", aircraft: "B737 MAX",         client: "Boeing",            stage: "Pintura",   progress: 45, priority: "Média",   start: "2024-03-05", end: "2024-10-20", engineers: ["Pedro Costa", "Fernanda Nunes"] },
  { id: "OP-2404", aircraft: "Gulfstream G700",  client: "Gulfstream",        stage: "Elétrica",  progress: 28, priority: "Alta",    start: "2024-04-12", end: "2024-12-01", engineers: ["Ricardo Alves"] },
  { id: "OP-2405", aircraft: "F-35B",            client: "Lockheed Martin",   stage: "Testes",    progress: 88, priority: "Crítica", start: "2024-01-20", end: "2024-07-10", engineers: ["Camila Torres", "Diego Ferreira"] },
  { id: "OP-2406", aircraft: "Rafale C",         client: "Dassault Aviation", stage: "Estrutura", progress: 15, priority: "Média",   start: "2024-05-01", end: "2025-02-28", engineers: ["Lucas Mendes"] },
];

const AIRCRAFT = [
  { id: "AC-001", model: "ERJ-175",        serial: "SN-17501",  client: "Embraer",           status: "Em produção",   bay: "Hangar A - Baia 3", completion: 72, tipo: TipoAeronave.COMERCIAL, capacidade: 80,  alcance: 3735,
    pecas: [
      { nome: "Motor CF34-8E",      tipo: TipoPeca.IMPORTADA, fornecedor: "GE Aviation",       status: StatusPeca.PRONTA },
      { nome: "Trem de pouso diant.", tipo: TipoPeca.NACIONAL,  fornecedor: "Embraer Componentes", status: StatusPeca.PRONTA },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-04-01", status: StatusEtapa.CONCLUIDA },
      { nome: "Montagem geral",      prazo: "2024-06-15", status: StatusEtapa.ANDAMENTO },
      { nome: "Sistemas elétricos",  prazo: "2024-07-30", status: StatusEtapa.PENDENTE },
    ],
    testes: [
      { tipo: TipoTeste.HIDRAULICO,   resultado: ResultadoTeste.APROVADO },
      { tipo: TipoTeste.ELETRICO,     resultado: ResultadoTeste.APROVADO },
    ],
  },
  { id: "AC-002", model: "A320neo",         serial: "SN-32001",  client: "Airbus",            status: "Inspeção final",bay: "Hangar B - Baia 1", completion: 91, tipo: TipoAeronave.COMERCIAL, capacidade: 165, alcance: 6300,
    pecas: [
      { nome: "Motor CFM LEAP-1A", tipo: TipoPeca.IMPORTADA, fornecedor: "CFM International", status: StatusPeca.PRONTA },
      { nome: "Winglet Sharklet",  tipo: TipoPeca.IMPORTADA, fornecedor: "Airbus",            status: StatusPeca.PRONTA },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-03-10", status: StatusEtapa.CONCLUIDA },
      { nome: "Montagem geral",      prazo: "2024-04-30", status: StatusEtapa.CONCLUIDA },
      { nome: "Inspeção final",      prazo: "2024-06-15", status: StatusEtapa.ANDAMENTO },
    ],
    testes: [
      { tipo: TipoTeste.ELETRICO,     resultado: ResultadoTeste.APROVADO },
      { tipo: TipoTeste.HIDRAULICO,   resultado: ResultadoTeste.APROVADO },
      { tipo: TipoTeste.AERODINAMICO, resultado: ResultadoTeste.APROVADO },
    ],
  },
  { id: "AC-003", model: "B737 MAX",        serial: "SN-73701",  client: "Boeing",            status: "Em produção",   bay: "Hangar A - Baia 7", completion: 45, tipo: TipoAeronave.COMERCIAL, capacidade: 178, alcance: 6570,
    pecas: [
      { nome: "Motor LEAP-1B",     tipo: TipoPeca.IMPORTADA, fornecedor: "CFM International", status: StatusPeca.EM_TRANSPORTE },
      { nome: "Painel de controle",tipo: TipoPeca.IMPORTADA, fornecedor: "Honeywell",         status: StatusPeca.EM_PRODUCAO  },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-05-01", status: StatusEtapa.CONCLUIDA },
      { nome: "Montagem geral",      prazo: "2024-07-20", status: StatusEtapa.ANDAMENTO },
      { nome: "Pintura",             prazo: "2024-09-01", status: StatusEtapa.PENDENTE },
    ],
    testes: [
      { tipo: TipoTeste.ELETRICO, resultado: ResultadoTeste.APROVADO },
    ],
  },
  { id: "AC-004", model: "Gulfstream G700", serial: "SN-G7001", client: "Gulfstream",        status: "Em produção",   bay: "Hangar C - Baia 2", completion: 28, tipo: TipoAeronave.COMERCIAL, capacidade: 19,  alcance: 13890,
    pecas: [
      { nome: "Motor Rolls-Royce Pearl 700", tipo: TipoPeca.IMPORTADA, fornecedor: "Rolls-Royce", status: StatusPeca.EM_PRODUCAO },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-07-01", status: StatusEtapa.ANDAMENTO },
      { nome: "Sistemas elétricos",  prazo: "2024-09-15", status: StatusEtapa.PENDENTE },
    ],
    testes: [],
  },
  { id: "AC-005", model: "F-35B",           serial: "SN-F3501",  client: "Lockheed Martin",  status: "Testes",        bay: "Hangar D - Baia 1", completion: 88, tipo: TipoAeronave.MILITAR,   capacidade: 1,   alcance: 1670,
    pecas: [
      { nome: "Motor F135-PW-600", tipo: TipoPeca.IMPORTADA, fornecedor: "Pratt & Whitney", status: StatusPeca.PRONTA },
      { nome: "Sensor EOTS",       tipo: TipoPeca.IMPORTADA, fornecedor: "Lockheed Martin", status: StatusPeca.PRONTA },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-02-20", status: StatusEtapa.CONCLUIDA },
      { nome: "Montagem geral",      prazo: "2024-04-10", status: StatusEtapa.CONCLUIDA },
      { nome: "Testes operacionais", prazo: "2024-07-10", status: StatusEtapa.ANDAMENTO },
    ],
    testes: [
      { tipo: TipoTeste.ELETRICO,     resultado: ResultadoTeste.APROVADO },
      { tipo: TipoTeste.HIDRAULICO,   resultado: ResultadoTeste.APROVADO },
      { tipo: TipoTeste.AERODINAMICO, resultado: ResultadoTeste.REPROVADO },
    ],
  },
  { id: "AC-006", model: "Rafale C",        serial: "SN-RAF01",  client: "Dassault Aviation",status: "Iniciando",     bay: "Hangar D - Baia 4", completion: 15, tipo: TipoAeronave.MILITAR,   capacidade: 1,   alcance: 3700,
    pecas: [
      { nome: "Motor M88-2", tipo: TipoPeca.IMPORTADA, fornecedor: "Safran Aircraft Engines", status: StatusPeca.EM_PRODUCAO },
    ],
    etapas: [
      { nome: "Estrutura fuselagem", prazo: "2024-08-01", status: StatusEtapa.ANDAMENTO },
    ],
    testes: [],
  },
];

const ENGINEERS = [
  { id: "ENG-01", name: "Ana Lima",       role: "Engenheira de Produção",  dept: "Estruturas", status: "Ativo",  projects: 2, exp: "8 anos",  email: "ana.lima@aerocode.com",       phone: "+55 12 99001-0001", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-02", name: "Carlos Mota",    role: "Engenheiro Aeronáutico",  dept: "Sistemas",   status: "Ativo",  projects: 1, exp: "12 anos", email: "carlos.mota@aerocode.com",    phone: "+55 12 99001-0002", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-03", name: "João Silva",     role: "Engenheiro de Produção",  dept: "Montagem",   status: "Ativo",  projects: 2, exp: "5 anos",  email: "joao.silva@aerocode.com",     phone: "+55 12 99001-0003", nivelPermissao: NivelPermissao.OPERADOR      },
  { id: "ENG-04", name: "Beatriz Ramos",  role: "Engenheira Aeronáutica",  dept: "Aviônica",   status: "Férias", projects: 1, exp: "10 anos", email: "beatriz.ramos@aerocode.com",  phone: "+55 12 99001-0004", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-05", name: "Pedro Costa",    role: "Engenheiro de Produção",  dept: "Pintura",    status: "Ativo",  projects: 1, exp: "6 anos",  email: "pedro.costa@aerocode.com",    phone: "+55 12 99001-0005", nivelPermissao: NivelPermissao.OPERADOR      },
  { id: "ENG-06", name: "Fernanda Nunes", role: "Engenheira Aeronáutica",  dept: "Estruturas", status: "Ativo",  projects: 1, exp: "9 anos",  email: "fernanda.nunes@aerocode.com", phone: "+55 12 99001-0006", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-07", name: "Ricardo Alves",  role: "Engenheiro de Sistemas",  dept: "Elétrica",   status: "Ativo",  projects: 1, exp: "14 anos", email: "ricardo.alves@aerocode.com",  phone: "+55 12 99001-0007", nivelPermissao: NivelPermissao.ADMINISTRADOR },
  { id: "ENG-08", name: "Camila Torres",  role: "Engenheira de Produção",  dept: "Testes",     status: "Ativo",  projects: 1, exp: "7 anos",  email: "camila.torres@aerocode.com",  phone: "+55 12 99001-0008", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-09", name: "Diego Ferreira", role: "Engenheiro Aeronáutico",  dept: "Testes",     status: "Licença",projects: 1, exp: "11 anos", email: "diego.ferreira@aerocode.com", phone: "+55 12 99001-0009", nivelPermissao: NivelPermissao.ENGENHEIRO    },
  { id: "ENG-10", name: "Lucas Mendes",   role: "Engenheiro de Produção",  dept: "Estruturas", status: "Ativo",  projects: 1, exp: "3 anos",  email: "lucas.mendes@aerocode.com",   phone: "+55 12 99001-0010", nivelPermissao: NivelPermissao.OPERADOR      },
];

const MONTHLY = [
  { month: "Jan", orders: 3, delivered: 2, hours: 4200 },
  { month: "Fev", orders: 4, delivered: 3, hours: 5100 },
  { month: "Mar", orders: 3, delivered: 3, hours: 4800 },
  { month: "Abr", orders: 5, delivered: 2, hours: 5600 },
  { month: "Mai", orders: 4, delivered: 4, hours: 5200 },
  { month: "Jun", orders: 6, delivered: 3, hours: 6100 },
];

const priorityColor  = (p) => ({ "Crítica": "#dc2626", "Alta": "#ea580c", "Média": "#ca8a04" }[p] || "#6b7280");
const statusColor    = (s) => ({ "Ativo": "#16a34a", "Férias": "#2563eb", "Licença": "#9333ea" }[s] || "#6b7280");
const stageColor     = (s) => ({ "Testes": "#7c3aed", "Inspeção": "#0891b2", "Montagem": "#0369a1", "Pintura": "#be185d", "Elétrica": "#d97706", "Estrutura": "#65a30d" }[s] || "#6b7280");
const tipoColor      = (t) => t === TipoAeronave.MILITAR ? "#7c3aed" : "#0369a1";
const statusPecaColor= (s) => ({ [StatusPeca.PRONTA]: "#16a34a", [StatusPeca.EM_TRANSPORTE]: "#2563eb", [StatusPeca.EM_PRODUCAO]: "#d97706" }[s] || "#6b7280");
const statusEtapaColor=(s) => ({ [StatusEtapa.CONCLUIDA]: "#16a34a", [StatusEtapa.ANDAMENTO]: "#0891b2", [StatusEtapa.PENDENTE]: "#9ca3af" }[s] || "#6b7280");
const resultadoColor = (r) => r === ResultadoTeste.APROVADO ? "#16a34a" : "#dc2626";
const nivelColor     = (n) => ({ [NivelPermissao.ADMINISTRADOR]: "#dc2626", [NivelPermissao.ENGENHEIRO]: "#1d4ed8", [NivelPermissao.OPERADOR]: "#16a34a" }[n] || "#6b7280");

const ProgressBar = ({ value, color = "#1d4ed8" }) => (
  <div style={{ background: "#e5e7eb", borderRadius: 999, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${value}%`, background: color, height: "100%", borderRadius: 999, transition: "width .4s" }} />
  </div>
);

const Badge = ({ label, color }) => (
  <span style={{ background: color + "18", color, border: `1px solid ${color}40`, borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: ".3px" }}>
    {label}
  </span>
);

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start", boxShadow: "0 1px 3px #0001" }}>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: accent + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{sub}</div>}
    </div>
  </div>
);

function Dashboard() {
  const avgProgress = Math.round(ORDERS.reduce((a, o) => a + o.progress, 0) / ORDERS.length);
  const critical    = ORDERS.filter(o => o.priority === "Crítica").length;
  const activeEng   = ENGINEERS.filter(e => e.status === "Ativo").length;
  const militares   = AIRCRAFT.filter(a => a.tipo === TipoAeronave.MILITAR).length;
  const maxOrders   = Math.max(...MONTHLY.map(m => m.orders));

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Visão Geral</h2>
      <p style={{ color: "#6b7280", marginBottom: 28, fontSize: 14 }}>Resumo operacional em tempo real — Aerocode Production Suite</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard icon="✈️" label="Ordens Ativas"      value={ORDERS.length}   sub="2 fábricas"              accent="#1d4ed8" />
        <StatCard icon="⚠️" label="Prioridade Crítica" value={critical}         sub="Atenção imediata"         accent="#dc2626" />
        <StatCard icon="📊" label="Progresso Médio"    value={`${avgProgress}%`}sub="Todas as ordens"         accent="#0891b2" />
        <StatCard icon="🛡️" label="Aeronaves Militares"value={militares}        sub={`de ${AIRCRAFT.length} total`} accent="#7c3aed" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Ordens recentes */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Ordens em Andamento</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ORDERS.slice(0, 5).map(o => (
              <div key={o.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{o.aircraft}</span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{o.progress}%</span>
                  </div>
                  <ProgressBar value={o.progress} color={o.priority === "Crítica" ? "#dc2626" : "#1d4ed8"} />
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>{o.client} · {o.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico mensal */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Ordens por Mês</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
            {MONTHLY.map(m => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 110 }}>
                  <div style={{ width: 14, background: "#bfdbfe", borderRadius: "4px 4px 0 0", height: `${(m.orders / maxOrders) * 100}%` }} title={`Ordens: ${m.orders}`} />
                  <div style={{ width: 14, background: "#1d4ed8", borderRadius: "4px 4px 0 0", height: `${(m.delivered / maxOrders) * 100}%` }} title={`Entregues: ${m.delivered}`} />
                </div>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{m.month}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b7280" }}>
              <div style={{ width: 10, height: 10, background: "#bfdbfe", borderRadius: 2 }} /> Iniciadas
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#6b7280" }}>
              <div style={{ width: 10, height: 10, background: "#1d4ed8", borderRadius: 2 }} /> Entregues
            </div>
          </div>
        </div>

        {/* Clientes ativos */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Clientes Ativos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ORDERS.map(o => (
              <div key={o.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✈</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{o.client}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{o.aircraft}</div>
                </div>
                <Badge label={o.stage} color={stageColor(o.stage)} />
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Alertas & Notificações</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "🔴", msg: "OP-2402 (A320neo) aguarda aprovação de inspeção final", time: "Há 2h" },
              { icon: "🟠", msg: "OP-2405 (F-35B) — teste aerodinâmico REPROVADO, reinspeção necessária", time: "Hoje" },
              { icon: "🟡", msg: "Hangar B - Baia 1 com manutenção programada amanhã", time: "Hoje" },
              { icon: "🔵", msg: "Beatriz Ramos retorna de férias em 3 dias", time: "Esta semana" },
              { icon: "🟢", msg: "OP-2401 atingiu 72% de progresso — no cronograma", time: "Ontem" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "#f9fafb", borderRadius: 8, alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#374151" }}>{a.msg}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("Todos");
  const [selected, setSelected] = useState(null);

  const priorities = ["Todos", "Crítica", "Alta", "Média"];
  const filtered = ORDERS.filter(o =>
    (filter === "Todos" || o.priority === filter) &&
    (o.aircraft.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Ordens de Produção</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{ORDERS.length} ordens ativas em {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <button style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          + Nova Ordem
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por aeronave, cliente ou ID..."
          style={{ flex: 1, minWidth: 220, border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none" }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {priorities.map(p => (
            <button key={p} onClick={() => setFilter(p)}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: filter === p ? "#1d4ed8" : "#d1d5db", background: filter === p ? "#eff6ff" : "#fff", color: filter === p ? "#1d4ed8" : "#374151", fontSize: 13, cursor: "pointer", fontWeight: filter === p ? 600 : 400 }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              {["ID", "Aeronave", "Cliente", "Etapa", "Prioridade", "Progresso", "Prazo", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", background: selected === o.id ? "#eff6ff" : "transparent" }}
                onClick={() => setSelected(selected === o.id ? null : o.id)}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#1d4ed8" }}>{o.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "#111827" }}>{o.aircraft}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{o.client}</td>
                <td style={{ padding: "12px 16px" }}><Badge label={o.stage} color={stageColor(o.stage)} /></td>
                <td style={{ padding: "12px 16px" }}><Badge label={o.priority} color={priorityColor(o.priority)} /></td>
                <td style={{ padding: "12px 16px", minWidth: 120 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ProgressBar value={o.progress} color={o.priority === "Crítica" ? "#dc2626" : "#1d4ed8"} />
                    <span style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{o.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "#6b7280" }}>{new Date(o.end).toLocaleDateString("pt-BR")}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ fontSize: 11, color: "#1d4ed8", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                    {selected === o.id ? "Fechar ▲" : "Detalhes ▼"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selected && (() => {
          const o = ORDERS.find(x => x.id === selected);
          return (
            <div style={{ padding: 20, background: "#f0f9ff", borderTop: "1px solid #bae6fd" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                <div><div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>INÍCIO</div><div style={{ fontSize: 14, fontWeight: 500 }}>{new Date(o.start).toLocaleDateString("pt-BR")}</div></div>
                <div><div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>PREVISÃO</div><div style={{ fontSize: 14, fontWeight: 500 }}>{new Date(o.end).toLocaleDateString("pt-BR")}</div></div>
                <div><div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>ENGENHEIROS</div><div style={{ fontSize: 13, fontWeight: 500 }}>{o.engineers.join(", ")}</div></div>
                <div><div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>ETAPA ATUAL</div><Badge label={o.stage} color={stageColor(o.stage)} /></div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

function AircraftControl() {
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [selected, setSelected]     = useState(null);

  const types    = ["Todos", TipoAeronave.COMERCIAL, TipoAeronave.MILITAR];
  const filtered = AIRCRAFT.filter(a => typeFilter === "Todos" || a.tipo === typeFilter);
  const detail   = selected ? AIRCRAFT.find(a => a.id === selected) : null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Controle de Aeronaves</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{AIRCRAFT.length} aeronaves em produção</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: typeFilter === t ? "#1d4ed8" : "#d1d5db", background: typeFilter === t ? "#eff6ff" : "#fff", color: typeFilter === t ? "#1d4ed8" : "#374151", fontSize: 13, cursor: "pointer", fontWeight: typeFilter === t ? 600 : 400 }}>
            {t === "Todos" ? "Todos" : t === TipoAeronave.COMERCIAL ? "Comercial" : "Militar"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map(ac => (
          <div key={ac.id}
            onClick={() => setSelected(selected === ac.id ? null : ac.id)}
            style={{ background: "#fff", border: `1px solid ${selected === ac.id ? "#1d4ed8" : "#e5e7eb"}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 3px #0001", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{ac.model}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{ac.serial}</div>
              </div>
              <Badge label={ac.tipo} color={tipoColor(ac.tipo)} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#6b7280" }}>Progresso</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{ac.completion}%</span>
              </div>
              <ProgressBar value={ac.completion} color={ac.completion >= 80 ? "#16a34a" : ac.completion >= 50 ? "#1d4ed8" : "#ea580c"} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>CLIENTE</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{ac.client}</div>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>LOCALIZAÇÃO</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{ac.bay}</div>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>CAPACIDADE</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{ac.capacidade} {ac.tipo === TipoAeronave.MILITAR ? "tripulante(s)" : "passageiros"}</div>
              </div>
              <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>ALCANCE</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{ac.alcance.toLocaleString("pt-BR")} km</div>
              </div>
            </div>

            <div style={{ padding: "8px 12px", background: ac.status === "Inspeção final" ? "#f0fdf4" : ac.status === "Testes" ? "#faf5ff" : "#eff6ff", borderRadius: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: ac.status === "Inspeção final" ? "#16a34a" : ac.status === "Testes" ? "#7c3aed" : "#1d4ed8" }}>
                ● {ac.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div style={{ marginTop: 24, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 20 }}>
            Detalhes — {detail.model} <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 400 }}>({detail.serial})</span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>Peças</div>
              {detail.pecas.length === 0
                ? <div style={{ fontSize: 13, color: "#9ca3af" }}>Nenhuma peça registrada.</div>
                : detail.pecas.map((p, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{p.nome}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <Badge label={p.tipo}   color={p.tipo === TipoPeca.IMPORTADA ? "#7c3aed" : "#0891b2"} />
                        <Badge label={p.status} color={statusPecaColor(p.status)} />
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{p.fornecedor}</div>
                    </div>
                  ))
              }
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>Etapas de Produção</div>
              {detail.etapas.length === 0
                ? <div style={{ fontSize: 13, color: "#9ca3af" }}>Nenhuma etapa registrada.</div>
                : detail.etapas.map((e, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{e.nome}</div>
                        <Badge label={e.status} color={statusEtapaColor(e.status)} />
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Prazo: {e.prazo}</div>
                    </div>
                  ))
              }
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>Testes Realizados</div>
              {detail.testes.length === 0
                ? <div style={{ fontSize: 13, color: "#9ca3af" }}>Nenhum teste registrado.</div>
                : detail.testes.map((t, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "#f9fafb", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{t.tipo}</div>
                      <Badge label={t.resultado} color={resultadoColor(t.resultado)} />
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Engineers() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [nivelFilter, setNivelFilter]   = useState("Todos");

  const statuses = ["Todos", "Ativo", "Férias", "Licença"];
  const niveis   = ["Todos", NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO, NivelPermissao.OPERADOR];

  const filtered = ENGINEERS.filter(e =>
    (statusFilter === "Todos" || e.status === statusFilter) &&
    (nivelFilter  === "Todos" || e.nivelPermissao === nivelFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Funcionários & Equipe</h2>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{ENGINEERS.length} profissionais cadastrados</p>
        </div>
        <button style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          + Novo Funcionário
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome, cargo ou departamento..."
          style={{ flex: 1, minWidth: 220, border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none" }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: statusFilter === s ? "#1d4ed8" : "#d1d5db", background: statusFilter === s ? "#eff6ff" : "#fff", color: statusFilter === s ? "#1d4ed8" : "#374151", fontSize: 13, cursor: "pointer", fontWeight: statusFilter === s ? 600 : 400 }}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {niveis.map(n => (
            <button key={n} onClick={() => setNivelFilter(n)}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: nivelFilter === n ? nivelColor(n) : "#d1d5db", background: nivelFilter === n ? nivelColor(n) + "14" : "#fff", color: nivelFilter === n ? nivelColor(n) : "#374151", fontSize: 13, cursor: "pointer", fontWeight: nivelFilter === n ? 600 : 400 }}>
              {n === "Todos" ? "Todos os níveis" : n}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map(e => (
          <div key={e.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#1d4ed8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
              {e.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{e.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{e.role}</div>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <Badge label={e.status}           color={statusColor(e.status)} />
                  <Badge label={e.nivelPermissao}   color={nivelColor(e.nivelPermissao)} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
                <div style={{ background: "#f9fafb", borderRadius: 6, padding: "5px 8px" }}>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>DEPTO</div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{e.dept}</div>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: 6, padding: "5px 8px" }}>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>PROJETOS</div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{e.projects}</div>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: 6, padding: "5px 8px" }}>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>EXPERIÊNCIA</div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{e.exp}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>{e.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reports() {
  const totalProgress  = Math.round(ORDERS.reduce((a, o) => a + o.progress, 0) / ORDERS.length);
  const onTime         = ORDERS.filter(o => o.progress >= 50).length;
  const activeEng      = ENGINEERS.filter(e => e.status === "Ativo").length;
  const militarOrders  = AIRCRAFT.filter(a => a.tipo === TipoAeronave.MILITAR).length;

  const allPecas = AIRCRAFT.flatMap(a => a.pecas);
  const pecasProntas     = allPecas.filter(p => p.status === StatusPeca.PRONTA).length;
  const pecasTransporte  = allPecas.filter(p => p.status === StatusPeca.EM_TRANSPORTE).length;
  const pecasProducao    = allPecas.filter(p => p.status === StatusPeca.EM_PRODUCAO).length;

  const allTestes    = AIRCRAFT.flatMap(a => a.testes);
  const aprovados    = allTestes.filter(t => t.resultado === ResultadoTeste.APROVADO).length;
  const reprovados   = allTestes.filter(t => t.resultado === ResultadoTeste.REPROVADO).length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Relatórios & Métricas</h2>
        <p style={{ color: "#6b7280", fontSize: 14 }}>Indicadores de desempenho operacional — {new Date().toLocaleDateString("pt-BR")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon="📈" label="Progresso Geral"    value={`${totalProgress}%`}         sub="Todas as ordens"                   accent="#1d4ed8" />
        <StatCard icon="✅" label="No Prazo"           value={`${onTime}/${ORDERS.length}`} sub="Ordens dentro do cronograma"       accent="#16a34a" />
        <StatCard icon="👷" label="Efetivo Ativo"      value={activeEng}                    sub={`${Math.round((activeEng / ENGINEERS.length) * 100)}% da equipe`} accent="#0891b2" />
        <StatCard icon="🛡️" label="Aeronaves Militares"value={militarOrders}                sub="Contratos militares"               accent="#7c3aed" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Horas de Produção Mensais</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 130 }}>
            {MONTHLY.map(m => {
              const maxH = Math.max(...MONTHLY.map(x => x.hours));
              return (
                <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>{(m.hours / 1000).toFixed(1)}k</span>
                  <div style={{ width: "100%", background: "#1d4ed8", borderRadius: "4px 4px 0 0", height: `${(m.hours / maxH) * 100}px` }} />
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Distribuição por Prioridade</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Crítica", "Alta", "Média"].map(p => {
              const count = ORDERS.filter(o => o.priority === p).length;
              const pct   = Math.round((count / ORDERS.length) * 100);
              return (
                <div key={p}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#374151" }}>{p}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{count} ordens ({pct}%)</span>
                  </div>
                  <ProgressBar value={pct} color={priorityColor(p)} />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Progresso por Ordem</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ORDERS.map(o => (
              <div key={o.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>{o.id} — {o.aircraft}</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{o.progress}%</span>
                </div>
                <ProgressBar value={o.progress} color={o.progress >= 80 ? "#16a34a" : o.progress >= 50 ? "#1d4ed8" : "#ea580c"} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Status de Peças & Testes</h3>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>Peças ({allPecas.length} total)</div>
            {[
              { label: StatusPeca.PRONTA,        count: pecasProntas,    color: "#16a34a" },
              { label: StatusPeca.EM_TRANSPORTE, count: pecasTransporte, color: "#2563eb" },
              { label: StatusPeca.EM_PRODUCAO,   count: pecasProducao,   color: "#d97706" },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{row.count}</span>
                </div>
                <ProgressBar value={allPecas.length ? (row.count / allPecas.length) * 100 : 0} color={row.color} />
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>Testes ({allTestes.length} total)</div>
            {[
              { label: ResultadoTeste.APROVADO,  count: aprovados,  color: "#16a34a" },
              { label: ResultadoTeste.REPROVADO, count: reprovados, color: "#dc2626" },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: "#374151" }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{row.count}</span>
                </div>
                <ProgressBar value={allTestes.length ? (row.count / allTestes.length) * 100 : 0} color={row.color} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Equipe por Departamento & Nível</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              {["Estruturas", "Montagem", "Aviônica", "Elétrica", "Pintura", "Testes", "Sistemas"].map(dept => {
                const count = ENGINEERS.filter(e => e.dept === dept).length;
                if (!count) return null;
                return (
                  <div key={dept} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 90, fontSize: 12, color: "#374151" }}>{dept}</div>
                    <div style={{ flex: 1 }}><ProgressBar value={(count / ENGINEERS.length) * 100} color="#0891b2" /></div>
                    <div style={{ width: 20, fontSize: 12, fontWeight: 600, color: "#6b7280", textAlign: "right" }}>{count}</div>
                  </div>
                );
              })}
            </div>
            <div>
              {[NivelPermissao.ADMINISTRADOR, NivelPermissao.ENGENHEIRO, NivelPermissao.OPERADOR].map(nivel => {
                const count = ENGINEERS.filter(e => e.nivelPermissao === nivel).length;
                return (
                  <div key={nivel} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#374151" }}>{nivel}</span>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{count} funcionário(s)</span>
                    </div>
                    <ProgressBar value={(count / ENGINEERS.length) * 100} color={nivelColor(nivel)} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PAGES = [
  { id: "dashboard", label: "Dashboard" },
  { id: "orders",    label: "Ordens de Produção"},
  { id: "aircraft",  label: "Aeronaves"   },
  { id: "engineers", label: "Funcionários"  },
  { id: "reports",   label: "Relatórios"  },
];

export default function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    if (page === "dashboard") return <Dashboard />;
    if (page === "orders")    return <Orders />;
    if (page === "aircraft")  return <AircraftControl />;
    if (page === "engineers") return <Engineers />;
    if (page === "reports")   return <Reports />;
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#cfcfe7" }}>
      <aside style={{ width: 220, background: "#15002c", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "#3caf0e", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✈</div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 15, letterSpacing: ".3px" }}>AEROCODE</div>
              <div style={{ color: "#ffffff", fontSize: 10, letterSpacing: "1px" }}>PRODUCTION SUITE</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px",
                borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left",
                background: page === p.id ? "#3caf0e" : "transparent",
                color: page === p.id ? "#fff" : "#94a3b8",
                fontSize: 13, fontWeight: page === p.id ? 600 : 400,
                transition: "all .15s"
              }}>
              <span style={{ fontSize: 14 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 16px 20px", borderTop: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "#3caf0e", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>AD</div>
            <div>
              <div style={{ color: "#f8fafc", fontSize: 12, fontWeight: 600 }}>Admin</div>
              <div style={{ color: "#475569", fontSize: 10 }}>ADMINISTRADOR</div>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ background: "#15002c", borderBottom: "1px solid #e5e7eb", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ fontSize: 13, color: "#ffffff" }}>
            Aerocode › <span style={{ color: "#00c71b", fontWeight: 500 }}>{PAGES.find(p => p.id === page)?.label}</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} title="Sistema online" />
          </div>
        </div>

        <div style={{ padding: 28 }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}