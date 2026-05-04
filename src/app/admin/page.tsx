"use client"
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('overview')
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('[data-page]') as HTMLElement | null
      if (btn) {
        const page = btn.getAttribute('data-page')
        if (page) setActivePage(page)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    document.querySelectorAll('.page-content').forEach(p => {
      const id = p.getAttribute('data-page-id')
      if (id === activePage) p.classList.remove('hidden')
      else p.classList.add('hidden')
    })
    document.querySelectorAll('.nav-item').forEach(n => {
      const page = n.getAttribute('data-page')
      if (page === activePage) n.classList.add('active')
      else n.classList.remove('active')
    })
  }, [activePage])

  return (
    <>
      <style jsx global>{`

  :root {
    /* Admin uses DARK theme to differentiate from merchant */
    --bg: #0A0A0B;
    --bg-soft: #131316;
    --bg-card: #18181B;
    --bg-card-hover: #1F1F23;
    --ink: #FAFAF9;
    --ink-soft: #E4E4E7;
    --muted: #A1A1AA;
    --muted-light: #71717A;
    --line: #27272A;
    --line-light: #1F1F23;
    --accent: #2B7FFF;
    --accent-soft: rgba(43, 127, 255, 0.12);
    --accent-bright: #4D96FF;
    --green: #10B981;
    --green-soft: rgba(16, 185, 129, 0.12);
    --red: #EF4444;
    --red-soft: rgba(239, 68, 68, 0.12);
    --amber: #F59E0B;
    --amber-soft: rgba(245, 158, 11, 0.12);
    --purple: #A855F7;
    --purple-soft: rgba(168, 85, 247, 0.12);
    --pink: #EC4899;
    --pink-soft: rgba(236, 72, 153, 0.12);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.6;
    overflow: hidden;
    font-feature-settings: "ss01", "ss02";
  }
  .serif { font-family: 'Instrument Serif', serif; font-weight: 400; }
  .mono { font-family: 'JetBrains Mono', monospace; }

  /* App Layout */
  .app { display: grid; grid-template-columns: 240px 1fr; height: 100vh; }

  /* Sidebar */
  .sidebar {
    background: #060607;
    border-left: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-icon {
    width: 34px; height: 34px;
    background: var(--ink);
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
  }
  .logo-icon::before, .logo-icon::after {
    content: '';
    position: absolute;
    width: 6px; height: 4px;
    background: var(--bg);
    border-radius: 50%;
    top: 12px;
  }
  .logo-icon::before { left: 8px; }
  .logo-icon::after { right: 8px; }
  .logo-icon .smile {
    position: absolute;
    bottom: 9px; left: 50%;
    transform: translateX(-50%);
    width: 16px; height: 5px;
    border-bottom: 2px solid var(--accent);
    border-radius: 0 0 50% 50%;
  }
  .logo-text {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .logo-text .blue { color: var(--accent); }
  .logo-badge {
    margin-right: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: white;
    padding: 3px 7px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  /* Admin profile mini */
  .admin-mini {
    margin: 14px 12px 8px;
    padding: 10px 12px;
    background: linear-gradient(135deg, rgba(43, 127, 255, 0.1), rgba(168, 85, 247, 0.05));
    border: 1px solid var(--line);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .admin-avatar {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 11px;
    flex-shrink: 0;
  }
  .admin-info { flex: 1; min-width: 0; }
  .admin-name { font-size: 12px; font-weight: 600; }
  .admin-role { font-size: 10px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }

  .nav-section { padding: 14px 10px; }
  .nav-section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted-light);
    padding: 0 12px;
    margin-bottom: 6px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 7px;
    font-size: 13px;
    color: var(--ink-soft);
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 1px;
    border: none;
    background: none;
    width: 100%;
    font-family: inherit;
    text-align: right;
    position: relative;
  }
  .nav-item:hover { background: var(--bg-soft); }
  .nav-item.active {
    background: var(--bg-card);
    color: white;
  }
  .nav-item.active::before {
    content: '';
    position: absolute;
    right: 0;
    top: 8px; bottom: 8px;
    width: 2px;
    background: var(--accent);
    border-radius: 2px;
  }
  .nav-icon {
    width: 16px; height: 16px;
    color: var(--muted);
    flex-shrink: 0;
  }
  .nav-item.active .nav-icon { color: var(--accent); }
  .nav-item .badge {
    margin-right: auto;
    background: var(--bg-soft);
    color: var(--muted);
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
  }
  .nav-item.active .badge { background: var(--accent); color: white; }
  .nav-item .badge.alert { background: var(--red); color: white; }

  .sidebar-footer {
    margin-top: auto;
    padding: 12px;
    border-top: 1px solid var(--line);
  }
  .system-status {
    padding: 10px 12px;
    background: var(--green-soft);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pulse-dot {
    width: 8px; height: 8px;
    background: var(--green);
    border-radius: 50%;
    position: relative;
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  .status-text { font-size: 11px; }
  .status-label { color: var(--green); font-weight: 500; }
  .status-uptime { font-family: 'JetBrains Mono', monospace; color: var(--muted); font-size: 10px; }

  /* Main */
  .main {
    overflow-y: auto;
    background: var(--bg);
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(10, 10, 11, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--line);
    padding: 14px 28px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--muted);
  }
  .breadcrumb .current { color: var(--ink); font-weight: 500; }
  .breadcrumb svg { width: 11px; height: 11px; }
  .topbar-right {
    margin-right: auto;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search-box {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 7px;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 280px;
    transition: all 0.2s;
  }
  .search-box:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  .search-box input {
    border: none; background: none; outline: none; flex: 1;
    font-family: inherit;
    font-size: 12px;
    color: var(--ink);
  }
  .search-box input::placeholder { color: var(--muted); }
  .search-box svg { width: 13px; height: 13px; color: var(--muted); }
  .search-box kbd {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    background: var(--bg-soft);
    padding: 2px 5px;
    border-radius: 3px;
    color: var(--muted);
  }
  .icon-btn {
    width: 32px; height: 32px;
    border: 1px solid var(--line);
    background: var(--bg-card);
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--ink-soft);
    position: relative;
  }
  .icon-btn:hover { background: var(--bg-card-hover); border-color: var(--accent); }
  .icon-btn svg { width: 14px; height: 14px; }
  .icon-btn .ind {
    position: absolute;
    top: 5px; left: 5px;
    width: 6px; height: 6px;
    background: var(--red);
    border-radius: 50%;
    border: 2px solid var(--bg-card);
  }

  /* Page */
  .page { padding: 28px; max-width: 1700px; }
  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
    gap: 20px;
    flex-wrap: wrap;
  }
  .page-header h1 {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 6px;
  }
  .page-header h1 em {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
  }
  .page-header p { color: var(--muted); font-size: 13px; }
  .page-actions { display: flex; gap: 8px; align-items: center; }

  .btn {
    padding: 9px 16px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--ink);
    color: var(--bg);
  }
  .btn-primary:hover {
    background: var(--accent);
    color: white;
  }
  .btn-secondary {
    background: var(--bg-card);
    color: var(--ink);
    border: 1px solid var(--line);
  }
  .btn-secondary:hover { background: var(--bg-card-hover); border-color: var(--accent); }
  .btn-danger {
    background: var(--red-soft);
    color: var(--red);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
  .btn-danger:hover { background: var(--red); color: white; }
  .btn svg { width: 13px; height: 13px; }

  /* ===== KPI Hero — Revenue at top ===== */
  .revenue-hero {
    background: linear-gradient(135deg, var(--bg-card) 0%, #1A1A1F 100%);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .revenue-hero::before {
    content: '';
    position: absolute;
    top: -100px; left: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, var(--accent-soft) 0%, transparent 70%);
    pointer-events: none;
  }
  .revenue-hero::after {
    content: '';
    position: absolute;
    bottom: -150px; right: -150px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, var(--purple-soft) 0%, transparent 70%);
    pointer-events: none;
  }
  .revenue-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 32px;
    position: relative;
    z-index: 2;
  }
  .revenue-main h2 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .revenue-amount {
    font-size: 64px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 14px;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .revenue-amount .currency {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
    font-size: 32px;
  }
  .revenue-trend {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
  }
  .trend-pill {
    background: var(--green-soft);
    color: var(--green);
    padding: 4px 10px;
    border-radius: 100px;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .revenue-breakdown {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  .breakdown-title {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 14px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .breakdown-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .breakdown-item {
    padding-right: 16px;
    border-right: 1px solid var(--line);
  }
  .breakdown-item:first-child { padding-right: 0; border-right: none; }
  .breakdown-item.last { border-right: none; }
  .breakdown-label {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .breakdown-value {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }
  .breakdown-pct {
    font-size: 10px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .breakdown-bar {
    margin-top: 8px;
    height: 3px;
    background: var(--line);
    border-radius: 100px;
    overflow: hidden;
  }
  .breakdown-bar > div { height: 100%; border-radius: 100px; }

  /* Right side - mini chart */
  .revenue-chart {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 18px;
  }
  .chart-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .chart-head h3 { font-size: 12px; }
  .chart-tabs {
    display: flex;
    gap: 2px;
    background: var(--bg-soft);
    padding: 2px;
    border-radius: 6px;
  }
  .chart-tab {
    padding: 4px 10px;
    font-size: 10px;
    color: var(--muted);
    cursor: pointer;
    border-radius: 4px;
    border: none;
    background: none;
    font-family: inherit;
  }
  .chart-tab.active {
    background: var(--bg-card);
    color: var(--ink);
  }

  /* ===== KPI Cards ===== */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }
  .kpi-card {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 18px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .kpi-card:hover { border-color: var(--accent); transform: translateY(-1px); }
  .kpi-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .kpi-icon {
    width: 30px; height: 30px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .kpi-icon svg { width: 14px; height: 14px; }
  .kpi-icon.blue { background: var(--accent-soft); color: var(--accent); }
  .kpi-icon.green { background: var(--green-soft); color: var(--green); }
  .kpi-icon.amber { background: var(--amber-soft); color: var(--amber); }
  .kpi-icon.purple { background: var(--purple-soft); color: var(--purple); }
  .kpi-icon.pink { background: var(--pink-soft); color: var(--pink); }
  .kpi-icon.red { background: var(--red-soft); color: var(--red); }
  .kpi-label {
    font-size: 11px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.03em;
  }
  .kpi-value {
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 6px;
  }
  .kpi-trend {
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .kpi-trend.up { color: var(--green); }
  .kpi-trend.down { color: var(--red); }
  .kpi-trend small { color: var(--muted); }

  /* ===== Grid Layouts ===== */
  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .row-3 { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 16px; }

  .panel {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
  }
  .panel-header {
    padding: 16px 18px;
    border-bottom: 1px solid var(--line-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-title {
    font-size: 13px;
    font-weight: 600;
  }
  .panel-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }
  .panel-actions {
    display: flex;
    gap: 4px;
  }
  .tab-btn {
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 11px;
    color: var(--muted);
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
  }
  .tab-btn:hover { background: var(--bg-soft); color: var(--ink); }
  .tab-btn.active { background: var(--accent); color: white; }
  .panel-body { padding: 18px; }

  /* ===== Tables ===== */
  .table-wrap { overflow-x: auto; }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  thead th {
    text-align: right;
    padding: 10px 18px;
    font-size: 10px;
    font-weight: 500;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: var(--bg-soft);
    border-bottom: 1px solid var(--line);
  }
  tbody td {
    padding: 12px 18px;
    border-bottom: 1px solid var(--line-light);
  }
  tbody tr {
    transition: background 0.15s;
    cursor: pointer;
  }
  tbody tr:hover { background: var(--bg-soft); }
  tbody tr:last-child td { border-bottom: none; }

  .merchant-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .merchant-avatar {
    width: 32px; height: 32px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 11px;
    flex-shrink: 0;
  }
  .merchant-name { font-weight: 500; margin-bottom: 1px; }
  .merchant-id {
    font-size: 10px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }

  .merchant-type {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 500;
  }
  .merchant-type.restaurant { background: var(--amber-soft); color: var(--amber); }
  .merchant-type.cafe { background: var(--purple-soft); color: var(--purple); }
  .merchant-type.company { background: var(--accent-soft); color: var(--accent); }
  .merchant-type.individual { background: var(--pink-soft); color: var(--pink); }
  .merchant-type.store { background: var(--green-soft); color: var(--green); }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 9px;
    border-radius: 100px;
    font-size: 10px;
    font-weight: 500;
  }
  .status::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
  }
  .status.active { background: var(--green-soft); color: var(--green); }
  .status.active::before { background: var(--green); }
  .status.pending { background: var(--amber-soft); color: var(--amber); }
  .status.pending::before { background: var(--amber); }
  .status.suspended { background: var(--red-soft); color: var(--red); }
  .status.suspended::before { background: var(--red); }
  .status.review { background: var(--purple-soft); color: var(--purple); }
  .status.review::before { background: var(--purple); }

  .plan-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 4px;
    background: var(--bg-soft);
    color: var(--ink-soft);
    border: 1px solid var(--line);
  }
  .plan-tag.starter { color: var(--muted); }
  .plan-tag.pro { color: var(--accent); border-color: rgba(43,127,255,0.3); }
  .plan-tag.enterprise {
    background: linear-gradient(135deg, rgba(43,127,255,0.15), rgba(168,85,247,0.15));
    color: var(--accent-bright);
    border-color: var(--accent);
  }

  .row-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  tbody tr:hover .row-actions { opacity: 1; }
  .row-action-btn {
    width: 26px; height: 26px;
    border: 1px solid var(--line);
    background: var(--bg-card);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--muted);
    transition: all 0.15s;
  }
  .row-action-btn:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }
  .row-action-btn svg { width: 12px; height: 12px; }

  /* ===== Activity Feed ===== */
  .activity-list { padding: 0 18px; max-height: 380px; overflow-y: auto; }
  .activity-item {
    display: flex;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line-light);
  }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .activity-dot svg { width: 12px; height: 12px; }
  .activity-dot.green { background: var(--green-soft); color: var(--green); }
  .activity-dot.blue { background: var(--accent-soft); color: var(--accent); }
  .activity-dot.amber { background: var(--amber-soft); color: var(--amber); }
  .activity-dot.purple { background: var(--purple-soft); color: var(--purple); }
  .activity-dot.red { background: var(--red-soft); color: var(--red); }
  .activity-content { flex: 1; min-width: 0; }
  .activity-title { font-size: 12px; font-weight: 500; margin-bottom: 1px; }
  .activity-desc { font-size: 11px; color: var(--muted); }
  .activity-time {
    font-size: 10px;
    color: var(--muted-light);
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
  }

  /* ===== Approval Queue ===== */
  .approval-card {
    padding: 14px 18px;
    border-bottom: 1px solid var(--line-light);
    transition: background 0.15s;
  }
  .approval-card:hover { background: var(--bg-soft); }
  .approval-card:last-child { border-bottom: none; }
  .approval-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .approval-merchant {
    font-size: 12px;
    font-weight: 500;
    flex: 1;
  }
  .approval-time {
    font-size: 10px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .approval-event {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 8px;
    padding: 8px 10px;
    background: var(--bg-soft);
    border-radius: 6px;
    border-right: 2px solid var(--accent);
  }
  .approval-actions {
    display: flex;
    gap: 6px;
  }
  .approval-actions .btn {
    flex: 1;
    justify-content: center;
    padding: 6px;
    font-size: 11px;
  }

  /* ===== Top Cities Map ===== */
  .city-list { padding: 14px 18px; }
  .city-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--line-light);
  }
  .city-item:last-child { border-bottom: none; }
  .city-flag {
    font-size: 20px;
    width: 32px;
    text-align: center;
  }
  .city-info { flex: 1; }
  .city-name { font-size: 12px; font-weight: 500; margin-bottom: 4px; }
  .city-bar {
    height: 4px;
    background: var(--bg-soft);
    border-radius: 100px;
    overflow: hidden;
  }
  .city-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--purple));
    border-radius: 100px;
  }
  .city-count {
    text-align: left;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }
  .city-num { font-weight: 600; }
  .city-pct { color: var(--muted); font-size: 10px; }

  /* Filter Bar */
  .filter-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .filter-chip {
    padding: 5px 12px;
    border: 1px solid var(--line);
    border-radius: 100px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--bg-card);
    color: var(--ink-soft);
    font-family: inherit;
  }
  .filter-chip:hover { border-color: var(--accent); color: var(--accent); }
  .filter-chip.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }

  /* ===== Plans Grid ===== */
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 18px;
  }
  .plan-card {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 22px;
    position: relative;
    transition: all 0.2s;
  }
  .plan-card:hover { border-color: var(--accent); }
  .plan-card.featured {
    border-color: var(--accent);
    background: linear-gradient(135deg, var(--bg-card) 0%, rgba(43,127,255,0.05) 100%);
  }
  .plan-card.featured::before {
    content: 'الأكثر شعبية';
    position: absolute;
    top: -10px;
    right: 22px;
    background: var(--accent);
    color: white;
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.05em;
  }
  .plan-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .plan-desc {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 16px;
  }
  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }
  .plan-price .amount {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .plan-price .currency {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    color: var(--accent);
  }
  .plan-price .period {
    font-size: 11px;
    color: var(--muted);
  }
  .plan-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .plan-stat .label {
    font-size: 10px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 2px;
  }
  .plan-stat .value {
    font-size: 16px;
    font-weight: 600;
  }
  .plan-stat .change {
    font-size: 10px;
    color: var(--green);
    margin-top: 2px;
  }

  /* ===== Hidden pages ===== */
  .page-content { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hidden { display: none !important; }

  /* Empty */
  .empty {
    text-align: center;
    padding: 80px 20px;
    color: var(--muted);
  }
  .empty-icon {
    width: 60px; height: 60px;
    margin: 0 auto 16px;
    opacity: 0.4;
  }
  .empty h3 { font-size: 16px; color: var(--ink); margin-bottom: 6px; }
  .empty p { font-size: 12px; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 100px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--muted-light); }

  @media (max-width: 1100px) {
    .app { grid-template-columns: 60px 1fr; }
    .sidebar-header .logo-text, .sidebar-header .logo-badge,
    .admin-info, .nav-section-title, .nav-item span:not(.badge),
    .system-status .status-text { display: none; }
    .nav-item { justify-content: center; padding: 10px; }
    .nav-item .badge { display: none; }
    .admin-mini { padding: 8px; justify-content: center; }
    .system-status { justify-content: center; }
    .revenue-grid { grid-template-columns: 1fr; }
    .breakdown-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 900px) {
    .kpi-row { grid-template-columns: repeat(2, 1fr); }
    .row-2, .row-3 { grid-template-columns: 1fr; }
    .plans-grid { grid-template-columns: 1fr; }
    .search-box { display: none; }
  }

      `}</style>


<div className="app">
  
  <aside className="sidebar">
    <div className="sidebar-header">
      <img src="/logo-light.jpg" alt="linenotpaid" style={{height:"36px",width:"auto",mixBlendMode:"multiply"}} />
      <div className="logo-badge">ADMIN</div>
    </div>

    <div className="admin-mini">
      <div className="admin-avatar">SU</div>
      <div className="admin-info">
        <div className="admin-name">سوبر أدمن</div>
        <div className="admin-role">Super Admin</div>
      </div>
    </div>

    <nav className="nav-section">
      <div className="nav-section-title">نظرة عامة</div>
      <button className="nav-item active" data-page="overview">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>نظرة عامة</span>
      </button>
      <button className="nav-item" data-page="revenue">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        <span>الإيرادات</span>
      </button>
      <button className="nav-item" data-page="analytics">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <span>التحليلات</span>
      </button>
    </nav>

    <nav className="nav-section">
      <div className="nav-section-title">الإدارة</div>
      <button className="nav-item" data-page="merchants">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h18l-2 13H5L3 3zM3 3L2 0M16 21a1 1 0 100-2 1 1 0 000 2zM9 21a1 1 0 100-2 1 1 0 000 2z"/></svg>
        <span>التجار والشركات</span>
        <span className="badge">2.4K</span>
      </button>
      <button className="nav-item" data-page="users">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        <span>المستخدمون</span>
        <span className="badge">87K</span>
      </button>
      <button className="nav-item" data-page="events">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>الفعاليات</span>
      </button>
    <nav className="nav-section">
      <div className="nav-section-title">المالية</div>
      <button className="nav-item" data-page="subscriptions">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>
        <span>الاشتراكات</span>
      <button className="nav-item" data-page="withdrawals" onClick={() => window.location.href="/admin/withdrawals"}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        <span>طلبات السحب</span>
      </button>
      </button>
      <button className="nav-item" data-page="commissions">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/></svg>
        <span>العمولات</span>
      </button>
      <button className="nav-item" data-page="payouts">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        <span>المدفوعات</span>
      </button>
      <button className="nav-item" data-page="plans">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        <span>الباقات والأسعار</span>
      </button>
    </nav>

    <nav className="nav-section">
      <div className="nav-section-title">النظام</div>
      <button className="nav-item" data-page="support">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
        <span>الدعم الفني</span>
        <span className="badge">7</span>
      </button>
      <button className="nav-item" data-page="reports">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
        <span>التقارير</span>
      </button>
      <button className="nav-item" data-page="logs">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>سجل النشاطات</span>
      </button>
      <button className="nav-item" data-page="settings">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        <span>إعدادات النظام</span>
      </button>
    </nav>

    <div className="sidebar-footer">
      <div className="system-status">
        <div className="pulse-dot"></div>
        <div className="status-text">
          <div className="status-label">النظام يعمل</div>
          <div className="status-uptime">99.98% uptime</div>
        </div>
      </div>
    </div>
  </aside>

  
  <main className="main">
    <div className="topbar">
      <div className="breadcrumb">
        <span>Admin Console</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="current" id="bcCurrent">نظرة عامة</span>
      </div>
      <div className="topbar-right">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="ابحث عن تاجر، فعالية، أو مستخدم..." />
          <kbd>⌘K</kbd>
        </div>
        <button className="icon-btn" title="الإشعارات">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="ind"></span>
        </button>
        <button className="icon-btn" title="إعدادات سريعة">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>

    
    <div className="page page-content" data-page-id="overview" id="page-overview">
      <div className="page-header">
        <div>
          <h1>نظرة <em>عامة</em></h1>
          <p>السبت 2 مايو 2026 — كل شي تحت السيطرة</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            تصدير التقرير
          </button>
          <button className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            تحديث
          </button>
        </div>
      </div>

      
      <div className="revenue-hero">
        <div className="revenue-grid">
          <div className="revenue-main">
            <h2>— الإيرادات الإجمالية لهذا الشهر</h2>
            <div className="revenue-amount">
              <span>847,250</span>
              <span className="currency">ريال</span>
            </div>
            <div className="revenue-trend">
              <span className="trend-pill">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                +32.4%
              </span>
              <span style={{"color":"var(--muted)","fontSize":"12px"}}>مقارنة بالشهر السابق</span>
            </div>

            <div className="revenue-breakdown">
              <div className="breakdown-title">— توزيع مصادر الإيراد</div>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <div className="breakdown-label">اشتراكات التجار</div>
                  <div className="breakdown-value">412,800</div>
                  <div className="breakdown-pct">48.7% — 1,847 تاجر</div>
                  <div className="breakdown-bar"><div style={{"width":"48.7%","background":"var(--accent)"}}></div></div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">عمولات الحملات (15%)</div>
                  <div className="breakdown-value">287,450</div>
                  <div className="breakdown-pct">33.9% — 1.9M ريال حملات</div>
                  <div className="breakdown-bar"><div style={{"width":"33.9%","background":"var(--purple)"}}></div></div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">باقات الأفراد</div>
                  <div className="breakdown-value">98,600</div>
                  <div className="breakdown-pct">11.6% — 4,930 مشترك</div>
                  <div className="breakdown-bar"><div style={{"width":"11.6%","background":"var(--green)"}}></div></div>
                </div>
                <div className="breakdown-item last">
                  <div className="breakdown-label">رسوم تسجيل</div>
                  <div className="breakdown-value">48,400</div>
                  <div className="breakdown-pct">5.7% — 12,100 مستخدم</div>
                  <div className="breakdown-bar"><div style={{"width":"5.7%","background":"var(--amber)"}}></div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="revenue-chart">
            <div className="chart-head">
              <h3>الإيرادات اليومية</h3>
              <div className="chart-tabs">
                <button className="chart-tab">7Y</button>
                <button className="chart-tab active">30Y</button>
                <button className="chart-tab">90Y</button>
              </div>
            </div>
            <svg viewBox="0 0 400 200" preserveAspectRatio="none" style={{"width":"100%","height":"200px"}}>
              <defs>
                <linearGradient id="rgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2B7FFF" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#2B7FFF" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <g stroke="#27272A" strokeWidth="0.5" opacity="0.5">
                <line x1="0" y1="50" x2="400" y2="50"/>
                <line x1="0" y1="100" x2="400" y2="100"/>
                <line x1="0" y1="150" x2="400" y2="150"/>
              </g>
              <path d="M 0 150 L 30 145 L 60 130 L 90 135 L 120 110 L 150 115 L 180 95 L 210 100 L 240 80 L 270 70 L 300 75 L 330 50 L 360 45 L 400 30 L 400 200 L 0 200 Z" fill="url(#rgrad)"/>
              <path d="M 0 150 L 30 145 L 60 130 L 90 135 L 120 110 L 150 115 L 180 95 L 210 100 L 240 80 L 270 70 L 300 75 L 330 50 L 360 45 L 400 30" fill="none" stroke="#2B7FFF" strokeWidth="2"/>
              <circle cx="400" cy="30" r="4" fill="#2B7FFF"/>
              <circle cx="400" cy="30" r="8" fill="#2B7FFF" opacity="0.3"/>
            </svg>
            <div style={{"display":"flex","justifyContent":"space-between","marginTop":"12px","fontSize":"10px","color":"var(--muted)","fontFamily":"'JetBrains Mono', monospace"}}>
              <span>أبريل 1</span>
              <span>أبريل 15</span>
              <span>مايو 1</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18l-2 13H5L3 3z"/></svg>
            </div>
            <div className="kpi-label">إجمالي التجار</div>
          </div>
          <div className="kpi-value">2,418</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
            +147 <small>هذا الشهر</small>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div className="kpi-label">المستخدمون النشطون</div>
          </div>
          <div className="kpi-value">87,432</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
            +12.8% <small>WoW</small>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4"/></svg>
            </div>
            <div className="kpi-label">فعاليات نشطة</div>
          </div>
          <div className="kpi-value">1,847</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
            +24% <small>عن الشهر</small>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="kpi-label">الحضور الموثق</div>
          </div>
          <div className="kpi-value">48,290</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
            +18.3% <small>هذا الأسبوع</small>
          </div>
        </div>
      </div>

      
      <div className="row-3">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">قائمة المراجعة العاجلة</div>
              <div className="panel-sub">12 طلب يحتاج موافقتك الآن</div>
            </div>
            <div className="panel-actions">
              <button className="btn btn-secondary" style={{"fontSize":"11px"}}>عرض الكل ←</button>
            </div>
          </div>
          <div>
            <div className="approval-card">
              <div className="approval-head">
                <div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #2B7FFF, #1E5FCC)"}}>ش ا</div>
                <div className="approval-merchant">شركة الأمل للمقاولات</div>
                <div className="approval-time">قبل 5 د</div>
              </div>
              <div className="approval-event">
                <strong>طلب تسجيل جديد</strong> · شركة · الرياض · ميزانية متوقعة 50,000 ريال شهرياً
              </div>
              <div className="approval-actions">
                <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> موافقة</button>
                <button className="btn btn-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> رفض</button>
                <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </div>
            </div>
            <div className="approval-card">
              <div className="approval-head">
                <div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #EC4899, #BE185D)"}}>م خ</div>
                <div className="approval-merchant">محمد الخالدي</div>
                <div className="approval-time">قبل 12 د</div>
              </div>
              <div className="approval-event">
                <strong>فعالية حفل زواج</strong> · فرد · جدة · 800 معزوم · ميزانية 8,000 ريال (عمولة: 1,200)
              </div>
              <div className="approval-actions">
                <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> موافقة</button>
                <button className="btn btn-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> رفض</button>
                <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </div>
            </div>
            <div className="approval-card">
              <div className="approval-head">
                <div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #F59E0B, #92400E)"}}>ك م</div>
                <div className="approval-merchant">كافيه المرسى</div>
                <div className="approval-time">قبل 28 د</div>
              </div>
              <div className="approval-event">
                <strong>تحديث باقة</strong> · من Pro إلى Enterprise · زيادة 800 ريال شهرياً
              </div>
              <div className="approval-actions">
                <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> موافقة</button>
                <button className="btn btn-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> رفض</button>
                <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </div>
            </div>
            <div className="approval-card">
              <div className="approval-head">
                <div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #A855F7, #6B21A8)"}}>م ر</div>
                <div className="approval-merchant">مطعم الرومنسية</div>
                <div className="approval-time">قبل 1 س</div>
              </div>
              <div className="approval-event">
                <strong>فعالية مشبوهة</strong> · 1,100 شخص بنفس الوقت — يحتاج تحقق يدوي
              </div>
              <div className="approval-actions">
                <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> موافقة</button>
                <button className="btn btn-danger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> رفض</button>
                <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">آخر النشاطات</div>
              <div className="panel-sub">في الوقت الفعلي</div>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">دفعة جديدة: 12,500 ريال</div>
                <div className="activity-desc">من شركة الأمل — اشتراك Enterprise سنوي</div>
              </div>
              <div className="activity-time">الآن</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">147 تاجر جديد</div>
                <div className="activity-desc">انضموا في آخر 24 ساعة</div>
              </div>
              <div className="activity-time">قبل 5 د</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">تنبيه: نشاط غير عادي</div>
                <div className="activity-desc">3 تسجيلات من نفس IP</div>
              </div>
              <div className="activity-time">قبل 18 د</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">باقة Premium جديدة</div>
                <div className="activity-desc">سارة الأحمدي — 99 ريال شهرياً</div>
              </div>
              <div className="activity-time">قبل 32 د</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">125 فعالية جديدة</div>
                <div className="activity-desc">منشورة اليوم</div>
              </div>
              <div className="activity-time">قبل 1 س</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">إيقاف حساب</div>
                <div className="activity-desc">فعاليات وهمية — متجر الفاخر</div>
              </div>
              <div className="activity-time">قبل 2 س</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="activity-content">
                <div className="activity-title">عمولة محصّلة: 4,800 ريال</div>
                <div className="activity-desc">من حملة افتتاح فرع stc الجديد</div>
              </div>
              <div className="activity-time">قبل 3 س</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row-2">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">أفضل التجار حسب الإيرادات</div>
              <div className="panel-sub">آخر 30 يوم</div>
            </div>
            <div className="panel-actions">
              <button className="tab-btn active">إيراد</button>
              <button className="tab-btn">حضور</button>
              <button className="tab-btn">فعاليات</button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>التاجر</th>
                  <th>النوع</th>
                  <th>الباقة</th>
                  <th>الإيراد</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #2B7FFF, #1E5FCC)"}}>س ت</div><div><div className="merchant-name">stc السعودية</div><div className="merchant-id">#M-1842</div></div></div></td>
                  <td><span className="merchant-type company">شركة</span></td>
                  <td><span className="plan-tag enterprise">Enterprise</span></td>
                  <td className="mono" style={{"fontWeight":"600"}}>42,800 ر</td>
                </tr>
                <tr>
                  <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #F59E0B, #92400E)"}}>ك ا</div><div><div className="merchant-name">كنتاكي العربية</div><div className="merchant-id">#M-1721</div></div></div></td>
                  <td><span className="merchant-type restaurant">مطعم</span></td>
                  <td><span className="plan-tag enterprise">Enterprise</span></td>
                  <td className="mono" style={{"fontWeight":"600"}}>38,200 ر</td>
                </tr>
                <tr>
                  <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #A855F7, #6B21A8)"}}>د م</div><div><div className="merchant-name">دانكن مكة</div><div className="merchant-id">#M-1693</div></div></div></td>
                  <td><span className="merchant-type cafe">كافيه</span></td>
                  <td><span className="plan-tag pro">Pro</span></td>
                  <td className="mono" style={{"fontWeight":"600"}}>28,400 ر</td>
                </tr>
                <tr>
                  <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #10B981, #047857)"}}>ا ا</div><div><div className="merchant-name">إكسترا الإلكترونيات</div><div className="merchant-id">#M-1654</div></div></div></td>
                  <td><span className="merchant-type store">متجر</span></td>
                  <td><span className="plan-tag pro">Pro</span></td>
                  <td className="mono" style={{"fontWeight":"600"}}>22,100 ر</td>
                </tr>
                <tr>
                  <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #EC4899, #BE185D)"}}>م ر</div><div><div className="merchant-name">مطعم الرومنسية</div><div className="merchant-id">#M-1612</div></div></div></td>
                  <td><span className="merchant-type restaurant">مطعم</span></td>
                  <td><span className="plan-tag pro">Pro</span></td>
                  <td className="mono" style={{"fontWeight":"600"}}>18,750 ر</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">التوزيع الجغرافي</div>
              <div className="panel-sub">المستخدمون النشطون حسب المدينة</div>
            </div>
          </div>
          <div className="city-list">
            <div className="city-item">
              <div className="city-flag">🏙️</div>
              <div className="city-info">
                <div className="city-name">الرياض</div>
                <div className="city-bar"><div className="city-fill" style={{"width":"100%"}}></div></div>
              </div>
              <div className="city-count">
                <div className="city-num">32,418</div>
                <div className="city-pct">37.0%</div>
              </div>
            </div>
            <div className="city-item">
              <div className="city-flag">🌊</div>
              <div className="city-info">
                <div className="city-name">جدة</div>
                <div className="city-bar"><div className="city-fill" style={{"width":"76%"}}></div></div>
              </div>
              <div className="city-count">
                <div className="city-num">24,672</div>
                <div className="city-pct">28.2%</div>
              </div>
            </div>
            <div className="city-item">
              <div className="city-flag">🛢️</div>
              <div className="city-info">
                <div className="city-name">الدمام والخبر</div>
                <div className="city-bar"><div className="city-fill" style={{"width":"51%"}}></div></div>
              </div>
              <div className="city-count">
                <div className="city-num">16,540</div>
                <div className="city-pct">18.9%</div>
              </div>
            </div>
            <div className="city-item">
              <div className="city-flag">🕋</div>
              <div className="city-info">
                <div className="city-name">مكة المكرمة</div>
                <div className="city-bar"><div className="city-fill" style={{"width":"28%"}}></div></div>
              </div>
              <div className="city-count">
                <div className="city-num">8,940</div>
                <div className="city-pct">10.2%</div>
              </div>
            </div>
            <div className="city-item">
              <div className="city-flag">🌴</div>
              <div className="city-info">
                <div className="city-name">المدينة المنورة</div>
                <div className="city-bar"><div className="city-fill" style={{"width":"14%"}}></div></div>
              </div>
              <div className="city-count">
                <div className="city-num">4,862</div>
                <div className="city-pct">5.6%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="panel" style={{"marginTop":"16px"}}>
        <div className="panel-header">
          <div>
            <div className="panel-title">أداء الباقات</div>
            <div className="panel-sub">المشتركون النشطون والإيرادات لكل باقة</div>
          </div>
          <div className="panel-actions">
            <button className="btn btn-secondary" style={{"fontSize":"11px"}}>إدارة الباقات</button>
          </div>
        </div>
        <div className="panel-body">
          <div className="plans-grid">
            <div className="plan-card">
              <div className="plan-name">Starter</div>
              <div className="plan-desc">للمشاريع الناشئة</div>
              <div className="plan-price">
                <span className="amount">199</span>
                <span className="currency">ر</span>
                <span className="period">/شهر</span>
              </div>
              <div className="plan-stats">
                <div className="plan-stat">
                  <div className="label">المشتركون</div>
                  <div className="value">1,247</div>
                  <div className="change">↑ +18 هذا الأسبوع</div>
                </div>
                <div className="plan-stat">
                  <div className="label">الإيراد الشهري</div>
                  <div className="value">248K ر</div>
                  <div className="change">↑ +12.3%</div>
                </div>
              </div>
            </div>
            <div className="plan-card featured">
              <div className="plan-name">Pro</div>
              <div className="plan-desc">للمشاريع المتوسطة</div>
              <div className="plan-price">
                <span className="amount">499</span>
                <span className="currency">ر</span>
                <span className="period">/شهر</span>
              </div>
              <div className="plan-stats">
                <div className="plan-stat">
                  <div className="label">المشتركون</div>
                  <div className="value">524</div>
                  <div className="change">↑ +42 هذا الأسبوع</div>
                </div>
                <div className="plan-stat">
                  <div className="label">الإيراد الشهري</div>
                  <div className="value">261K ر</div>
                  <div className="change">↑ +28.4%</div>
                </div>
              </div>
            </div>
            <div className="plan-card">
              <div className="plan-name">Enterprise</div>
              <div className="plan-desc">للشركات الكبرى</div>
              <div className="plan-price">
                <span className="amount">1,999</span>
                <span className="currency">ر</span>
                <span className="period">/شهر</span>
              </div>
              <div className="plan-stats">
                <div className="plan-stat">
                  <div className="label">المشتركون</div>
                  <div className="value">76</div>
                  <div className="change">↑ +5 هذا الأسبوع</div>
                </div>
                <div className="plan-stat">
                  <div className="label">الإيراد الشهري</div>
                  <div className="value">152K ر</div>
                  <div className="change">↑ +18.7%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="merchants" id="page-merchants">
      <div className="page-header">
        <div>
          <h1>التجار <em>والشركات</em></h1>
          <p>2,418 تاجر مسجل — 1,847 منهم نشط</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> تصدير</button>
          <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> إضافة يدوية</button>
        </div>
      </div>

      <div className="filter-bar">
        <button className="filter-chip active">الكل (2,418)</button>
        <button className="filter-chip">مطاعم (847)</button>
        <button className="filter-chip">كافيهات (612)</button>
        <button className="filter-chip">شركات (423)</button>
        <button className="filter-chip">متاجر (387)</button>
        <button className="filter-chip">أفراد (149)</button>
        <button className="filter-chip">قيد المراجعة (12)</button>
        <button className="filter-chip">معلّقون (8)</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>التاجر</th>
                <th>النوع</th>
                <th>المدينة</th>
                <th>الباقة</th>
                <th>الفعاليات</th>
                <th>الإيراد الشهري</th>
                <th>الحالة</th>
                <th>تاريخ الانضمام</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #2B7FFF, #1E5FCC)"}}>س ت</div><div><div className="merchant-name">stc السعودية</div><div className="merchant-id">#M-1842 · sa.stc@..</div></div></div></td>
                <td><span className="merchant-type company">شركة</span></td>
                <td>الرياض</td>
                <td><span className="plan-tag enterprise">Enterprise</span></td>
                <td className="mono">24</td>
                <td className="mono" style={{"fontWeight":"600"}}>42,800 ر</td>
                <td><span className="status active">نشط</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>12-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #F59E0B, #92400E)"}}>ك ا</div><div><div className="merchant-name">كنتاكي العربية</div><div className="merchant-id">#M-1721 · kfc.sa@..</div></div></div></td>
                <td><span className="merchant-type restaurant">مطعم</span></td>
                <td>جدة</td>
                <td><span className="plan-tag enterprise">Enterprise</span></td>
                <td className="mono">18</td>
                <td className="mono" style={{"fontWeight":"600"}}>38,200 ر</td>
                <td><span className="status active">نشط</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>11-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #A855F7, #6B21A8)"}}>د م</div><div><div className="merchant-name">دانكن مكة</div><div className="merchant-id">#M-1693 · dunkin@..</div></div></div></td>
                <td><span className="merchant-type cafe">كافيه</span></td>
                <td>مكة</td>
                <td><span className="plan-tag pro">Pro</span></td>
                <td className="mono">12</td>
                <td className="mono" style={{"fontWeight":"600"}}>28,400 ر</td>
                <td><span className="status active">نشط</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>10-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #10B981, #047857)"}}>ا ا</div><div><div className="merchant-name">إكسترا الإلكترونيات</div><div className="merchant-id">#M-1654 · extra@..</div></div></div></td>
                <td><span className="merchant-type store">متجر</span></td>
                <td>الرياض</td>
                <td><span className="plan-tag pro">Pro</span></td>
                <td className="mono">8</td>
                <td className="mono" style={{"fontWeight":"600"}}>22,100 ر</td>
                <td><span className="status active">نشط</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>09-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #EC4899, #BE185D)"}}>م ر</div><div><div className="merchant-name">مطعم الرومنسية</div><div className="merchant-id">#M-1612 · romance@..</div></div></div></td>
                <td><span className="merchant-type restaurant">مطعم</span></td>
                <td>جدة</td>
                <td><span className="plan-tag pro">Pro</span></td>
                <td className="mono">14</td>
                <td className="mono" style={{"fontWeight":"600"}}>18,750 ر</td>
                <td><span className="status review">مراجعة</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>08-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #8B5CF6, #5B21B6)"}}>م خ</div><div><div className="merchant-name">محمد الخالدي</div><div className="merchant-id">#M-1598 · m.alkhaldi@..</div></div></div></td>
                <td><span className="merchant-type individual">فرد</span></td>
                <td>جدة</td>
                <td><span className="plan-tag starter">Starter</span></td>
                <td className="mono">2</td>
                <td className="mono" style={{"fontWeight":"600"}}>1,200 ر</td>
                <td><span className="status pending">معلّق</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>05-2026</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #06B6D4, #0E7490)"}}>ك م</div><div><div className="merchant-name">كافيه المرسى</div><div className="merchant-id">#M-1502 · marsa@..</div></div></div></td>
                <td><span className="merchant-type cafe">كافيه</span></td>
                <td>الخبر</td>
                <td><span className="plan-tag pro">Pro</span></td>
                <td className="mono">6</td>
                <td className="mono" style={{"fontWeight":"600"}}>8,400 ر</td>
                <td><span className="status active">نشط</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>07-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="merchant-cell"><div className="merchant-avatar" style={{"background":"linear-gradient(135deg, #EF4444, #991B1B)"}}>م ف</div><div><div className="merchant-name">متجر الفاخر</div><div className="merchant-id">#M-1487 · fakher@..</div></div></div></td>
                <td><span className="merchant-type store">متجر</span></td>
                <td>الرياض</td>
                <td><span className="plan-tag starter">Starter</span></td>
                <td className="mono">0</td>
                <td className="mono" style={{"fontWeight":"600"}}>0 ر</td>
                <td><span className="status suspended">معلّق</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>06-2024</td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="commissions" id="page-commissions">
      <div className="page-header">
        <div>
          <h1>عمولات <em>الحملات</em></h1>
          <p>15% من قيمة كل حملة ترفعها الشركات</p>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
            <div className="kpi-label">إجمالي العمولات هذا الشهر</div>
          </div>
          <div className="kpi-value">287,450 ر</div>
          <div className="kpi-trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> +28.4%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
            <div className="kpi-label">إجمالي ميزانيات الحملات</div>
          </div>
          <div className="kpi-value">1.916M ر</div>
          <div className="kpi-trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> +24.7%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/></svg></div>
            <div className="kpi-label">حملات مدفوعة</div>
          </div>
          <div className="kpi-value">412</div>
          <div className="kpi-trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> +18%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon amber"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <div className="kpi-label">في انتظار التحصيل</div>
          </div>
          <div className="kpi-value">42,800 ر</div>
          <div className="kpi-trend"><small>14 حملة</small></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">آخر الحملات والعمولات</div>
            <div className="panel-sub">تفصيل العمولة لكل حملة</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>الحملة</th>
                <th>الشركة</th>
                <th>ميزانية الحملة</th>
                <th>العمولة (15%)</th>
                <th>الحضور</th>
                <th>الحالة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>افتتاح فرع stc الجديد</strong></td>
                <td>stc السعودية</td>
                <td className="mono">320,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 48,000 ر</td>
                <td className="mono">1,847 / 2,000</td>
                <td><span className="status active">مكتملة</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-04-28</td>
              </tr>
              <tr>
                <td><strong>إطلاق وجبة جديدة</strong></td>
                <td>كنتاكي العربية</td>
                <td className="mono">180,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 27,000 ر</td>
                <td className="mono">3,200 / 4,000</td>
                <td><span className="status active">مكتملة</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-04-25</td>
              </tr>
              <tr>
                <td><strong>عرض رمضان السنوي</strong></td>
                <td>دانكن مكة</td>
                <td className="mono">95,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 14,250 ر</td>
                <td className="mono">2,140 / 2,500</td>
                <td><span className="status active">مكتملة</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-04-20</td>
              </tr>
              <tr>
                <td><strong>تجربة المنتج الجديد</strong></td>
                <td>إكسترا الإلكترونيات</td>
                <td className="mono">68,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 10,200 ر</td>
                <td className="mono">820 / 1,000</td>
                <td><span className="status pending">جارية</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-04-30</td>
              </tr>
              <tr>
                <td><strong>حفل زواج محمد الخالدي</strong></td>
                <td>محمد الخالدي (فرد)</td>
                <td className="mono">8,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 1,200 ر</td>
                <td className="mono">— / 800</td>
                <td><span className="status review">مراجعة</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-05-02</td>
              </tr>
              <tr>
                <td><strong>افتتاح فرع كافيه المرسى</strong></td>
                <td>كافيه المرسى</td>
                <td className="mono">42,000 ر</td>
                <td className="mono" style={{"color":"var(--green)","fontWeight":"600"}}>+ 6,300 ر</td>
                <td className="mono">— / 500</td>
                <td><span className="status pending">جارية</span></td>
                <td className="mono" style={{"color":"var(--muted)"}}>2026-05-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="revenue" id="page-revenue">
      <div className="page-header"><div><h1>الإيرادات <em>التفصيلية</em></h1><p>تحليل عميق لمصادر الدخل</p></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg><h3>صفحة الإيرادات</h3><p>تحت التطوير — قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="analytics" id="page-analytics">
      <div className="page-header"><div><h1>التحليلات <em>المتقدمة</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/></svg><h3>التحليلات</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="users" id="page-users">
      <div className="page-header"><div><h1>المستخدمون <em>الأفراد</em></h1><p>87,432 مستخدم نشط</p></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><h3>قاعدة المستخدمين</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="events" id="page-events">
      <div className="page-header"><div><h1>كل <em>الفعاليات</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/></svg><h3>الفعاليات</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="approvals" id="page-approvals">
      <div className="page-header"><div><h1>قائمة <em>المراجعة</em></h1><p>12 طلب يحتاج موافقة</p></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><h3>قائمة المراجعة الكاملة</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="subscriptions" id="page-subscriptions">
      <div className="page-header"><div><h1>إدارة <em>الاشتراكات</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/></svg><h3>الاشتراكات</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="payouts" id="page-payouts">
      <div className="page-header"><div><h1>المدفوعات <em>المالية</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1v22"/></svg><h3>المدفوعات</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="plans" id="page-plans">
      <div className="page-header"><div><h1>الباقات <em>والأسعار</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg><h3>الباقات</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="support" id="page-support">
      <div className="page-header"><div><h1>الدعم <em>الفني</em></h1><p>7 تذاكر مفتوحة</p></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8"/></svg><h3>الدعم الفني</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="reports" id="page-reports">
      <div className="page-header"><div><h1>التقارير <em>الشاملة</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg><h3>التقارير</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="logs" id="page-logs">
      <div className="page-header"><div><h1>سجل <em>النشاطات</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><h3>السجل الكامل</h3><p>قريباً</p></div>
    </div>
    <div className="page page-content hidden" data-page-id="settings" id="page-settings">
      <div className="page-header"><div><h1>إعدادات <em>النظام</em></h1></div></div>
      <div className="empty"><svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/></svg><h3>إعدادات النظام</h3><p>قريباً</p></div>
    </div>
  </main>
</div>




      {toast && (
        <div className="toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {toast}
        </div>
      )}
    </>
  )
}
