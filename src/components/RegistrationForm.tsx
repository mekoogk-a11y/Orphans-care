import React, { useState, useEffect, useRef } from 'react';
import { Language, RequestType, UploadedDocument, HumanitarianCase } from '../types';
import { translations } from '../translations';
import { 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  AlertCircle, 
  Upload, 
  CheckCircle2, 
  X, 
  FileIcon, 
  HelpCircle,
  ShieldCheck,
  Send
} from 'lucide-react';

interface RegistrationFormProps {
  currentLang: Language;
  selectedProgram?: RequestType;
  onCaseSubmitted: (newCase: HumanitarianCase) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  currentLang,
  selectedProgram,
  onCaseSubmitted,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  // Section 1: Applicant
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('السودان');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Section 2: Request Type
  const [requestType, setRequestType] = useState<RequestType>(selectedProgram || 'orphan_sponsorship');

  useEffect(() => {
    if (selectedProgram) {
      setRequestType(selectedProgram);
    }
  }, [selectedProgram]);

  // Section 3: Beneficiary
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAge, setBeneficiaryAge] = useState<number | ''>('');
  const [familyMembersCount, setFamilyMembersCount] = useState<number | ''>(4);
  const [orphansCount, setOrphansCount] = useState<number | ''>(1);
  const [widowsCount, setWidowsCount] = useState<number | ''>(1);
  const [livingCondition, setLivingCondition] = useState('shelter_camp');
  const [hasIncome, setHasIncome] = useState('none');
  const [aidTypeNeeded, setAidTypeNeeded] = useState('monthly_sponsorship');
  const [detailedDescription, setDetailedDescription] = useState('');

  // Section 4: Documents
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [currentDocCategory, setCurrentDocCategory] = useState<UploadedDocument['category']>('death_certificate');

  // Section 5: Consent & Anti-Spam
  const [consent, setConsent] = useState(false);
  const [captchaNum1, setCaptchaNum1] = useState(5);
  const [captchaNum2, setCaptchaNum2] = useState(7);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Status & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate random captcha on load
  useEffect(() => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 8) + 2);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: UploadedDocument[] = [];
    Array.from(files).forEach((file) => {
      // Validate format
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert(currentLang === 'ar' ? 'صيغة الملف غير مدعومة. يرجى اختيار PDF أو JPG أو PNG' : 'Unsupported format. Please select PDF, JPG or PNG');
        return;
      }

      // Format size
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const formattedSize = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;

      // Read as Data URL for preview if image
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const docItem: UploadedDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: formattedSize,
          type: file.type,
          category: currentDocCategory,
          uploadedAt: new Date().toISOString(),
          dataUrl: uploadEvent.target?.result as string,
        };
        setDocuments((prev) => [...prev, docItem]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = currentLang === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name required';
    if (!phone.trim()) newErrors.phone = currentLang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number required';
    if (!whatsapp.trim()) newErrors.whatsapp = currentLang === 'ar' ? 'رقم واتساب مطلوب للتواصل السريع' : 'WhatsApp number required';
    if (!country.trim()) newErrors.country = currentLang === 'ar' ? 'يرجى تحديد الدولة' : 'Country required';
    if (!state.trim()) newErrors.state = currentLang === 'ar' ? 'الولاية أو المنطقة مطلوبة' : 'State / Region required';
    if (!city.trim()) newErrors.city = currentLang === 'ar' ? 'المدينة أو المحلية مطلوبة' : 'City required';
    if (!address.trim()) newErrors.address = currentLang === 'ar' ? 'العنوان التفصيلي مطلوب' : 'Address required';

    if (!beneficiaryName.trim()) newErrors.beneficiaryName = currentLang === 'ar' ? 'اسم المستفيد مطلوب' : 'Beneficiary name required';
    if (!beneficiaryAge || beneficiaryAge <= 0) newErrors.beneficiaryAge = currentLang === 'ar' ? 'يرجى إدخال عمر صحيح' : 'Valid age required';
    if (!detailedDescription.trim() || detailedDescription.trim().length < 20) {
      newErrors.detailedDescription = currentLang === 'ar' ? 'يرجى كتابة شرح وافٍ للحالة (20 حرفاً على الأقل)' : 'Please provide sufficient description (at least 20 chars)';
    }

    if (!consent) {
      newErrors.consent = currentLang === 'ar' ? 'يجب الموافقة على الإقرار بصحة البيانات' : 'Must accept legal declaration';
    }

    const expectedCaptcha = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer.trim(), 10) !== expectedCaptcha) {
      newErrors.captcha = currentLang === 'ar' ? 'إجابة سؤال الأمان غير صحيحة' : 'Incorrect security answer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      window.scrollTo({ top: document.getElementById('registration-form')?.offsetTop || 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate secure transmission
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newCaseId = `NOOR-2026-${randomNum}`;

      const newCase: HumanitarianCase = {
        id: newCaseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'new',
        priority: requestType === 'urgent_relief' ? 'urgent' : 'high',
        requestType,
        applicant: {
          fullName,
          phone,
          whatsapp,
          email: email.trim() || undefined,
          country,
          state,
          city,
          address,
        },
        beneficiary: {
          name: beneficiaryName,
          age: Number(beneficiaryAge),
          familyMembersCount: Number(familyMembersCount) || 1,
          orphansCount: Number(orphansCount) || 0,
          widowsCount: Number(widowsCount) || 0,
          livingCondition,
          hasIncome,
          aidTypeNeeded,
          detailedDescription,
        },
        documents,
        consent,
        timeline: [
          {
            date: new Date().toISOString().split('T')[0],
            action: currentLang === 'ar' ? 'تم استلام طلب التسجيل عبر البوابة الإلكترونية' : 'Application received via online portal',
            user: currentLang === 'ar' ? 'مقدم الطلب' : 'Applicant',
          },
        ],
      };

      setIsSubmitting(false);
      onCaseSubmitted(newCase);
    }, 700);
  };

  const countriesList = [
    'السودان (جمهورية السودان)',
    'تشاد (جمهورية تشاد)',
    'النيجر (جمهورية النيجر)',
    'الصومال (جمهورية الصومال الفيدرالية)',
    'كينيا (شرق إفريقيا)',
    'أوغندا (شرق إفريقيا)',
    'إثيوبيا (القرن الإفريقي)',
    'موريتانيا (الساحل الإفريقي)',
    'مالي (غرب إفريقيا)',
    'جنوب السودان',
    'أخرى (دولة إفريقية أخرى)',
  ];

  const getCategoryLabel = (cat: UploadedDocument['category']) => {
    switch (cat) {
      case 'death_certificate': return t.form.docDeathCert;
      case 'birth_certificate': return t.form.docBirthCert;
      case 'identity_proof': return t.form.docIdentity;
      case 'vulnerability_proof': return t.form.docVulnerability;
      default: return t.form.docOther;
    }
  };

  return (
    <section id="registration-form" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            {currentLang === 'ar' ? 'التقديم الرسمي المباشر' : 'Official Application'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.form.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {t.form.subtitle}
          </p>
        </div>

        {/* Global validation error alert if present */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">{t.form.validationError}</p>
              <ul className="mt-1 text-xs list-disc list-inside space-y-0.5 text-rose-700">
                {Object.values(errors).slice(0, 3).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* SECTION 1: APPLICANT INFO */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t.form.step1}</h3>
                <p className="text-xs text-stone-500">{t.form.applicantInfo}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.fullName} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.form.fullNamePlaceholder}
                    className={`w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.phone} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                  <input
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form.phonePlaceholder}
                    className={`w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 text-left rtl:text-right ${
                      errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.whatsapp} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-600 absolute top-1/2 -translate-y-1/2 start-3.5" />
                  <input
                    type="tel"
                    dir="ltr"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t.form.whatsappPlaceholder}
                    className={`w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 text-left rtl:text-right ${
                      errors.whatsapp ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                    }`}
                  />
                </div>
                {errors.whatsapp && <p className="text-xs text-rose-600 mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Email Optional */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.emailOptional}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.org"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.country} <span className="text-rose-600">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                >
                  {countriesList.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* State / Region */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.state} <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={t.form.statePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                    errors.state ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.state && <p className="text-xs text-rose-600 mt-1">{errors.state}</p>}
              </div>

              {/* City / Locality */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.city} <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.form.cityPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                    errors.city ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
              </div>

              {/* Detailed Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.address} <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.form.addressPlaceholder}
                    className={`w-full ps-10 pe-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                      errors.address ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
              </div>

            </div>
          </div>

          {/* SECTION 2: REQUEST TYPE SELECTION */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t.form.step2}</h3>
                <p className="text-xs text-stone-500">{t.form.requestTypeTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Orphan Sponsorship */}
              <label 
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  requestType === 'orphan_sponsorship' 
                    ? 'bg-emerald-50/90 border-emerald-700 ring-2 ring-emerald-700/20' 
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  checked={requestType === 'orphan_sponsorship'}
                  onChange={() => setRequestType('orphan_sponsorship')}
                  className="mt-1 text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="block text-sm font-bold text-stone-900">
                    {t.form.orphanSponsorship}
                  </span>
                  <span className="block text-xs text-stone-600 mt-0.5">
                    {t.form.orphanSponsorshipDesc}
                  </span>
                </div>
              </label>

              {/* Widow Care */}
              <label 
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  requestType === 'widow_care' 
                    ? 'bg-emerald-50/90 border-emerald-700 ring-2 ring-emerald-700/20' 
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  checked={requestType === 'widow_care'}
                  onChange={() => setRequestType('widow_care')}
                  className="mt-1 text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="block text-sm font-bold text-stone-900">
                    {t.form.widowCare}
                  </span>
                  <span className="block text-xs text-stone-600 mt-0.5">
                    {t.form.widowCareDesc}
                  </span>
                </div>
              </label>

              {/* Vulnerable Family */}
              <label 
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  requestType === 'vulnerable_family' 
                    ? 'bg-emerald-50/90 border-emerald-700 ring-2 ring-emerald-700/20' 
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  checked={requestType === 'vulnerable_family'}
                  onChange={() => setRequestType('vulnerable_family')}
                  className="mt-1 text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="block text-sm font-bold text-stone-900">
                    {t.form.vulnerableFamily}
                  </span>
                  <span className="block text-xs text-stone-600 mt-0.5">
                    {t.form.vulnerableFamilyDesc}
                  </span>
                </div>
              </label>

              {/* Urgent Relief */}
              <label 
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  requestType === 'urgent_relief' 
                    ? 'bg-emerald-50/90 border-emerald-700 ring-2 ring-emerald-700/20' 
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  checked={requestType === 'urgent_relief'}
                  onChange={() => setRequestType('urgent_relief')}
                  className="mt-1 text-emerald-700 focus:ring-emerald-700"
                />
                <div>
                  <span className="block text-sm font-bold text-stone-900">
                    {t.form.urgentRelief}
                  </span>
                  <span className="block text-xs text-stone-600 mt-0.5">
                    {t.form.urgentReliefDesc}
                  </span>
                </div>
              </label>

            </div>
          </div>

          {/* SECTION 3: CASE DETAILS */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t.form.step3}</h3>
                <p className="text-xs text-stone-500">{t.form.caseDetailsTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Beneficiary Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.beneficiaryName} <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder={currentLang === 'ar' ? 'اسم اليتيم أو الأرملة المستهدفة بالرعاية' : 'Full name of beneficiary child/widow'}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                    errors.beneficiaryName ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.beneficiaryName && <p className="text-xs text-rose-600 mt-1">{errors.beneficiaryName}</p>}
              </div>

              {/* Beneficiary Age */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.beneficiaryAge} <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={beneficiaryAge}
                  onChange={(e) => setBeneficiaryAge(e.target.value ? parseInt(e.target.value) : '')}
                  placeholder="مثال: 8"
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                    errors.beneficiaryAge ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.beneficiaryAge && <p className="text-xs text-rose-600 mt-1">{errors.beneficiaryAge}</p>}
              </div>

              {/* Family Members Count */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.familyMembersCount}
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={familyMembersCount}
                  onChange={(e) => setFamilyMembersCount(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                />
              </div>

              {/* Orphans Count in Family */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.orphansCount}
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={orphansCount}
                  onChange={(e) => setOrphansCount(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                />
              </div>

              {/* Widows Count in Family */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.widowsCount}
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={widowsCount}
                  onChange={(e) => setWidowsCount(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                />
              </div>

              {/* Living Condition */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.livingCondition}
                </label>
                <select
                  value={livingCondition}
                  onChange={(e) => setLivingCondition(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                >
                  <option value="shelter_camp">{t.form.livingShelter}</option>
                  <option value="rented_room">{t.form.livingRented}</option>
                  <option value="family_house">{t.form.livingFamily}</option>
                  <option value="temporary_tent">{t.form.livingTent}</option>
                  <option value="other">{t.form.livingOther}</option>
                </select>
              </div>

              {/* Income Sources */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.incomeSources}
                </label>
                <select
                  value={hasIncome}
                  onChange={(e) => setHasIncome(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                >
                  <option value="none">{t.form.incomeNone}</option>
                  <option value="casual_daily">{t.form.incomeCasual}</option>
                  <option value="relatives_aid">{t.form.incomeRelatives}</option>
                  <option value="other">{t.form.incomeOther}</option>
                </select>
              </div>

              {/* Aid Needed Type */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.aidNeeded}
                </label>
                <select
                  value={aidTypeNeeded}
                  onChange={(e) => setAidTypeNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900"
                >
                  <option value="monthly_sponsorship">{t.form.aidMonthly}</option>
                  <option value="food_health">{t.form.aidFoodHealth}</option>
                  <option value="housing">{t.form.aidHousing}</option>
                  <option value="education_supplies">{t.form.aidEducation}</option>
                </select>
              </div>

              {/* Detailed Description */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  {t.form.detailedDescription} <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  placeholder={t.form.detailedDescriptionPlaceholder}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-stone-900 ${
                    errors.detailedDescription ? 'border-rose-400 bg-rose-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.detailedDescription && (
                  <p className="text-xs text-rose-600 mt-1">{errors.detailedDescription}</p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 4: DOCUMENTS UPLOAD */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t.form.step4}</h3>
                <p className="text-xs text-stone-500">{t.form.documentsSubtitle}</p>
              </div>
            </div>

            {/* Document Category Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-stone-100 rounded-2xl">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span className="text-xs font-bold text-stone-800">
                  {t.form.selectCategory}
                </span>
              </div>
              <select
                value={currentDocCategory}
                onChange={(e) => setCurrentDocCategory(e.target.value as UploadedDocument['category'])}
                className="px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 font-medium focus:ring-2 focus:ring-emerald-700"
              >
                <option value="death_certificate">{t.form.docDeathCert}</option>
                <option value="birth_certificate">{t.form.docBirthCert}</option>
                <option value="identity_proof">{t.form.docIdentity}</option>
                <option value="vulnerability_proof">{t.form.docVulnerability}</option>
                <option value="other">{t.form.docOther}</option>
              </select>
            </div>

            {/* Dropzone container */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl p-6 sm:p-8 text-center bg-white cursor-pointer transition-colors group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-emerald-800" />
              </div>
              <p className="text-sm font-bold text-stone-800">
                {t.form.dropzoneText}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                {t.form.dropzoneHint}
              </p>
            </div>

            {/* Uploaded Documents List */}
            {documents.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-stone-700">
                  {t.form.uploadedFiles} ({documents.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <FileIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-bold text-stone-900 truncate">{doc.name}</p>
                          <p className="text-[11px] text-stone-500">
                            {getCategoryLabel(doc.category)} · {doc.size}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDoc(doc.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                        title={t.form.removeFile}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 5: DECLARATION & CAPTCHA */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t.form.step5}</h3>
                <p className="text-xs text-stone-500">{t.form.declarationTitle}</p>
              </div>
            </div>

            {/* Legal Declaration Checkbox */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-800 rounded-md focus:ring-emerald-700 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {t.form.declarationText}
                </span>
              </label>
              {errors.consent && <p className="text-xs text-rose-600">{errors.consent}</p>}
            </div>

            {/* Anti-Spam Security Question */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    {t.form.captchaChallenge}
                  </span>
                  <span className="text-xs text-stone-500">
                    {captchaNum1} + {captchaNum2} = ?
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder={t.form.captchaAnswerPlaceholder}
                  className={`w-32 px-3 py-2 text-xs sm:text-sm bg-stone-50 border rounded-xl text-stone-900 text-center font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 ${
                    errors.captcha ? 'border-rose-400' : 'border-stone-300'
                  }`}
                />
              </div>
            </div>
            {errors.captcha && <p className="text-xs text-rose-600">{errors.captcha}</p>}

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-900 hover:to-emerald-800 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.form.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-amber-300" />
                    <span>{t.form.submitButton}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </form>

      </div>
    </section>
  );
};
