import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

const specializations = [
  'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology',
  'Gastroenterology', 'General Practice', 'Geriatrics', 'Hematology',
  'Infectious Disease', 'Internal Medicine', 'Nephrology', 'Neurology',
  'Obstetrics & Gynecology', 'Oncology', 'Ophthalmology', 'Orthopedics',
  'Otolaryngology', 'Pathology', 'Pediatrics', 'Psychiatry',
  'Pulmonology', 'Radiology', 'Rheumatology', 'Surgery', 'Urology'
]

const degrees = ['MBBS', 'MD', 'MS', 'DO', 'DM', 'MCh', 'DNB', 'PhD (Medicine)', 'BDS', 'MDS']

const DoctorRegisterPage = () => {
  const [focusedField, setFocusedField] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm()

  const submit = (data) => {
    console.log('Doctor Registration Data:', data)
  }

  const handleFileChange = (file) => {
    if (!file) return
    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowed.includes(file.type)) return
    if (file.size > 5 * 1024 * 1024) return
    setUploadedFile(file)
    setValue('degreeProof', file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const nextStep = async () => {
    const step1Fields = ['name', 'email', 'degree', 'licenseNumber']
    const valid = await trigger(step1Fields)
    if (valid) setCurrentStep(2)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type) => {
    if (type === 'application/pdf') return '📄'
    return '🖼️'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:        #2a9d8f;
          --teal-light:  #52b5a9;
          --teal-pale:   #e8f5f3;
          --teal-mid:    #d0ede9;
          --cream:       #faf9f7;
          --charcoal:    #264653;
          --text-main:   #1e3a35;
          --text-muted:  #6b8f8a;
          --error:       #c0392b;
          --success:     #27ae60;
          --white:       #ffffff;
          --border:      #d8e8e6;
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
          width: 38%;
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
        .circ-1 { width: 560px; height: 560px; top: -180px; right: -200px; }
        .circ-2 { width: 360px; height: 360px; bottom: -95px; left: -115px; border-color: rgba(42,157,143,0.12); background: radial-gradient(circle, rgba(42,157,143,0.08) 0%, transparent 70%); }
        .circ-3 { width: 160px; height: 160px; top: 44%; left: 34%; border-color: rgba(255,255,255,0.04); }

        .logo { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
        .logo-icon { width: 38px; height: 38px; background: var(--teal); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .logo-name { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .logo-name span { color: var(--teal-light); }

        .left-content { position: relative; z-index: 1; }
        .left-tag { display: inline-block; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal-light); margin-bottom: 16px; font-weight: 500; }
        .left-headline { font-family: 'Lora', serif; font-size: clamp(24px, 2.8vw, 36px); font-weight: 600; color: var(--white); line-height: 1.25; margin-bottom: 18px; }
        .left-headline em { font-style: italic; color: var(--teal-light); }
        .left-body { font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.42); max-width: 280px; margin-bottom: 32px; }

        /* Process steps on left */
        .process-steps { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0; }
        .process-step { display: flex; gap: 14px; position: relative; }
        .process-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 13px; top: 32px;
          width: 1px; height: calc(100% - 4px);
          background: rgba(255,255,255,0.08);
        }
        .step-indicator {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
          transition: all 0.3s;
        }
        .step-indicator.active {
          border-color: var(--teal); color: var(--teal);
          background: rgba(42,157,143,0.12);
        }
        .step-indicator.done {
          border-color: var(--teal); background: var(--teal); color: white;
        }
        .step-text { padding-bottom: 24px; }
        .step-title { font-size: 13px; font-weight: 500; color: var(--white); margin-bottom: 3px; opacity: 0.5; transition: opacity 0.3s; }
        .step-title.active { opacity: 1; }
        .step-title.done { opacity: 0.7; }
        .step-desc { font-size: 11px; color: rgba(255,255,255,0.3); line-height: 1.5; }

        /* Verification badge */
        .verify-badge {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          background: rgba(42,157,143,0.1);
          border: 1px solid rgba(42,157,143,0.2);
          border-radius: 10px;
        }
        .verify-badge-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(42,157,143,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .verify-badge-text { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.5; }
        .verify-badge-text strong { color: var(--teal-light); display: block; font-size: 13px; margin-bottom: 2px; }

        /* ════ MOBILE HEADER ════ */
        .mobile-header { display: none; background: var(--charcoal); padding: 18px 20px; align-items: center; gap: 10px; position: relative; overflow: hidden; }
        .mobile-header::after { content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%); right: -40px; top: -60px; pointer-events: none; }

        /* ════ TABLET BANNER ════ */
        .tablet-banner { display: none; background: var(--charcoal); padding: 24px 40px; position: relative; overflow: hidden; align-items: center; justify-content: space-between; gap: 24px; }
        .tablet-banner::before { content: ''; position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); right: -140px; top: -180px; pointer-events: none; }
        .tb-left { position: relative; z-index: 1; }
        .tb-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .tb-tagline { font-size: 13px; color: rgba(255,255,255,0.42); max-width: 360px; line-height: 1.6; }
        .tb-badges { display: flex; gap: 20px; position: relative; z-index: 1; flex-shrink: 0; }
        .tbadge { display: flex; flex-direction: column; gap: 3px; }
        .tbadge-number { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: var(--white); }
        .tbadge-label { font-size: 11px; color: rgba(255,255,255,0.4); }
        .tbadge-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

        /* ════ RIGHT PANEL ════ */
        .right-panel {
          flex: 1;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 48px 40px;
          overflow-y: auto;
          animation: fadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-card { width: 100%; max-width: 520px; padding-top: 8px; }

        /* Step progress bar */
        .step-progress { margin-bottom: 32px; }
        .step-progress-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .step-progress-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); font-weight: 500; }
        .step-progress-count { font-size: 11px; color: var(--text-muted); }
        .step-progress-track { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .step-progress-fill { height: 100%; background: linear-gradient(90deg, var(--teal), var(--teal-light)); border-radius: 2px; transition: width 0.4s cubic-bezier(0.22,1,0.36,1); }

        .form-title { font-family: 'Lora', serif; font-size: clamp(22px, 3vw, 28px); font-weight: 600; color: var(--text-main); margin-bottom: 4px; line-height: 1.2; }
        .form-subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; font-weight: 300; line-height: 1.6; }

        /* Section label */
        .section-label {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-muted); font-weight: 500;
          margin-bottom: 16px; margin-top: 4px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* ════ FIELDS ════ */
        .field-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }

        .field-group { margin-bottom: 18px; }

        .field-label-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 7px; }
        .field-label { font-size: 12px; font-weight: 500; letter-spacing: 0.4px; color: var(--text-main); }
        .field-hint { font-size: 10px; color: var(--text-muted); }

        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; transition: color 0.2s; display: flex; align-items: center; }
        .input-wrap.focused .input-icon { color: var(--teal); }

        input[type="text"],
        input[type="email"],
        input[type="number"],
        select {
          width: 100%; padding: 12px 14px 12px 42px;
          font-family: 'DM Sans', sans-serif; font-size: 16px;
          color: var(--text-main); background: var(--white);
          border: 1.5px solid var(--border); border-radius: 10px;
          outline: none; appearance: none; -webkit-appearance: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input[type="text"]::placeholder,
        input[type="email"]::placeholder,
        input[type="number"]::placeholder { color: #a8c2bf; font-size: 13px; }
        input:focus, select:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(42,157,143,0.1); }
        input.has-error, select.has-error { border-color: var(--error); box-shadow: 0 0 0 4px rgba(192,57,43,0.08); }

        .select-arrow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; display: flex; align-items: center; }

        .error-msg { display: flex; align-items: center; gap: 5px; margin-top: 5px; font-size: 11px; color: var(--error); }
        .error-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--error); flex-shrink: 0; }

        /* ════ FILE UPLOAD ════ */
        .upload-zone {
          border: 2px dashed var(--border);
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: var(--white);
          position: relative;
        }
        .upload-zone:hover { border-color: var(--teal); background: var(--teal-pale); }
        .upload-zone.dragging { border-color: var(--teal); background: var(--teal-pale); transform: scale(1.01); }
        .upload-zone.has-file { border-color: var(--success); background: #f0faf4; border-style: solid; }
        .upload-zone.has-error-border { border-color: var(--error); }

        .upload-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--teal-pale); border: 1px solid var(--teal-mid);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
        }
        .upload-title { font-size: 14px; font-weight: 500; color: var(--text-main); margin-bottom: 4px; }
        .upload-subtitle { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
        .upload-btn {
          display: inline-block; padding: 7px 16px;
          background: var(--teal-pale); border: 1px solid var(--teal-mid);
          border-radius: 6px; font-size: 12px; font-weight: 500;
          color: var(--teal); cursor: pointer;
          transition: background 0.2s;
        }
        .upload-btn:hover { background: var(--teal-mid); }
        .upload-formats { font-size: 10px; color: #a8c2bf; margin-top: 8px; letter-spacing: 0.3px; }

        /* Uploaded file preview */
        .file-preview {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px;
          background: #f0faf4;
          border: 1px solid rgba(39,174,96,0.2);
          border-radius: 10px;
          margin-top: 10px;
        }
        .file-preview-icon { font-size: 24px; flex-shrink: 0; }
        .file-preview-info { flex: 1; text-align: left; }
        .file-preview-name { font-size: 13px; font-weight: 500; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px; }
        .file-preview-size { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .file-remove-btn {
          background: none; border: none; cursor: pointer;
          color: var(--text-muted); padding: 4px;
          border-radius: 4px; display: flex; align-items: center;
          transition: color 0.2s;
        }
        .file-remove-btn:hover { color: var(--error); }

        /* Step action buttons */
        .step-actions { display: flex; gap: 12px; margin-top: 28px; }

        .btn-next {
          flex: 1; padding: 14px 24px;
          background: var(--teal); color: var(--white);
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          border: none; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(42,157,143,0.28);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-next:hover { background: var(--teal-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(42,157,143,0.33); }
        .btn-next:active { transform: translateY(0); }

        .btn-back {
          padding: 14px 20px;
          background: transparent; color: var(--text-muted);
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
          border: 1.5px solid var(--border); border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: border-color 0.2s, color 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-back:hover { border-color: var(--teal); color: var(--teal); }

        .login-nudge { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-muted); }
        .login-nudge a { color: var(--teal); text-decoration: none; font-weight: 500; }
        .login-nudge a:hover { text-decoration: underline; }

        .hipaa-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 18px; font-size: 11px; color: #a8c2bf; text-align: center; flex-wrap: wrap; }

        /* Step slide animation */
        .step-panel { animation: stepIn 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes stepIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .step-panel.back { animation: stepInBack 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes stepInBack {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ════ RESPONSIVE ════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: flex; }
          .mobile-header { display: none; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 36px 40px 56px; }
          .form-card { max-width: 560px; }
        }
        @media (max-width: 767px) {
          .page { flex-direction: column; }
          .left-panel { display: none; }
          .tablet-banner { display: none; }
          .mobile-header { display: flex; }
          .right-panel { align-items: flex-start; justify-content: center; padding: 24px 20px 48px; }
          .form-card { max-width: 100%; }
          .field-grid-2 { grid-template-columns: 1fr; }
          .step-actions { flex-direction: column-reverse; }
          .btn-back { width: 100%; }
        }
        @media (min-width: 1280px) {
          .left-panel { padding: 60px 68px; }
          .right-panel { padding: 56px 52px; }
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
            <p className="tb-tagline">Register as a verified physician and join the MediCore provider network.</p>
          </div>
          <div className="tb-badges">
            <div className="tbadge"><span className="tbadge-number">200+</span><span className="tbadge-label">Physicians</span></div>
            <div className="tbadge-divider"/>
            <div className="tbadge"><span className="tbadge-number">Verified</span><span className="tbadge-label">Credentials</span></div>
            <div className="tbadge-divider"/>
            <div className="tbadge"><span className="tbadge-number">HIPAA</span><span className="tbadge-label">Compliant</span></div>
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
            <span className="left-tag">Doctor Portal</span>
            <h1 className="left-headline">Join our<br/>verified physician<br/><em>network.</em></h1>
            <p className="left-body">Your credentials are reviewed by our medical board. Verified doctors get full access to the MediCore clinical suite.</p>
          </div>

          {/* Process steps */}
          <div className="process-steps">
            {[
              { title: 'Personal & Credentials', desc: 'Name, email, degree, license number' },
              { title: 'Clinical Details',        desc: 'Specialization, experience & proof upload' },
            ].map((s, i) => (
              <div className="process-step" key={i}>
                <div className={`step-indicator ${currentStep > i + 1 ? 'done' : currentStep === i + 1 ? 'active' : ''}`}>
                  {currentStep > i + 1 ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : i + 1}
                </div>
                <div className="step-text">
                  <div className={`step-title ${currentStep === i + 1 ? 'active' : currentStep > i + 1 ? 'done' : ''}`}>{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="verify-badge">
            <div className="verify-badge-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="verify-badge-text">
              <strong>Board Verified</strong>
              All credentials are reviewed within 24–48 hours by our medical oversight team.
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="right-panel">
          <div className="form-card">

            {/* Progress bar */}
            <div className="step-progress">
              <div className="step-progress-header">
                <span className="step-progress-label">{currentStep === 1 ? 'Credentials' : 'Clinical Info'}</span>
                <span className="step-progress-count">Step {currentStep} of 2</span>
              </div>
              <div className="step-progress-track">
                <div className="step-progress-fill" style={{ width: currentStep === 1 ? '50%' : '100%' }}/>
              </div>
            </div>

            {/* ── STEP 1 ── */}
            {currentStep === 1 && (
              <div className="step-panel" key="step1">
                <h2 className="form-title">Personal & Credentials</h2>
                <p className="form-subtitle">Tell us who you are and provide your medical credentials for verification.</p>

                <form noValidate>
                  <span className="section-label">Basic Information</span>

                  <div className="field-grid-2">
                    {/* Full Name */}
                    <div className="field-group" style={{ gridColumn: 'span 2' }}>
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="name">Full Name</label>
                      </div>
                      <div className={`input-wrap ${focusedField==='name'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </span>
                        <input id="name" type="text" placeholder="Dr. Jane Smith"
                          className={errors.name?'has-error':''}
                          onFocus={()=>setFocusedField('name')}
                          {...register('name',{ required:'Full name is required', minLength:{value:3,message:'Minimum 3 characters'} })}
                          onBlur={()=>setFocusedField(null)}
                        />
                      </div>
                      {errors.name && <p className="error-msg"><span className="error-dot"/>{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="field-group" style={{ gridColumn: 'span 2' }}>
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="email">Email Address</label>
                      </div>
                      <div className={`input-wrap ${focusedField==='email'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                        </span>
                        <input id="email" type="email" placeholder="doctor@hospital.com"
                          className={errors.email?'has-error':''}
                          onFocus={()=>setFocusedField('email')}
                          {...register('email',{ required:'Email is required', pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,message:'Please enter a valid email'} })}
                          onBlur={()=>setFocusedField(null)}
                        />
                      </div>
                      {errors.email && <p className="error-msg"><span className="error-dot"/>{errors.email.message}</p>}
                    </div>
                  </div>

                  <span className="section-label">Medical Credentials</span>

                  <div className="field-grid-2">
                    {/* Degree */}
                    <div className="field-group">
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="degree">Degree</label>
                      </div>
                      <div className={`input-wrap ${focusedField==='degree'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        </span>
                        <select id="degree"
                          className={errors.degree?'has-error':''}
                          onFocus={()=>setFocusedField('degree')}
                          {...register('degree',{ required:'Please select your degree' })}
                          onBlur={()=>setFocusedField(null)}
                        >
                          <option value="">Select degree</option>
                          {degrees.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <span className="select-arrow">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </span>
                      </div>
                      {errors.degree && <p className="error-msg"><span className="error-dot"/>{errors.degree.message}</p>}
                    </div>

                    {/* License Number */}
                    <div className="field-group">
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="licenseNumber">License Number</label>
                      </div>
                      <div className={`input-wrap ${focusedField==='licenseNumber'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 10h8M8 14h5"/></svg>
                        </span>
                        <input id="licenseNumber" type="text" placeholder="MCI-XXXXXX"
                          className={errors.licenseNumber?'has-error':''}
                          onFocus={()=>setFocusedField('licenseNumber')}
                          {...register('licenseNumber',{
                            required:'License number is required',
                            minLength:{value:5,message:'Minimum 5 characters'},
                            maxLength:{value:20,message:'Maximum 20 characters'},
                          })}
                          onBlur={()=>setFocusedField(null)}
                        />
                      </div>
                      {errors.licenseNumber && <p className="error-msg"><span className="error-dot"/>{errors.licenseNumber.message}</p>}
                    </div>
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn-next" onClick={nextStep}>
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {currentStep === 2 && (
              <div className="step-panel" key="step2">
                <h2 className="form-title">Clinical Details</h2>
                <p className="form-subtitle">Help us understand your specialization and verify your qualifications.</p>

                <form onSubmit={handleSubmit(submit)} noValidate>
                  <span className="section-label">Practice Information</span>

                  <div className="field-grid-2">
                    {/* Specialization */}
                    <div className="field-group" style={{ gridColumn: 'span 2' }}>
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="specialization">Specialization</label>
                      </div>
                      <div className={`input-wrap ${focusedField==='specialization'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </span>
                        <select id="specialization"
                          className={errors.specialization?'has-error':''}
                          onFocus={()=>setFocusedField('specialization')}
                          {...register('specialization',{ required:'Please select your specialization' })}
                          onBlur={()=>setFocusedField(null)}
                        >
                          <option value="">Select specialization</option>
                          {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <span className="select-arrow">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </span>
                      </div>
                      {errors.specialization && <p className="error-msg"><span className="error-dot"/>{errors.specialization.message}</p>}
                    </div>

                    {/* Years of Experience */}
                    <div className="field-group" style={{ gridColumn: 'span 2' }}>
                      <div className="field-label-row">
                        <label className="field-label" htmlFor="experience">Years of Experience</label>
                        <span className="field-hint">1 – 60 years</span>
                      </div>
                      <div className={`input-wrap ${focusedField==='experience'?'focused':''}`}>
                        <span className="input-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </span>
                        <input id="experience" type="number" placeholder="e.g. 8"
                          className={errors.experience?'has-error':''}
                          onFocus={()=>setFocusedField('experience')}
                          {...register('experience',{
                            required:'Years of experience is required',
                            min:{value:1,message:'Minimum 1 year'},
                            max:{value:60,message:'Maximum 60 years'},
                            valueAsNumber: true,
                          })}
                          onBlur={()=>setFocusedField(null)}
                        />
                      </div>
                      {errors.experience && <p className="error-msg"><span className="error-dot"/>{errors.experience.message}</p>}
                    </div>
                  </div>

                  <span className="section-label">Degree Proof Upload</span>

                  {/* File Upload Zone */}
                  <div className="field-group">
                    <div
                      className={`upload-zone ${isDragging?'dragging':''} ${uploadedFile?'has-file':''} ${errors.degreeProof&&!uploadedFile?'has-error-border':''}`}
                      onDragOver={(e)=>{e.preventDefault();setIsDragging(true)}}
                      onDragLeave={()=>setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={()=>!uploadedFile && fileInputRef.current?.click()}
                      style={{ cursor: uploadedFile ? 'default' : 'pointer' }}
                    >
                      {!uploadedFile ? (
                        <>
                          <div className="upload-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                          </div>
                          <p className="upload-title">Upload Degree Proof</p>
                          <p className="upload-subtitle">Drag & drop your file here, or</p>
                          <span className="upload-btn" onClick={(e)=>{e.stopPropagation();fileInputRef.current?.click()}}>Browse files</span>
                          <p className="upload-formats">PDF, JPG, PNG · Max 5 MB</p>
                        </>
                      ) : (
                        <div style={{ pointerEvents:'none' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', marginBottom:4 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            <span style={{ fontSize:13, fontWeight:500, color:'var(--success)' }}>File uploaded successfully</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* File preview */}
                    {uploadedFile && (
                      <div className="file-preview">
                        <span className="file-preview-icon">{getFileIcon(uploadedFile.type)}</span>
                        <div className="file-preview-info">
                          <div className="file-preview-name">{uploadedFile.name}</div>
                          <div className="file-preview-size">{formatFileSize(uploadedFile.size)}</div>
                        </div>
                        <button
                          type="button"
                          className="file-remove-btn"
                          onClick={()=>{ setUploadedFile(null); setValue('degreeProof', null) }}
                          aria-label="Remove file"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display:'none' }}
                      onChange={(e)=>handleFileChange(e.target.files?.[0])}
                      {...register('degreeProof',{ validate: ()=> uploadedFile ? true : 'Please upload your degree proof' })}
                    />
                    {errors.degreeProof && !uploadedFile && <p className="error-msg"><span className="error-dot"/>{errors.degreeProof.message}</p>}
                  </div>

                  <div className="step-actions">
                    <button type="button" className="btn-back" onClick={()=>setCurrentStep(1)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      Back
                    </button>
                    <button type="submit" className="btn-next">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}

            <p className="login-nudge">Already registered? <a href="#">Sign in as Doctor</a></p>
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

export default DoctorRegisterPage
