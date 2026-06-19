import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Fleet Control', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    )},
    { id: 'map', name: 'Live Dispatch', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    )},
    { id: 'mpesa', name: 'M-Pesa Terminal', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    )},
    { id: 'analytics', name: 'Analytics Room', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    )}
  ];

  return (
    <div className="sidebar-container" style={{
      background: 'var(--bg-dark)',
      borderRight: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2rem 1.5rem',
      height: '100%'
    }}>
      <div>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-green) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px var(--neon-cyan-glow)',
            color: '#080b11',
            fontWeight: '900',
            fontSize: '1.25rem'
          }}>
            M
          </div>
          <div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>MetroMotion</h2>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontWeight: '500',
              marginTop: '2px'
            }}>Nairobi Smart Fleet</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="interactive-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: isActive ? 'rgba(0, 210, 255, 0.08)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(0, 210, 255, 0.2)' : 'transparent',
                  borderRadius: '10px',
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  willChange: 'transform'
                }}
              >
                <span style={{
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center'
                }}>{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Environment diagnostics */}
      <div className="glass-card" style={{
        padding: '1rem',
        borderRadius: '12px',
        background: 'rgba(8, 11, 17, 0.4)',
        borderColor: 'var(--border-glass)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="status-dot active"></span>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>COMMAND CENTER</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }} className="mono">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Telemetry:</span>
            <span style={{ color: 'var(--neon-green)' }}>ONLINE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Active:</span>
            <span style={{ color: 'var(--text-main)' }}>4 Shuttles</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Dispatch:</span>
            <span style={{ color: 'var(--neon-cyan)' }}>98.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
