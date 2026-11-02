import React, { useState } from 'react';
import { Language, HumanitarianCase, OrganizationSettings } from '../types';
import { translations } from '../translations';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  MessageCircle, 
  X, 
  ShieldCheck 
} from 'lucide-react';

interface SuccessModalProps {
  currentLang: Language;
  submittedCase: HumanitarianCase | null;
  onClose: () => void;
  settings: OrganizationSettings;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  currentLang,
  submittedCase,
  onClose,
  settings,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[currentLang];

  if (!submittedCase) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(submittedCase.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `السلام عليكم ورحمة الله، تم تقديم طلب كفالة برقم متابعة: ${submittedCase.id} باسم المستفيد: ${submittedCase.beneficiary.name}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-md">
            <CheckCircle2 className="w-10 h-10 text-emerald-700" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            {t.successModal.title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            {t.orgName}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Official Reassurance Message */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
              {t.successModal.message}
            </p>
          </div>

          {/* Tracking Code Highlight */}
          <div className="p-5 rounded-2xl bg-stone-50 border-2 border-dashed border-emerald-300 text-center space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              {t.successModal.caseNumber}
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-900 tracking-wider">
                {submittedCase.id}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                title={t.successModal.copyNumber}
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs font-bold text-emerald-700 block">
                {t.successModal.copied}
              </span>
            )}
          </div>

          {/* Key Summary Items */}
          <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 p-4 bg-stone-50 rounded-2xl">
            <div>
              <span className="text-stone-400 block">{t.successModal.applicant}:</span>
              <span className="font-bold text-stone-900">{submittedCase.applicant.fullName}</span>
            </div>
            <div>
              <span className="text-stone-400 block">{t.successModal.beneficiary}:</span>
              <span className="font-bold text-stone-900">{submittedCase.beneficiary.name}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-stone-200/60 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-[11px] text-stone-600">{t.successModal.status}</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 text-center leading-relaxed">
            {t.successModal.trackNotice}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto grow inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.successModal.contactSupport}</span>
            </a>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>{currentLang === 'ar' ? 'طباعة الإيصال' : 'Print Receipt'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl transition-all"
            >
              {t.successModal.close}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
