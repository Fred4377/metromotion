import React, { useState } from 'react';

const FleetAnalytics = () => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const ridershipData = [
    { day: 'Mon', value: 1850, height: 110 },
    { day: 'Tue', value: 2100, height: 125 },
    { day: 'Wed', value: 2420, height: 145 },
    { day: 'Thu', value: 2280, height: 135 },
    { day: 'Fri', value: 2650, height: 160 }
  ];

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.01em' }}>Environmental & Telemetry Analytics</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Passenger volume stats and carbon emissions reductions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', alignItems: 'center' }}>
        {/* SVG Bar Chart for Daily Ridership */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>Daily Passenger Volume</span>
          
          <div style={{ position: 'relative', width: '100%', height: '180px', display: 'flex', alignItems: 'flex-end' }}>
            <svg viewBox="0 0 240 180" style={{ width: '100%', height: '100%' }}>
              {/* Grid Lines */}
              <line x1="20" y1="30" x2="230" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="130" x2="230" y2="130" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="20" y1="160" x2="230" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Draw bars */}
              {ridershipData.map((bar, i) => {
                const barWidth = 24;
                const barSpacing = 40;
                const x = 30 + i * barSpacing;
                const y = 160 - bar.height;
                const isHovered = hoveredBar === i;

                return (
                  <g 
                    key={bar.day} 
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Bouncy Spring Transform Visual overlay */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={bar.height}
                      rx="4"
                      fill={isHovered ? 'var(--neon-cyan)' : 'var(--neon-cyan-glow)'}
                      stroke={isHovered ? '#fff' : 'rgba(0, 210, 255, 0.2)'}
                      strokeWidth={isHovered ? '1.5' : '1'}
                      style={{
                        transition: 'var(--transition-spring)',
                        transformOrigin: `${x + barWidth / 2}px 160px`,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    
                    {/* Day label */}
                    <text
                      x={x + barWidth / 2}
                      y="175"
                      fill={isHovered ? 'var(--neon-cyan)' : 'var(--text-muted)'}
                      fontSize="9.5"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {bar.day}
                    </text>

                    {/* Value overlay on hover */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x - 14}
                          y={y - 24}
                          width={52}
                          height={18}
                          rx="4"
                          fill="var(--bg-dark)"
                          stroke="var(--neon-cyan)"
                          strokeWidth="1"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 12}
                          fill="var(--text-main)"
                          fontSize="8.5"
                          fontWeight="800"
                          textAnchor="middle"
                          className="mono"
                        >
                          {bar.value}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Circular Telemetry Gauge for Fleet Electrification */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>Eco-Compliance</span>
          
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              {/* Background Track Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="8"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--neon-green)"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * 72) / 100}
                strokeLinecap="round"
                style={{
                  filter: 'url(#glow-green)',
                  transition: 'stroke-dashoffset 1s ease-out'
                }}
              />
              <defs>
                <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span className="mono" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--neon-green)' }}>72%</span>
              <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Electric</span>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>Scope 3 Carbon Goal</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>Saving 4.2 Tons CO2/mo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetAnalytics;
