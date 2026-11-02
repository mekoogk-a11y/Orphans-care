import React, { useState } from 'react';
import { Language, OrganizationSettings } from '../types';
import { translations } from '../translations';
import { Globe, Search, ShieldCheck, Menu, X, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTrackModal: () => void;
  onOpenAdminPortal: () => void;
  onScrollToSection: (sectionId: string) => void;
  settings: OrganizationSettings;
  newRequestsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenTrackModal,
  onOpenAdminPortal,
  onScrollToSection,
  newRequestsCount = 0,
}) => {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇸🇩' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
    { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
    { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Single Brand Wordmark with refined emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-left rtl:text-right group focus:outline-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-amber-300 flex items-center justify-center shadow-md ring-1 ring-amber-400/30 group-hover:scale-105 transition-transform shrink-0">
                <HeartHandshake className="w-6 h-6 text-amber-300 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-950 font-sans leading-tight whitespace-nowrap">
                  {currentLang === 'ar' ? 'مجمع النور الإسلامي العالمي' : 'AL NOOR ISLAMIC GLOBAL'}
                </span>
                <span className="text-xs font-medium text-emerald-700/90 whitespace-nowrap">
                  {currentLang === 'ar' ? 'لكفالة الأيتام والرعاية الإنسانية' : 'Global Orphan & Family Care'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 cursor-pointer"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('programs')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 cursor-pointer"
            >
              {t.nav.programs}
            </button>
            <button
              onClick={() => handleNavClick('how-we-work')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 cursor-pointer"
            >
              {t.nav.howWeWork}
            </button>
            <button
              onClick={() => handleNavClick('registration-form')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 cursor-pointer text-emerald-800 font-semibold"
            >
              {t.nav.register}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Zone 3: Actions - Language selector, Track case, Admin, and Primary Register CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-emerald-900 bg-stone-100/90 hover:bg-stone-200/80 rounded-lg transition-colors border border-stone-200 cursor-pointer"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="uppercase font-semibold tracking-wider">{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div 
                  className={`absolute mt-2 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 ${t.dir === 'rtl' ? 'left-0' : 'right-0'}`}
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-xs font-semibold text-stone-400 border-b border-stone-100">
                    Language / اللغة
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left rtl:text-right hover:bg-emerald-50 transition-colors ${
                        currentLang === lang.code ? 'text-emerald-900 font-bold bg-emerald-50/60' : 'text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {currentLang === lang.code && (
                        <span className="text-emerald-600 text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Track Button */}
            <button
              onClick={onOpenTrackModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title={t.nav.trackCase}
            >
              <Search className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.nav.trackCase}</span>
            </button>

            {/* Staff / Admin Portal Button */}
            <button
              onClick={onOpenAdminPortal}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap relative cursor-pointer"
              title={t.nav.adminPortal}
            >
              <ShieldCheck className="w-4 h-4 text-stone-500" />
              <span className="hidden md:inline">{t.nav.adminPortal}</span>
              {newRequestsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={() => handleNavClick('registration-form')}
              className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              {t.nav.register}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNavClick('hero')}
              className="w-full text-start px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('programs')}
              className="w-full text-start px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t.nav.programs}
            </button>
            <button
              onClick={() => handleNavClick('how-we-work')}
              className="w-full text-start px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t.nav.howWeWork}
            </button>
            <button
              onClick={() => handleNavClick('registration-form')}
              className="w-full text-start px-3 py-2.5 text-sm font-bold text-emerald-800 bg-emerald-50/80 rounded-lg"
            >
              {t.nav.register}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-start px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>{t.nav.trackCase}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPortal();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg"
            >
              <ShieldCheck className="w-4 h-4 text-stone-600" />
              <span>{t.nav.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
