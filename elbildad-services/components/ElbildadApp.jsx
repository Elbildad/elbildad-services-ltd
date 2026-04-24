"use client";

import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy: "#0A0F1E",
  navyL: "#111827",
  navyM: "#1a2235",
  gold: "#C9A84C",
  goldL: "#E8C97A",
  goldD: "#8B6E2E",
  white: "#F8F6F1",
  gray: "#9CA3AF",
  grayL: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { font-family: 'DM Sans', sans-serif; background: ${C.navy}; color: ${C.white}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.navyL}; }
  ::-webkit-scrollbar-thumb { background: ${C.goldD}; border-radius: 3px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .display { font-family: 'Cormorant Garamond', serif; }
  .gold-text { background: linear-gradient(90deg,${C.gold},${C.goldL},${C.gold}); background-size:200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; }
  .glass { background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.15); backdrop-filter:blur(12px); }

  .btn-gold { background:linear-gradient(135deg,${C.gold},${C.goldL}); color:${C.navy}; border:none; padding:12px 28px; font-family:'DM Sans',sans-serif; font-weight:600; font-size:14px; cursor:pointer; transition:all 0.3s; border-radius:2px; }
  .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(201,168,76,0.3); }
  .btn-gold:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

  .btn-outline { background:transparent; color:${C.gold}; border:1px solid ${C.gold}; padding:11px 28px; font-family:'DM Sans',sans-serif; font-weight:500; font-size:14px; cursor:pointer; transition:all 0.3s; border-radius:2px; }
  .btn-outline:hover { background:rgba(201,168,76,0.08); }

  .btn-ghost { background:transparent; color:${C.gray}; border:none; padding:8px 0; font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer; transition:color 0.2s; }
  .btn-ghost:hover { color:${C.white}; }

  .input { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(201,168,76,0.2); color:${C.white}; padding:12px 16px; font-family:'DM Sans',sans-serif; font-size:14px; border-radius:2px; outline:none; transition:border-color 0.2s; }
  .input:focus { border-color:${C.gold}; }
  .input::placeholder { color:${C.gray}; }
  select.input option { background:${C.navyL}; }

  .card { background:${C.navyL}; border:1px solid rgba(201,168,76,0.12); border-radius:4px; padding:24px; transition:border-color 0.3s; }
  .card:hover { border-color:rgba(201,168,76,0.25); }

  .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }
  .b-gold { background:rgba(201,168,76,0.15); color:${C.gold}; }
  .b-success { background:rgba(16,185,129,0.15); color:${C.success}; }
  .b-warning { background:rgba(245,158,11,0.15); color:${C.warning}; }
  .b-danger { background:rgba(239,68,68,0.15); color:${C.danger}; }
  .b-info { background:rgba(59,130,246,0.15); color:${C.info}; }

  .nav-btn { color:${C.gray}; background:none; border:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:color 0.2s; padding:4px 0; }
  .nav-btn:hover { color:${C.gold}; }

  .table { width:100%; border-collapse:collapse; }
  .table th { text-align:left; padding:10px 14px; font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${C.gold}; border-bottom:1px solid rgba(201,168,76,0.15); }
  .table td { padding:13px 14px; font-size:13px; color:${C.grayL}; border-bottom:1px solid rgba(255,255,255,0.04); }
  .table tr:hover td { background:rgba(201,168,76,0.03); }

  .sidebar { width:240px; min-height:100vh; background:${C.navyL}; border-right:1px solid rgba(201,168,76,0.12); display:flex; flex-direction:column; position:fixed; top:0; left:0; bottom:0; z-index:100; overflow-y:auto; }
  .main { margin-left:240px; min-height:100vh; }

  .divider { width:40px; height:2px; background:linear-gradient(90deg,${C.gold},transparent); margin:14px 0; }

  .stat { background:${C.navyM}; border:1px solid rgba(201,168,76,0.12); border-radius:4px; padding:20px 22px; }

  .bubble-user { background:linear-gradient(135deg,${C.gold},${C.goldL}); color:${C.navy}; border-radius:16px 16px 4px 16px; padding:11px 15px; font-size:14px; max-width:80%; align-self:flex-end; font-weight:500; }
  .bubble-ai { background:${C.navyM}; border:1px solid rgba(201,168,76,0.15); color:${C.white}; border-radius:16px 16px 16px 4px; padding:11px 15px; font-size:14px; max-width:85%; align-self:flex-start; line-height:1.65; white-space:pre-wrap; }

  .spinner { width:18px; height:18px; border:2px solid rgba(201,168,76,0.3); border-top:2px solid ${C.gold}; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }

  .hero-bg { background: radial-gradient(ellipse at 15% 50%,rgba(201,168,76,0.09) 0%,transparent 55%), radial-gradient(ellipse at 85% 20%,rgba(201,168,76,0.05) 0%,transparent 50%), ${C.navy}; }

  @media (max-width: 768px) {
    .sidebar { width: 200px; }
    .main { margin-left: 200px; }
    .hide-mobile { display: none !important; }
  }
`;

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const CLIENTS = [
  { id: "C001", name: "Alhaji Sani Danbaba", email: "sani@example.com", password: "client123", phone: "+234 803 111 2233", company: "Danbaba Enterprises", city: "Kano", joinDate: "2024-01-15", status: "active" },
  { id: "C002", name: "Fatima Usman", email: "fatima@example.com", password: "client123", phone: "+234 806 444 5566", company: "Usman Trading Co.", city: "Abuja", joinDate: "2024-03-20", status: "active" },
];

const ORDERS = [
  { id: "ORD-2024-001", clientId: "C001", type: "procurement", description: "Industrial Water Bottling Machine – 5000 BPH", quantity: 2, unitPrice: 18500, currency: "USD", status: "delivered", origin: "Guangzhou, China", destination: "Kano, Nigeria", dateCreated: "2024-11-10", dateUpdated: "2024-12-15", trackingRef: "COSCO-GZ-88721", notes: "Cleared through Apapa Port, NAFDAC approved" },
  { id: "ORD-2024-002", clientId: "C001", type: "procurement", description: "PET Preform Molds (28mm)", quantity: 10, unitPrice: 450, currency: "USD", status: "in-transit", origin: "Shenzhen, China", destination: "Kano, Nigeria", dateCreated: "2024-12-01", dateUpdated: "2024-12-20", trackingRef: "OOCL-SZ-44112", notes: "ETA: Jan 10, 2025 via Tin Can Port" },
  { id: "ORD-2024-003", clientId: "C001", type: "visa", description: "China Business Visa (M-Type) – 1yr Multiple Entry", quantity: 1, unitPrice: 380, currency: "USD", status: "approved", origin: "Abuja, Nigeria", destination: "Beijing, China", dateCreated: "2024-12-05", dateUpdated: "2024-12-18", trackingRef: "VISA-NG-2024-8871", notes: "Valid 1 year multiple entry, collected from embassy" },
  { id: "ORD-2024-004", clientId: "C002", type: "procurement", description: "LED Street Lights 150W Solar", quantity: 200, unitPrice: 85, currency: "USD", status: "processing", origin: "Yiwu, China", destination: "Abuja, Nigeria", dateCreated: "2024-12-10", dateUpdated: "2024-12-20", trackingRef: "ELBD-YW-00234", notes: "SON certification in progress" },
];

const ADMIN = { email: "admin@elbildadservices.com", password: "admin2024" };

// ─── RECEIPT GENERATOR ────────────────────────────────────────────────────────
function buildReceipt(order, client) {
  const sub = order.quantity * order.unitPrice;
  const fee = Math.round(sub * 0.05);
  const total = sub + fee;
  const fmt = (n) => n.toLocaleString();
  const date = new Date(order.dateUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Receipt ${order.id}</title>
<style>
  body{font-family:Georgia,serif;background:#fff;color:#0A0F1E;margin:0;padding:40px;font-size:13px;}
  .hdr{display:flex;justify-content:space-between;border-bottom:3px solid #C9A84C;padding-bottom:24px;margin-bottom:28px;}
  .logo{font-size:22px;font-weight:bold;} .logo span{color:#C9A84C;}
  .meta{text-align:right;color:#666;} .meta h2{font-size:26px;color:#C9A84C;font-weight:300;margin-bottom:4px;}
  h3{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#C9A84C;margin-bottom:10px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;}
  .row{display:flex;gap:8px;margin-bottom:5px;} .lbl{color:#888;width:110px;flex-shrink:0;}
  table{width:100%;border-collapse:collapse;}
  th{background:#0A0F1E;color:#C9A84C;padding:9px 13px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:1px;}
  td{padding:11px 13px;border-bottom:1px solid #eee;}
  .sub td{background:#f9f7f2;} .tot td{background:#0A0F1E;color:#C9A84C;font-weight:bold;font-size:14px;}
  .footer{margin-top:40px;border-top:1px solid #eee;padding-top:16px;text-align:center;font-size:11px;color:#999;}
  .stamp{display:inline-block;border:2px solid #C9A84C;border-radius:50%;padding:10px 14px;transform:rotate(-12deg);color:#C9A84C;font-size:10px;font-weight:bold;text-transform:uppercase;opacity:0.6;margin-left:12px;}
</style></head><body>
<div class="hdr">
  <div>
    <div class="logo">ELBILDAD <span>SERVICES</span> LTD</div>
    <div style="color:#888;margin-top:4px;">Procurement & Global Sourcing · Visa Services</div>
    <div style="color:#888;">Kano, Nigeria · info@elbildadservices.com</div>
  </div>
  <div class="meta">
    <h2>RECEIPT <span class="stamp">${order.status === "delivered" || order.status === "approved" ? "PAID ✓" : "PENDING"}</span></h2>
    <div><strong>${order.id}</strong></div>
    <div>${date}</div>
    <div>Ref: ${order.trackingRef}</div>
  </div>
</div>
<div class="grid">
  <div>
    <h3>Bill To</h3>
    <div class="row"><span class="lbl">Client:</span><strong>${client.name}</strong></div>
    <div class="row"><span class="lbl">Company:</span>${client.company}</div>
    <div class="row"><span class="lbl">City:</span>${client.city}</div>
    <div class="row"><span class="lbl">Phone:</span>${client.phone}</div>
    <div class="row"><span class="lbl">Email:</span>${client.email}</div>
  </div>
  <div>
    <h3>Shipment Info</h3>
    <div class="row"><span class="lbl">Origin:</span>${order.origin}</div>
    <div class="row"><span class="lbl">Destination:</span>${order.destination}</div>
    <div class="row"><span class="lbl">Tracking:</span>${order.trackingRef}</div>
    <div class="row"><span class="lbl">Type:</span>${order.type}</div>
    <div class="row"><span class="lbl">Status:</span><strong style="text-transform:capitalize;color:#065f46;">${order.status}</strong></div>
  </div>
</div>
<h3>Order Details</h3>
<table>
  <thead><tr><th>Description</th><th>Qty</th><th>Unit Price (USD)</th><th>Amount (USD)</th></tr></thead>
  <tbody>
    <tr><td>${order.description}</td><td>${order.quantity}</td><td>$${fmt(order.unitPrice)}</td><td>$${fmt(sub)}</td></tr>
    <tr class="sub"><td colspan="3" style="text-align:right;font-weight:600;">Subtotal</td><td>$${fmt(sub)}</td></tr>
    <tr class="sub"><td colspan="3" style="text-align:right;font-weight:600;">Service Fee (5%)</td><td>$${fmt(fee)}</td></tr>
    <tr class="tot"><td colspan="3" style="text-align:right;">TOTAL (USD)</td><td>$${fmt(total)}</td></tr>
  </tbody>
</table>
${order.notes ? `<p style="margin-top:20px;font-size:12px;color:#555;"><strong>Notes:</strong> ${order.notes}</p>` : ""}
<div class="footer">
  <p>Thank you for choosing Elbildad Services LTD — Your trusted procurement partner</p>
  <p style="margin-top:3px;">This is a computer-generated receipt · RC: XXXXXXX · CAC Registered</p>
</div>
</body></html>`;
}

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Logo({ size = 20 }) {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: size, fontWeight: 600, letterSpacing: 1 }}>
      <span style={{ color: C.white }}>ELBILDAD</span>
      <span style={{ color: C.gold }}> SERVICES</span>
    </div>
  );
}

function TopBar({ title, sub }) {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <div style={{ padding: "18px 28px", borderBottom: `1px solid rgba(201,168,76,0.1)`, background: C.navyL, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div className="display" style={{ fontSize: 20, fontWeight: 500 }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 12, color: C.gray }}>{today}</div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="stat">
      <div style={{ fontSize: 10, color: C.gray, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div className="display" style={{ fontSize: 30, fontWeight: 600, color: color || C.gold }}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { delivered: "b-success", approved: "b-success", "in-transit": "b-warning", processing: "b-info", pending: "b-gold" };
  return <span className={`badge ${map[status] || "b-gold"}`}>{status}</span>;
}

function Sidebar({ page, setPage, user, onLogout, isAdmin }) {
  const links = isAdmin
    ? [
        { id: "a-overview", label: "Overview", icon: "◈" },
        { id: "a-clients", label: "Clients", icon: "◉" },
        { id: "a-orders", label: "All Orders", icon: "≡" },
        { id: "a-new-order", label: "New Order", icon: "+" },
        { id: "a-assistant", label: "AI Assistant", icon: "◎" },
      ]
    : [
        { id: "c-dashboard", label: "Dashboard", icon: "◈" },
        { id: "c-orders", label: "My Orders", icon: "≡" },
        { id: "c-receipts", label: "Receipts", icon: "◉" },
        { id: "c-request", label: "New Request", icon: "+" },
        { id: "c-assistant", label: "AI Assistant", icon: "◎" },
        { id: "c-profile", label: "Profile", icon: "◷" },
      ];

  return (
    <div className="sidebar">
      <div style={{ padding: "24px 20px 16px", borderBottom: `1px solid rgba(201,168,76,0.12)` }}>
        <Logo size={17} />
        <div style={{ fontSize: 9, color: C.goldD, letterSpacing: 2.5, textTransform: "uppercase", marginTop: 5 }}>
          {isAdmin ? "Admin Console" : "Client Portal"}
        </div>
      </div>

      <div style={{ padding: "8px 10px", flex: 1 }}>
        {links.map((l) => {
          const active = page === l.id;
          return (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "9px 12px", borderRadius: 3, marginBottom: 2,
              background: active ? "rgba(201,168,76,0.1)" : "transparent",
              border: "none", borderLeft: active ? `2px solid ${C.gold}` : "2px solid transparent",
              color: active ? C.gold : C.gray,
              cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans',sans-serif",
              fontWeight: active ? 600 : 400, textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 14 }}>{l.icon}</span>{l.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "14px 20px", borderTop: `1px solid rgba(201,168,76,0.12)` }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{user?.name || "Administrator"}</div>
        <div style={{ fontSize: 11, color: C.gray, marginBottom: 10 }}>{user?.email || ADMIN.email}</div>
        <button className="btn-outline" style={{ width: "100%", fontSize: 12, padding: "7px 12px" }} onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

// ─── LANDING ───────────────────────────────────────────────────────────────────
function Landing({ onNav }) {
  const services = [
    { icon: "🚢", title: "China Sourcing", desc: "Direct factory access in Guangzhou, Shenzhen, Yiwu & Ningbo. Full negotiation, quality checks, and consolidation." },
    { icon: "🛃", title: "Import & Clearing", desc: "Form M, port clearing at Apapa, Tin Can & Onne. NAFDAC & SON certification assistance included." },
    { icon: "✈️", title: "Visa Services", desc: "China M-type, L-type, and student visa processing. Embassy liaison, invitation letters, fast turnaround." },
    { icon: "📦", title: "Freight & Logistics", desc: "FCL/LCL sea freight, air freight, door-to-door delivery across Nigeria with real-time cargo tracking." },
    { icon: "🏭", title: "Factory Inspection", desc: "Pre-shipment inspection, factory audits, and QC before goods leave China — protecting your investment." },
    { icon: "💼", title: "Trade Consulting", desc: "HS code classification, import duty advisory, and full trade compliance for Nigerian importers." },
  ];

  const stats = [{ v: "500+", l: "Orders Delivered" }, { v: "₦2B+", l: "Goods Sourced" }, { v: "8+", l: "Years Experience" }, { v: "200+", l: "Happy Clients" }];

  return (
    <div>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(10,15,30,0.94)", backdropFilter: "blur(12px)", borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: "0 56px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Services", "About", "Contact"].map((l) => <button key={l} className="nav-btn hide-mobile">{l}</button>)}
          <button className="btn-outline" style={{ padding: "8px 18px" }} onClick={() => onNav("login")}>Login</button>
          <button className="btn-gold" style={{ padding: "8px 18px" }} onClick={() => onNav("login")}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-bg" style={{ paddingTop: 140, paddingBottom: 100, padding: "140px 80px 100px", minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 760, animation: "fadeUp 0.9s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 36, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase" }}>Kano, Nigeria · Est. 2016</span>
          </div>
          <h1 className="display" style={{ fontSize: 68, fontWeight: 300, lineHeight: 1.08, marginBottom: 24 }}>
            Global Sourcing.<br />
            <span className="gold-text" style={{ fontWeight: 600 }}>Delivered.</span>
          </h1>
          <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.85, maxWidth: 520, marginBottom: 40 }}>
            Nigeria's premier procurement and China sourcing company. We connect businesses to world-class manufacturers — handling everything from factory floor to your door.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button className="btn-gold" style={{ padding: "14px 34px", fontSize: 15 }} onClick={() => onNav("login")}>Access Client Portal</button>
            <button className="btn-outline" style={{ padding: "14px 34px", fontSize: 15 }}>Request a Quote</button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      </div>

      {/* STATS */}
      <div style={{ background: C.navyL, borderTop: `1px solid rgba(201,168,76,0.12)`, borderBottom: `1px solid rgba(201,168,76,0.12)`, padding: "36px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div className="display" style={{ fontSize: 40, fontWeight: 600, color: C.gold }}>{s.v}</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4, letterSpacing: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "72px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>What We Do</div>
          <h2 className="display" style={{ fontSize: 42, fontWeight: 400 }}>End-to-End Procurement Services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {services.map((s) => (
            <div key={s.title} className="card">
              <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
              <div className="divider" />
              <h3 className="display" style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VISA HIGHLIGHT */}
      <div style={{ margin: "0 80px 72px", background: C.navyM, border: `1px solid rgba(201,168,76,0.18)`, borderRadius: 8, padding: "48px 56px", display: "flex", gap: 48, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Visa Services</div>
          <h2 className="display" style={{ fontSize: 38, fontWeight: 400, marginBottom: 16 }}>Going to China for Business?</h2>
          <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.8, marginBottom: 24 }}>We handle China M-type (business), L-type (tourist), and student visa applications for Nigerian applicants. Embassy coordination, invitation letters, and fast processing — all inclusive.</p>
          <button className="btn-gold" onClick={() => onNav("login")}>Apply via Client Portal →</button>
        </div>
        <div style={{ flex: "0 0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 72 }}>✈️</div>
          <div style={{ fontSize: 13, color: C.gray, marginTop: 12 }}>Fast · Reliable · Trusted</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: C.navyL, padding: "72px 80px", textAlign: "center", borderTop: `1px solid rgba(201,168,76,0.12)` }}>
        <h2 className="display" style={{ fontSize: 44, fontWeight: 300, marginBottom: 18 }}>Ready to source from China?</h2>
        <p style={{ color: C.gray, fontSize: 15, marginBottom: 32 }}>Open your client account and submit your first request today.</p>
        <button className="btn-gold" style={{ padding: "15px 48px", fontSize: 16 }} onClick={() => onNav("login")}>Open Your Account →</button>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "28px 80px", borderTop: `1px solid rgba(201,168,76,0.08)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size={16} />
        <div style={{ fontSize: 12, color: C.gray }}>© 2025 Elbildad Services LTD · Kano, Nigeria</div>
        <div style={{ fontSize: 12, color: C.gray }}>info@elbildadservices.com</div>
      </div>
    </div>
  );
}

// ─── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true); setErr("");
    await new Promise((r) => setTimeout(r, 700));
    if (email === ADMIN.email && pass === ADMIN.password) {
      onLogin({ role: "admin" });
    } else {
      const c = CLIENTS.find((c) => c.email === email && c.password === pass);
      if (c) onLogin({ role: "client", user: c });
      else setErr("Invalid credentials. Demo: sani@example.com / client123");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ flex: 1, background: C.navyL, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px", borderRight: `1px solid rgba(201,168,76,0.12)` }} className="hide-mobile">
        <button className="btn-ghost" style={{ marginBottom: 36 }} onClick={onBack}>← Back to website</button>
        <div style={{ fontSize: 10, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 18 }}>Client Portal</div>
        <h1 className="display" style={{ fontSize: 44, fontWeight: 400, marginBottom: 14 }}>Welcome back.</h1>
        <p style={{ color: C.gray, lineHeight: 1.85, fontSize: 14, marginBottom: 44 }}>Manage orders, track shipments, download receipts, and access the AI sourcing assistant — all in one place.</p>
        {["Real-time order tracking", "Auto-generated receipt downloads", "AI sourcing assistant (English + Hausa)", "Visa application management", "Secure document storage"].map((f) => (
          <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.gold }}>✓</div>
            <span style={{ fontSize: 13, color: C.gray }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 48 }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "fadeUp 0.5s ease" }}>
          <Logo />
          <div style={{ margin: "44px 0 28px" }}>
            <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>Sign in to your account</h2>
            <p style={{ fontSize: 12, color: C.gray }}>No account? Contact us to get started.</p>
          </div>

          {err && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 3, padding: "11px 14px", fontSize: 12, color: "#FCA5A5", marginBottom: 18 }}>{err}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>EMAIL</label>
              <input className="input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>PASSWORD</label>
              <input className="input" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
            </div>
          </div>

          <button className="btn-gold" style={{ width: "100%", padding: "13px" }} onClick={submit} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 16, height: 16 }} /> : "Sign In →"}
          </button>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: C.gray, lineHeight: 1.8 }}>
            <div><strong>Admin:</strong> admin@elbildadservices.com / admin2024</div>
            <div><strong>Client:</strong> sani@example.com / client123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT PAGES ──────────────────────────────────────────────────────────────
function ClientDash({ user }) {
  const orders = ORDERS.filter((o) => o.clientId === user.id);
  const total = orders.reduce((s, o) => s + o.quantity * o.unitPrice, 0);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="display" style={{ fontSize: 30, marginBottom: 6 }}>Good day, {user.name.split(" ")[0]} 👋</h2>
        <p style={{ color: C.gray, fontSize: 13 }}>Here's your procurement overview.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Value (USD)" value={`$${total.toLocaleString()}`} color={C.success} />
        <StatCard label="In Transit" value={orders.filter((o) => o.status === "in-transit").length} color={C.warning} />
        <StatCard label="Processing" value={orders.filter((o) => o.status === "processing").length} color={C.info} />
      </div>
      <div className="card">
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Recent Orders</div>
        <table className="table">
          <thead><tr><th>Order ID</th><th>Description</th><th>Type</th><th>Value (USD)</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ fontFamily: "monospace", color: C.gold, fontSize: 12 }}>{o.id}</td>
                <td>{o.description}</td>
                <td style={{ textTransform: "capitalize" }}>{o.type}</td>
                <td>${(o.quantity * o.unitPrice).toLocaleString()}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientOrders({ user }) {
  const orders = ORDERS.filter((o) => o.clientId === user.id);
  return (
    <div style={{ padding: 28 }}>
      <div className="card">
        <table className="table">
          <thead><tr><th>ID</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Origin → Dest</th><th>Tracking</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ fontFamily: "monospace", color: C.gold, fontSize: 11 }}>{o.id}</td>
                <td style={{ maxWidth: 160 }}>{o.description}</td>
                <td>{o.quantity}</td>
                <td>${o.unitPrice.toLocaleString()}</td>
                <td style={{ color: C.gold }}>${(o.quantity * o.unitPrice).toLocaleString()}</td>
                <td style={{ fontSize: 11, color: C.gray }}>{o.origin} → {o.destination}</td>
                <td style={{ fontFamily: "monospace", fontSize: 10, color: C.gray }}>{o.trackingRef}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientReceipts({ user }) {
  const orders = ORDERS.filter((o) => o.clientId === user.id);

  const download = (order) => {
    const html = buildReceipt(order, user);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Receipt-${order.id}-Elbildad.html`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const print = (order) => {
    const html = buildReceipt(order, user);
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close();
    setTimeout(() => w.print(), 600);
  };

  return (
    <div style={{ padding: 28 }}>
      <p style={{ color: C.gray, fontSize: 13, marginBottom: 20 }}>Auto-generated receipts for all your orders. Download as HTML or print as PDF.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map((o) => {
          const total = (o.quantity * o.unitPrice * 1.05).toLocaleString();
          const date = new Date(o.dateUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
          return (
            <div key={o.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: C.gold }}>{o.id}</span>
                  <StatusBadge status={o.status} />
                  <span style={{ fontSize: 11, color: C.gray, textTransform: "capitalize" }}>{o.type}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{o.description}</div>
                <div style={{ fontSize: 12, color: C.gray }}>{date} · Grand Total: <span style={{ color: C.gold }}>${total} USD</span></div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button className="btn-outline" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => print(o)}>🖨 Print</button>
                <button className="btn-gold" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => download(o)}>⬇ Download</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewRequest() {
  const [form, setForm] = useState({ type: "procurement", description: "", quantity: "", budget: "", notes: "" });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (done) return (
    <div style={{ padding: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 360 }}>
      <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
        <h2 className="display" style={{ fontSize: 30, marginBottom: 10 }}>Request Submitted!</h2>
        <p style={{ color: C.gray, marginBottom: 24, fontSize: 14 }}>Our team will review and send you a quote within 24 hours.</p>
        <button className="btn-gold" onClick={() => setDone(false)}>Submit Another</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 28, maxWidth: 620 }}>
      <div className="card">
        <h3 className="display" style={{ fontSize: 22, marginBottom: 24 }}>New Procurement / Visa Request</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>SERVICE TYPE</label>
            <select className="input" value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="procurement">Product Procurement</option>
              <option value="visa">Visa Application</option>
              <option value="freight">Freight Only</option>
              <option value="inspection">Factory Inspection</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>DESCRIPTION</label>
            <textarea className="input" rows={4} placeholder="Describe what you need in detail — product specs, use case, brand preferences..." value={form.description} onChange={(e) => set("description", e.target.value)} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>QUANTITY</label>
              <input className="input" type="number" placeholder="e.g. 100" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>ESTIMATED BUDGET (USD)</label>
              <input className="input" type="number" placeholder="e.g. 5000" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>ADDITIONAL NOTES</label>
            <textarea className="input" rows={3} placeholder="Certifications required, delivery timeline, port preference, special requirements..." value={form.notes} onChange={(e) => set("notes", e.target.value)} style={{ resize: "vertical" }} />
          </div>
          <button className="btn-gold" style={{ padding: "13px", fontSize: 15 }} onClick={() => setDone(true)}>Submit Request →</button>
        </div>
      </div>
    </div>
  );
}

function ClientProfile({ user }) {
  return (
    <div style={{ padding: 28, maxWidth: 520 }}>
      <div className="card">
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 600, color: C.navy }}>{user.name[0]}</div>
          <div>
            <div className="display" style={{ fontSize: 20, fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: C.gray }}>{user.company}</div>
            <span className="badge b-success" style={{ marginTop: 5 }}>Active Client</span>
          </div>
        </div>
        <div className="divider" />
        {[["Client ID", user.id], ["Email", user.email], ["Phone", user.phone], ["Company", user.company], ["City", user.city], ["Member Since", new Date(user.joinDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
            <span style={{ fontSize: 12, color: C.gray }}>{k}</span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PAGES ───────────────────────────────────────────────────────────────
function AdminOverview() {
  const revenue = ORDERS.reduce((s, o) => s + o.quantity * o.unitPrice, 0);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Orders" value={ORDERS.length} />
        <StatCard label="Total Clients" value={CLIENTS.length} color={C.success} />
        <StatCard label="Revenue (USD)" value={`$${revenue.toLocaleString()}`} color={C.info} />
        <StatCard label="In Transit" value={ORDERS.filter((o) => o.status === "in-transit").length} color={C.warning} />
      </div>
      <div className="card">
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>All Orders</div>
        <table className="table">
          <thead><tr><th>Order ID</th><th>Client</th><th>Description</th><th>Type</th><th>Value</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {ORDERS.map((o) => {
              const c = CLIENTS.find((c) => c.id === o.clientId);
              return (
                <tr key={o.id}>
                  <td style={{ fontFamily: "monospace", color: C.gold, fontSize: 11 }}>{o.id}</td>
                  <td style={{ fontSize: 12 }}>{c?.name}</td>
                  <td style={{ maxWidth: 160, fontSize: 12 }}>{o.description}</td>
                  <td style={{ textTransform: "capitalize", fontSize: 12 }}>{o.type}</td>
                  <td style={{ color: C.gold }}>${(o.quantity * o.unitPrice).toLocaleString()}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td style={{ fontSize: 11, color: C.gray }}>{o.dateCreated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminClients() {
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
        {CLIENTS.map((c) => {
          const orders = ORDERS.filter((o) => o.clientId === c.id);
          const value = orders.reduce((s, o) => s + o.quantity * o.unitPrice, 0);
          return (
            <div key={c.id} className="card">
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: C.navy }}>{c.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>{c.company} · {c.city}</div>
                </div>
                <span className="badge b-success">{c.status}</span>
              </div>
              <div className="divider" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Client ID", c.id], ["Email", c.email], ["Phone", c.phone], ["Orders", orders.length], ["Total Value", `$${value.toLocaleString()}`], ["Joined", c.joinDate]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, color: C.gray, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminNewOrder() {
  const [form, setForm] = useState({ clientId: "", type: "procurement", description: "", quantity: "", unitPrice: "", origin: "", destination: "", status: "processing", trackingRef: "", notes: "" });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (done) return (
    <div style={{ padding: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 360 }}>
      <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
        <h2 className="display" style={{ fontSize: 30, marginBottom: 10 }}>Order Created!</h2>
        <p style={{ color: C.gray, marginBottom: 24 }}>Receipt auto-generated. Client will be notified.</p>
        <button className="btn-gold" onClick={() => setDone(false)}>Create Another</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 28, maxWidth: 680 }}>
      <div className="card">
        <h3 className="display" style={{ fontSize: 22, marginBottom: 24 }}>Create New Order</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>CLIENT</label>
            <select className="input" value={form.clientId} onChange={(e) => set("clientId", e.target.value)}>
              <option value="">Select client...</option>
              {CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.company}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>SERVICE TYPE</label>
            <select className="input" value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="procurement">Procurement</option>
              <option value="visa">Visa</option>
              <option value="freight">Freight</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>DESCRIPTION</label>
            <textarea className="input" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>QUANTITY</label>
            <input className="input" type="number" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>UNIT PRICE (USD)</label>
            <input className="input" type="number" value={form.unitPrice} onChange={(e) => set("unitPrice", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>ORIGIN</label>
            <input className="input" placeholder="e.g. Guangzhou, China" value={form.origin} onChange={(e) => set("origin", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>DESTINATION</label>
            <input className="input" placeholder="e.g. Kano, Nigeria" value={form.destination} onChange={(e) => set("destination", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>STATUS</label>
            <select className="input" value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>TRACKING REF</label>
            <input className="input" placeholder="e.g. COSCO-GZ-00001" value={form.trackingRef} onChange={(e) => set("trackingRef", e.target.value)} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: 11, color: C.gray, display: "block", marginBottom: 5, letterSpacing: 0.5 }}>NOTES</label>
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} style={{ resize: "vertical" }} />
          </div>
        </div>
        <button className="btn-gold" style={{ width: "100%", padding: "13px", marginTop: 22, fontSize: 15 }} onClick={() => setDone(true)}>Create Order & Generate Receipt →</button>
      </div>
    </div>
  );
}

// ─── AI ASSISTANT ──────────────────────────────────────────────────────────────
function AIAssistant() {
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Assalamu alaikum! I'm Elbildad's AI assistant. I can help with product sourcing from China, import procedures into Nigeria, visa applications, port processes (Apapa, Tin Can, Onne), NAFDAC/SON requirements, freight costs, and more. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMsgs((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      });
      const data = await res.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.reply || "I couldn't process that. Please try again." }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ height: "calc(100vh - 69px)", display: "flex", flexDirection: "column", padding: "0 28px 28px" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingTop: 24, paddingBottom: 16 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.navy, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>E</div>
            )}
            <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldL})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.navy, fontWeight: 700 }}>E</div>
            <div className="bubble-ai" style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold, animation: `pulse 1.2s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", gap: 10, borderTop: `1px solid rgba(201,168,76,0.12)`, paddingTop: 16 }}>
        <input className="input" placeholder="Ask about sourcing, import duties, visa, port clearing, freight costs..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button className="btn-gold" onClick={send} disabled={loading} style={{ padding: "11px 22px", whiteSpace: "nowrap" }}>Send →</button>
      </div>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
export default function ElbildadApp() {
  const [view, setView] = useState("landing");
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("c-dashboard");

  const login = (a) => {
    setAuth(a);
    setPage(a.role === "admin" ? "a-overview" : "c-dashboard");
    setView("app");
  };

  const logout = () => { setAuth(null); setView("landing"); };

  const renderPage = () => {
    const u = auth?.user;
    const isAdmin = auth?.role === "admin";

    const pageMap = isAdmin
      ? {
          "a-overview": [<TopBar key="t" title="Admin Overview" sub="Elbildad Services LTD" />, <AdminOverview key="p" />],
          "a-clients": [<TopBar key="t" title="Clients" sub="All registered clients" />, <AdminClients key="p" />],
          "a-orders": [<TopBar key="t" title="All Orders" sub="Complete order registry" />, <AdminOverview key="p" />],
          "a-new-order": [<TopBar key="t" title="New Order" sub="Create and assign an order" />, <AdminNewOrder key="p" />],
          "a-assistant": [<TopBar key="t" title="AI Assistant" sub="Powered by Claude" />, <AIAssistant key="p" />],
        }
      : {
          "c-dashboard": [<TopBar key="t" title="Dashboard" sub={`Welcome, ${u?.name}`} />, <ClientDash key="p" user={u} />],
          "c-orders": [<TopBar key="t" title="My Orders" sub="Track all your orders" />, <ClientOrders key="p" user={u} />],
          "c-receipts": [<TopBar key="t" title="Receipts" sub="Download auto-generated receipts" />, <ClientReceipts key="p" user={u} />],
          "c-request": [<TopBar key="t" title="New Request" sub="Submit a procurement or visa request" />, <NewRequest key="p" />],
          "c-assistant": [<TopBar key="t" title="AI Sourcing Assistant" sub="Powered by Claude" />, <AIAssistant key="p" />],
          "c-profile": [<TopBar key="t" title="My Profile" sub="Account details" />, <ClientProfile key="p" user={u} />],
        };

    return pageMap[page] || pageMap[isAdmin ? "a-overview" : "c-dashboard"];
  };

  return (
    <>
      <style>{STYLES}</style>
      {view === "landing" && <Landing onNav={(v) => setView(v)} />}
      {view === "login" && <Login onLogin={login} onBack={() => setView("landing")} />}
      {view === "app" && (
        <div style={{ display: "flex" }}>
          <Sidebar page={page} setPage={setPage} user={auth?.user} onLogout={logout} isAdmin={auth?.role === "admin"} />
          <div className="main">{renderPage()}</div>
        </div>
      )}
    </>
  );
}
