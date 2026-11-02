import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  FileText, 
  Search, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onScrollToSection: (sectionId: string) => void;
  onTrackSubmit: (trackingId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onScrollToSection,
  onTrackSubmit,
}) => {
  const t = translations[currentLang];
  const isRtl = t.dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      onTrackSubmit(quickTrackInput.trim());
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-[#FAF7F2] to-[#F5EFEB] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80">
      
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scope and Institutional Notice Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 sm:px-5 sm:py-2.5 bg-emerald-900/5 border border-emerald-800/15 rounded-2xl">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-emerald-950">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-800 text-amber-300 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-emerald-900">{t.hero.scopeNotice}:</span>
            <span className="text-emerald-800 font-bold">{t.hero.scopeTitle}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {currentLang === 'ar' ? 'منظومة رسمية موحدة' : 'Verified Humanitarian System'}
            </span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="hidden sm:inline text-stone-600">
              {currentLang === 'ar' ? 'تسجيل إلكتروني مباشر ومجاني' : 'Direct & Free Registration'}
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-[1.25] tracking-tight text-balance">
              {t.hero.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onScrollToSection('registration-form')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-900 hover:to-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <FileText className="w-5 h-5 text-amber-300" />
                <span>{t.hero.ctaRegister}</span>
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollToSection('programs')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-emerald-950 bg-white hover:bg-emerald-50/70 border border-emerald-900/20 hover:border-emerald-700 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>{t.hero.ctaPrograms}</span>
              </button>
            </div>

            {/* 3 Operational Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200/90 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-medium">{t.hero.badge1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                <span className="font-medium">{t.hero.badge2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                <span className="font-medium">{t.hero.badge3}</span>
              </div>
            </div>

            {/* Quick Track Input Bar */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs mt-4">
              <label htmlFor="quick-track-input" className="block text-xs font-bold text-stone-700 mb-2">
                {t.hero.trackQuickTitle}
              </label>
              <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row gap-2">
                <div className="relative grow">
                  <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-stone-400" />
                  <input
                    id="quick-track-input"
                    type="text"
                    value={quickTrackInput}
                    onChange={(e) => setQuickTrackInput(e.target.value)}
                    placeholder={t.hero.trackQuickPlaceholder}
                    className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  {t.hero.trackQuickButton}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column (Hero Imagery & Institutional Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
              <img
                src="/src/assets/images/hero_humanitarian_care_1793610628362.jpg"
                alt="Al Noor Global Orphan Care education program in Africa"
                className="w-full h-80 sm:h-[420px] lg:h-[460px] object-cover"
                loading="eager"
              />
              
              {/* Dignified scrim and bottom caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">
                    {currentLang === 'ar' ? 'رسالة الأمل والتمكين' : 'Dignity & Educational Care'}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-stone-100 leading-snug">
                  {currentLang === 'ar' 
                    ? '«أنا وكافل اليتيم في الجنة هكذا» - رعاية شاملة للأطفال والأسر الأشد حاجة في السودان وإفريقيا.' 
                    : 'Providing educational and nutritional sanctuary for vulnerable children across Sudan and African nations.'}
                </p>
              </div>
            </div>

            {/* Floating verification marker card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -start-5 bg-white p-3.5 rounded-2xl shadow-xl border border-stone-200 text-stone-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 leading-tight">
                  {currentLang === 'ar' ? 'خصوصية تامة وأمان معتمد' : 'Strict Privacy & Data Security'}
                </p>
                <p className="text-[11px] text-stone-500">
                  {currentLang === 'ar' ? 'لا تُنشر بيانات المستفيدين للعامة' : 'Beneficiary identities strictly protected'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
