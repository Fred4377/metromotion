import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LiveMap from './components/LiveMap';
import FareCardTerminal from './components/FareCardTerminal';
import FleetGrid from './components/FleetGrid';
import FleetAnalytics from './components/FleetAnalytics';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Initial Fleet Telemetry State
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'KCE 104F', type: 'Electric Matatu', route: 'Westlands → CBD', speed: 48, battery: 84, progress: 32.50, passengers: 14, capacity: 14, driver: 'Kamau Njoroge', status: 'On Route', alert: null },
    { id: 2, plate: 'KBH 203Y', type: 'Dispatch Shuttle', route: 'CBD → JKIA', speed: 65, battery: 96, progress: 12.00, passengers: 8, capacity: 10, driver: 'Amina Odhiambo', status: 'On Route', alert: null },
    { id: 3, plate: 'KDC 789M', type: 'Courier E-Bike', route: 'Kilimani → CBD', speed: 28, battery: 42, progress: 78.40, passengers: 0, capacity: 0, driver: 'Brian Kiprotich', status: 'On Route', alert: null },
    { id: 4, plate: 'KAA 555H', type: 'Support Cruiser', route: 'CBD → Mombasa Road', speed: 52, battery: 78, progress: 54.10, passengers: 2, capacity: 4, driver: 'John Mutua', status: 'On Route', alert: null }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  // Sync selected vehicle details when coordinates or speed update
  const currentSelected = vehicles.find(v => v.id === selectedVehicle?.id) || selectedVehicle;

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Command Console */}
      <main className="main-content">
        
        {/* Console Header */}
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>MetroMotion Command Center</h1>
            <p>Nairobi Multi-Modal Fleet Telemetry Panel</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span className="mono" style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-glass)',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px'
            }}>
              System Host: <span style={{ color: 'var(--neon-cyan)', fontWeight: '700' }}>Local-Node-254</span>
            </span>
            <div style={{
              background: 'rgba(0, 255, 170, 0.08)',
              border: '1px solid rgba(0, 255, 170, 0.2)',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span className="status-dot active"></span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--neon-green)' }}>SECURE</span>
            </div>
          </div>
        </header>

        {/* Tab view routing switcher */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="left-panel">
              <LiveMap vehicles={vehicles} setVehicles={setVehicles} />
              <FleetGrid 
                vehicles={vehicles} 
                selectedVehicle={currentSelected} 
                setSelectedVehicle={setSelectedVehicle} 
              />
            </div>
            <div className="right-panel">
              <FareCardTerminal />
              <FleetAnalytics />
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            <LiveMap vehicles={vehicles} setVehicles={setVehicles} />
            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <FleetGrid 
                vehicles={vehicles} 
                selectedVehicle={currentSelected} 
                setSelectedVehicle={setSelectedVehicle} 
              />
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Dispatch Logistics Terminal</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  This interface provides low-latency route trace data directly from vehicle cellular transceivers. 
                  Matatu occupancy averages <span style={{ color: 'var(--neon-green)', fontWeight: '700' }}>85.4%</span> during morning peaks.
                </p>
                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="mono">
                  <div style={{ background: 'rgba(8,11,17,0.4)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>CELLULAR TRANSMITTER FEED</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', marginTop: '2px' }}>[TRANSCEIVER-254] Packet sequence OK. Latency: 42ms</p>
                  </div>
                  <div style={{ background: 'rgba(8,11,17,0.4)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>INCIDENT LOGS</p>
                    <p style={{ fontSize: '0.75rem', color: vehicles.some(v => v.status === 'Delayed') ? 'var(--neon-red)' : 'var(--neon-green)', marginTop: '2px' }}>
                      {vehicles.some(v => v.status === 'Delayed') 
                        ? 'CRITICAL ALERT: Mombasa Rd congestion detected. Retrying route re-calculation...' 
                        : 'SYSTEM: All transit corridors operating inside optimal limits.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mpesa' && (
          <div style={{ maxWidth: '600px', margin: '2rem auto', width: '100%' }}>
            <FareCardTerminal />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <FleetAnalytics />
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Route Performance Auditing</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Nairobi transit efficiency metrics showing daily savings and passenger volumes.
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.5rem 0' }}>Route Corridor</th>
                    <th>Average Speed</th>
                    <th>Fuel / Battery Eff.</th>
                    <th style={{ textAlign: 'right' }}>CO2 Offset</th>
                  </tr>
                </thead>
                <tbody className="mono">
                  <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: '700' }}>Westlands → CBD</td>
                    <td>38 km/h</td>
                    <td style={{ color: 'var(--neon-green)' }}>92%</td>
                    <td style={{ textAlign: 'right', color: 'var(--neon-cyan)' }}>1.2 Tons</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: '700' }}>CBD → JKIA</td>
                    <td>54 km/h</td>
                    <td style={{ color: 'var(--neon-green)' }}>96%</td>
                    <td style={{ textAlign: 'right', color: 'var(--neon-cyan)' }}>2.4 Tons</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.75rem 0', fontWeight: '700' }}>Kilimani → CBD</td>
                    <td>24 km/h</td>
                    <td style={{ color: 'var(--neon-cyan)' }}>88%</td>
                    <td style={{ textAlign: 'right', color: 'var(--neon-cyan)' }}>0.6 Tons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
