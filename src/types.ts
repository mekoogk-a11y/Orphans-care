export type Language = 'ar' | 'en' | 'fr' | 'sw' | 'ha' | 'am';

export type RequestType = 
  | 'orphan_sponsorship' 
  | 'widow_care' 
  | 'vulnerable_family' 
  | 'urgent_relief';

export type CaseStatus = 
  | 'new'
  | 'under_review'
  | 'needs_completion'
  | 'verified'
  | 'approved'
  | 'sponsored'
  | 'rejected';

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'standard';

export interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  category: 'death_certificate' | 'birth_certificate' | 'identity_proof' | 'vulnerability_proof' | 'other';
  uploadedAt: string;
  dataUrl?: string;
}

export interface CaseTimelineEvent {
  date: string;
  action: string;
  user: string;
  note?: string;
}

export interface HumanitarianCase {
  id: string; // e.g. "NOOR-2026-4821"
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  priority: PriorityLevel;
  requestType: RequestType;
  
  // Section 1: Applicant info
  applicant: {
    fullName: string;
    phone: string;
    whatsapp: string;
    email?: string;
    country: string;
    state: string;
    city: string;
    address: string;
  };

  // Section 3: Beneficiary / Case details
  beneficiary: {
    name: string;
    age: number;
    familyMembersCount: number;
    orphansCount: number;
    widowsCount: number;
    livingCondition: string; // e.g. "shelter_camp", "rented_room", "family_house", "temporary_tent", "other"
    hasIncome: string; // "none", "casual_daily", "relatives_aid", "other"
    aidTypeNeeded: string; // "monthly_sponsorship", "food_health", "housing", "education_supplies"
    detailedDescription: string;
  };

  // Section 4: Documents
  documents: UploadedDocument[];

  // Section 5: Consent
  consent: boolean;

  // Administrative Notes
  adminNotes?: string;
  rejectionReason?: string;
  assignedOfficer?: string;
  timeline: CaseTimelineEvent[];
}

export interface OrganizationSettings {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phone: string;
  email: string;
  headquarters: string;
  sudanOffice: string;
  facebookUrl: string;
  xUrl: string;
  telegramUrl: string;
  youtubeUrl: string;
}
