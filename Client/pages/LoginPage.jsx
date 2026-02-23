import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const selectedRole = watch("role")
  const prevRoleRef = useRef(selectedRole)

  useEffect(() => {
    if (prevRoleRef.current === selectedRole) return
    prevRoleRef.current = selectedRole
    setIsTransitioning(true)
    const t = setTimeout(() => setIsTransitioning(false), 280)
    return () => clearTimeout(t)
  }, [selectedRole])

  const submit = (data) => {
    console.log("Form Data :", data)
  }

  const roles = [
    { value: "patient",    label: "Patient" },
    { value: "doctor",     label: "Doctor" },
    { value: "superadmin", label: "Super Admin" },
  ]

  // Show password for patient and doctor, not for superadmin
  const showPasswordField = selectedRole === 'patient' || selectedRole === 'doctor' || !selectedRole

  const roleContent = {
    patient: {
      tag: 'Patient Portal',
      headline: <>Your health,<br/>your records,<br/><em>your way.</em></>,
      body: 'Access your medical records, upcoming appointments, prescriptions, and messages from your care team — all in one place.',
      badges: [
        { number: '50k+', label: 'Patients' },
        { number: '24/7',  label: 'Support' },
        { number: 'HIPAA', label: 'Compliant' },
      ],
    },
    doctor: {
      tag: 'Doctor Portal',
      headline: <>Empowering<br/>clinicians to<br/><em>do more.</em></>,
      body: 'Manage your patient roster, review lab results, write prescriptions, and coordinate care — streamlined for busy physicians.',
      badges: [
        { number: '200+', label: 'Physicians' },
        { number: '1M+',  label: 'Consults' },
        { number: 'HIPAA', label: 'Compliant' },
      ],
    },
    superadmin: {
      tag: 'Admin Access',
      headline: <>Full control.<br/>Total oversight.<br/><em>Secured.</em></>,
      body: 'Manage users, configure system settings, audit logs, and oversee the entire MediCore platform from one secure admin panel.',
      badges: [
        { number: '99.9%', label: 'Uptime' },
        { number: 'SOC 2', label: 'Certified' },
        { number: 'HIPAA', label: 'Compliant' },
      ],
    },
    default: {
      tag: 'Your health portal',
      headline: <>Healthcare<br/>designed around<br/><em>you.</em></>,
      body: 'Access your medical records, appointments, prescriptions, and care team — all in one secure place.',
      badges: [
        { number: '50k+', label: 'Patients' },
        { number: '200+', label: 'Physicians' },
        { number: 'HIPAA', label: 'Compliant' },
      ],
    },
  }

  const activeContent = roleContent[selectedRole] || roleContent.default

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
          --white:      #ffffff;
          --border:     #d8e8e6;
        }

        html, body { height: 100%; margin: 0; background: var(--cream); }

        .page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
        }

        /* LEFT PANEL */
        .left-panel {
          width: 42%;
          background: var(--charcoal);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 52px;
          overflow: hidden;
          animation: slideInLeft 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .circ { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); pointer-events: none; }
        .circ-1 { width: 600px; height: 600px; top: -200px; right: -220px; }
        .circ-2 { width: 380px; height: 380px; bottom: -100px; left: -120px; border-color: rgba(42,157,143,0.12); background: radial-gradient(circle, rgba(42,157,143,0.07) 0%, transparent 70%); }
        .circ-3 { width: 180px; height: 180px; top: 42%; left: 32%; border-color: rgba(255,255,255,0.04); }

        .logo { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
        .logo-icon { width: 38px; height: 38px; background: var(--teal); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .logo-name { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .logo-name span { color: var(--teal-light); }

        .left-content { position: relative; z-index: 1; }
        .left-tag { display: inline-block; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal-light); margin-bottom: 18px; font-weight: 500; }
        .left-headline { font-family: 'Lora', serif; font-size: clamp(22px, 2.8vw, 38px); font-weight: 600; color: var(--white); line-height: 1.25; margin-bottom: 20px; }
        .left-headline em { font-style: italic; color: var(--teal-light); }
        .left-body { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.45); max-width: 280px; }

        .trust-badges { display: flex; gap: 24px; position: relative; z-index: 1; flex-wrap: wrap; }
        .badge { display: flex; flex-direction: column; gap: 4px; }
        .badge-number { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .badge-label { font-size: 11px; color: rgba(255,255,255,0.4); }
        .badge-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

        /* Left panel content fade transition */
        .left-content-inner {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .left-content-inner.transitioning {
          opacity: 0;
          transform: translateY(10px);
        }

        /* MOBILE HEADER */
        .mobile-header { display: none; background: var(--charcoal); padding: 18px 20px; align-items: center; gap: 10px; position: relative; overflow: hidden; }
        .mobile-header::after { content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%); right: -40px; top: -60px; pointer-events: none; }

        /* TABLET BANNER */
        .tablet-banner { display: none; background: var(--charcoal); padding: 28px 40px; position: relative; overflow: hidden; align-items: center; justify-content: space-between; gap: 24px; }
        .tablet-banner::before { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); right: -150px; top: -200px; pointer-events: none; }
        .tb-left { position: relative; z-index: 1; }
        .tb-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .tb-tagline { font-size: 13px; color: rgba(255,255,255,0.45); max-width: 360px; line-height: 1.6; }
        .tb-badges { display: flex; gap: 20px; position: relative; z-index: 1; flex-shrink: 0; }

        /* RIGHT PANEL */
        .right-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 32px; animation: fadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both; overflow-y: auto; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-card { width: 100%; max-width: 400px; }
        .form-eyebrow { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); font-weight: 500; margin-bottom: 10px; }
        .form-title { font-family: 'Lora', serif; font-size: clamp(22px, 4vw, 32px); font-weight: 600; color: var(--text-main); margin-bottom: 6px; line-height: 1.2; }
        .form-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 36px; font-weight: 300; }

        /* Role pill selector */
        .role-pills { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
        .role-pill {
          flex: 1; min-width: 80px;
          padding: 9px 12px;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          background: var(--white);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          color: var(--text-muted);
          transition: all 0.18s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .role-pill:hover { border-color: var(--teal-light); color: var(--teal); }
        .role-pill.active { border-color: var(--teal); background: var(--teal-pale); color: var(--teal); }
        .role-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.6; }

        .field-group { margin-bottom: 20px; }
        label { display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; color: var(--text-main); margin-bottom: 8px; }

        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; transition: color 0.2s; display: flex; align-items: center; }
        .input-wrap.focused .input-icon { color: var(--teal); }

        input, select {
          width: 100%; padding: 14px 16px 14px 46px;
          font-family: 'DM Sans', sans-serif; font-size: 16px;
          color: var(--text-main); background: var(--white);
          border: 1.5px solid var(--border); border-radius: 10px;
          outline: none; appearance: none; -webkit-appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input::placeholder { color: #a8c2bf; font-size: 13px; }
        input:focus, select:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(42,157,143,0.1); }
        input.has-error { border-color: var(--error); box-shadow: 0 0 0 4px rgba(192,57,43,0.08); }

        .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; padding: 4px; transition: color 0.2s; -webkit-tap-highlight-color: transparent; }
        .eye-btn:hover { color: var(--teal); }

        .error-msg { display: flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 12px; color: var(--error); }
        .error-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--error); flex-shrink: 0; }

        .forgot-link { text-align: right; margin-top: 8px; }
        .forgot-link a { font-size: 12px; color: var(--teal); text-decoration: none; font-weight: 500; }
        .forgot-link a:hover { opacity: 0.75; }

        /* Key box */
        .key-box {
          padding: 14px 16px;
          background: var(--teal-pale);
          border: 1.5px solid rgba(42,157,143,0.25);
          border-radius: 10px;
          margin-bottom: 20px;
          animation: fadeUp 0.3s ease both;
        }
        .key-box-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .key-box-icon { width: 26px; height: 26px; border-radius: 6px; background: rgba(42,157,143,0.15); display: flex; align-items: center; justify-content: center; }
        .key-box-title { font-size: 12px; font-weight: 500; color: var(--teal); }
        .key-box-desc { font-size: 11px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.5; }
        .key-box .input-wrap input { background: var(--white); border-color: rgba(42,157,143,0.3); }
        .key-box .input-wrap input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(42,157,143,0.1); }

        /* Admin info banner */
        .admin-banner {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; margin-bottom: 20px;
          background: rgba(38,70,83,0.06);
          border: 1px solid rgba(38,70,83,0.12);
          border-radius: 10px;
          font-size: 12px; color: var(--charcoal); line-height: 1.5;
          animation: fadeUp 0.3s ease both;
        }
        .admin-banner-icon { flex-shrink: 0; margin-top: 1px; }

        .submit-btn { width: 100%; margin-top: 28px; padding: 15px 24px; background: var(--teal); color: var(--white); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; border: none; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 18px rgba(42,157,143,0.30); transition: background 0.2s, transform 0.15s, box-shadow 0.2s; -webkit-tap-highlight-color: transparent; }
        .submit-btn:hover { background: var(--teal-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(42,157,143,0.35); }
        .submit-btn:active { transform: translateY(0); }

        .signup-nudge { text-align: center; margin-top: 28px; font-size: 13px; color: var(--text-muted); }
        .signup-nudge a { color: var(--teal); text-decoration: none; font-weight: 500; }
        .signup-nudge a:hover { text-decoration: underline; }

        .hipaa-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 24px; font-size: 11px; color: #a8c2bf; letter-spacing: 0.3px; text-align: center; flex-wrap: wrap; }

        /* RESPONSIVE */
        @media (min-width: 768px) and (max-width: 1023px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: flex; }
          .mobile-header { display: none; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 40px 40px 56px; }
          .form-card { max-width: 480px; }
        }
        @media (max-width: 767px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: none; }
          .mobile-header { display: flex; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 28px 20px 48px; }
          .form-card { max-width: 100%; }
          .form-subtitle { margin-bottom: 28px; font-size: 13px; }
          .role-pills { gap: 6px; }
          .role-pill { font-size: 11px; padding: 8px 10px; }
        }
        @media (min-width: 1280px) {
          .left-panel { padding: 56px 64px; }
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
            <p className="tb-tagline">Access your medical records, appointments, and care team — all in one secure place.</p>
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
            <div className={`left-content-inner ${isTransitioning ? 'transitioning' : ''}`}>
              <span className="left-tag">{activeContent.tag}</span>
              <h1 className="left-headline">{activeContent.headline}</h1>
              <p className="left-body">{activeContent.body}</p>
            </div>
          </div>
          <div className="trust-badges">
            {activeContent.badges.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="badge-divider"/>}
                <div className="badge">
                  <span className="badge-number">{b.number}</span>
                  <span className="badge-label">{b.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Panel */}
        <div className="right-panel">
          <div className="form-card">
            <p className="form-eyebrow">Welcome back</p>
            <h2 className="form-title">Sign in to your account</h2>
            <p className="form-subtitle">Select your role, then enter your credentials.</p>

            {/* Role Pills */}
            <div className="role-pills">
              {roles.map(r => (
                <label
                  key={r.value}
                  className={`role-pill ${selectedRole === r.value ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <input type="radio" value={r.value} {...register('role', { required: 'Please select a role' })} style={{ display:'none' }} />
                  <span className="role-pill-dot"/>
                  {r.label}
                </label>
              ))}
            </div>
            {errors.role && <p className="error-msg" style={{ marginTop:'-16px', marginBottom:'16px' }}><span className="error-dot"/>{errors.role.message}</p>}

            <form onSubmit={handleSubmit(submit)} noValidate>

              {/* Email — always shown */}
              <div className="field-group">
                <label htmlFor="email">Email address</label>
                <div className={`input-wrap ${focusedField==='email'?'focused':''}`}>
                  <span className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  </span>
                  <input id="email" type="email" placeholder="you@example.com"
                    className={errors.email?'has-error':''}
                    onFocus={()=>setFocusedField('email')}
                    {...register('email',{ required:'Email is required', pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message:'Please enter a valid email' } })}
                    onBlur={()=>setFocusedField(null)}
                  />
                </div>
                {errors.email && <p className="error-msg"><span className="error-dot"/>{errors.email.message}</p>}
              </div>

              {/* Password — Patient & Doctor */}
              {showPasswordField && (
                <div className="field-group">
                  <label htmlFor="password">Password</label>
                  <div className={`input-wrap ${focusedField==='password'?'focused':''}`}>
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input id="password" type={showPassword?'text':'password'} placeholder="••••••••"
                      className={errors.password?'has-error':''}
                      onFocus={()=>setFocusedField('password')}
                      {...register('password',{ required: showPasswordField ? 'Password is required' : false })}
                      onBlur={()=>setFocusedField(null)}
                    />
                    <button type="button" className="eye-btn" onClick={()=>setShowPassword(p=>!p)} aria-label="Toggle password">
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="error-msg"><span className="error-dot"/>{errors.password.message}</p>}
                  <div className="forgot-link"><a href="#">Forgot password?</a></div>
                </div>
              )}

              {/* Doctor Key — shown AFTER password for doctors */}
              {selectedRole === 'doctor' && (
                <div className="key-box">
                  <div className="key-box-header">
                    <div className="key-box-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                    </div>
                    <span className="key-box-title">Doctor Access Key</span>
                  </div>
                  <p className="key-box-desc">Enter your password above, then your doctor key below to verify your credentials.</p>
                  <div className={`input-wrap ${focusedField==='doctorkey'?'focused':''}`}>
                    <span className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type="password" placeholder="DR-XXXX-XXXX"
                      className={errors.doctorkey?'has-error':''}
                      onFocus={()=>setFocusedField('doctorkey')}
                      {...register('doctorkey',{ required:'Doctor access key is required' })}
                      onBlur={()=>setFocusedField(null)}
                    />
                  </div>
                  {errors.doctorkey && <p className="error-msg"><span className="error-dot"/>{errors.doctorkey.message}</p>}
                </div>
              )}

              {/* Super Admin — key only, no password */}
              {selectedRole === 'superadmin' && (
                <>
                  <div className="admin-banner">
                    <span className="admin-banner-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </span>
                    <span>Your email and admin key are verified directly against the system — no password required.</span>
                  </div>
                  <div className="key-box">
                    <div className="key-box-header">
                      <div className="key-box-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </div>
                      <span className="key-box-title">Super Admin Key</span>
                    </div>
                    <p className="key-box-desc">Enter your hardcoded admin key to gain access. Keep this confidential.</p>
                    <div className={`input-wrap ${focusedField==='adminkey'?'focused':''}`}>
                      <span className="input-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </span>
                      <input type="password" placeholder="SA-XXXX-XXXX"
                        className={errors.adminkey?'has-error':''}
                        onFocus={()=>setFocusedField('adminkey')}
                        {...register('adminkey',{ required:'Super admin key is required' })}
                        onBlur={()=>setFocusedField(null)}
                      />
                    </div>
                    {errors.adminkey && <p className="error-msg"><span className="error-dot"/>{errors.adminkey.message}</p>}
                  </div>
                </>
              )}

              <button type="submit" className="submit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
                {selectedRole === 'superadmin' ? 'Access Admin Panel' : selectedRole === 'doctor' ? 'Sign in as Doctor' : 'Sign in securely'}
              </button>
            </form>

            {selectedRole !== 'superadmin' && (
              <p className="signup-nudge">
                New {selectedRole === 'doctor' ? 'doctor' : 'patient'}? <a href="#">Create an account</a>
              </p>
            )}

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

export default LoginPage
