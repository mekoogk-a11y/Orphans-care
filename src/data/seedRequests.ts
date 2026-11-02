import { HumanitarianCase, OrganizationSettings } from '../types';

export const initialOrganizationSettings: OrganizationSettings = {
  nameAr: "مجمع النور الإسلامي العالمي لكفالة الأيتام",
  nameEn: "AL NOOR ISLAMIC GLOBAL ORPHAN CARE",
  taglineAr: "معاً نصنع الأمل.. ونرعى مستقبل الأيتام.",
  taglineEn: "Together we create hope.. and nurture the future of orphans.",
  whatsappNumber: "+249912345678",
  whatsappMessage: "السلام عليكم ورحمة الله، أود الاستفسار بخصوص طلب كفالة أو مساعدة في مجمع النور الإسلامي العالمي.",
  phone: "+249912345678",
  email: "contact@alnoor-orphans.org",
  headquarters: "جمهورية السودان - الخرطوم وبورتسودان (مكتب التنسيق والإشراف الميداني)",
  sudanOffice: "مكتب بورتسودان - حي الشاطئ / مراكز تنسيق الولايات: الجزيرة، القضارف، كسلا، دارفور",
  facebookUrl: "https://facebook.com",
  xUrl: "https://twitter.com",
  telegramUrl: "https://t.me",
  youtubeUrl: "https://youtube.com",
};

export const initialSeedCases: HumanitarianCase[] = [
  {
    id: "NOOR-2026-1042",
    createdAt: "2026-10-24T10:15:00Z",
    updatedAt: "2026-10-28T14:30:00Z",
    status: "sponsored",
    priority: "urgent",
    requestType: "orphan_sponsorship",
    applicant: {
      fullName: "فاطمة أحمد إبراهيم الشيخ",
      phone: "+249912884102",
      whatsapp: "+249912884102",
      email: "fatima.sheikh@example.org",
      country: "السودان",
      state: "ولاية القضارف",
      city: "القضارف",
      address: "حي ديم النور، بالقرب من مدرسة السلام الأساسية (أسرة نازحة من الخرطوم)",
    },
    beneficiary: {
      name: "محمد عبد الرحمن صديق (يتيم الوالد)",
      age: 9,
      familyMembersCount: 4,
      orphansCount: 3,
      widowsCount: 1,
      livingCondition: "غرفة مستأجرة مع صعوبة بالغة في سداد الإيجار الشهري",
      hasIncome: "عمل يدوي متقطع للأم (صناعة الحرف والمعجنات البسيطة)",
      aidTypeNeeded: "كفالة تعليمية ومعيشية شهرية منتظمة",
      detailedDescription: "توفي والد الأطفال في أحداث الخرطوم قبل عام ونصف. نزحت الأسرة إلى القضارف. الطفل محمد بالصف الرابع ومتميز دراسياً ولديه شقيقان بعمر 6 و 4 سنوات، بحاجة ماسة لاستمرار التعليم وتغطية الغذاء الأساسي.",
    },
    documents: [
      {
        id: "doc-1",
        name: "شهادة_وفاة_الوالد_رسمية.pdf",
        size: "1.4 MB",
        type: "application/pdf",
        category: "death_certificate",
        uploadedAt: "2026-10-24T10:16:00Z",
      },
      {
        id: "doc-2",
        name: "شهادة_ميلاد_محمد.jpg",
        size: "820 KB",
        type: "image/jpeg",
        category: "birth_certificate",
        uploadedAt: "2026-10-24T10:17:00Z",
      },
      {
        id: "doc-3",
        name: "إثبات_النزوح_المعتمد.pdf",
        size: "950 KB",
        type: "application/pdf",
        category: "vulnerability_proof",
        uploadedAt: "2026-10-24T10:18:00Z",
      },
    ],
    consent: true,
    adminNotes: "تمت الزيارة الميدانية بواسطة مندوب القضارف الأستاذ مصعب. الحالة مستوفية لكافة الشروط الشرعية والإنسانية. تم ربط الكفالة بمحسن كريم برقم كفالة SP-881.",
    assignedOfficer: "لجنة كفالة الأيتام - فرع شرق السودان",
    timeline: [
      {
        date: "2026-10-24",
        action: "استلام الطلب إلكترونياً وتوليد الرمز المرجعي",
        user: "البوابة الإلكترونية",
      },
      {
        date: "2026-10-25",
        action: "اكتمال التدقيق المكتبي والمستندات",
        user: "أ. عثمان (قسم التدقيق)",
      },
      {
        date: "2026-10-27",
        action: "إجراء الزيارة الميدانية والتحقق من واقع السكن والاحتياج",
        user: "م. مصعب التكينة (مندوب الميدان)",
      },
      {
        date: "2026-10-28",
        action: "اعتماد الكفالة وتوفير المخصص الشهري الأول",
        user: "لجنة التخصيص والمساعدات",
        note: "تم إرسال إشعار للمستفيدة وتزويدها ببطاقة الكفالة المعتمدة.",
      },
    ],
  },
  {
    id: "NOOR-2026-2187",
    createdAt: "2026-10-29T11:40:00Z",
    updatedAt: "2026-11-01T09:20:00Z",
    status: "verified",
    priority: "high",
    requestType: "widow_care",
    applicant: {
      fullName: "مريم عثمان عبد الله كباشي",
      phone: "+249966142389",
      whatsapp: "+249966142389",
      email: "",
      country: "السودان",
      state: "ولاية كسلا",
      city: "كسلا",
      address: "حي الختمية القديمة، منزل شعبي مؤقت",
    },
    beneficiary: {
      name: "مريم عثمان عبد الله كباشي (أرملة ومعيلة لـ 5 أيتام)",
      age: 38,
      familyMembersCount: 6,
      orphansCount: 5,
      widowsCount: 1,
      livingCondition: "منزل شعبي متهالك يحتاج لصيانة مأوى عاجلة",
      hasIncome: "لا يوجد دخل ثابت، مساندة متقطعة من أهل الخير",
      aidTypeNeeded: "سلة غذائية ورعاية صحية وكفالة شهرية للأيتام",
      detailedDescription: "أرملة تعول خمسة أطفال أيتام أكبرهم في سن الثانية عشرة وأصغرهم 3 سنوات. تعاني إحدى بناتها من حساسية صدرية مزمنة وتحتاج لعلاج دوري. الوضع المعيشي حرج في ظل انقطاع المعيل.",
    },
    documents: [
      {
        id: "doc-4",
        name: "إشعار_وفاة_الزوج.pdf",
        size: "1.2 MB",
        type: "application/pdf",
        category: "death_certificate",
        uploadedAt: "2026-10-29T11:42:00Z",
      },
      {
        id: "doc-5",
        name: "تقرير_طبي_ابنة_الأسرة.pdf",
        size: "680 KB",
        type: "application/pdf",
        category: "other",
        uploadedAt: "2026-10-29T11:43:00Z",
      },
    ],
    consent: true,
    adminNotes: "تم إجراء المقابلة الميدانية والتأكد من الأيتام الخمسة وشهادات ميلادهم. الحالة في قائمة الانتظار ذات الأولوية العالية للتخصيص القادم.",
    assignedOfficer: "أ. سارة الجيلي (أخصائية اجتماعية)",
    timeline: [
      {
        date: "2026-10-29",
        action: "تسجيل الطلب عبر استمارة الموقع",
        user: "مقدمة الطلب",
      },
      {
        date: "2026-10-31",
        action: "اكتمال مراجعة المستندات والتوصية بالتحقق الميداني",
        user: "لجنة التدقيق الاجتماعي",
      },
      {
        date: "2026-11-01",
        action: "اعتماد التحقق الميداني ورفع الملف للجنة الرعايات",
        user: "أ. سارة الجيلي",
      },
    ],
  },
  {
    id: "NOOR-2026-3409",
    createdAt: "2026-11-01T15:10:00Z",
    updatedAt: "2026-11-01T18:00:00Z",
    status: "under_review",
    priority: "urgent",
    requestType: "urgent_relief",
    applicant: {
      fullName: "إسماعيل حامد داوود زكريا",
      phone: "+249123891044",
      whatsapp: "+249123891044",
      email: "ismail.relief@gmail.com",
      country: "السودان",
      state: "ولاية شمال دارفور",
      city: "الفاشر",
      address: "مركز إيواء المدرسة الأهلية - مخيم النازحين الجنوبي",
    },
    beneficiary: {
      name: "أسرة حامد داوود زكريا (نازحون متضررون)",
      age: 46,
      familyMembersCount: 8,
      orphansCount: 2,
      widowsCount: 1,
      livingCondition: "خيمة قماشية مؤقتة بمركز إيواء نازحين وتفتقر للمفروشات",
      hasIncome: "منعدم تماماً بسبب فقدان الممتلكات والنزوح القسري",
      aidTypeNeeded: "سلة إغاثة غذائية ومياه صالحة للشرب وفرش وبطانيات",
      detailedDescription: "أسرة نزحت حديثاً من القرى المجاورة بعد تعرض منازلهم للتدمير. تضم الأسرة جدة مسنة واثنين من أحفادها الأيتام بعد فقد والدهم، يعيشون في ظروف بيئية صعبة بحاجة لتدخل إنساني عاجل.",
    },
    documents: [
      {
        id: "doc-6",
        name: "كشف_حصر_النازحين_المحلي.pdf",
        size: "890 KB",
        type: "application/pdf",
        category: "vulnerability_proof",
        uploadedAt: "2026-11-01T15:12:00Z",
      },
    ],
    consent: true,
    adminNotes: "تم تحويل الملف لمنسق الطوارئ والإغاثة العاجلة بإقليم دارفور لإدراجهم في القافلة الإغاثية المشتركة.",
    assignedOfficer: "فريق التدخل الإنساني السريع",
    timeline: [
      {
        date: "2026-11-01",
        action: "تسجيل الطلب كحالة إغاثية عاجلة",
        user: "البوابة الإلكترونية",
      },
      {
        date: "2026-11-01",
        action: "بدء الفحص والفرز الفوري من غرفة العمليات",
        user: "د. طارق المشرف",
      },
    ],
  },
  {
    id: "NOOR-2026-4015",
    createdAt: "2026-10-20T08:30:00Z",
    updatedAt: "2026-10-26T16:00:00Z",
    status: "approved",
    priority: "high",
    requestType: "vulnerable_family",
    applicant: {
      fullName: "أمينة حسين محمد نور",
      phone: "+254712398711",
      whatsapp: "+254712398711",
      email: "",
      country: "كينيا (القرن الإفريقي)",
      state: "مقاطعة غاريسا",
      city: "غاريسا",
      address: "المنطقة الإنسانية الثالثة، بالقرب من المركز الصحي التكافلي",
    },
    beneficiary: {
      name: "أسرة المرحوم نور حسين (أرملة و 4 أطفال)",
      age: 34,
      familyMembersCount: 5,
      orphansCount: 4,
      widowsCount: 1,
      livingCondition: "كوخ شعبي من الصفيح والخشب",
      hasIncome: "لا يوجد دخل ثابت، كسب يومي زهيد من بيع الحطب",
      aidTypeNeeded: "كفالة أيتام وسلال تموينية شهرية منتظمة",
      detailedDescription: "أسرة مسلمة تعيش في ظروف فقر حاد على أطراف غاريسا، الأب توفي إثر مرض عضال وترك أربعة صغار بحاجة لتغطية مصاريف الغذاء والمدارس القرآنية والأساسية.",
    },
    documents: [
      {
        id: "doc-7",
        name: "وثيقة_حالة_اجتماعية_معتمدة.pdf",
        size: "1.1 MB",
        type: "application/pdf",
        category: "identity_proof",
        uploadedAt: "2026-10-20T08:35:00Z",
      },
    ],
    consent: true,
    adminNotes: "تم اعتماد الحالة من قبل مكتب التنسيق الإقليمي لشرق إفريقيا. تمت الموافقة النهائية وجارٍ إصدار كود الصرف المالي الأول.",
    assignedOfficer: "مكتب تنسيق شرق إفريقيا (نيروبي)",
    timeline: [
      {
        date: "2026-10-20",
        action: "استلام الطلب عبر النظام الإلكتروني",
        user: "مقدم الطلب",
      },
      {
        date: "2026-10-23",
        action: "اكتمال التحقق والتواصل مع ممثل المجتمع المحلي",
        user: "الشيخ آدم فارح",
      },
      {
        date: "2026-10-26",
        action: "اعتماد الموافقة النهائية وإدراج الحالة ضمن كشوفات المستفيدين",
        user: "لجنة الاعتماد الإنساني",
      },
    ],
  },
  {
    id: "NOOR-2026-5120",
    createdAt: "2026-11-02T02:00:00Z",
    updatedAt: "2026-11-02T02:00:00Z",
    status: "new",
    priority: "medium",
    requestType: "orphan_sponsorship",
    applicant: {
      fullName: "حسن البشير محمد الأمين",
      phone: "+249912003344",
      whatsapp: "+249912003344",
      email: "hassan.bashir@example.com",
      country: "السودان",
      state: "ولاية نهر النيل",
      city: "شندي",
      address: "حي مربع 15، منزل الأسرة الممتدة",
    },
    beneficiary: {
      name: "عائشة حسن البشير (يتيمة الأم)",
      age: 7,
      familyMembersCount: 3,
      orphansCount: 1,
      widowsCount: 0,
      livingCondition: "استضافة مع الجدة بعد فقدان الأم",
      hasIncome: "عمل حرفي بسيط للأب بدخل غير منتظم",
      aidTypeNeeded: "كفالة رعاية تعليمية وصحية للطفلة عائشة",
      detailedDescription: "توفيت والدة الطفلة عائشة أثناء الولادة الأخيرة، والطفلة بالصف الأول الأساسي بحاجة لمستلزمات دراسية ورعاية صحية وغذائية تعين والدها وجدتها على تربيتها.",
    },
    documents: [
      {
        id: "doc-8",
        name: "شهادة_وفاة_الوالدة.jpg",
        size: "920 KB",
        type: "image/jpeg",
        category: "death_certificate",
        uploadedAt: "2026-11-02T02:02:00Z",
      },
    ],
    consent: true,
    timeline: [
      {
        date: "2026-11-02",
        action: "تسجيل الطلب بنجاح في المنظومة",
        user: "البوابة الإلكترونية",
      },
    ],
  },
];

const STORAGE_CASES_KEY = "alnoor_humanitarian_cases_v1";
const STORAGE_SETTINGS_KEY = "alnoor_org_settings_v1";

export function loadSavedCases(): HumanitarianCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_CASES_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(initialSeedCases));
      return initialSeedCases;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return initialSeedCases;
  } catch (err) {
    console.error("Failed to load saved cases from localStorage", err);
    return initialSeedCases;
  }
}

export function saveCasesToStorage(cases: HumanitarianCase[]): void {
  try {
    localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(cases));
  } catch (err) {
    console.error("Failed to save cases to localStorage", err);
  }
}

export function loadOrganizationSettings(): OrganizationSettings {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(initialOrganizationSettings));
      return initialOrganizationSettings;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load settings from localStorage", err);
    return initialOrganizationSettings;
  }
}

export function saveOrganizationSettings(settings: OrganizationSettings): void {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings to localStorage", err);
  }
}
