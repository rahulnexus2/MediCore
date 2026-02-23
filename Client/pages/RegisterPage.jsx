import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const {
    register,           // fixed: was 'register' (fine) but destructure was broken
    handleSubmit,       // fixed: was handlesubmit
    formState: { errors }, // fixed: was formstate
    watch
  } = useForm()

  const submit = (data) => {
    console.log("form data", data)
  }

  const password = watch('password')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:       #2a9d8f;
          --teal-light: #52b5a9;
          --teal-pale:  #e8f5f3;
          --cream:      #faf9f7;
          --charcoal:   #264653;
          --text-main:  #1e3a35;
          --text-muted: #6b8f8a;
          --error:      #c0392b;
          --success:    #27ae60;
          --white:      #ffffff;
          --border:     #d8e8e6;
        }

        html, body { height: 100%; margin: 0; background: var(--cream); }

        /* ════ PAGE ════ */
        .page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
        }

        /* ════ LEFT PANEL ════ */
        .left-panel {
          width: 40%;
          background: var(--charcoal);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
          overflow: hidden;
          animation: slideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }

        .circ { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); pointer-events: none; }
        .circ-1 { width: 580px; height: 580px; top: -190px; right: -210px; }
        .circ-2 { width: 370px; height: 370px; bottom: -95px; left: -115px; border-color: rgba(42,157,143,0.12); background: radial-gradient(circle, rgba(42,157,143,0.08) 0%, transparent 70%); }
        .circ-3 { width: 170px; height: 170px; top: 43%; left: 33%; border-color: rgba(255,255,255,0.04); }

        .logo { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
        .logo-icon { width: 38px; height: 38px; background: var(--teal); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .logo-name { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .logo-name span { color: var(--teal-light); }

        .left-content { position: relative; z-index: 1; }
        .left-tag { display: inline-block; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal-light); margin-bottom: 16px; font-weight: 500; }
        .left-headline { font-family: 'Lora', serif; font-size: clamp(24px, 2.8vw, 38px); font-weight: 600; color: var(--white); line-height: 1.25; margin-bottom: 18px; }
        .left-headline em { font-style: italic; color: var(--teal-light); }
        .left-body { font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.42); max-width: 280px; }

        /* feature list */
        .feature-list { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; }
        .feature-item { display: flex; align-items: flex-start; gap: 10px; }
        .feature-check {
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(42,157,143,0.2);
          border: 1px solid rgba(42,157,143,0.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .feature-text { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
        .feature-text strong { color: var(--white); font-weight: 500; }

        /* ════ MOBILE HEADER ════ */
        .mobile-header { display: none; background: var(--charcoal); padding: 18px 20px; align-items: center; gap: 10px; position: relative; overflow: hidden; }
        .mobile-header::after { content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%); right: -40px; top: -60px; pointer-events: none; }

        /* ════ TABLET BANNER ════ */
        .tablet-banner { display: none; background: var(--charcoal); padding: 26px 40px; position: relative; overflow: hidden; align-items: center; justify-content: space-between; gap: 24px; }
        .tablet-banner::before { content: ''; position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); right: -140px; top: -180px; pointer-events: none; }
        .tb-left { position: relative; z-index: 1; }
        .tb-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .tb-tagline { font-size: 13px; color: rgba(255,255,255,0.42); max-width: 360px; line-height: 1.6; }
        .tb-badges { display: flex; gap: 20px; position: relative; z-index: 1; flex-shrink: 0; }
        .badge { display: flex; flex-direction: column; gap: 3px; }
        .badge-number { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .badge-label { font-size: 11px; color: rgba(255,255,255,0.4); }
        .badge-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

        /* ════ RIGHT PANEL ════ */
        .right-panel {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 32px;
          animation: fadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
          overflow-y: auto;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-card { width: 100%; max-width: 400px; }

        .form-eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); font-weight: 500; margin-bottom: 8px; }
        .form-title { font-family: 'Lora', serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 600; color: var(--text-main); margin-bottom: 6px; line-height: 1.2; }
        .form-subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 32px; font-weight: 300; line-height: 1.6; }

        /* Progress dots */
        .progress-dots { display: flex; align-items: center; gap: 6px; margin-bottom: 28px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: all 0.2s; }
        .dot.active { background: var(--teal); width: 24px; border-radius: 4px; }
        .dot.done { background: var(--teal-light); }

        /* ════ FIELDS ════ */
        .field-group { margin-bottom: 18px; }

        .field-label-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 7px; }
        label { font-size: 12px; font-weight: 500; letter-spacing: 0.4px; color: var(--text-main); }
        .field-hint { font-size: 10px; color: var(--text-muted); }

        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; transition: color 0.2s; display: flex; align-items: center; }
        .input-wrap.focused .input-icon { color: var(--teal); }
        .input-status { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; pointer-events: none; }

        input {
          width: 100%; padding: 13px 40px 13px 42px;
          font-family: 'DM Sans', sans-serif; font-size: 16px;
          color: var(--text-main); background: var(--white);
          border: 1.5px solid var(--border); border-radius: 10px;
          outline: none; appearance: none; -webkit-appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input::placeholder { color: #a8c2bf; font-size: 13px; }
        input:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(42,157,143,0.1); }
        input.has-error { border-color: var(--error); box-shadow: 0 0 0 4px rgba(192,57,43,0.08); }
        input.has-success { border-color: var(--success); }

        .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; padding: 4px; transition: color 0.2s; -webkit-tap-highlight-color: transparent; }
        .eye-btn:hover { color: var(--teal); }

        .error-msg { display: flex; align-items: center; gap: 5px; margin-top: 5px; font-size: 11px; color: var(--error); }
        .error-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--error); flex-shrink: 0; }

        /* Password strength bar */
        .strength-bar { margin-top: 8px; }
        .strength-track { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 4px; }
        .strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
        .strength-label { font-size: 10px; color: var(--text-muted); }

        /* ════ SUBMIT ════ */
        .submit-btn {
          width: 100%; margin-top: 24px; padding: 15px 24px;
          background: var(--teal); color: var(--white);
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          border: none; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(42,157,143,0.28);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .submit-btn:hover { background: var(--teal-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(42,157,143,0.33); }
        .submit-btn:active { transform: translateY(0); }

        .terms-note {
          text-align: center; margin-top: 16px;
          font-size: 11px; color: var(--text-muted); line-height: 1.6;
        }
        .terms-note a { color: var(--teal); text-decoration: none; }
        .terms-note a:hover { text-decoration: underline; }

        .login-nudge { text-align: center; margin-top: 24px; font-size: 13px; color: var(--text-muted); }
        .login-nudge a { color: var(--teal); text-decoration: none; font-weight: 500; }
        .login-nudge a:hover { text-decoration: underline; }

        .hipaa-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 20px; font-size: 11px; color: #a8c2bf; text-align: center; flex-wrap: wrap; }

        /* ════ RESPONSIVE ════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: flex; }
          .mobile-header { display: none; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 36px 40px 56px; }
          .form-card { max-width: 480px; }
        }
        @media (max-width: 767px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: none; }
          .mobile-header { display: flex; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 24px 20px 48px; }
          .form-card { max-width: 100%; }
          .form-subtitle { margin-bottom: 24px; }
          .progress-dots { display: none; }
        }
        @media (min-width: 1280px) {
          .left-panel { padding: 60px 68px; }
          .right-panel { padding: 56px 48px; }
        }
      `}</style>

      <div className="page">

        {/* Mobile Header */}
        <div className="mobile-header">
          <div style={{ width:34,height:34,background:'var(--teal)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative',zIndex:1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <span style={{ fontFamily:"'Lora',serif",fontSize:18,fontWeight:600,color:'var(--white)',position:'relative',zIndex:1 }}>
            Medi<span style={{ color:'var(--teal-light)' }}>Core</span>
          </span>
        </div>

        {/* Tablet Banner */}
        <div className="tablet-banner">
          <div className="tb-left">
            <div className="tb-logo">
              <div style={{ width:36,height:36,background:'var(--teal)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <span style={{ fontFamily:"'Lora',serif",fontSize:20,fontWeight:600,color:'var(--white)' }}>Medi<span style={{ color:'var(--teal-light)' }}>Core</span></span>
            </div>
            <p className="tb-tagline">Create your account and join thousands of patients and providers on MediCore.</p>
          </div>
          <div className="tb-badges">
            <div className="badge"><span className="badge-number">50k+</span><span className="badge-label">Patients</span></div>
            <div className="badge-divider"/>
            <div className="badge"><span className="badge-number">200+</span><span className="badge-label">Physicians</span></div>
            <div className="badge-divider"/>
            <div className="badge"><span className="badge-number">HIPAA</span><span className="badge-label">Compliant</span></div>
          </div>
        </div>

        {/* Desktop Left Panel */}
        <div className="left-panel">
          <div className="circ circ-1"/><div className="circ circ-2"/><div className="circ circ-3"/>

          <div className="logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <span className="logo-name">Medi<span>Core</span></span>
          </div>

          <div className="left-content">
            <span className="left-tag">Create account</span>
            <h1 className="left-headline">Your health,<br/>your records,<br/><em>your way.</em></h1>
            <p className="left-body">Join MediCore and take control of your healthcare journey — all in one secure, private platform.</p>
          </div>

          <div className="feature-list">
            {[
              { text: <><strong>Instant access</strong> to your medical records and test results</> },
              { text: <><strong>Book appointments</strong> with your care team in seconds</> },
              { text: <><strong>Secure messaging</strong> with doctors and specialists</> },
              { text: <><strong>HIPAA compliant</strong> — your data stays private, always</> },
            ].map((f, i) => (
              <div className="feature-item" key={i}>
                <div className="feature-check">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--teal-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Panel */}
        <div className="right-panel">
          <div className="form-card">

            <p className="form-eyebrow">Step 1 of 1</p>
            <h2 className="form-title">Create your account</h2>
            <p className="form-subtitle">Fill in your details to get started. It only takes a minute.</p>

            <div className="progress-dots">
              <div className="dot active"/>
              <div className="dot"/>
              <div className="dot"/>
            </div>

            <form onSubmit={handleSubmit(submit)} noValidate>

              {/* Username */}
              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="username">Username</label>
                  <span className="field-hint">4 – 8 characters</span>
                </div>
                <div className={`input-wrap ${focusedField==='username'?'focused':''}`}>
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input
                    id="username" type="text" placeholder="johndoe"
                    className={errors.username ? 'has-error' : ''}
                    onFocus={() => setFocusedField('username')}
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 4, message: 'Minimum 4 characters' },
                      maxLength: { value: 8, message: 'Maximum 8 characters' }
                    })}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                {errors.username && <p className="error-msg"><span className="error-dot"/>{errors.username.message}</p>}
              </div>

              {/* Email */}
              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="email">Email address</label>
                </div>
                <div className={`input-wrap ${focusedField==='email'?'focused':''}`}>
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  </span>
                  <input
                    id="email" type="email" placeholder="you@example.com"
                    className={errors.email ? 'has-error' : ''}
                    onFocus={() => setFocusedField('email')}
                    {...register('email', {
                      required: 'Email is required',
                      minLength: { value: 5, message: 'Minimum 5 characters' },
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Please enter a valid email' }
                    })}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                {errors.email && <p className="error-msg"><span className="error-dot"/>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="password">Password</label>
                  <span className="field-hint">5 – 12 characters</span>
                </div>
                <div className={`input-wrap ${focusedField==='password'?'focused':''}`}>
                  <span className="input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    className={errors.password ? 'has-error' : ''}
                    onFocus={() => setFocusedField('password')}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 5, message: 'Minimum 5 characters' },
                      maxLength: { value: 12, message: 'Maximum 12 characters' }
                    })}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(p => !p)} aria-label="Toggle password visibility">
                    {showPassword ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {password && password.length > 0 && (() => {
                  const len = password.length
                  const hasUpper = /[A-Z]/.test(password)
                  const hasNum   = /[0-9]/.test(password)
                  const hasSpec  = /[^a-zA-Z0-9]/.test(password)
                  const score = (len >= 8 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSpec ? 1 : 0)
                  const levels = [
                    { label: 'Too weak',  color: '#e74c3c', width: '20%'  },
                    { label: 'Weak',      color: '#e67e22', width: '40%'  },
                    { label: 'Fair',      color: '#f1c40f', width: '60%'  },
                    { label: 'Strong',    color: '#2ecc71', width: '85%'  },
                    { label: 'Very strong', color: '#27ae60', width: '100%' },
                  ]
                  const lvl = levels[Math.min(score, 4)]
                  return (
                    <div className="strength-bar">
                      <div className="strength-track">
                        <div className="strength-fill" style={{ width: lvl.width, background: lvl.color }}/>
                      </div>
                      <span className="strength-label" style={{ color: lvl.color }}>{lvl.label}</span>
                    </div>
                  )
                })()}

                {errors.password && <p className="error-msg"><span className="error-dot"/>{errors.password.message}</p>}
              </div>

              <button type="submit" className="submit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                Create Account
              </button>
            </form>

            <p className="terms-note">
              By creating an account you agree to our{' '}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>

            <p className="login-nudge">Already have an account? <a href="#">Sign in</a></p>

            <div className="hipaa-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              HIPAA compliant · 256-bit encryption · SOC 2 certified
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default RegisterPage
