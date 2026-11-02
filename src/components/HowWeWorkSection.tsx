import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  Inbox, 
  SearchCheck, 
  Scale, 
  Handshake, 
  ShieldCheck, 
  BadgePercent 
} from 'lucide-react';

interface HowWeWorkSectionProps {
  currentLang: Language;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const steps = [
    {
      num: '01',
      title: t.howWeWork.step1Title,
      description: t.howWeWork.step1Desc,
      icon: Inbox,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      num: '02',
      title: t.howWeWork.step2Title,
      description: t.howWeWork.step2Desc,
      icon: SearchCheck,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      num: '03',
      title: t.howWeWork.step3Title,
      description: t.howWeWork.step3Desc,
      icon: Scale,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      num: '04',
      title: t.howWeWork.step4Title,
      description: t.howWeWork.step4Desc,
      icon: Handshake,
      color: 'bg-sky-50 text-sky-800 border-sky-200',
    },
  ];

  return (
    <section id="how-we-work" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            {currentLang === 'ar' ? 'منظومة عمل موثوقة' : 'Methodology'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.howWeWork.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.howWeWork.subtitle}
          </p>
        </div>

        {/* 4 Phases Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-stone-50/80 rounded-2xl p-6 sm:p-7 border border-stone-200 flex flex-col justify-between hover:bg-stone-50 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-stone-300 font-mono group-hover:text-emerald-700 transition-colors">
                      {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color} shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>
                    {currentLang === 'ar' ? 'إجراء مؤسسي معتمد' : 'Verified Process'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Reassurance & Ethical Guarantees */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-emerald-950 mb-1">
                {currentLang === 'ar' ? 'ميثاق الكرامة والخصوصية المطلقة' : 'Strict Dignity & Privacy Charter'}
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {t.howWeWork.dignityNotice}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
            <BadgePercent className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-950 mb-1">
                {currentLang === 'ar' ? 'خدمات مجانية بالكامل دون وسطاء' : '100% Free Application Services'}
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                {t.howWeWork.freeNotice}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
