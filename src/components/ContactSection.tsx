import React, { useState } from 'react';
import { Language, OrganizationSettings } from '../types';
import { translations } from '../translations';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
  settings: OrganizationSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  settings,
}) => {
  const t = translations[currentLang];
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setContactInfo('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            {currentLang === 'ar' ? 'التنسيق والدعم الميداني' : 'Direct Channels'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Direct Channels */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* WhatsApp Direct Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-stone-900">
                      {t.contact.whatsappDirect}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 font-mono" dir="ltr">
                      {settings.whatsappNumber}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    {t.contact.whatsappDesc}
                  </p>
                </div>
              </div>
            </a>

            {/* Email Direct Card */}
            <a
              href={`mailto:${settings.email}`}
              className="group block p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-stone-900">
                      {t.contact.emailDirect}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 font-mono" dir="ltr">
                      {settings.email}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    {t.contact.emailDesc}
                  </p>
                </div>
              </div>
            </a>

            {/* Sudan Hub Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {t.contact.sudanHub}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {settings.sudanOffice}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {t.contact.sudanHubDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* African Regional Desks Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                  <Globe2 className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {t.contact.africanDesks}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {currentLang === 'ar' 
                      ? 'مكاتب التنسيق الإقليمي: نيروبي (كينيا) · انجمينا (تشاد) · نيامي (النيجر) · مقديشو (الصومال)' 
                      : 'Regional Desks: Nairobi (Kenya) · N\'Djamena (Chad) · Niamey (Niger) · Mogadishu (Somalia)'}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {t.contact.africanDesksDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Link Icons */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                {currentLang === 'ar' ? 'منصات التواصل الرسمية:' : 'Social Channels:'}
              </span>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
              >
                Facebook
              </a>
              <a
                href={settings.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
              >
                Telegram
              </a>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
              >
                YouTube
              </a>
            </div>

          </div>

          {/* Right Column: Direct Inquiry Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {t.contact.sendInquiry}
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                {currentLang === 'ar'
                  ? 'يسعدنا الرد على استفسارات الأسر والداعمين واللجان الإنسانية.'
                  : 'Send direct questions to our humanitarian coordination team.'}
              </p>

              {submitted && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.contact.sentMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={t.contact.emailPhonePlaceholder}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{t.contact.sendButton}</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-6 border-t border-stone-100 text-[11px] text-stone-400 text-center">
              {currentLang === 'ar' ? 'الرد عادة خلال 24 - 48 ساعة كحد أقصى' : 'Typical response within 24–48 hours'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
