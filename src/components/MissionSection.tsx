import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Shield, Sparkles, Globe, HeartHandshake, Quote } from 'lucide-react';

interface MissionSectionProps {
  currentLang: Language;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const values = [
    {
      title: t.mission.integrity,
      desc: t.mission.integrityDesc,
      icon: Shield,
    },
    {
      title: t.mission.dignity,
      desc: t.mission.dignityDesc,
      icon: Sparkles,
    },
    {
      title: t.mission.solidarity,
      desc: t.mission.solidarityDesc,
      icon: Globe,
    },
    {
      title: t.mission.sustainability,
      desc: t.mission.sustainabilityDesc,
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission Statement Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-8 sm:p-12 lg:p-16 text-white shadow-xl overflow-hidden mb-16">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 ring-1 ring-white/20 text-amber-300">
              <Quote className="w-6 h-6" />
            </div>

            <h2 className="text-sm sm:text-base font-bold text-amber-300 tracking-wider uppercase">
              {t.mission.title}
            </h2>

            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-relaxed text-stone-100 text-balance">
              «{t.mission.statement}»
            </p>

            <div className="pt-4 flex items-center justify-center gap-3 text-xs text-emerald-200 font-medium">
              <span>{t.orgName}</span>
              <span>·</span>
              <span>{currentLang === 'ar' ? 'جمهورية السودان ودول إفريقيا' : 'Sudan & African Nations'}</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars & Institutional Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.mission.valuesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div 
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-700/40 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-emerald-800" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
