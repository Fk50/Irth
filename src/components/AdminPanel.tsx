import React, { useState } from 'react';
import { 
  Users, Database, ShieldAlert, TrendingUp, UserPlus, 
  Trash2, ToggleLeft, ToggleRight, Key, Check, Ban, AlertTriangle, RefreshCw, X
} from 'lucide-react';
import { Language, SystemUser, AuditLog, Category, SystemStats } from '../types';

interface AdminPanelProps {
  lang: Language;
  users: SystemUser[];
  setUsers: React.Dispatch<React.SetStateAction<SystemUser[]>>;
  auditLogs: AuditLog[];
  categories: Category[];
  stats: SystemStats;
  addAuditLog: (actionEN: string, actionAR: string, target: string) => void;
}

export default function AdminPanel({
  lang,
  users,
  setUsers,
  auditLogs,
  categories,
  stats,
  addAuditLog
}: AdminPanelProps) {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Administrator' | 'Archivist' | 'Viewer'>('Viewer');
  const [newUserDeptEN, setNewUserDeptEN] = useState('');
  const [newUserDeptAR, setNewUserDeptAR] = useState('');

  // Pending moderation items mock state
  const [moderationQueue, setModerationQueue] = useState([
    {
      id: 'mod-1',
      titleEN: 'Private diary entries scanned pages',
      titleAR: 'مذكرة شخصية مصورة لأحد أعيان نجد',
      submittedBy: 'Sarah Al-Moneef',
      fileSize: '45.1 MB',
      date: '2026-05-30 05:12'
    },
    {
      id: 'mod-2',
      titleEN: 'Unidentified tribal boundary deed',
      titleAR: 'صك حدود قبلي غير موثق',
      submittedBy: 'Abdullah Qahtani',
      fileSize: '18.4 MB',
      date: '2026-05-30 04:55'
    }
  ]);

  const text = {
    EN: {
      adminTitle: 'Sovereign Control Panel',
      adminDesc: 'Manage access parameters, verify uploads & monitor OCI infrastructure.',
      statistics: 'Infrastructure Storage Performance metrics',
      storageUsed: 'Sovereign OCI Storage Pool Used',
      storageLimit: 'Authorized Capacity Limit',
      activeMembers: 'Registered Archival Guards',
      unifonicStatus: 'Unifonic Gateway Protocol: Operational',
      auditTrail: 'Secured Digital Audit Register',
      userManagement: 'Archival Staff Roster',
      addUserBtn: 'Formulate New Guard/Member',
      moderationQueue: 'Awaiting Moderation clearance',
      approve: 'Allow Archive',
      flag: 'Flag & Isolate',
      actionSuccess: 'Action processed and audit ledger updated.',
      resetPass: 'Passphrase reset dispatched successfully.',
      memberAdded: 'New system guard initialized.',
      unifonicBalance: 'Unifonic Gateway status: Connected',
      userAddedSuccess: 'Staff member initialized successfully.',
      recentActivities: 'Real-Time Ledger Transaction log',
      moderationClean: 'All incoming assets successfully cleared for permanent cataloging.'
    },
    AR: {
      adminTitle: 'لوحة التحكم والولاية المشتركة',
      adminDesc: 'إدارة الصلاحيات والمستخدمين والموافقة على الأرشيف ومراقبة الاستضافة الرياض.',
      statistics: 'مؤشرات أداء وسعة التخزين والبنية التحتية',
      storageUsed: 'حوض تخزين أوراكل المستهلك سيادياً',
      storageLimit: 'الحد الأقصى المصرح به للسعة',
      activeMembers: 'المنتسبون المفوضون للأرشيف',
      unifonicStatus: 'بوابة رسائل Unifonic: تعمل بشكل سليم ويقظ',
      auditTrail: 'دفتر التدقيق الرقمي الموثق والوقائع',
      userManagement: 'سجل الموظفين والمؤرخين والمحققين',
      addUserBtn: 'إضافة منتسب جديد للمنظومة',
      moderationQueue: 'الأصول الواردة والمعلقة بانتظار الفرز والموافقة',
      approve: 'اعتماد وضم للأرشيف',
      flag: 'علم بالشك وحظر النشر',
      actionSuccess: 'تم تنفيذ الإجراء وتوثيقه في السجل التاريخي بنجاح.',
      resetPass: 'تم إرسال رابط تصفير كلمة المرور لهوية الموظف بنجاح.',
      memberAdded: 'تم تسجيل العضو الجديد بنجاح في سجلات النظام.',
      unifonicBalance: 'بوابة Unifonic: الحالة متصلة وبصحة ممتازة',
      userAddedSuccess: 'تم تأسيس العضو الجديد بالمنظومة.',
      recentActivities: 'أحدث حركات المعاملات والعمليات الجارية',
      moderationClean: 'لا توجد طلبات معلقة حالياً، مستودع الأصول وارد سليم بالكامل.'
    }
  };

  const currentText = text[lang];

  // User Actions
  const handleToggleUserStatus = (userId: string, userName: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    
    addAuditLog(
      `Toggled status for staff member "${userName}" to ${nextStatus}`,
      `قام بتغيير حالة حساب العضو الموظف "${userName}" إلى ${nextStatus === 'Active' ? 'نشط' : 'معطل'}`,
      userId
    );
    alert(currentText.actionSuccess);
  };

  const handleResetUserPassword = (userId: string, userName: string) => {
    addAuditLog(
      `Dispatched secure credentials reset for "${userName}"`,
      `قام بإرسال طلب لإعادة تعيين كود المرور الخاص بالموظف "${userName}"`,
      userId
    );
    alert(currentText.resetPass);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) {
      alert(lang === 'AR' ? 'يرجى ملء البيانات المطلوبة.' : 'Please enter all required data.');
      return;
    }

    const newUser: SystemUser = {
      id: `user-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      departmentEN: newUserDeptEN || 'Preservation Hub Team',
      departmentAR: newUserDeptAR || 'فريق منظومة الحفظ التراثي',
      lastActive: 'Never'
    };

    setUsers(prev => [...prev, newUser]);
    
    addAuditLog(
      `Registered new ${newUserRole} staff member "${newUserName}"`,
      `أصدر قرار قيد وتأسيس العضو الجديد بمرتبة (${newUserRole}) باسم "${newUserName}"`,
      newUser.id
    );

    setNewUserName('');
    setNewUserEmail('');
    setNewUserDeptEN('');
    setNewUserDeptAR('');
    setShowAddUserModal(false);
    alert(currentText.userAddedSuccess);
  };

  // Moderation Actions
  const handleModerate = (id: string, nameEN: string, nameAR: string, decision: 'approve' | 'flag') => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
    
    addAuditLog(
      `Moderation outcome for "${nameEN}": ${decision.toUpperCase()}`,
      `أصدر نتيجة قرار فرز ومراقبة للوثيقة الواردة "${nameAR}": ${decision === 'approve' ? 'موافقة واعتماد' : 'حظر وعلم احترازي'}`,
      id
    );
    alert(currentText.actionSuccess);
  };

  // Calculate storage usage percentage
  const storagePercentage = Math.round((stats.storageUsedGB / stats.storageLimitGB) * 100);

  return (
    <div className="space-y-8" style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
      
      {/* Title block */}
      <div className="p-6 bg-stone-900 border border-amber-500/10 rounded-xl">
        <h2 className="text-xl font-bold font-serif text-amber-400 flex items-center gap-2">
          <Database className="w-6 h-6 text-emerald-500 animate-pulse" />
          <span>{currentText.adminTitle}</span>
        </h2>
        <p className="text-xs text-stone-400 mt-1">{currentText.adminDesc}</p>
      </div>

      {/* Grid: Storage charts/metrics & Unifonic parameters */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Storage Health card */}
        <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-stone-500">
              {currentText.storageUsed}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-stone-100">{stats.storageUsedGB}</span>
              <span className="text-xs text-stone-400 font-mono">GB OF {stats.storageLimitGB} GB</span>
            </div>
            {/* Dynamic Progress Indicator */}
            <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden border border-stone-800">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-900 text-[11px] text-stone-500 flex justify-between font-mono">
            <span>RESIDENCY: OCI RY-1 (RIYADH)</span>
            <span className="text-emerald-400">{storagePercentage}% USED</span>
          </div>
        </div>

        {/* Dynamic Category Weight breakdown SVG chart */}
        <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between md:col-span-1">
          <div className="space-y-3.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-stone-500">
              {lang === 'AR' ? 'حصة تخزين ملفات الأقسام' : 'Storage Allocation weights'}
            </h3>
            
            {/* Hand-made premium interactive weights bar chart */}
            <div className="space-y-2">
              {categories.map((cat, idx) => {
                // Calculate pseudo progress based on item count
                const percentage = Math.max(15, Math.min(100, Math.round((cat.itemCount / stats.totalItems) * 200)));
                const colors = ['bg-emerald-800', 'bg-amber-600', 'bg-teal-700', 'bg-emerald-950', 'bg-amber-500'];
                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-stone-300 truncate max-w-[120px]">{lang === 'AR' ? cat.nameAR : cat.nameEN}</span>
                      <span className="text-stone-500">{cat.itemCount} items</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors[idx % colors.length]}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Security / SMS OTP connection log metrics */}
        <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-stone-500">
              MFA INTEGRATION LOGS
            </h3>
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span>{currentText.unifonicBalance}</span>
              </div>
              <p className="text-[10px] text-stone-400 leading-relaxed font-serif">
                {currentText.unifonicStatus}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-900 text-[11px] text-stone-500 flex justify-between font-mono">
            <span>PROVIDER: UNIFONIC RYD</span>
            <span className="text-amber-500">COST: ~SAR 0.055/OTP</span>
          </div>
        </div>

      </div>

      {/* Grid: Staff guard roster & pending items */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Guard members Management */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-serif text-stone-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>{currentText.userManagement}</span>
            </h3>
            <button
              id="add-user-modal-trigger"
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded text-xs font-bold hover:bg-emerald-900 transition hover:text-emerald-300 pointer-events-auto"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{currentText.addUserBtn}</span>
            </button>
          </div>

          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="p-3 bg-stone-900/60 rounded border border-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-200">{u.name}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      u.role === 'Administrator' ? 'bg-amber-950 text-amber-400' :
                      u.role === 'Archivist' ? 'bg-emerald-950 text-emerald-400' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {u.role}
                    </span>
                    <span className={`px-1 rounded-full text-[9px] font-semibold ${
                      u.status === 'Active' ? 'bg-emerald-950/80 text-emerald-400' : 'bg-red-950/80 text-red-400'
                    }`}>
                      • {u.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 font-mono">{u.email} • {lang === 'AR' ? u.departmentAR : u.departmentEN}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Password simulated reset trigger */}
                  <button
                    onClick={() => handleResetUserPassword(u.id, u.name)}
                    className="p-1 px-2 border border-stone-800 text-stone-400 hover:text-stone-200 bg-stone-950 rounded text-[10px] transition font-mono"
                    title="Send secure passphrase reset code to credentials"
                  >
                    RESET SECURITY
                  </button>
                  
                  {/* Deactivate switch button */}
                  <button
                    onClick={() => handleToggleUserStatus(u.id, u.name, u.status)}
                    className={`p-1.5 rounded transition ${
                      u.status === 'Active' ? 'text-red-400 bg-red-950/20 border border-red-500/10 hover:bg-red-950/60' : 'text-emerald-400 bg-emerald-950/20 border border-emerald-800/10 hover:bg-emerald-950/60'
                    }`}
                    title={lang === 'AR' ? 'تعديل الصلاحية أو تجميد القيد' : 'Modify Access parameters'}
                  >
                    {u.status === 'Active' ? <Ban className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Moderation Area */}
        <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
          <h3 className="text-sm font-bold font-serif text-stone-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>{currentText.moderationQueue}</span>
          </h3>

          {moderationQueue.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-stone-800 rounded bg-stone-950/20 text-[11px] text-stone-500 italic block leading-relaxed">
              {currentText.moderationClean}
            </div>
          ) : (
            <div className="space-y-3.5">
              {moderationQueue.map(item => (
                <div key={item.id} className="p-3 bg-stone-900 rounded border border-stone-850 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-wider text-stone-500 uppercase">
                      BY: {item.submittedBy} ({item.fileSize})
                    </span>
                    <h4 className="text-xs font-bold text-stone-200 font-serif leading-relaxed">
                      {lang === 'AR' ? item.titleAR : item.titleEN}
                    </h4>
                    <p className="text-[10px] text-stone-500 font-mono">{item.date}</p>
                  </div>

                  <div className="flex gap-2 pt-1 border-t border-stone-900">
                    <button
                      onClick={() => handleModerate(item.id, item.titleEN, item.titleAR, 'approve')}
                      className="flex-1 py-1 px-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 text-[10px] font-bold rounded transition border border-emerald-800/40 text-center cursor-pointer"
                    >
                      {currentText.approve}
                    </button>
                    <button
                      onClick={() => handleModerate(item.id, item.titleEN, item.titleAR, 'flag')}
                      className="flex-1 py-1 px-2.5 bg-red-950 hover:bg-red-900 text-red-400 text-[10px] font-bold rounded transition border border-red-500/20 text-center cursor-pointer"
                    >
                      {currentText.flag}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Audit ledger transaction log block */}
      <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
        <h3 className="text-sm font-bold font-serif text-stone-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>{currentText.recentActivities}</span>
        </h3>

        <div className="divide-y divide-stone-900 max-h-72 overflow-y-auto pr-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <span className="text-stone-400 font-bold shrink-0">[{log.user}]</span>
                <span className="text-stone-300 font-serif text-xs px-2 block sm:inline leading-relaxed">
                  {lang === 'AR' ? log.actionAR : log.actionEN}
                </span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto text-[10px]">
                <span className="text-stone-500">{log.timestamp}</span>
                <span className={`px-1.5 rounded uppercase text-[9px] font-medium font-bold ${
                  log.status === 'Success' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create User Dialog modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 rounded-xl border border-amber-500/30 overflow-hidden">
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex justify-between items-center">
              <h4 className="text-sm font-bold font-serif text-amber-300">{lang === 'AR' ? 'تأسيس عضوية جديدة' : 'Formulate New System User'}</h4>
              <button onClick={() => setShowAddUserModal(false)} className="text-stone-400 hover:text-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] text-stone-400">{lang === 'AR' ? 'الاسم الكامل الموثق' : 'Official Full Name'}</label>
                <input 
                  type="text" 
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Noura Al-Ghamdi"
                  className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-400 rounded p-2 text-stone-200 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-stone-400">{lang === 'AR' ? 'البريد الإلكتروني المؤسسي' : 'Institutional Email address'}</label>
                <input 
                  type="email" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="noura.g@irth.sa"
                  className="w-full text-xs bg-stone-950 border border-stone-800 focus:border-amber-400 rounded p-2 text-stone-200 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-stone-400">{lang === 'AR' ? 'مرتبة الصلاحية الفنية' : 'Staff Sovereign Duty role'}</label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full text-xs bg-stone-950 border border-stone-800 text-stone-200 rounded p-2 focus:outline-none"
                >
                  <option value="Viewer">Viewer (Read-Only access)</option>
                  <option value="Archivist">Archivist (Full indexing metadata entry)</option>
                  <option value="Administrator">Administrator (Sovereign approval clearances)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">Department (English)</label>
                  <input 
                    type="text" 
                    value={newUserDeptEN}
                    onChange={(e) => setNewUserDeptEN(e.target.value)}
                    placeholder="e.g. Rare Manuscript Desk"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-400">القسم التاريخي (عربي)</label>
                  <input 
                    type="text" 
                    value={newUserDeptAR}
                    onChange={(e) => setNewUserDeptAR(e.target.value)}
                    placeholder="مثال: ترميم المخطوطات الفلكية"
                    className="w-full text-xs bg-stone-950 border border-stone-800 rounded p-2 text-stone-200 focus:outline-none text-right"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-400 text-xs rounded transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 text-xs font-bold text-stone-100 rounded border border-amber-500/20 cursor-pointer"
                >
                  Initialize Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
