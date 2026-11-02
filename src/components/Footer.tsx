import React from 'react';
import { Language, OrganizationSettings } from '../types';
import { translations } from '../translations';
import { HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  settings: OrganizationSettings;
  onScrollToSection: (sectionId: string) => void;
  onOpenTrackModal: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  settings,
  onScrollToSection,
  onOpenTrackModal,
  onOpenAdminPortal,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {settings.nameAr}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium font-sans">
                  {settings.nameEn}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1 font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{t.footer.scopeText}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('programs')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.programs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-we-work')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.howWeWork}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('registration-form')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-semibold"
                >
                  {t.nav.register}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrackModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.trackCase}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentLang === 'ar' ? 'الأمانة وحفظ الكرامة' : 'Ethics & Governance'}
            </h4>
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{currentLang === 'ar' ? 'حماية بيانات المستفيدين' : 'Beneficiary Protection'}</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {t.footer.confidentiality}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdminPortal}
                className="text-[11px] text-stone-400 hover:text-stone-200 transition-colors underline cursor-pointer"
              >
                {t.nav.adminPortal}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-center sm:text-start">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>{currentLang === 'ar' ? 'السودان وإفريقيا' : 'Sudan & Africa'}</span>
            <span>·</span>
            <span>{settings.taglineAr}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
