import React, { useState, useEffect } from 'react';
import { Language, HumanitarianCase } from '../types';
import { translations } from '../translations';
import { 
  Search, 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  FileText, 
  Calendar,
  ShieldAlert
} from 'lucide-react';

interface CaseTrackingModalProps {
  currentLang: Language;
  initialTrackingId?: string;
  cases: HumanitarianCase[];
  onClose: () => void;
}

export const CaseTrackingModal: React.FC<CaseTrackingModalProps> = ({
  currentLang,
  initialTrackingId = '',
  cases,
  onClose,
}) => {
  const t = translations[currentLang];
  const [searchInput, setSearchInput] = useState(initialTrackingId);
  const [matchedCase, setMatchedCase] = useState<HumanitarianCase | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      handleSearch(initialTrackingId);
    }
  }, [initialTrackingId]);

  const handleSearch = (query: string) => {
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    setHasSearched(true);
    const found = cases.find(
      (c) =>
        c.id.toLowerCase() === clean ||
        c.applicant.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
        c.applicant.whatsapp.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, ''))
    );
    setMatchedCase(found || null);
  };

  const getStatusBadge = (status: HumanitarianCase['status']) => {
    switch (status) {
      case 'new':
        return { label: currentLang === 'ar' ? 'جديد (في انتظار التدقيق الأولي)' : 'New (Awaiting review)', color: 'bg-blue-100 text-blue-900 border-blue-200' };
      case 'under_review':
        return { label: currentLang === 'ar' ? 'قيد المراجعة والتدقيق المكتبي' : 'Under Review', color: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'needs_completion':
        return { label: currentLang === 'ar' ? 'يحتاج إلى استكمال البيانات والوثائق' : 'Needs Additional Info', color: 'bg-orange-100 text-orange-900 border-orange-200' };
      case 'verified':
        return { label: currentLang === 'ar' ? 'تم التحقق الميداني واعتماد الاستحقاق' : 'Field Verified', color: 'bg-teal-100 text-teal-900 border-teal-200' };
      case 'approved':
        return { label: currentLang === 'ar' ? 'تمت الموافقة وفي انتظار ربط الكفالة' : 'Approved (Pending donor match)', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' };
      case 'sponsored':
        return { label: currentLang === 'ar' ? 'تمت الكفالة والرعاية منتظمة' : 'Sponsored & Active', color: 'bg-emerald-800 text-white border-emerald-900' };
      case 'rejected':
        return { label: currentLang === 'ar' ? 'مرفوض' : 'Declined', color: 'bg-rose-100 text-rose-900 border-rose-200' };
    }
  };

  const getProgramTitle = (type: HumanitarianCase['requestType']) => {
    switch (type) {
      case 'orphan_sponsorship': return t.programs.orphansTitle;
      case 'widow_care': return t.programs.widowsTitle;
      case 'vulnerable_family': return t.programs.vulnerableTitle;
      case 'urgent_relief': return t.programs.reliefTitle;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-stone-50 border-b border-stone-200 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900">{t.trackModal.title}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{t.trackModal.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-stone-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchInput);
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="relative grow">
              <Search className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.trackModal.searchPlaceholder}
                className="w-full ps-10 pe-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              {t.trackModal.searchButton}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {hasSearched && !matchedCase && (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">{t.trackModal.notFound}</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                {t.trackModal.notFoundDesc}
              </p>
            </div>
          )}

          {matchedCase && (
            <div className="space-y-6">
              
              {/* Top Case Card */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      {currentLang === 'ar' ? 'الرمز المرجعي للحالة' : 'Case Reference ID'}
                    </span>
                    <span className="text-xl font-mono font-black text-emerald-950">
                      {matchedCase.id}
                    </span>
                  </div>

                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${getStatusBadge(matchedCase.status).color}`}>
                    {getStatusBadge(matchedCase.status).label}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-stone-200/80">
                  <div className="flex items-center gap-2 text-stone-700">
                    <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>{t.trackModal.requestType}</strong> {getProgramTitle(matchedCase.requestType)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <span><strong>{t.trackModal.submittedOn}</strong> {new Date(matchedCase.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                    <span><strong>{t.trackModal.countryState}</strong> {matchedCase.applicant.country} - {matchedCase.applicant.state} ({matchedCase.applicant.city})</span>
                  </div>
                </div>
              </div>

              {/* Committee notes if status is needs_completion or rejected */}
              {matchedCase.rejectionReason && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                  <span className="font-bold block">
                    {currentLang === 'ar' ? 'توضيح أسباب عدم الموافقة:' : 'Decline Reason:'}
                  </span>
                  <p>{matchedCase.rejectionReason}</p>
                </div>
              )}

              {matchedCase.adminNotes && matchedCase.status === 'needs_completion' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <span className="font-bold block">
                    {currentLang === 'ar' ? 'المطلوب لاستكمال الملف:' : 'Required completion details:'}
                  </span>
                  <p>{matchedCase.adminNotes}</p>
                </div>
              )}

              {/* Audit Timeline */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 mb-3 uppercase tracking-wider">
                  {t.trackModal.history}
                </h4>
                <div className="space-y-3 relative before:absolute before:inset-0 before:start-3.5 before:w-0.5 before:bg-stone-200">
                  {matchedCase.timeline.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 ps-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-700 border-2 border-white ring-2 ring-emerald-200 shrink-0 mt-0.5" />
                      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs grow text-xs space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-stone-900">{event.action}</span>
                          <span className="text-[11px] text-stone-400">{event.date}</span>
                        </div>
                        {event.note && (
                          <p className="text-stone-600 italic">{event.note}</p>
                        )}
                        <span className="text-[10px] text-emerald-800 font-medium block">
                          {event.user}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dignity assurance */}
              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500">
                <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {currentLang === 'ar' 
                    ? 'بيانات المستفيد ووثائقه محمية ومشفرة وفق أعلى معايير الخصوصية.' 
                    : 'Personal beneficiary files are safeguarded under strict humanitarian data protocols.'}
                </span>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {t.successModal.close}
          </button>
        </div>

      </div>
    </div>
  );
};
