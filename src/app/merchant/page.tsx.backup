"use client"
import { useState, useEffect } from 'react'

export default function MerchantDashboard() {
  const [activePage, setActivePage] = useState('dashboard')
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2800)
  }

  // Wire up nav buttons after mount
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

  // Update visible page
  useEffect(() => {
    const pages = document.querySelectorAll('.page-content')
    pages.forEach(p => {
      const id = p.getAttribute('data-page-id')
      if (id === activePage) p.classList.remove('hidden')
      else p.classList.add('hidden')
    })
    // Update active nav
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
    --bg: #FAFAF7;
    --bg-soft: #F2F1EC;
    --bg-card: #FFFFFF;
    --ink: #0A0A0A;
    --ink-soft: #1A1A1A;
    --muted: #6B6B66;
    --muted-light: #9B9B96;
    --line: #E5E4DE;
    --line-light: #EFEEE9;
    --accent: #2B7FFF;
    --accent-soft: #E8F0FF;
    --accent-dark: #1E5FCC;
    --green: #10B981;
    --green-soft: #D1FAE5;
    --red: #EF4444;
    --red-soft: #FEE2E2;
    --amber: #F59E0B;
    --amber-soft: #FEF3C7;
    --purple: #8B5CF6;
    --purple-soft: #EDE9FE;
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

  /* ========== APP LAYOUT ========== */
  .app {
    display: grid;
    grid-template-columns: 260px 1fr;
    height: 100vh;
  }

  /* ========== SIDEBAR ========== */
  .sidebar {
    background: var(--bg-card);
    border-left: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .sidebar-header {
    padding: 24px 20px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: var(--ink);
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
  }
  .logo-icon::before, .logo-icon::after {
    content: '';
    position: absolute;
    width: 7px; height: 4px;
    background: var(--bg);
    border-radius: 50%;
    top: 13px;
  }
  .logo-icon::before { left: 8px; }
  .logo-icon::after { right: 8px; }
  .logo-icon .smile {
    position: absolute;
    bottom: 9px; left: 50%;
    transform: translateX(-50%);
    width: 18px; height: 6px;
    border-bottom: 2px solid var(--accent);
    border-radius: 0 0 50% 50%;
  }
  .logo-text {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .logo-text .blue { color: var(--accent); }

  .org-switcher {
    margin: 16px 12px 8px;
    padding: 12px 14px;
    background: var(--bg-soft);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .org-switcher:hover { background: var(--line-light); }
  .org-avatar {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 13px;
    flex-shrink: 0;
  }
  .org-info { flex: 1; min-width: 0; }
  .org-name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .org-type {
    font-size: 11px;
    color: var(--muted);
  }
  .org-switcher svg {
    width: 14px; height: 14px;
    color: var(--muted);
  }

  .nav-section {
    padding: 16px 12px;
  }
  .nav-section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted-light);
    padding: 0 12px;
    margin-bottom: 8px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
    color: var(--ink-soft);
    cursor: pointer;
    transition: all 0.15s;
    position: relative;
    margin-bottom: 2px;
    border: none;
    background: none;
    width: 100%;
    font-family: inherit;
    text-align: right;
  }
  .nav-item:hover { background: var(--bg-soft); }
  .nav-item.active {
    background: var(--ink);
    color: white;
  }
  .nav-item.active .nav-icon { color: white; }
  .nav-icon {
    width: 18px; height: 18px;
    color: var(--muted);
    flex-shrink: 0;
  }
  .nav-item .badge {
    margin-right: auto;
    background: var(--accent);
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
  }
  .nav-item.active .badge { background: var(--accent); }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px 12px;
    border-top: 1px solid var(--line);
  }
  .user-card {
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .user-card:hover { background: var(--bg-soft); }
  .user-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: var(--ink);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-email { font-size: 11px; color: var(--muted); }

  /* ========== MAIN ========== */
  .main {
    overflow-y: auto;
    background: var(--bg);
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(250, 250, 247, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--line);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
  }
  .breadcrumb .current { color: var(--ink); font-weight: 500; }
  .breadcrumb svg { width: 12px; height: 12px; }
  .topbar-actions {
    margin-right: auto;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search-box {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 280px;
    transition: all 0.2s;
  }
  .search-box:focus-within {
    border-color: var(--ink);
    box-shadow: 0 0 0 3px var(--bg-soft);
  }
  .search-box input {
    border: none;
    background: none;
    outline: none;
    flex: 1;
    font-family: inherit;
    font-size: 13px;
  }
  .search-box svg { width: 14px; height: 14px; color: var(--muted); }
  .search-box kbd {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    background: var(--bg-soft);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--muted);
  }
  .icon-btn {
    width: 34px; height: 34px;
    border: 1px solid var(--line);
    background: var(--bg-card);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--ink-soft);
    position: relative;
  }
  .icon-btn:hover { background: var(--bg-soft); }
  .icon-btn .ind {
    position: absolute;
    top: 6px; left: 6px;
    width: 6px; height: 6px;
    background: var(--red);
    border-radius: 50%;
    border: 2px solid var(--bg-card);
  }

  /* ========== PAGE CONTENT ========== */
  .page { padding: 32px; max-width: 1600px; }
  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 24px;
    flex-wrap: wrap;
  }
  .page-header h1 {
    font-size: 36px;
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
  .page-header p { color: var(--muted); font-size: 15px; }
  .page-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .btn {
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--ink);
    color: white;
  }
  .btn-primary:hover {
    background: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(43, 127, 255, 0.25);
  }
  .btn-secondary {
    background: var(--bg-card);
    color: var(--ink);
    border: 1px solid var(--line);
  }
  .btn-secondary:hover { background: var(--bg-soft); }
  .btn svg { width: 14px; height: 14px; }

  /* ========== KPI CARDS ========== */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .kpi-card {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 20px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .kpi-card:hover { border-color: var(--ink); }
  .kpi-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .kpi-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .kpi-icon svg { width: 16px; height: 16px; }
  .kpi-icon.blue { background: var(--accent-soft); color: var(--accent); }
  .kpi-icon.green { background: var(--green-soft); color: var(--green); }
  .kpi-icon.amber { background: var(--amber-soft); color: var(--amber); }
  .kpi-icon.purple { background: var(--purple-soft); color: var(--purple); }
  .kpi-label {
    font-size: 12px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.03em;
  }
  .kpi-value {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 8px;
  }
  .kpi-trend {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .kpi-trend.up { color: var(--green); }
  .kpi-trend.down { color: var(--red); }
  .kpi-trend svg { width: 12px; height: 12px; }
  .kpi-trend small { color: var(--muted); }
  .kpi-spark {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 30px;
    opacity: 0.15;
    pointer-events: none;
  }

  /* ========== GRID LAYOUT ========== */
  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .panel {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
  }
  .panel-header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--line-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-title {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .panel-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 2px;
  }
  .panel-actions {
    display: flex;
    gap: 4px;
  }
  .tab {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    background: none;
    border: none;
    font-family: inherit;
  }
  .tab:hover { background: var(--bg-soft); color: var(--ink); }
  .tab.active {
    background: var(--ink);
    color: white;
  }
  .panel-body { padding: 20px; }

  /* ========== CHART ========== */
  .chart-container {
    height: 280px;
    position: relative;
  }
  .chart-svg { width: 100%; height: 100%; }
  .chart-legend {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--line-light);
    font-size: 12px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
  }
  .legend-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }

  /* ========== ACTIVITY FEED ========== */
  .activity-list {
    max-height: 380px;
    overflow-y: auto;
  }
  .activity-item {
    display: flex;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line-light);
  }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .activity-dot svg { width: 14px; height: 14px; }
  .activity-dot.green { background: var(--green-soft); color: var(--green); }
  .activity-dot.blue { background: var(--accent-soft); color: var(--accent); }
  .activity-dot.amber { background: var(--amber-soft); color: var(--amber); }
  .activity-dot.purple { background: var(--purple-soft); color: var(--purple); }
  .activity-content { flex: 1; min-width: 0; }
  .activity-title { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
  .activity-desc { font-size: 12px; color: var(--muted); }
  .activity-time {
    font-size: 11px;
    color: var(--muted-light);
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
  }

  /* ========== TABLE ========== */
  .table-wrap { overflow-x: auto; }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  thead th {
    text-align: right;
    padding: 12px 20px;
    font-size: 11px;
    font-weight: 500;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    background: var(--bg-soft);
    border-bottom: 1px solid var(--line);
  }
  tbody td {
    padding: 14px 20px;
    border-bottom: 1px solid var(--line-light);
  }
  tbody tr { transition: background 0.15s; cursor: pointer; }
  tbody tr:hover { background: var(--bg-soft); }
  tbody tr:last-child td { border-bottom: none; }
  .event-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .event-thumb {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .event-thumb.t1 { background: linear-gradient(135deg, #FFE5B4, #FFA94D); }
  .event-thumb.t2 { background: linear-gradient(135deg, #FFD4E5, #FF6B9D); }
  .event-thumb.t3 { background: linear-gradient(135deg, #C7E5FF, #4A9EFF); }
  .event-thumb.t4 { background: linear-gradient(135deg, #D4F5D4, #4ADE80); }
  .event-thumb.t5 { background: linear-gradient(135deg, #E9D5FF, #A855F7); }
  .event-name {
    font-weight: 500;
    margin-bottom: 2px;
  }
  .event-loc {
    font-size: 11px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .event-loc svg { width: 10px; height: 10px; }
  .progress-bar {
    width: 100px;
    height: 6px;
    background: var(--bg-soft);
    border-radius: 100px;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--purple));
    border-radius: 100px;
  }
  .progress-text {
    font-size: 11px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 500;
  }
  .status::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
  }
  .status.active { background: var(--green-soft); color: var(--green); }
  .status.active::before { background: var(--green); }
  .status.scheduled { background: var(--amber-soft); color: var(--amber); }
  .status.scheduled::before { background: var(--amber); }
  .status.completed { background: var(--bg-soft); color: var(--muted); }
  .status.completed::before { background: var(--muted); }
  .status.draft { background: var(--purple-soft); color: var(--purple); }
  .status.draft::before { background: var(--purple); }

  .row-actions {
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  tbody tr:hover .row-actions { opacity: 1; }
  .row-action-btn {
    width: 28px; height: 28px;
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
    background: var(--ink);
    color: white;
    border-color: var(--ink);
  }
  .row-action-btn svg { width: 12px; height: 12px; }

  /* ========== BOTTOM ROW ========== */
  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* Top performers */
  .performer-list { padding: 8px 0; }
  .performer-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    transition: background 0.2s;
    cursor: pointer;
  }
  .performer-item:hover { background: var(--bg-soft); }
  .performer-rank {
    width: 24px;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 22px;
    color: var(--accent);
    text-align: center;
  }
  .performer-info { flex: 1; min-width: 0; }
  .performer-name { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
  .performer-meta { font-size: 11px; color: var(--muted); }
  .performer-stats {
    text-align: left;
    font-family: 'JetBrains Mono', monospace;
  }
  .performer-num { font-size: 14px; font-weight: 600; }
  .performer-trend { font-size: 10px; color: var(--green); }

  /* Heatmap */
  .heatmap {
    display: grid;
    grid-template-columns: auto repeat(7, 1fr);
    gap: 4px;
    padding: 20px;
  }
  .heatmap-label {
    font-size: 10px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .heatmap-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    background: var(--bg-soft);
    transition: all 0.2s;
    cursor: pointer;
  }
  .heatmap-cell:hover { transform: scale(1.15); }
  .heat-1 { background: rgba(43, 127, 255, 0.15); }
  .heat-2 { background: rgba(43, 127, 255, 0.35); }
  .heat-3 { background: rgba(43, 127, 255, 0.6); }
  .heat-4 { background: rgba(43, 127, 255, 0.85); }
  .heat-5 { background: var(--accent); }
  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px 20px;
    font-size: 11px;
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
  }
  .heatmap-scale {
    display: flex;
    gap: 3px;
  }
  .scale-cell {
    width: 12px; height: 12px;
    border-radius: 3px;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 100px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--muted-light); }

  /* Responsive */
  @media (max-width: 1100px) {
    .app { grid-template-columns: 70px 1fr; }
    .sidebar-header .logo-text,
    .org-info, .nav-section-title, .nav-item span:not(.badge),
    .user-info { display: none; }
    .nav-item { justify-content: center; padding: 10px; }
    .nav-item .badge { display: none; }
    .org-switcher { padding: 8px; justify-content: center; }
    .org-switcher svg { display: none; }
  }
  @media (max-width: 900px) {
    .kpi-row { grid-template-columns: repeat(2, 1fr); }
    .content-grid { grid-template-columns: 1fr; }
    .bottom-grid { grid-template-columns: 1fr; }
    .search-box { display: none; }
  }
  @media (max-width: 600px) {
    .page { padding: 20px 16px; }
    .topbar { padding: 12px 16px; }
    .page-header h1 { font-size: 28px; }
  }

  /* PAGE TRANSITIONS */
  .page-content {
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hidden { display: none !important; }

  /* CREATE EVENT FORM */
  .form-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    max-width: 1100px;
  }
  .form-section {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 24px;
    margin-bottom: 16px;
  }
  .form-section h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .form-section .desc {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 20px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }
  .form-field { margin-bottom: 16px; }
  .form-field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--ink-soft);
  }
  .form-field label .req { color: var(--red); }
  .input, .select, .textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--line);
    border-radius: 8px;
    font-family: inherit;
    font-size: 13px;
    background: var(--bg-card);
    transition: all 0.2s;
  }
  .input:focus, .select:focus, .textarea:focus {
    outline: none;
    border-color: var(--ink);
    box-shadow: 0 0 0 3px var(--bg-soft);
  }
  .textarea { resize: vertical; min-height: 80px; }
  .type-selector {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  .type-card {
    padding: 16px 10px;
    border: 1px solid var(--line);
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--bg-card);
  }
  .type-card:hover { border-color: var(--ink); }
  .type-card.active {
    background: var(--ink);
    color: white;
    border-color: var(--ink);
  }
  .type-card .icon {
    font-size: 22px;
    margin-bottom: 6px;
  }
  .type-card .name {
    font-size: 12px;
    font-weight: 500;
  }
  .preview-card {
    background: linear-gradient(135deg, var(--ink) 0%, #2a2a2a 100%);
    color: white;
    border-radius: 14px;
    padding: 20px;
    position: sticky;
    top: 80px;
  }
  .preview-card h4 {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 16px;
  }
  .preview-event {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 12px;
  }
  .preview-event h5 {
    font-size: 16px;
    margin-bottom: 4px;
  }
  .preview-event .meta {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    margin-bottom: 12px;
  }
  .preview-event .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .preview-event .stat {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
  }
  .preview-event .stat strong {
    display: block;
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-top: 2px;
  }
  .slider-wrap { padding: 8px 4px 0; }
  .slider {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    background: var(--bg-soft);
    border-radius: 100px;
    outline: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    background: var(--accent);
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 0 0 1px var(--accent);
  }
  .slider-value {
    text-align: center;
    margin-top: 8px;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 22px;
    color: var(--accent);
  }

  /* ATTENDEES PAGE */
  .filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .filter-chip {
    padding: 6px 14px;
    border: 1px solid var(--line);
    border-radius: 100px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--bg-card);
  }
  .filter-chip:hover { border-color: var(--ink); }
  .filter-chip.active {
    background: var(--ink);
    color: white;
    border-color: var(--ink);
  }
  .attendee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }
  .attendee-card {
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 18px;
    transition: all 0.2s;
  }
  .attendee-card:hover { border-color: var(--ink); transform: translateY(-2px); }
  .attendee-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .attendee-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .attendee-name { font-size: 14px; font-weight: 600; }
  .attendee-handle { font-size: 11px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
  .attendee-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px 0;
    border-top: 1px solid var(--line-light);
    border-bottom: 1px solid var(--line-light);
    margin-bottom: 12px;
  }
  .attendee-stat .label { font-size: 10px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
  .attendee-stat .value { font-size: 16px; font-weight: 600; }
  .attendee-actions { display: flex; gap: 6px; }
  .attendee-actions .btn { flex: 1; justify-content: center; padding: 8px; font-size: 12px; }

  /* Empty State */
  .empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }
  .empty svg { width: 60px; height: 60px; margin-bottom: 16px; opacity: 0.4; }
  .empty h3 { font-size: 18px; color: var(--ink); margin-bottom: 8px; }
  .empty p { font-size: 14px; margin-bottom: 20px; }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 24px;
    left: 24px;
    background: var(--ink);
    color: white;
    padding: 14px 20px;
    border-radius: 10px;
    font-size: 13px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .toast svg { width: 16px; height: 16px; color: var(--green); }

      `}</style>

<div className="app">

  
  <aside className="sidebar">
    <div className="sidebar-header">
      <img src="/logo-light.jpg" alt="linenotpaid" style={{height:"36px",width:"auto",mixBlendMode:"multiply"}} />
    </div>

    <div className="org-switcher">
      <div className="org-avatar">م ا</div>
      <div className="org-info">
        <div className="org-name">مطعم الأصالة</div>
        <div className="org-type">حساب تجاري</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 10l5 5 5-5"/></svg>
    </div>

    <nav className="nav-section">
      <div className="nav-section-title">الرئيسية</div>
      <button className="nav-item active" data-page="dashboard">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>لوحة التحكم</span>
      </button>
      <button className="nav-item" data-page="events">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>الفعاليات</span>
        <span className="badge">8</span>
      </button>
      <button className="nav-item" data-page="create">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span>إنشاء فعالية</span>
      </button>
      <button className="nav-item" data-page="attendees">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        <span>الحضور</span>
      </button>
    </nav>

    <nav className="nav-section">
      <div className="nav-section-title">التحليلات</div>
      <button className="nav-item" data-page="analytics">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
        <span>الإحصائيات</span>
      </button>
      <button className="nav-item" data-page="reports">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
        <span>التقارير</span>
      </button>
      <button className="nav-item" data-page="rewards">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>المكافآت</span>
      </button>
    </nav>

    <nav className="nav-section">
      <div className="nav-section-title">الإعدادات</div>
      <button className="nav-item" data-page="billing">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>
        <span>الفوترة</span>
      </button>
      <button className="nav-item" data-page="settings">
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        <span>الإعدادات</span>
      </button>
    </nav>

    <div className="sidebar-footer">
      <div className="user-card">
        <div className="user-avatar">م</div>
        <div className="user-info">
          <div className="user-name">محمد العتيبي</div>
          <div className="user-email">m.alotaibi@..</div>
        </div>
      </div>
    </div>
  </aside>

  
  <main className="main">
    <div className="topbar">
      <div className="breadcrumb">
        <span>linenotpaid</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="current" id="bcCurrent">لوحة التحكم</span>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input  type="text" placeholder="ابحث عن فعالية، حاضر، أو تقرير..." />
          <kbd>⌘K</kbd>
        </div>
        <button className="icon-btn" title="الإشعارات">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
          <span className="ind"></span>
        </button>
        <button className="icon-btn" title="المساعدة">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
        </button>
      </div>
    </div>

    
    <div className="page page-content" data-page-id="dashboard" id="page-dashboard">
      <div className="page-header">
        <div>
          <h1>أهلاً <em>محمد</em>،</h1>
          <p>إليك ما يحدث في فعالياتك اليوم — السبت 2 مايو 2026</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            تصدير
          </button>
          <button className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            فعالية جديدة
          </button>
        </div>
      </div>

      
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></svg>
            </div>
            <div className="kpi-label">إجمالي الحضور</div>
          </div>
          <div className="kpi-value">1,247</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            +24%
            <small>عن الشهر السابق</small>
          </div>
          <svg className="kpi-spark" viewBox="0 0 200 30" preserveAspectRatio="none"><polyline points="0,25 25,20 50,22 75,15 100,18 125,10 150,12 175,5 200,8" fill="none" stroke="#2B7FFF" strokeWidth="2"/></svg>
        </div>

        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="kpi-label">فعاليات نشطة</div>
          </div>
          <div className="kpi-value">8</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            +3
            <small>جديدة هذا الأسبوع</small>
          </div>
          <svg className="kpi-spark" viewBox="0 0 200 30" preserveAspectRatio="none"><polyline points="0,20 25,18 50,15 75,17 100,12 125,14 150,8 175,10 200,6" fill="none" stroke="#10B981" strokeWidth="2"/></svg>
        </div>

        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div className="kpi-label">نقاط موزّعة</div>
          </div>
          <div className="kpi-value">125,400</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            +18%
            <small>مقارنة بالشهر</small>
          </div>
          <svg className="kpi-spark" viewBox="0 0 200 30" preserveAspectRatio="none"><polyline points="0,22 25,20 50,18 75,15 100,17 125,12 150,10 175,8 200,5" fill="none" stroke="#F59E0B" strokeWidth="2"/></svg>
        </div>

        <div className="kpi-card">
          <div className="kpi-head">
            <div className="kpi-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
            </div>
            <div className="kpi-label">نسبة الإكمال</div>
          </div>
          <div className="kpi-value">94%</div>
          <div className="kpi-trend up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            +5%
            <small>أداء ممتاز</small>
          </div>
          <svg className="kpi-spark" viewBox="0 0 200 30" preserveAspectRatio="none"><polyline points="0,15 25,12 50,14 75,10 100,8 125,11 150,7 175,5 200,3" fill="none" stroke="#8B5CF6" strokeWidth="2"/></svg>
        </div>
      </div>

      
      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">الحضور خلال الفترة</div>
              <div className="panel-sub">المسجّلين مقابل الحاضرين الفعليين</div>
            </div>
            <div className="panel-actions">
              <button className="tab">يوم</button>
              <button className="tab active">أسبوع</button>
              <button className="tab">شهر</button>
              <button className="tab">سنة</button>
            </div>
          </div>
          <div className="panel-body">
            <div className="chart-container">
              <svg className="chart-svg" viewBox="0 0 700 280" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2B7FFF" stop-opacity="0.25"/>
                    <stop offset="100%" stop-color="#2B7FFF" stop-opacity="0"/>
                  </linearGradient>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.15"/>
                    <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                
                <g stroke="#EFEEE9" strokeWidth="1">
                  <line x1="0" y1="50" x2="700" y2="50"/>
                  <line x1="0" y1="110" x2="700" y2="110"/>
                  <line x1="0" y1="170" x2="700" y2="170"/>
                  <line x1="0" y1="230" x2="700" y2="230"/>
                </g>
                
                <g font-family="JetBrains Mono" font-size="10" fill="#9B9B96">
                  <text x="685" y="54">200</text>
                  <text x="685" y="114">150</text>
                  <text x="685" y="174">100</text>
                  <text x="685" y="234">50</text>
                </g>
                
                <path d="M 50 180 L 150 160 L 250 130 L 350 140 L 450 90 L 550 100 L 650 70 L 650 250 L 50 250 Z" fill="url(#grad2)"/>
                <path d="M 50 180 L 150 160 L 250 130 L 350 140 L 450 90 L 550 100 L 650 70" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 3"/>
                
                <path d="M 50 200 L 150 175 L 250 155 L 350 165 L 450 115 L 550 125 L 650 90 L 650 250 L 50 250 Z" fill="url(#grad1)"/>
                <path d="M 50 200 L 150 175 L 250 155 L 350 165 L 450 115 L 550 125 L 650 90" fill="none" stroke="#2B7FFF" strokeWidth="2.5"/>
                
                <g fill="#2B7FFF">
                  <circle cx="50" cy="200" r="4"/>
                  <circle cx="150" cy="175" r="4"/>
                  <circle cx="250" cy="155" r="4"/>
                  <circle cx="350" cy="165" r="4"/>
                  <circle cx="450" cy="115" r="4"/>
                  <circle cx="550" cy="125" r="4"/>
                  <circle cx="650" cy="90" r="6"/>
                  <circle cx="650" cy="90" r="10" opacity="0.3"/>
                </g>
                
                <g font-family="JetBrains Mono" font-size="10" fill="#9B9B96">
                  <text x="40" y="270">السبت</text>
                  <text x="140" y="270">الأحد</text>
                  <text x="240" y="270">الإثنين</text>
                  <text x="345" y="270">الثلاثاء</text>
                  <text x="442" y="270">الأربعاء</text>
                  <text x="545" y="270">الخميس</text>
                  <text x="645" y="270">الجمعة</text>
                </g>
                
                <g transform="translate(580, 30)">
                  <rect width="100" height="40" rx="6" fill="#0A0A0A"/>
                  <text x="50" y="18" fill="white" font-size="10" font-family="JetBrains Mono" text-anchor="middle">الجمعة</text>
                  <text x="50" y="32" fill="#2B7FFF" font-size="11" font-weight="600" text-anchor="middle">189 حاضر</text>
                </g>
              </svg>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><span className="legend-dot" style={{"background":"#2B7FFF"}}></span>الحاضرون فعلياً</div>
              <div className="legend-item"><span className="legend-dot" style={{"background":"#8B5CF6"}}></span>المسجّلون</div>
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
          <div className="panel-body" style={{"paddingTop":"0"}}>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">سارة الأحمدي حضرت</div>
                  <div className="activity-desc">فعالية افتتاح الفرع الجديد</div>
                </div>
                <div className="activity-time">قبل 2 د</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">5 تسجيلات جديدة</div>
                  <div className="activity-desc">في فعالية ليلة الأحد</div>
                </div>
                <div className="activity-time">قبل 8 د</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot amber">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">100 نقطة وزّعت</div>
                  <div className="activity-desc">بعد إثبات حضور 4 أشخاص</div>
                </div>
                <div className="activity-time">قبل 15 د</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">فعالية جديدة نُشرت</div>
                  <div className="activity-desc">عرض الفطور المجاني</div>
                </div>
                <div className="activity-time">قبل 1 س</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">خالد العنزي حضر</div>
                  <div className="activity-desc">فعالية قهوة الصباح</div>
                </div>
                <div className="activity-time">قبل 2 س</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/></svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">12 تسجيل جديد</div>
                  <div className="activity-desc">عرض الباقة العائلية</div>
                </div>
                <div className="activity-time">قبل 3 س</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="panel" style={{"marginBottom":"24px"}}>
        <div className="panel-header">
          <div>
            <div className="panel-title">الفعاليات النشطة</div>
            <div className="panel-sub">آخر فعالياتك المنشورة</div>
          </div>
          <div className="panel-actions">
            <button className="btn btn-secondary" style={{"fontSize":"12px","padding":"6px 12px"}}>عرض الكل ←</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>الفعالية</th>
                <th>التاريخ</th>
                <th>الحضور</th>
                <th>النقاط</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="event-cell">
                    <div className="event-thumb t1">🍕</div>
                    <div>
                      <div className="event-name">عرض الفطور المجاني</div>
                      <div className="event-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg> الرياض، حي النخيل</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{"fontWeight":"500"}}>الأحد، 4 مايو</div>
                  <div style={{"fontSize":"11px","color":"var(--muted)"}}>8:00 ص</div>
                </td>
                <td>
                  <div className="progress-bar"><div className="progress-fill" style={{"width":"87%"}}></div></div>
                  <div className="progress-text">87 / 100</div>
                </td>
                <td><span className="mono" style={{"fontWeight":"600"}}>100</span></td>
                <td><span className="status active">نشطة</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" title="عرض"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                    <button className="row-action-btn" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="event-cell">
                    <div className="event-thumb t2">☕</div>
                    <div>
                      <div className="event-name">قهوة الصباح المميزة</div>
                      <div className="event-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg> الرياض، حي النخيل</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{"fontWeight":"500"}}>السبت، 3 مايو</div>
                  <div style={{"fontSize":"11px","color":"var(--muted)"}}>7:00 ص</div>
                </td>
                <td>
                  <div className="progress-bar"><div className="progress-fill" style={{"width":"100%"}}></div></div>
                  <div className="progress-text">50 / 50 — مكتمل</div>
                </td>
                <td><span className="mono" style={{"fontWeight":"600"}}>75</span></td>
                <td><span className="status completed">مكتملة</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" title="عرض"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="event-cell">
                    <div className="event-thumb t3">🍔</div>
                    <div>
                      <div className="event-name">برجر اللي الجمعة</div>
                      <div className="event-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg> جدة، الكورنيش</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{"fontWeight":"500"}}>الجمعة، 9 مايو</div>
                  <div style={{"fontSize":"11px","color":"var(--muted)"}}>7:30 م</div>
                </td>
                <td>
                  <div className="progress-bar"><div className="progress-fill" style={{"width":"45%"}}></div></div>
                  <div className="progress-text">90 / 200</div>
                </td>
                <td><span className="mono" style={{"fontWeight":"600"}}>150</span></td>
                <td><span className="status active">نشطة</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" title="عرض"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                    <button className="row-action-btn" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="event-cell">
                    <div className="event-thumb t4">🥗</div>
                    <div>
                      <div className="event-name">سلطة الصحة الذهبية</div>
                      <div className="event-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg> الدمام، الكورنيش</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{"fontWeight":"500"}}>الإثنين، 12 مايو</div>
                  <div style={{"fontSize":"11px","color":"var(--muted)"}}>1:00 م</div>
                </td>
                <td>
                  <div className="progress-bar"><div className="progress-fill" style={{"width":"22%"}}></div></div>
                  <div className="progress-text">22 / 100</div>
                </td>
                <td><span className="mono" style={{"fontWeight":"600"}}>80</span></td>
                <td><span className="status scheduled">مجدولة</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" title="عرض"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="event-cell">
                    <div className="event-thumb t5">🎂</div>
                    <div>
                      <div className="event-name">حفلة افتتاح الفرع الجديد</div>
                      <div className="event-loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg> الرياض، الملقا</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{"fontWeight":"500"}}>الخميس، 15 مايو</div>
                  <div style={{"fontSize":"11px","color":"var(--muted)"}}>6:00 م</div>
                </td>
                <td>
                  <div className="progress-bar"><div className="progress-fill" style={{"width":"0%"}}></div></div>
                  <div className="progress-text">0 / 300 — مسودة</div>
                </td>
                <td><span className="mono" style={{"fontWeight":"600"}}>200</span></td>
                <td><span className="status draft">مسودة</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" title="تعديل"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="bottom-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">أكثر الفعاليات نجاحاً</div>
              <div className="panel-sub">حسب نسبة الإكمال</div>
            </div>
          </div>
          <div className="performer-list">
            <div className="performer-item">
              <div className="performer-rank">١</div>
              <div className="performer-info">
                <div className="performer-name">عرض الفطور المجاني</div>
                <div className="performer-meta">100 حضور · 100 نقطة</div>
              </div>
              <div className="performer-stats">
                <div className="performer-num">100%</div>
                <div className="performer-trend">↑ 12%</div>
              </div>
            </div>
            <div className="performer-item">
              <div className="performer-rank">٢</div>
              <div className="performer-info">
                <div className="performer-name">قهوة الصباح المميزة</div>
                <div className="performer-meta">50 حضور · 75 نقطة</div>
              </div>
              <div className="performer-stats">
                <div className="performer-num">100%</div>
                <div className="performer-trend">↑ 8%</div>
              </div>
            </div>
            <div className="performer-item">
              <div className="performer-rank">٣</div>
              <div className="performer-info">
                <div className="performer-name">برجر الجمعة</div>
                <div className="performer-meta">182 حضور · 150 نقطة</div>
              </div>
              <div className="performer-stats">
                <div className="performer-num">91%</div>
                <div className="performer-trend">↑ 5%</div>
              </div>
            </div>
            <div className="performer-item">
              <div className="performer-rank">٤</div>
              <div className="performer-info">
                <div className="performer-name">عرض الباقة العائلية</div>
                <div className="performer-meta">68 حضور · 120 نقطة</div>
              </div>
              <div className="performer-stats">
                <div className="performer-num">85%</div>
                <div className="performer-trend">↑ 3%</div>
              </div>
            </div>
            <div className="performer-item">
              <div className="performer-rank">٥</div>
              <div className="performer-info">
                <div className="performer-name">سلطة الصحة الذهبية</div>
                <div className="performer-meta">22 حضور · 80 نقطة</div>
              </div>
              <div className="performer-stats">
                <div className="performer-num">73%</div>
                <div className="performer-trend">↑ 2%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">خريطة نشاط الحضور</div>
              <div className="panel-sub">آخر 4 أسابيع — حسب اليوم والساعة</div>
            </div>
          </div>
          <div className="heatmap" id="heatmap"></div>
          <div className="heatmap-legend">
            <span>أقل</span>
            <div className="heatmap-scale">
              <div className="scale-cell" style={{"background":"var(--bg-soft)"}}></div>
              <div className="scale-cell heat-1"></div>
              <div className="scale-cell heat-2"></div>
              <div className="scale-cell heat-3"></div>
              <div className="scale-cell heat-4"></div>
              <div className="scale-cell heat-5"></div>
            </div>
            <span>أكثر</span>
          </div>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="events" id="page-events">
      <div className="page-header">
        <div>
          <h1>كل <em>الفعاليات</em></h1>
          <p>إدارة جميع فعالياتك في مكان واحد</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            تصفية
          </button>
          <button className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            فعالية جديدة
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <button className="filter-chip active">الكل (8)</button>
        <button className="filter-chip">نشطة (4)</button>
        <button className="filter-chip">مجدولة (2)</button>
        <button className="filter-chip">مكتملة (1)</button>
        <button className="filter-chip">مسودات (1)</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>الفعالية</th>
                <th>النوع</th>
                <th>التاريخ</th>
                <th>الحضور</th>
                <th>النقاط</th>
                <th>الحالة</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t1">🍕</div><div><div className="event-name">عرض الفطور المجاني</div><div className="event-loc">الرياض، حي النخيل</div></div></div></td>
                <td>مطعم</td>
                <td>4 مايو · 8:00 ص</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"87%"}}></div></div><div className="progress-text">87 / 100</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>100</td>
                <td><span className="status active">نشطة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t2">☕</div><div><div className="event-name">قهوة الصباح المميزة</div><div className="event-loc">الرياض، حي النخيل</div></div></div></td>
                <td>كافيه</td>
                <td>3 مايو · 7:00 ص</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"100%"}}></div></div><div className="progress-text">50 / 50</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>75</td>
                <td><span className="status completed">مكتملة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t3">🍔</div><div><div className="event-name">برجر الجمعة</div><div className="event-loc">جدة، الكورنيش</div></div></div></td>
                <td>مطعم</td>
                <td>9 مايو · 7:30 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"45%"}}></div></div><div className="progress-text">90 / 200</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>150</td>
                <td><span className="status active">نشطة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t4">🥗</div><div><div className="event-name">سلطة الصحة الذهبية</div><div className="event-loc">الدمام، الكورنيش</div></div></div></td>
                <td>مطعم</td>
                <td>12 مايو · 1:00 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"22%"}}></div></div><div className="progress-text">22 / 100</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>80</td>
                <td><span className="status scheduled">مجدولة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t5">🎂</div><div><div className="event-name">حفلة افتتاح الفرع</div><div className="event-loc">الرياض، الملقا</div></div></div></td>
                <td>افتتاح</td>
                <td>15 مايو · 6:00 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"0%"}}></div></div><div className="progress-text">0 / 300</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>200</td>
                <td><span className="status draft">مسودة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t1">🍝</div><div><div className="event-name">ليلة الإيطالي</div><div className="event-loc">الخبر، الكورنيش</div></div></div></td>
                <td>مطعم</td>
                <td>20 مايو · 8:00 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"60%"}}></div></div><div className="progress-text">120 / 200</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>120</td>
                <td><span className="status active">نشطة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t2">🍰</div><div><div className="event-name">كيك الويكند</div><div className="event-loc">الرياض، حي الملز</div></div></div></td>
                <td>كافيه</td>
                <td>17 مايو · 4:00 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"75%"}}></div></div><div className="progress-text">60 / 80</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>90</td>
                <td><span className="status active">نشطة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
              <tr>
                <td><div className="event-cell"><div className="event-thumb t3">🥤</div><div><div className="event-name">عرض المشروبات الباردة</div><div className="event-loc">جدة، حي الروضة</div></div></div></td>
                <td>كافيه</td>
                <td>25 مايو · 3:00 م</td>
                <td><div className="progress-bar"><div className="progress-fill" style={{"width":"30%"}}></div></div><div className="progress-text">30 / 100</div></td>
                <td className="mono" style={{"fontWeight":"600"}}>60</td>
                <td><span className="status scheduled">مجدولة</span></td>
                <td><div className="row-actions"><button className="row-action-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="create" id="page-create">
      <div className="page-header">
        <div>
          <h1>فعالية <em>جديدة</em></h1>
          <p>أنشئ فعالية في أقل من دقيقتين</p>
        </div>
      </div>

      <div className="form-grid">
        <div>
          <div className="form-section">
            <h3>نوع المشروع</h3>
            <p className="desc">اختر التصنيف الأنسب للفعالية</p>
            <div className="type-selector">
              <div className="type-card active">
                <div className="icon">🍕</div>
                <div className="name">مطعم</div>
              </div>
              <div className="type-card">
                <div className="icon">☕</div>
                <div className="name">كافيه</div>
              </div>
              <div className="type-card">
                <div className="icon">🛍️</div>
                <div className="name">متجر</div>
              </div>
              <div className="type-card">
                <div className="icon">🎉</div>
                <div className="name">مناسبة</div>
              </div>
              <div className="type-card">
                <div className="icon">🏢</div>
                <div className="name">شركة</div>
              </div>
              <div className="type-card">
                <div className="icon">🎓</div>
                <div className="name">مؤتمر</div>
              </div>
              <div className="type-card">
                <div className="icon">💍</div>
                <div className="name">زواج</div>
              </div>
              <div className="type-card">
                <div className="icon">✨</div>
                <div className="name">أخرى</div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>المعلومات الأساسية</h3>
            <p className="desc">سيراها الحاضرون في التطبيق</p>
            <div className="form-field">
              <label>اسم الفعالية <span className="req">*</span></label>
              <input  type="text" className="input" placeholder="مثال: عرض الفطور المجاني" id="eventName" />
            </div>
            <div className="form-field">
              <label>الوصف</label>
              <textarea className="textarea" placeholder="اكتب وصفاً قصيراً للفعالية..." id="eventDesc"></textarea>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>المدينة <span className="req">*</span></label>
                <select className="select"><option>الرياض</option><option>جدة</option><option>الدمام</option><option>الخبر</option><option>مكة</option><option>المدينة</option></select>
              </div>
              <div className="form-field">
                <label>الحي / الموقع</label>
                <input  type="text" className="input" placeholder="مثال: حي النخيل" />
              </div>
            </div>
            <div className="form-field">
              <label>رابط خرائط جوجل</label>
              <input  type="url" className="input" placeholder="https://maps.google.com/..." />
            </div>
          </div>

          <div className="form-section">
            <h3>التوقيت والحضور</h3>
            <p className="desc">حدّد متى وكم شخص تحتاج</p>
            <div className="form-row">
              <div className="form-field">
                <label>التاريخ <span className="req">*</span></label>
                <input  type="date" className="input" />
              </div>
              <div className="form-field">
                <label>الوقت <span className="req">*</span></label>
                <input  type="time" className="input" />
              </div>
            </div>
            <div className="form-field">
              <label>عدد الحضور المطلوب: <span id="attendeeValue" style={{"color":"var(--accent)","fontWeight":"600"}}>100</span></label>
              <div className="slider-wrap">
                <input  type="range" min="10" max="1000" value="100" step="10" className="slider" id="attendeeSlider" />
              </div>
            </div>
            <div className="form-field">
              <label>نقاط لكل حضور: <span id="pointsValue" style={{"color":"var(--accent)","fontWeight":"600"}}>100</span></label>
              <div className="slider-wrap">
                <input  type="range" min="10" max="500" value="100" step="10" className="slider" id="pointsSlider" />
              </div>
            </div>
          </div>

          <div style={{"display":"flex","gap":"10px","justifyContent":"flex-end"}}>
            <button className="btn btn-secondary">حفظ كمسودة</button>
            <button className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              نشر الفعالية
            </button>
          </div>
        </div>

        <div>
          <div className="preview-card">
            <h4>— معاينة مباشرة</h4>
            <div className="preview-event">
              <h5 id="prevName">اسم فعاليتك</h5>
              <div className="meta" id="prevDesc">سيظهر الوصف هنا...</div>
              <div className="stats">
                <div className="stat">
                  العدد المطلوب
                  <strong id="prevAttendees">100</strong>
                </div>
                <div className="stat">
                  النقاط
                  <strong id="prevPoints">100</strong>
                </div>
              </div>
            </div>
            <div style={{"fontSize":"11px","color":"rgba(255,255,255,0.5)","textAlign":"center","marginTop":"8px"}}>هكذا ستظهر فعاليتك للحاضرين</div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="attendees" id="page-attendees">
      <div className="page-header">
        <div>
          <h1>قاعدة <em>الحضور</em></h1>
          <p>1,247 حاضر سجلوا في فعالياتك</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>تصدير CSV</button>
        </div>
      </div>

      <div className="filter-bar">
        <button className="filter-chip active">الكل</button>
        <button className="filter-chip">العملاء الدائمون</button>
        <button className="filter-chip">الجدد</button>
        <button className="filter-chip">VIP</button>
      </div>

      <div className="attendee-grid">
        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #FF6B9D, #C2185B)"}}>س ا</div>
            <div>
              <div className="attendee-name">سارة الأحمدي</div>
              <div className="attendee-handle">@sara_a</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">12</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">890</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">98%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>

        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #4A9EFF, #1E5FCC)"}}>خ ع</div>
            <div>
              <div className="attendee-name">خالد العنزي</div>
              <div className="attendee-handle">@khalid_a</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">8</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">620</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">100%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>

        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #FFA94D, #C2410C)"}}>ن ا</div>
            <div>
              <div className="attendee-name">نورة الشمري</div>
              <div className="attendee-handle">@noura_s</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">15</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">1,200</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">95%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>

        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #A855F7, #6B21A8)"}}>ف ال</div>
            <div>
              <div className="attendee-name">فهد القحطاني</div>
              <div className="attendee-handle">@fahad_q</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">6</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">450</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">92%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>

        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #4ADE80, #15803D)"}}>ر م</div>
            <div>
              <div className="attendee-name">ريم المطيري</div>
              <div className="attendee-handle">@reem_m</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">10</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">780</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">100%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>

        <div className="attendee-card">
          <div className="attendee-head">
            <div className="attendee-avatar" style={{"background":"linear-gradient(135deg, #F59E0B, #92400E)"}}>ع س</div>
            <div>
              <div className="attendee-name">عبدالله السعيد</div>
              <div className="attendee-handle">@a_alsaeed</div>
            </div>
          </div>
          <div className="attendee-stats">
            <div className="attendee-stat"><div className="label">حضور</div><div className="value">4</div></div>
            <div className="attendee-stat"><div className="label">نقاط</div><div className="value">280</div></div>
            <div className="attendee-stat"><div className="label">إكمال</div><div className="value">87%</div></div>
          </div>
          <div className="attendee-actions">
            <button className="btn btn-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>الملف</button>
            <button className="btn btn-primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>رسالة</button>
          </div>
        </div>
      </div>
    </div>

    
    <div className="page page-content hidden" data-page-id="analytics" id="page-analytics">
      <div className="page-header">
        <div>
          <h1>الإحصائيات <em>المتقدمة</em></h1>
          <p>تحليلات عميقة لفعالياتك</p>
        </div>
      </div>
      <div className="empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
        <h3>قسم الإحصائيات المتقدمة</h3>
        <p>سنبني هذا القسم بعد ما نخلّص الأقسام الأساسية</p>
      </div>
    </div>

    <div className="page page-content hidden" data-page-id="reports" id="page-reports">
      <div className="page-header"><div><h1>التقارير <em>الشاملة</em></h1><p>تقارير قابلة للتصدير</p></div></div>
      <div className="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg><h3>قسم التقارير</h3><p>قريباً</p></div>
    </div>

    <div className="page page-content hidden" data-page-id="rewards" id="page-rewards">
      <div className="page-header"><div><h1>إدارة <em>المكافآت</em></h1><p>كتالوج المكافآت والاستبدالات</p></div></div>
      <div className="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><h3>قسم المكافآت</h3><p>قريباً</p></div>
    </div>

    <div className="page page-content hidden" data-page-id="billing" id="page-billing">
      <div className="page-header"><div><h1>الفوترة <em>والاشتراك</em></h1><p>إدارة باقتك والمدفوعات</p></div></div>
      <div className="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg><h3>قسم الفوترة</h3><p>قريباً</p></div>
    </div>

    <div className="page page-content hidden" data-page-id="settings" id="page-settings">
      <div className="page-header"><div><h1>الإعدادات <em>العامة</em></h1><p>إعدادات الحساب والمتجر</p></div></div>
      <div className="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/></svg><h3>قسم الإعدادات</h3><p>قريباً</p></div>
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
