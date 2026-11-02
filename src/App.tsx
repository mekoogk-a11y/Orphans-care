import React, { useState, useEffect } from 'react';
import { 
  Language, 
  HumanitarianCase, 
  RequestType, 
  OrganizationSettings 
} from './types';
import { translations } from './translations';
import { 
  loadSavedCases, 
  saveCasesToStorage, 
  loadOrganizationSettings, 
  saveOrganizationSettings 
} from './data/seedRequests';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProgramsSection } from './components/ProgramsSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { MissionSection } from './components/MissionSection';
import { RegistrationForm } from './components/RegistrationForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import { CaseTrackingModal } from './components/CaseTrackingModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [cases, setCases] = useState<HumanitarianCase[]>([]);
  const [settings, setSettings] = useState<OrganizationSettings>(loadOrganizationSettings());
  
  // Modals & Flows
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submittedCase, setSubmittedCase] = useState<HumanitarianCase | null>(null);
  
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState('');

  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [selectedProgramForForm, setSelectedProgramForForm] = useState<RequestType | undefined>(undefined);

  // New incoming requests badge count
  const [newBadgeCount, setNewBadgeCount] = useState(0);

  // Load cases from localStorage on mount
  useEffect(() => {
    const loaded = loadSavedCases();
    setCases(loaded);
    const newItems = loaded.filter((c) => c.status === 'new').length;
    setNewBadgeCount(newItems);
  }, []);

  // Sync HTML dir and lang attributes on language change
  useEffect(() => {
    const dir = translations[currentLang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Program selection handler from cards
  const handleSelectProgram = (program: RequestType) => {
    setSelectedProgramForForm(program);
    scrollToSection('registration-form');
  };

  // Case submission handler
  const handleCaseSubmitted = (newCase: HumanitarianCase) => {
    const updated = [newCase, ...cases];
    setCases(updated);
    saveCasesToStorage(updated);
    setSubmittedCase(newCase);
    setIsSuccessModalOpen(true);
    setNewBadgeCount((prev) => prev + 1);
  };

  // Status or case update from Admin
  const handleUpdateCase = (updatedCase: HumanitarianCase) => {
    const updated = cases.map((c) => (c.id === updatedCase.id ? updatedCase : c));
    setCases(updated);
    saveCasesToStorage(updated);
  };

  // Organization settings update from Admin
  const handleUpdateSettings = (newSettings: OrganizationSettings) => {
    setSettings(newSettings);
    saveOrganizationSettings(newSettings);
  };

  // Quick tracking lookup from hero or header
  const handleOpenTrackingWithId = (trackingId: string) => {
    setActiveTrackingId(trackingId);
    setIsTrackModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-emerald-700 selection:text-white">
      
      {/* Main Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenTrackModal={() => {
          setActiveTrackingId('');
          setIsTrackModalOpen(true);
        }}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onScrollToSection={scrollToSection}
        settings={settings}
        newRequestsCount={newBadgeCount}
      />

      {/* Main Content Sections */}
      <main className="grow">
        {/* 1. Hero Section */}
        <Hero
          currentLang={currentLang}
          onScrollToSection={scrollToSection}
          onTrackSubmit={handleOpenTrackingWithId}
        />

        {/* 2. Humanitarian Programs */}
        <ProgramsSection
          currentLang={currentLang}
          onSelectProgram={handleSelectProgram}
        />

        {/* 3. How We Work (4 Stages) */}
        <HowWeWorkSection
          currentLang={currentLang}
        />

        {/* 4. Our Mission & Pillars */}
        <MissionSection
          currentLang={currentLang}
        />

        {/* 5. Case Registration Form (Core Feature) */}
        <RegistrationForm
          currentLang={currentLang}
          selectedProgram={selectedProgramForForm}
          onCaseSubmitted={handleCaseSubmitted}
        />

        {/* 6. Contact & Direct Coordination */}
        <ContactSection
          currentLang={currentLang}
          settings={settings}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        settings={settings}
        onScrollToSection={scrollToSection}
        onOpenTrackModal={() => {
          setActiveTrackingId('');
          setIsTrackModalOpen(true);
        }}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* MODALS */}

      {/* 1. Success & Tracking Receipt Modal */}
      {isSuccessModalOpen && submittedCase && (
        <SuccessModal
          currentLang={currentLang}
          submittedCase={submittedCase}
          onClose={() => setIsSuccessModalOpen(false)}
          settings={settings}
        />
      )}

      {/* 2. Public Case Tracking Modal */}
      {isTrackModalOpen && (
        <CaseTrackingModal
          currentLang={currentLang}
          initialTrackingId={activeTrackingId}
          cases={cases}
          onClose={() => setIsTrackModalOpen(false)}
        />
      )}

      {/* 3. Central Admin Management Portal */}
      {isAdminPortalOpen && (
        <AdminPortal
          currentLang={currentLang}
          cases={cases}
          onUpdateCase={handleUpdateCase}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsAdminPortalOpen(false)}
        />
      )}

    </div>
  );
}
