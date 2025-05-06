// app/admin/layout.js

'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/styles/AdminLayout.css';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-logo">{sidebarOpen ? '📦 OMS Admin' : '📦'}</div>

        <nav className="admin-nav">
          <Link href="/admin/dashboard" className="admin-nav-link">
            <span className="admin-nav-icon">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/admin/orders" className="admin-nav-link">
            <span className="admin-nav-icon">🛍️</span>
            {sidebarOpen && <span>Orders</span>}
          </Link>
          <Link href="/admin/complaints" className="admin-nav-link">
            <span className="admin-nav-icon">⚠️</span>
            {sidebarOpen && <span>Complaints</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '⬅️' : '➡️'}
          </button>
          <h1 className="admin-title">Admin Panel</h1>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}