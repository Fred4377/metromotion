import React, { useState } from 'react';

const FleetGrid = ({ vehicles, selectedVehicle, setSelectedVehicle }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.01em' }}>Active Fleet Registry</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status and battery metrics of active transit assets</p>
        </div>
        <span className="mono" style={{
          fontSize: '0.75rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-glass)',
          padding: '0.25rem 0.5rem',
          borderRadius: '6px',
          color: 'var(--text-muted)'
        }}>
          Total: {vehicles.length}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        {vehicles.map((v) => {
          const isSelected = selectedVehicle && selectedVehicle.id === v.id;
          const isDelayed = v.status === 'Delayed';
          
          let statusColor = 'var(--neon-green)';
          if (isDelayed) statusColor = 'var(--neon-red)';
          
          return (
            <div
              key={v.id}
              onClick={() => setSelectedVehicle(v)}
              className="glass-card interactive-item"
              style={{
                borderColor: isSelected 
                  ? 'var(--neon-cyan)' 
                  : isDelayed 
                    ? 'rgba(255, 51, 102, 0.4)' 
                    : 'var(--border-glass)',
                boxShadow: isSelected 
                  ? '0 8px 24px rgba(0, 210, 255, 0.12)' 
                  : isDelayed 
                    ? '0 8px 24px rgba(255, 51, 102, 0.08)' 
                    : 'none',
                padding: '1.15rem',
                cursor: 'pointer',
                background: isSelected 
                  ? 'rgba(0, 210, 255, 0.03)' 
                  : isDelayed 
                    ? 'rgba(255, 51, 102, 0.01)' 
                    : 'var(--card-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <span className="mono" style={{
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    color: 'var(--text-main)'
                  }}>{v.plate}</span>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{v.type}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span 
                    className="status-dot" 
                    style={{ 
                      backgroundColor: statusColor,
                      boxShadow: `0 0 6px ${statusColor}`,
                      animation: isDelayed ? 'none' : undefined
                    }}
                  />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: statusColor }}>
                    {v.status}
                  </span>
                </div>
              </div>

              {/* Progress track slider */}
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${v.progress}%`, 
                  background: isDelayed ? 'var(--neon-red)' : 'linear-gradient(90deg, var(--neon-cyan) 0%, var(--neon-green) 100%)',
                  transition: 'width 0.2s linear'
                }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }} className="mono">
                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>Battery / Fuel</span>
                  <span style={{ color: v.battery < 30 ? 'var(--neon-red)' : 'var(--text-main)', fontWeight: '600' }}>{v.battery}%</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>Speed</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{isDelayed ? 0 : v.speed} km/h</span>
                </div>
              </div>

              {v.alert && (
                <div style={{
                  marginTop: '0.75rem',
                  background: 'rgba(255, 51, 102, 0.1)',
                  border: '1px solid rgba(255, 51, 102, 0.2)',
                  borderRadius: '6px',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--neon-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {v.alert}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Asset details Panel */}
      {selectedVehicle && (
        <div className="glass-card" style={{
          padding: '1rem 1.25rem',
          background: 'rgba(8, 11, 17, 0.4)',
          borderColor: 'var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'fadeInUp 0.3s ease-out forwards'
        }}>
          <div>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SELECTED FLEET ASSET</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginTop: '0.15rem' }}>
              {selectedVehicle.plate} — {selectedVehicle.driver}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Route: <span style={{ color: 'var(--neon-cyan)', fontWeight: '600' }}>{selectedVehicle.route}</span> ({selectedVehicle.progress}% traversed)
            </p>
          </div>
          <div style={{ textAlign: 'right' }} className="mono">
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Occupancy</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--neon-green)' }}>
              {selectedVehicle.passengers} / {selectedVehicle.capacity} Pax
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetGrid;
