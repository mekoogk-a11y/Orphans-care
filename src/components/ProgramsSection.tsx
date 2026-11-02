import React from 'react';
import { Language, RequestType } from '../types';
import { translations } from '../translations';
import { 
  Heart, 
  Users, 
  Home, 
  LifeBuoy, 
  Check, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

interface ProgramsSectionProps {
  currentLang: Language;
  onSelectProgram: (programType: RequestType) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  currentLang,
  onSelectProgram,
}) => {
  const t = translations[currentLang];
  const isRtl = t.dir === 'rtl';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const programs = [
    {
      id: 'orphan_sponsorship' as RequestType,
      title: t.programs.orphansTitle,
      description: t.programs.orphansDesc,
      image: '/assets/images/orphan_education_care_1793610629512.jpg',
      icon: Heart,
      accentColor: 'from-emerald-700 to-teal-800',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      features: t.programs.features.orphans,
    },
    {
      id: 'widow_care' as RequestType,
      title: t.programs.widowsTitle,
      description: t.programs.widowsDesc,
      image: '/assets/images/widow_family_support_1793610630033.jpg',
      icon: Users,
      accentColor: 'from-amber-700 to-orange-800',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
      features: t.programs.features.widows,
    },
    {
      id: 'vulnerable_family' as RequestType,
      title: t.programs.vulnerableTitle,
      description: t.programs.vulnerableDesc,
      image: null,
      icon: Home,
      accentColor: 'from-teal-800 to-emerald-900',
      badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
      features: t.programs.features.vulnerable,
    },
    {
      id: 'urgent_relief' as RequestType,
      title: t.programs.reliefTitle,
      description: t.programs.reliefDesc,
      image: '/assets/images/humanitarian_relief_aid_1793610629684.jpg',
      icon: LifeBuoy,
      accentColor: 'from-sky-800 to-indigo-900',
      badgeColor: 'bg-sky-50 text-sky-900 border-sky-200',
      features: t.programs.features.relief,
    },
  ];

  return (
    <section id="programs" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            {currentLang === 'ar' ? 'برامج الرعاية والتكافل' : 'Humanitarian Initiatives'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.programs.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.programs.subtitle}
          </p>
        </div>

        {/* 4 Professional Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Area */}
                {program.image ? (
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-stone-100">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                    
                    <div className="absolute top-4 start-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-xs text-emerald-800 flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5 text-emerald-800" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 start-4 end-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 text-amber-300 flex items-center justify-center mb-4 ring-1 ring-white/20">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {program.title}
                    </h3>
                    <p className="text-xs text-emerald-200 mt-1">
                      {currentLang === 'ar' ? 'التكافل العائلي والأمان الاجتماعي' : 'Family Stability & Relief'}
                    </p>
                  </div>
                )}

                {/* Content Area */}
                <div className="p-6 sm:p-7 flex flex-col grow justify-between">
                  <div className="space-y-4">
                    <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                      {program.description}
                    </p>

                    {/* Key features checklist */}
                    <div className="pt-2 border-t border-stone-100">
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                        {currentLang === 'ar' ? 'محتويات ومسارات البرنامج:' : 'Program Components:'}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply action button */}
                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProgram(program.id)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 group/btn cursor-pointer py-1"
                    >
                      <span>{t.programs.applyForProgram}</span>
                      <ArrowIcon className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {currentLang === 'ar' ? 'تسجيل إلكتروني مجاني' : 'Free Registration'}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
