import React, { useState } from 'react';

const FareCardTerminal = () => {
  const [balance, setBalance] = useState(1200);
  const [amount, setAmount] = useState('200');
  const [phone, setPhone] = useState('0712345678');
  const [status, setStatus] = useState('idle'); // idle, sending, pending, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleTopUp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Simple Kenyan phone number check (07..., 01..., 2547..., 2541...)
    const cleanPhone = phone.replace(/\s+/g, '');
    const phoneRegex = /^(?:254|\+254|0)?(7|1)\d{8}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage('Please enter a valid Safaricom phone number (e.g. 0712345678)');
      return;
    }

    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      setErrorMessage('Please enter a valid top-up amount');
      return;
    }

    // Trigger M-Pesa simulation
    setStatus('sending');

    setTimeout(() => {
      setStatus('pending');
      
      // Simulate Safaricom STK Push polling callback (4 seconds)
      setTimeout(() => {
        setBalance(prev => prev + parseInt(amount));
        setStatus('success');
        
        // Reset back to idle after 3.5 seconds
        setTimeout(() => {
          setStatus('idle');
          setAmount('200');
        }, 3500);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.01em' }}>M-Pesa Fare Terminal</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top up your contactless MetroPass via Safaricom Daraja</p>
      </div>

      {/* Glassmorphic Contactless Card Mockup */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.15) 0%, rgba(0, 255, 170, 0.05) 100%)',
        border: '1px solid rgba(0, 210, 255, 0.2)',
        borderRadius: '14px',
        padding: '1.25rem',
        boxShadow: '0 8px 24px rgba(0, 210, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '140px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* NFC Icon indicator */}
        <div style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', opacity: 0.7 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neon-cyan)" strokeWidth="2.5">
            <path d="M5 8a9 9 0 0 1 14 0" />
            <path d="M7.5 10.5a6 6 0 0 1 9 0" />
            <path d="M10 13a3 3 0 0 1 4 0" />
            <circle cx="12" cy="16" r="1" fill="var(--neon-cyan)" />
          </svg>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--neon-cyan)', letterSpacing: '0.1em' }} className="mono">METROPASS ACTIVE</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.5rem', color: 'var(--text-main)' }} className="mono">
            KSh {balance.toLocaleString()}
          </h3>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>Card ID</p>
            <p className="mono" style={{ color: 'var(--text-main)', fontWeight: '600' }}>MM-254-8902</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>Holder</p>
            <p style={{ color: 'var(--text-main)', fontWeight: '600' }}>Nairobi Commuter</p>
          </div>
        </div>
      </div>

      {/* Status States */}
      {status === 'idle' && (
        <form onSubmit={handleTopUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {errorMessage && (
            <div style={{
              background: 'rgba(255, 51, 102, 0.1)',
              border: '1px solid rgba(255, 51, 102, 0.2)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              color: 'var(--neon-red)',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Amount (KSh)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input mono"
                placeholder="200"
                style={{ fontSize: '0.9rem', fontWeight: '700' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>M-Pesa Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input mono"
                placeholder="0712345678"
                style={{ fontSize: '0.9rem', fontWeight: '700' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-telemetry">
            Initiate Top-Up
          </button>
        </form>
      )}

      {(status === 'sending' || status === 'pending') && (
        <div style={{
          background: 'rgba(8, 11, 17, 0.4)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}>
          {/* Custom Spinner */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '2px solid rgba(0, 210, 255, 0.1)',
            borderTopColor: 'var(--neon-cyan)',
            animation: 'spin 0.8s linear infinite'
          }}></div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--neon-cyan)' }}>
              {status === 'sending' ? 'Connecting to Safaricom...' : 'STK Push Triggered'}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {status === 'sending' 
                ? 'Securing API gateway tunnel...' 
                : `Enter your M-Pesa PIN on handset +254 ${phone.slice(-9, -6)}***${phone.slice(-3)} to complete transaction.`}
            </p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div style={{
          background: 'rgba(0, 255, 170, 0.08)',
          border: '1px solid rgba(0, 255, 170, 0.2)',
          borderRadius: '10px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'center',
          animation: 'fadeInUp 0.4s ease-out forwards'
        }}>
          {/* Animated Green Check */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--neon-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px var(--neon-green-glow)',
            color: '#080b11'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--neon-green)' }}>Top-Up Approved!</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              KSh {parseInt(amount).toLocaleString()} added successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FareCardTerminal;
