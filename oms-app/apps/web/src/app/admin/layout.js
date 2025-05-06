// app/admin/layout.js

'use client';

import Link from 'next/link';
import { useState } from 'react';
import '@/styles/AdminLayout.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* <div className="admin-logo">{sidebarOpen ? `${<AdminPanelSettingsIcon/>} Uravu Admin` : '📦'}</div> */}

        <div className="admin-logo">
          {sidebarOpen ? (
            <>
              <AdminPanelSettingsIcon /> Uravu Admin
            </>
          ) : (
            <AdminPanelSettingsIcon />
          )}
        </div>


        <nav className="admin-nav">
          <Link href="/admin/dashboard" className="admin-nav-link">
            <span className="admin-nav-icon">{<DashboardIcon />}</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link href="/admin/orders" className="admin-nav-link">
            <span className="admin-nav-icon">{<ShoppingCartIcon/>}</span>
            {sidebarOpen && <span>Orders</span>}
          </Link>
          <Link href="/admin/complaints" className="admin-nav-link">
            <span className="admin-nav-icon">{<HelpIcon/>}</span>
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
            {sidebarOpen ? <CloseIcon/> : <MenuIcon/>}
          </button>
          {/* <h1 className="admin-title">Admin Panel</h1>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
              }
              router.push('/login');
            }}
            className="logout-button"
            aria-label="Logout"
          >
            {<LogoutIcon/>}
          </button>
        </header> */}
        <h1 className="admin-title">Admin Panel</h1>

{/* Right Side - User Menu */}
<div className="header-right">
  <button className="header-icon-button" aria-label="Notifications">
    {<NotificationsActiveIcon/>}
  </button>

  {/* User Avatar with Dropdown */}
  <div className="user-dropdown">
    <button className="user-avatar" aria-label="User menu">
      <span>J D</span>
    </button>

    <div className="dropdown-menu">
      <Link href="/admin/profile" className="dropdown-item">
        👤 Profile
      </Link>
      <Link href="/admin/settings" className="dropdown-item">
        ⚙️ Settings
      </Link>
      <button
        onClick={() => {
          if (typeof window !== 'undefined') localStorage.removeItem('user');
          router.push('/login');
        }}
        className="dropdown-item text-red-600 hover:text-red-800"
      >
        🔐 Logout <LogoutIcon/>
      </button>
    </div>
  </div>
</div>
</header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}