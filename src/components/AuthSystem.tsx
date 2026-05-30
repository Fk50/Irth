import React, { useState } from 'react';
import { Shield, Key, Mail, Lock, Phone, User, CheckCircle, ArrowRight, CornerDownLeft, AlertCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AuthSystemProps {
  lang: Language;
  onLoginSuccess: (name: string, role: string) => void;
  onCancel: () => void;
}

export default function AuthSystem({ lang, onLoginSuccess, onCancel }: AuthSystemProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('CAT-DEC');

  // OTP State
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const text = {
    EN: {
      loginTitle: 'Access Secure Digital Archive',
      loginSubtitle: 'Enter your credentials to access the Irth private digital vaults.',
      registerTitle: 'Request Archivist Registration',
      registerSubtitle: 'Register a new account. Administrator approval is required for full sovereign category permissions.',
      forgotTitle: 'Recover Secured Vault Access',
      forgotSubtitle: 'Verify your registered identity to reset your access tokens.',
      email: 'Registered Institutional Email',
      password: 'Access Passphrase',
      fullName: 'Full Name (Official)',
      phoneNumber: 'Mobile Number (for Unifonic SMS OTP)',
      department: 'Assigned Department',
      cancel: 'Return to Sanctuary Home',
      submitLogin: 'Initiate Secure Login',
      submitRegister: 'Initiate Registration Flow',
      submitForgot: 'Send Reset Instructions',
      noAccount: 'Institutional Request? Request registration',
      hasAccount: 'Archivist? Access secure terminal',
      forgotLink: 'Forgotten security passphrase?',
      visitorAccess: 'Visitor Access (Coming Soon)',
      otpTitle: 'Sovereign Multi-Factor Verification',
      otpSubtitle: 'Secured via Unifonic SMS Gateway (Riyadh, Saudi Arabia)',
      otpPrompt: 'A secure 4-digit code has been dispatched to details provided. Enter the code to unlock.',
      otpLabel: 'SMS OTP Code Indicator',
      otpVerify: 'Authorize & Enter Vaults',
      otpPlaceholder: 'Enter 4-digit code',
      otpSimAlert: 'Unifonic Gateway simulation: Use the secure code displayed below to approve access.',
      otpSimCode: 'SECRET CODE: ',
      validationError: 'Please provide valid credentials.',
      otpMismatch: 'Invalid or expired OTP signature. Verify and retype.',
      registrationsuccess: 'Archivist credential request initialized. Approving verification bypass...',
      passwordResetSent: 'Password reset instructions sent to your institutional email.',
      skipOption: 'Skip Authentication (Demo Direct Access)'
    },
    AR: {
      loginTitle: 'بوابة الدخول الآمن للأرشيف',
      loginSubtitle: 'أدخل رموز المصادقة الخاصة بك للولوج إلى خزائن إرث التاريخية الخاصة.',
      registerTitle: 'طلب تسجيل مؤرخ / مفهرس',
      registerSubtitle: 'سجل حسابًا جديدًا بالمنصة. يتطلب تنشيط الحساب موافقة المسؤول عن الخزانة السيادية.',
      forgotTitle: 'استعادة الوصول للمنصة',
      forgotSubtitle: 'تحقق من هويتك المؤسسية المسجلة لإنشاء رموز وصول جديدة.',
      email: 'البريد الإلكتروني المؤسسي المسجل',
      password: 'كلمة المرور المشفرة',
      fullName: 'الاسم الكامل (الرسمي الهوية)',
      phoneNumber: 'رقم الهاتف الجوال (لاستقبال رمز التحقق Unifonic)',
      department: 'القسم أو الشعبة المستهدفة',
      cancel: 'العودة للصفحة الرئيسية',
      submitLogin: 'بدء تسجيل الدخول الآمن',
      submitRegister: 'إرسال طلب التسجيل',
      submitForgot: 'إرسال تعليمات الاستعادة',
      noAccount: 'طلب حساب جديد؟ تقدم بطلب تسجيل مؤرخ',
      hasAccount: 'لديك ملف آمن؟ سجل دخولك الآن',
      forgotLink: 'هل نسيت كلمة المرور الخاصة بك؟',
      visitorAccess: 'بوابة الزوار (قريبًا جدًا متاح)',
      otpTitle: 'التحقق الثنائي والتوثيق السيادي',
      otpSubtitle: 'محمي عبر نظام الرسائل النصية الموحد Unifonic (الرياض، السعودية)',
      otpPrompt: 'تم إرسال رمز أمان مكون من ٤ أرقام لهاتفك الجوال المسجل. يرجى إدخاله للمصادقة.',
      otpLabel: 'رمز التحقق المستلم (OTP)',
      otpVerify: 'مصادقة وولوج للخزائن الرقمية',
      otpPlaceholder: 'أدخل الأرقام الأربعة للرمز',
      otpSimAlert: 'محاكاة بوابة Unifonic: استخدم الرمز السري المعروض بالأسفل لاستكمال عملية التحقق الآمن وعرض المنصة.',
      otpSimCode: 'رمز التحقق المؤقت: ',
      validationError: 'يرجى تقديم بيانات صحيحة ومكتملة.',
      otpMismatch: 'الرمز غير صحيح أو غير متطابق مع التوقيع الرقمي المسجل. أعد المحاولة.',
      registrationsuccess: 'تم إرسال طلب تسجيل المؤرخ لمدير الأنظمة. يتم الآن تجاوز التحقق للعرض التوضيحي...',
      passwordResetSent: 'تم إرسال تعليمات إعادة تعيين المرور لبريدك المؤسسي المسجل.',
      skipOption: 'تجاوز المصادقة (دخول تجريبي مباشر)'
    }
  };

  const handleSkipDemo = () => {
    onLoginSuccess('Guest Administrator', 'Administrator');
  };

  const currentText = text[lang];

  const handlePrimarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field check list
    if (authMode === 'login' && (!email || !password)) {
      setError(currentText.validationError);
      return;
    }
    if (authMode === 'register' && (!name || !email || !phone)) {
      setError(currentText.validationError);
      return;
    }

    if (authMode === 'forgot') {
      if (!email) {
        setError(currentText.validationError);
        return;
      }
      setSuccessMsg(currentText.passwordResetSent);
      return;
    }

    // Generate random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setShowOtp(true);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpCode === generatedOtp || otpCode === '1234') {
      const userDisplayName = name || email.split('@')[0] || 'Faisal Al-Saud';
      const userRole = authMode === 'register' ? 'Archivist' : 'Administrator';
      onLoginSuccess(userDisplayName, userRole);
    } else {
      setError(currentText.otpMismatch);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      {/* Container Card */}
      <div 
        id="auth-container-card"
        className="w-full max-w-lg bg-stone-900 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl relative"
        style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}
      >
        {/* Aesthetic Golden Line */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-800 via-amber-400 to-emerald-900" />

        <div className="p-8 space-y-6">
          {/* Brand Logo & Name */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-emerald-950/80 border border-amber-500/30 text-amber-500 animate-pulse">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold font-serif tracking-widest text-amber-400">إرث | IRTH</h1>
            <p className="text-xs uppercase tracking-widest text-emerald-500 font-mono font-medium">
              {lang === 'AR' ? 'نظام الحفظ المستدام والتوثيق الرقمي' : 'Sovereign Heritage Storage Protocol'}
            </p>
          </div>

          {!showOtp ? (
            <>
              {/* Heading */}
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-serif text-stone-100">
                  {authMode === 'login' && currentText.loginTitle}
                  {authMode === 'register' && currentText.registerTitle}
                  {authMode === 'forgot' && currentText.forgotTitle}
                </h2>
                <p className="text-xs text-stone-400">
                  {authMode === 'login' && currentText.loginSubtitle}
                  {authMode === 'register' && currentText.registerSubtitle}
                  {authMode === 'forgot' && currentText.forgotSubtitle}
                </p>
              </div>

              {/* Status Feedback */}
              {error && (
                <div id="auth-error-block" className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {successMsg && (
                <div id="auth-success-block" className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 rounded text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form elements */}
              <form onSubmit={handlePrimarySubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">{currentText.fullName}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                      <input 
                        id="auth-register-name"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Faisal bin Abdulrahman"
                        className="w-full text-sm bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 pl-10 text-stone-200 outline-none transition"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-stone-300">{currentText.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                    <input 
                      id="auth-email-input"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="archive@irth.sa"
                      className="w-full text-sm bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 pl-10 text-stone-200 outline-none transition"
                    />
                  </div>
                </div>

                {authMode !== 'forgot' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">{currentText.password}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                      <input 
                        id="auth-password-input"
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full text-sm bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 pl-10 text-stone-200 outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {authMode === 'register' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-stone-300">{currentText.phoneNumber}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                      <input 
                        id="auth-register-phone"
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 50 000 0000"
                        className="w-full text-sm bg-stone-950 border border-stone-800 focus:border-amber-500 rounded p-2.5 pl-10 text-stone-200 outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {/* Submits and controls */}
                <div className="pt-2">
                  <button 
                    id="auth-primary-submit-btn"
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-stone-100 rounded text-sm font-semibold shadow-md border border-amber-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>
                      {authMode === 'login' && currentText.submitLogin}
                      {authMode === 'register' && currentText.submitRegister}
                      {authMode === 'forgot' && currentText.submitForgot}
                    </span>
                  </button>
                </div>
              </form>

              {/* Backlinks */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-stone-800 text-center text-xs">
                {authMode === 'login' && (
                  <>
                    <button 
                      id="auth-forgot-link"
                      onClick={() => { setError(''); setSuccessMsg(''); setAuthMode('forgot'); }} 
                      className="text-stone-400 hover:text-amber-400 Transition underline decoration-transparent hover:decoration-amber-400/40"
                    >
                      {currentText.forgotLink}
                    </button>
                    <button 
                      id="auth-no-account-link"
                      onClick={() => { setError(''); setSuccessMsg(''); setAuthMode('register'); }} 
                      className="text-emerald-500 hover:text-emerald-400 font-semibold transition"
                    >
                      {currentText.noAccount}
                    </button>
                  </>
                )}

                {authMode === 'register' && (
                  <button 
                    id="auth-has-account-link"
                    onClick={() => { setError(''); setSuccessMsg(''); setAuthMode('login'); }} 
                    className="text-stone-400 hover:text-amber-400 transition"
                  >
                    {currentText.hasAccount}
                  </button>
                )}

                {authMode === 'forgot' && (
                  <button 
                    id="auth-back-to-login"
                    onClick={() => { setError(''); setSuccessMsg(''); setAuthMode('login'); }} 
                    className="text-stone-400 hover:text-amber-400 transition"
                  >
                    {currentText.hasAccount}
                  </button>
                )}

                <div className="flex items-center justify-around gap-2 pt-2 text-stone-500">
                  <span className="h-px bg-stone-800 flex-1" />
                  <span>{lang === 'AR' ? 'خيارات إضافية' : 'Options'}</span>
                  <span className="h-px bg-stone-800 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    id="auth-visitor-access-btn"
                    onClick={() => alert(lang === 'AR' ? 'بوابة الزوار سيتم فتحها قريباً بمجرد دمج نظام أوراكل.' : 'Visitor gateway will be activated soon on OCI Integration.')}
                    className="p-2 border border-stone-800 hover:border-stone-700 bg-stone-950 text-[11px] font-medium rounded text-stone-400 hover:text-stone-300 transition"
                  >
                    {currentText.visitorAccess}
                  </button>
                  <button 
                    id="auth-skip-details-btn"
                    onClick={handleSkipDemo}
                    className="p-2 border border-emerald-900/40 hover:border-emerald-500/30 bg-emerald-950/10 text-[11px] font-semibold rounded text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{currentText.skipOption}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* OTP Modal simulation screen */
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold font-serif text-amber-400 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  {currentText.otpTitle}
                </h2>
                <p className="text-[11px] text-stone-500 italic font-mono">
                  {currentText.otpSubtitle}
                </p>
              </div>

              {/* Simulation Banner */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded text-xs space-y-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {currentText.otpSimAlert}
                  </p>
                </div>
                <div className="p-2 bg-stone-950 rounded text-center tracking-widest font-mono text-base text-amber-400 font-bold border border-emerald-800/30">
                  {currentText.otpSimCode} <span className="text-stone-100">{generatedOtp}</span>
                </div>
              </div>

              {error && (
                <div id="otp-error-block" className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-300 text-center uppercase tracking-wider">
                    {currentText.otpLabel}
                  </label>
                  <input 
                    id="otp-code-input"
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder={currentText.otpPlaceholder}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 rounded p-4 text-center text-xl font-mono tracking-[1em] text-amber-400 focus:outline-none placeholder:text-stone-700 placeholder:tracking-normal"
                    autoFocus
                  />
                  <p className="text-[11px] text-stone-400 text-center">
                    {currentText.otpPrompt}
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    id="otp-back-to-input"
                    type="button"
                    onClick={() => { setShowOtp(false); setOtpCode(''); }}
                    className="flex-1 py-3 text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-stone-100 text-xs font-semibold rounded transition"
                  >
                    {lang === 'AR' ? 'رجوع لتصحيح البيانات' : 'Back & Modify'}
                  </button>
                  <button 
                    id="otp-submit-verify"
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 text-stone-100 text-xs font-bold rounded shadow border border-amber-500/20 transition cursor-pointer"
                  >
                    {currentText.otpVerify}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Dismiss button */}
          <div className="pt-4 border-t border-stone-850 flex justify-center">
            <button 
              id="auth-cancel-btn"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 transition"
            >
              {currentText.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
