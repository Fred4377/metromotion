import React, { useState, useEffect } from 'react';

const LiveMap = ({ vehicles, setVehicles }) => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  
  // Define coordinate nodes
  const nodes = {
    westlands: { x: 70, y: 70, name: 'Westlands Hub' },
    kilimani: { x: 60, y: 190, name: 'Kilimani Center' },
    cbd: { x: 190, y: 130, name: 'CBD Command' },
    mombasaRd: { x: 310, y: 220, name: 'Mombasa Road' },
    airport: { x: 420, y: 220, name: 'JKIA Airport' }
  };

  // Define route lines
  const routes = [
    { from: nodes.westlands, to: nodes.cbd },
    { from: nodes.kilimani, to: nodes.cbd },
    { from: nodes.cbd, to: nodes.mombasaRd },
    { from: nodes.mombasaRd, to: nodes.airport }
  ];

  // Map vehicles to route positions
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(v => {
          if (v.status === 'Delayed') return v; // Don't move if delayed
          
          let newProgress = v.progress + (0.5 * speedMultiplier * (v.speed / 60));
          if (newProgress >= 100) {
            newProgress = 0; // Loop back
          }
          return {
            ...v,
            progress: parseFloat(newProgress.toFixed(2))
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [speedMultiplier]);

  // Calculate coordinates along a straight line path
  const getCoordinates = (v) => {
    let start, end;
    if (v.route === 'Westlands → CBD') {
      start = nodes.westlands;
      end = nodes.cbd;
    } else if (v.route === 'Kilimani → CBD') {
      start = nodes.kilimani;
      end = nodes.cbd;
    } else if (v.route === 'CBD → JKIA') {
      // Travels CBD -> Mombasa Rd -> Airport
      if (v.progress < 50) {
        start = nodes.cbd;
        end = nodes.mombasaRd;
        const localProgress = v.progress * 2; // scale to 0-100
        return {
          x: start.x + (end.x - start.x) * (localProgress / 100),
          y: start.y + (end.y - start.y) * (localProgress / 100)
        };
      } else {
        start = nodes.mombasaRd;
        end = nodes.airport;
        const localProgress = (v.progress - 50) * 2; // scale to 0-100
        return {
          x: start.x + (end.x - start.x) * (localProgress / 100),
          y: start.y + (end.y - start.y) * (localProgress / 100)
        };
      }
    } else { // CBD → Mombasa Road
      start = nodes.cbd;
      end = nodes.mombasaRd;
    }

    return {
      x: start.x + (end.x - start.x) * (v.progress / 100),
      y: start.y + (end.y - start.y) * (v.progress / 100)
    };
  };

  const toggleSpeed = () => {
    setSpeedMultiplier(prev => (prev === 1 ? 2.5 : prev === 2.5 ? 5 : 1));
  };

  const triggerDelaySimulation = () => {
    setVehicles(prevVehicles => {
      // Find the first running vehicle and delay it, or clear all delays
      const hasDelay = prevVehicles.some(v => v.status === 'Delayed');
      if (hasDelay) {
        return prevVehicles.map(v => 
          v.status === 'Delayed' ? { ...v, status: 'On Route', alert: null } : v
        );
      } else {
        return prevVehicles.map((v, i) => 
          i === 2 ? { ...v, status: 'Delayed', alert: 'Mombasa Rd Congestion' } : v
        );
      }
    });
  };

  return (
    <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.01em' }}>Nairobi Fleet Dispatch Map</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time telemetry overlay on major transit corridors</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={toggleSpeed} 
            className="interactive-item"
            style={{
              padding: '0.5rem 0.85rem',
              background: speedMultiplier > 1 ? 'rgba(0, 210, 255, 0.12)' : 'rgba(255,255,255,0.03)',
              border: '1px solid',
              borderColor: speedMultiplier > 1 ? 'var(--neon-cyan)' : 'var(--border-glass)',
              borderRadius: '8px',
              color: speedMultiplier > 1 ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            Speed: {speedMultiplier}x
          </button>
          <button 
            onClick={triggerDelaySimulation} 
            className="interactive-item"
            style={{
              padding: '0.5rem 0.85rem',
              background: vehicles.some(v => v.status === 'Delayed') ? 'rgba(255, 51, 102, 0.12)' : 'rgba(255,255,255,0.03)',
              border: '1px solid',
              borderColor: vehicles.some(v => v.status === 'Delayed') ? 'var(--neon-red)' : 'var(--border-glass)',
              borderRadius: '8px',
              color: vehicles.some(v => v.status === 'Delayed') ? 'var(--neon-red)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            {vehicles.some(v => v.status === 'Delayed') ? 'Resolve Incident' : 'Simulate Delay'}
          </button>
        </div>
      </div>

      {/* Live Map Display Canvas */}
      <div style={{
        position: 'relative',
        background: 'var(--bg-darker)',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)',
        overflow: 'hidden',
        aspectRatio: '16/9',
        maxHeight: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background Grid */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* SVG Drawing Canvas */}
        <svg viewBox="0 0 500 280" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
          <defs>
            {/* Glow filters */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw routes paths */}
          {routes.map((route, index) => (
            <line
              key={index}
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke="rgba(0, 210, 255, 0.15)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}

          {/* Draw route details */}
          {routes.map((route, index) => (
            <line
              key={`g-${index}`}
              x1={route.from.x}
              y1={route.from.y}
              x2={route.to.x}
              y2={route.to.y}
              stroke="var(--neon-cyan)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              style={{ opacity: 0.7 }}
            />
          ))}

          {/* Draw location nodes */}
          {Object.entries(nodes).map(([key, node]) => (
            <g key={key}>
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="var(--bg-dark)"
                stroke="var(--neon-cyan)"
                strokeWidth="2"
                style={{ filter: 'url(#glow-cyan)' }}
              />
              <circle cx={node.x} cy={node.y} r="2" fill="#fff" />
              <text
                x={node.x}
                y={node.y - 12}
                fill="var(--text-muted)"
                fontSize="8.5"
                fontWeight="700"
                textAnchor="middle"
              >
                {node.name}
              </text>
            </g>
          ))}

          {/* Draw moving vehicle indicators */}
          {vehicles.map((v) => {
            const coords = getCoordinates(v);
            const isDelayed = v.status === 'Delayed';
            const color = isDelayed ? 'var(--neon-red)' : v.id === 2 ? 'var(--neon-green)' : 'var(--neon-cyan)';
            
            return (
              <g key={v.id} style={{ transition: 'transform 0.1s linear' }}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="7.5"
                  fill="var(--bg-darker)"
                  stroke={color}
                  strokeWidth="2"
                  style={{ filter: isDelayed ? 'url(#glow-red)' : 'url(#glow-cyan)' }}
                />
                <circle cx={coords.x} cy={coords.y} r="3" fill={color} />
                <text
                  x={coords.x}
                  y={coords.y + 16}
                  fill="var(--text-main)"
                  fontSize="8"
                  fontWeight="800"
                  textAnchor="middle"
                  className="mono"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {v.plate}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default LiveMap;
