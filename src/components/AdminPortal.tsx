import React, { useState } from 'react';
import { 
  Language, 
  HumanitarianCase, 
  CaseStatus, 
  RequestType, 
  OrganizationSettings 
} from '../types';
import { translations } from '../translations';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ExternalLink, 
  Settings, 
  ListFilter, 
  FileCheck, 
  LogOut, 
  Save, 
  Lock,
  Eye,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';

interface AdminPortalProps {
  currentLang: Language;
  cases: HumanitarianCase[];
  onUpdateCase: (updatedCase: HumanitarianCase) => void;
  settings: OrganizationSettings;
  onUpdateSettings: (newSettings: OrganizationSettings) => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentLang,
  cases,
  onUpdateCase,
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const t = translations[currentLang];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Tab views: 'cases' | 'settings'
  const [activeTab, setActiveTab] = useState<'cases' | 'settings'>('cases');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Selected case for detailed review modal
  const [inspectingCase, setInspectingCase] = useState<HumanitarianCase | null>(null);

  // Status update form states in inspector
  const [newStatus, setNewStatus] = useState<CaseStatus>('new');
  const [adminNote, setAdminNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Settings form states
  const [orgForm, setOrgForm] = useState<OrganizationSettings>({ ...settings });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === '2026') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError(t.admin.wrongPin);
    }
  };

  const openInspector = (c: HumanitarianCase) => {
    setInspectingCase(c);
    setNewStatus(c.status);
    setAdminNote('');
    setRejectionReason(c.rejectionReason || '');
  };

  const handleCommitStatusChange = () => {
    if (!inspectingCase) return;

    const updatedTimeline = [
      ...inspectingCase.timeline,
      {
        date: new Date().toISOString().split('T')[0],
        action: `تم تحديث الحالة إلى: ${getStatusLabel(newStatus)}`,
        user: 'إدارة شؤون الحالات (المراجعة المركزية)',
        note: adminNote.trim() || undefined,
      },
    ];

    const updated: HumanitarianCase = {
      ...inspectingCase,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      adminNotes: adminNote.trim() ? `${inspectingCase.adminNotes ? inspectingCase.adminNotes + '\n' : ''}${adminNote.trim()}` : inspectingCase.adminNotes,
      rejectionReason: newStatus === 'rejected' ? rejectionReason.trim() : undefined,
      timeline: updatedTimeline,
    };

    onUpdateCase(updated);
    setInspectingCase(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(orgForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const getStatusLabel = (status: CaseStatus) => {
    switch (status) {
      case 'new': return currentLang === 'ar' ? 'جديد' : 'New';
      case 'under_review': return currentLang === 'ar' ? 'قيد المراجعة' : 'Under Review';
      case 'needs_completion': return currentLang === 'ar' ? 'يحتاج استكمال بيانات' : 'Needs Info';
      case 'verified': return currentLang === 'ar' ? 'تم التحقق' : 'Verified';
      case 'approved': return currentLang === 'ar' ? 'تمت الموافقة' : 'Approved';
      case 'sponsored': return currentLang === 'ar' ? 'تمت الكفالة' : 'Sponsored';
      case 'rejected': return currentLang === 'ar' ? 'مرفوض' : 'Rejected';
    }
  };

  const getStatusBadgeStyle = (status: CaseStatus) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'under_review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'needs_completion': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'verified': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'sponsored': return 'bg-emerald-800 text-white border-emerald-900';
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getRequestTypeLabel = (type: RequestType) => {
    switch (type) {
      case 'orphan_sponsorship': return currentLang === 'ar' ? 'كفالة يتيم' : 'Orphan Sponsorship';
      case 'widow_care': return currentLang === 'ar' ? 'رعاية أرملة' : 'Widow Care';
      case 'vulnerable_family': return currentLang === 'ar' ? 'أسرة متعففة' : 'Vulnerable Family';
      case 'urgent_relief': return currentLang === 'ar' ? 'إغاثة عاجلة' : 'Urgent Relief';
    }
  };

  // Filter cases
  const filteredCases = cases.filter((c) => {
    if (selectedCountry !== 'all' && !c.applicant.country.includes(selectedCountry)) return false;
    if (selectedType !== 'all' && c.requestType !== selectedType) return false;
    if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchName = c.applicant.fullName.toLowerCase().includes(q);
      const matchBeneficiary = c.beneficiary.name.toLowerCase().includes(q);
      const matchCity = c.applicant.city.toLowerCase().includes(q);
      const matchPhone = c.applicant.phone.includes(q);
      if (!matchId && !matchName && !matchBeneficiary && !matchCity && !matchPhone) return false;
    }
    return true;
  });

  // Calculate stats
  const totalCount = cases.length;
  const newCount = cases.filter((c) => c.status === 'new').length;
  const underReviewCount = cases.filter((c) => c.status === 'under_review').length;
  const needsDataCount = cases.filter((c) => c.status === 'needs_completion').length;
  const verifiedCount = cases.filter((c) => c.status === 'verified').length;
  const approvedCount = cases.filter((c) => c.status === 'approved').length;
  const sponsoredCount = cases.filter((c) => c.status === 'sponsored').length;
  const rejectedCount = cases.filter((c) => c.status === 'rejected').length;

  const exportToCsv = () => {
    const headers = ['ID', 'Date', 'Type', 'Status', 'Applicant', 'Phone', 'Country', 'State', 'City', 'Beneficiary', 'Age', 'FamilyMembers'];
    const rows = filteredCases.map((c) => [
      c.id,
      c.createdAt.split('T')[0],
      c.requestType,
      c.status,
      `"${c.applicant.fullName.replace(/"/g, '""')}"`,
      c.applicant.phone,
      `"${c.applicant.country}"`,
      `"${c.applicant.state}"`,
      `"${c.applicant.city}"`,
      `"${c.beneficiary.name.replace(/"/g, '""')}"`,
      c.beneficiary.age,
      c.beneficiary.familyMembersCount,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `alnoor_cases_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, show PIN gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 p-2 text-stone-400 hover:text-stone-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-7 h-7 text-amber-300" />
          </div>

          <h3 className="text-xl font-bold text-stone-900">{t.admin.title}</h3>
          <p className="text-xs text-stone-500 mt-1 mb-6">{t.admin.subtitle}</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder={t.admin.pinPlaceholder}
                className="w-full px-4 py-3 text-sm text-center tracking-widest font-mono bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 mt-1.5">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer"
            >
              {t.admin.loginButton}
            </button>

            <button
              type="button"
              onClick={() => {
                setPinInput('2026');
                setIsAuthenticated(true);
              }}
              className="w-full py-2.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
            >
              {t.admin.demoLogin}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-100 overflow-hidden animate-fade-in">
      
      {/* Admin Top Bar */}
      <header className="bg-emerald-950 text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-emerald-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold leading-tight">
              {t.admin.title}
            </h2>
            <p className="text-[11px] text-emerald-300">
              {t.orgName} · {currentLang === 'ar' ? 'جلسة تدقيق إداري موثوقة' : 'Secure Staff Session'}
            </p>
          </div>
        </div>

        {/* Tab Switcher & Exit */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-900/80 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cases' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              {currentLang === 'ar' ? 'سجل الطلبات' : 'Applications'}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              {currentLang === 'ar' ? 'قنوات التواصل' : 'Contact Channels'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
            title={t.admin.logout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="grow overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {activeTab === 'cases' ? (
          <>
            {/* KPI Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[11px] text-stone-500 font-bold block">{t.admin.totalCases}</span>
                <span className="text-xl font-bold font-mono text-stone-900">{totalCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-blue-200 shadow-2xs">
                <span className="text-[11px] text-blue-700 font-bold block">{currentLang === 'ar' ? 'جديد' : 'New'}</span>
                <span className="text-xl font-bold font-mono text-blue-900">{newCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                <span className="text-[11px] text-amber-700 font-bold block">{t.admin.underReview}</span>
                <span className="text-xl font-bold font-mono text-amber-900">{underReviewCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-orange-200 shadow-2xs">
                <span className="text-[11px] text-orange-700 font-bold block">{t.admin.needsData}</span>
                <span className="text-xl font-bold font-mono text-orange-900">{needsDataCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-teal-200 shadow-2xs">
                <span className="text-[11px] text-teal-700 font-bold block">{t.admin.verified}</span>
                <span className="text-xl font-bold font-mono text-teal-900">{verifiedCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs">
                <span className="text-[11px] text-emerald-700 font-bold block">{t.admin.approved}</span>
                <span className="text-xl font-bold font-mono text-emerald-900">{approvedCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-300 shadow-2xs bg-emerald-50/40">
                <span className="text-[11px] text-emerald-900 font-bold block">{t.admin.sponsored}</span>
                <span className="text-xl font-bold font-mono text-emerald-950">{sponsoredCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-rose-200 shadow-2xs">
                <span className="text-[11px] text-rose-700 font-bold block">{t.admin.rejected}</span>
                <span className="text-xl font-bold font-mono text-rose-900">{rejectedCount}</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 grow">
                <div className="relative grow">
                  <Search className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.admin.searchCases}
                    className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                  />
                </div>

                {/* Country Filter */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white"
                >
                  <option value="all">{t.admin.allCountries}</option>
                  <option value="السودان">السودان</option>
                  <option value="تشاد">تشاد</option>
                  <option value="كينيا">كينيا</option>
                  <option value="النيجر">النيجر</option>
                  <option value="الصومال">الصومال</option>
                </select>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white"
                >
                  <option value="all">{t.admin.allTypes}</option>
                  <option value="orphan_sponsorship">{t.programs.orphansTitle}</option>
                  <option value="widow_care">{t.programs.widowsTitle}</option>
                  <option value="vulnerable_family">{t.programs.vulnerableTitle}</option>
                  <option value="urgent_relief">{t.programs.reliefTitle}</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white"
                >
                  <option value="all">{t.admin.allStatuses}</option>
                  <option value="new">جديد</option>
                  <option value="under_review">قيد المراجعة</option>
                  <option value="needs_completion">يحتاج استكمال بيانات</option>
                  <option value="verified">تم التحقق</option>
                  <option value="approved">تمت الموافقة</option>
                  <option value="sponsored">تمت الكفالة</option>
                  <option value="rejected">مرفوض</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={exportToCsv}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl border border-stone-200 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4 text-stone-500" />
                <span>{t.admin.exportCsv}</span>
              </button>
            </div>

            {/* Cases Data Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right border-collapse">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">الرمز المرجعي</th>
                      <th className="px-4 py-3">تاريخ التسجيل</th>
                      <th className="px-4 py-3">نوع البرنامج</th>
                      <th className="px-4 py-3">مقدم الطلب</th>
                      <th className="px-4 py-3">المستفيد</th>
                      <th className="px-4 py-3">الموقع</th>
                      <th className="px-4 py-3">المستندات</th>
                      <th className="px-4 py-3">الحالة</th>
                      <th className="px-4 py-3 text-center">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredCases.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-10 text-center text-stone-400">
                          {currentLang === 'ar' ? 'لا توجد طلبات مطابقة لمعايير البحث' : 'No matching applications found'}
                        </td>
                      </tr>
                    ) : (
                      filteredCases.map((c) => (
                        <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-emerald-950">
                            {c.id}
                          </td>
                          <td className="px-4 py-3 text-stone-500 whitespace-nowrap">
                            {c.createdAt.split('T')[0]}
                          </td>
                          <td className="px-4 py-3 font-medium text-stone-800">
                            {getRequestTypeLabel(c.requestType)}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-stone-900 block">{c.applicant.fullName}</span>
                            <span className="text-[11px] text-stone-400 font-mono" dir="ltr">{c.applicant.phone}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-stone-800 block">{c.beneficiary.name}</span>
                            <span className="text-[11px] text-stone-400">{c.beneficiary.age} سنة · {c.beneficiary.familyMembersCount} أفراد</span>
                          </td>
                          <td className="px-4 py-3 text-stone-600">
                            <span>{c.applicant.state}</span>
                            <span className="block text-[11px] text-stone-400">{c.applicant.city}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <FileText className="w-3 h-3" />
                              <span>{c.documents.length}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getStatusBadgeStyle(c.status)}`}>
                              {getStatusLabel(c.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => openInspector(c)}
                              className="px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                            >
                              {t.admin.viewDetails}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* SETTINGS TAB: Organization Contact Channels */
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h3 className="text-lg font-bold text-stone-900">
                {t.admin.contactSettingsTitle}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {currentLang === 'ar' 
                  ? 'يمكنك تعديل أرقام الهواتف والواتساب والمكاتب وروابط التواصل، وستنعكس فوراً على كامل المنصة.'
                  : 'Manage organization phone, WhatsApp, office coordinates and social links.'}
              </p>
            </div>

            {settingsSavedToast && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.admin.savedSuccessfully}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {currentLang === 'ar' ? 'رقم واتساب المعتمد (مع الرمز الدولي)' : 'Official WhatsApp Number'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={orgForm.whatsappNumber}
                  onChange={(e) => setOrgForm({ ...orgForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {currentLang === 'ar' ? 'رقم الهاتف الرسمي للاتصال' : 'Official Phone Number'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={orgForm.phone}
                  onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {currentLang === 'ar' ? 'البريد الإلكتروني المعتمد' : 'Official Email Address'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={orgForm.email}
                  onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {currentLang === 'ar' ? 'عنوان المقر الرئيسي' : 'Headquarters Address'}
                </label>
                <input
                  type="text"
                  value={orgForm.headquarters}
                  onChange={(e) => setOrgForm({ ...orgForm, headquarters: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {currentLang === 'ar' ? 'مكتب السودان ومراكز التنسيق' : 'Sudan Coordination Office'}
                </label>
                <input
                  type="text"
                  value={orgForm.sudanOffice}
                  onChange={(e) => setOrgForm({ ...orgForm, sudanOffice: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={orgForm.facebookUrl}
                    onChange={(e) => setOrgForm({ ...orgForm, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">X (Twitter) URL</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={orgForm.xUrl}
                    onChange={(e) => setOrgForm({ ...orgForm, xUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Telegram URL</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={orgForm.telegramUrl}
                    onChange={(e) => setOrgForm({ ...orgForm, telegramUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">YouTube URL</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={orgForm.youtubeUrl}
                    onChange={(e) => setOrgForm({ ...orgForm, youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-4 text-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.admin.saveSettings}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* CASE INSPECTION MODAL */}
      {inspectingCase && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-stone-50 border-b border-stone-200 p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-stone-900">
                      {inspectingCase.beneficiary.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {inspectingCase.id}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    {getRequestTypeLabel(inspectingCase.requestType)} · {inspectingCase.applicant.country} ({inspectingCase.applicant.state})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectingCase(null)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 overflow-y-auto space-y-6 grow text-xs">
              
              {/* Status Update Control Section */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="font-bold text-emerald-950 text-sm">
                    {t.admin.changeStatus}
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as CaseStatus)}
                    className="px-3 py-2 text-xs font-bold bg-white border border-emerald-300 rounded-xl text-emerald-950 focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="new">جديد (New)</option>
                    <option value="under_review">قيد المراجعة (Under Review)</option>
                    <option value="needs_completion">يحتاج استكمال بيانات (Needs Completion)</option>
                    <option value="verified">تم التحقق الميداني (Verified)</option>
                    <option value="approved">تمت الموافقة (Approved)</option>
                    <option value="sponsored">تمت الكفالة (Sponsored)</option>
                    <option value="rejected">مرفوض (Rejected)</option>
                  </select>
                </div>

                {newStatus === 'rejected' && (
                  <div>
                    <label className="block font-bold text-rose-800 mb-1">
                      توضيح سبب الرفض (إلزامي):
                    </label>
                    <input
                      type="text"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="مثال: عدم ثبوت الاستحقاق الميداني أو تكرار الكفالة لدى جهة أخرى..."
                      className="w-full px-3 py-2 bg-white border border-rose-300 rounded-xl text-stone-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-bold text-emerald-900 mb-1">
                    {t.admin.addNote}
                  </label>
                  <input
                    type="text"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="اكتب ملاحظة أو توجيه ميداني..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  />
                </div>

                <div className="text-end pt-1">
                  <button
                    onClick={handleCommitStatusChange}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer"
                  >
                    {t.admin.updateStatusBtn}
                  </button>
                </div>
              </div>

              {/* Applicant & Case Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1">
                    بيانات مقدم الطلب (المشرف / الولي):
                  </h4>
                  <p><strong>الاسم:</strong> {inspectingCase.applicant.fullName}</p>
                  <p><strong>الهاتف:</strong> <span dir="ltr">{inspectingCase.applicant.phone}</span></p>
                  <p><strong>واتساب:</strong> <span dir="ltr">{inspectingCase.applicant.whatsapp}</span></p>
                  <p><strong>البريد:</strong> {inspectingCase.applicant.email || 'غير مدخل'}</p>
                  <p><strong>العنوان:</strong> {inspectingCase.applicant.country} - {inspectingCase.applicant.state} - {inspectingCase.applicant.city} ({inspectingCase.applicant.address})</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1">
                    تفاصيل المستفيد والأسرة:
                  </h4>
                  <p><strong>اسم المستفيد:</strong> {inspectingCase.beneficiary.name}</p>
                  <p><strong>العمر:</strong> {inspectingCase.beneficiary.age} سنة</p>
                  <p><strong>أفراد الأسرة:</strong> {inspectingCase.beneficiary.familyMembersCount} (أيتام: {inspectingCase.beneficiary.orphansCount} / أرامل: {inspectingCase.beneficiary.widowsCount})</p>
                  <p><strong>الوضع السكني:</strong> {inspectingCase.beneficiary.livingCondition}</p>
                  <p><strong>مصادر الدخل:</strong> {inspectingCase.beneficiary.hasIncome}</p>
                  <p><strong>نوع المساعدة المطلوبة:</strong> {inspectingCase.beneficiary.aidTypeNeeded}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                  شرح الظروف الإنسانية والمعيشية:
                </h4>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                  {inspectingCase.beneficiary.detailedDescription}
                </p>
              </div>

              {/* Documents Area */}
              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-2.5">
                  {t.admin.documentsAttached} ({inspectingCase.documents.length})
                </h4>
                {inspectingCase.documents.length === 0 ? (
                  <p className="text-stone-400 italic">لا توجد مستندات مرفقة</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inspectingCase.documents.map((doc) => (
                      <div key={doc.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-stone-900 block truncate">{doc.name}</span>
                            <span className="text-[10px] text-stone-400">{doc.category} · {doc.size}</span>
                          </div>
                        </div>
                        {doc.dataUrl ? (
                          <a 
                            href={doc.dataUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-800 hover:bg-emerald-100 rounded-lg shrink-0"
                            title="عرض المستند"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-mono">مؤرشف</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-2">
                  سجل الإجراءات والمراجعات:
                </h4>
                <div className="space-y-2">
                  {inspectingCase.timeline.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px]">
                      <div className="flex items-center justify-between font-bold text-stone-800">
                        <span>{item.action}</span>
                        <span className="text-stone-400 font-mono">{item.date}</span>
                      </div>
                      {item.note && <p className="text-stone-600 mt-0.5">{item.note}</p>}
                      <span className="text-[10px] text-emerald-700 mt-1 block">{item.user}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 text-end shrink-0">
              <button
                onClick={() => setInspectingCase(null)}
                className="px-5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 rounded-xl"
              >
                إغلاق النافذة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
