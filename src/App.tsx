import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScrollHero } from './components/ScrollHero';
import { EventInfoCards } from './components/EventInfoCards';
import { WhatYouWillLearn } from './components/WhatYouWillLearn';
import { AboutFabrine } from './components/AboutFabrine';
import { PricingSection } from './components/PricingSection';
import { RegistrationForm } from './components/RegistrationForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { getSavedRegistrations } from './utils/storage';
import { Registration } from './types';

export default function App() {
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [registrationsCount, setRegistrationsCount] = useState(0);

  const refreshCount = () => {
    const list = getSavedRegistrations();
    setRegistrationsCount(list.length);
  };

  useEffect(() => {
    refreshCount();
  }, []);

  const handleReserveClick = () => {
    const formElement = document.getElementById('inscricao');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (newReg: Registration) => {
    refreshCount();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23201D] font-sans selection:bg-[#FA4E74]/20 selection:text-[#FA4E74]">
      {/* Top Fixed Header with Brand & Navigation */}
      <Header />

      <main className="flex-1">
        {/* Scroll-Morph Interactive Hero with Header Image Animation */}
        <ScrollHero onReserveClick={handleReserveClick} />

        {/* 3 Main Highlight Cards (Lote 1 R$ 97, Certificado 4h, 14/11 Americana) */}
        <EventInfoCards />

        {/* 5 Core Deliverables (O que você vai levar daqui) */}
        <WhatYouWillLearn />

        {/* About Fabrine Fernandes (24 anos de educação, ABPp 1242) */}
        <AboutFabrine />

        {/* Pricing / Investment section (de 397 por 97) */}
        <PricingSection onSelectPlan={handleReserveClick} />

        {/* Registration Form (Nome, WhatsApp, Email, Profissão, Turma) */}
        <RegistrationForm onSuccess={handleRegistrationSuccess} />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Google Sheets Sync & Data Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        onDataChanged={refreshCount}
      />
    </div>
  );
}
