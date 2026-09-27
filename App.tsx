import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DiscoverySection } from './components/DiscoverySection';
import { HowItWorks } from './components/HowItWorks';
import { PartnerProfileDrawer } from './components/PartnerProfileDrawer';
import { ConnectModal } from './components/ConnectModal';
import { CompatibilityQuiz } from './components/CompatibilityQuiz';
import { PostProfileModal } from './components/PostProfileModal';
import { SavedPartnersDrawer } from './components/SavedPartnersDrawer';
import { Footer } from './components/Footer';
import { PartnerMode, BusinessPartner, LifePartner } from './types';
import { BUSINESS_PARTNERS, LIFE_PARTNERS } from './data/partnersData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<PartnerMode>('business');
  const [businessPartners, setBusinessPartners] = useState<BusinessPartner[]>(BUSINESS_PARTNERS);
  const [lifePartners, setLifePartners] = useState<LifePartner[]>(LIFE_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['bp-1', 'lp-1']);

  // Modals & Drawers
  const [selectedPartner, setSelectedPartner] = useState<BusinessPartner | LifePartner | null>(null);
  const [connectingPartner, setConnectingPartner] = useState<BusinessPartner | LifePartner | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPostProfileOpen, setIsPostProfileOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activePartners = mode === 'business' ? businessPartners : lifePartners;

  // Toggle bookmark/save
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const isAlreadySaved = prev.includes(id);
      if (isAlreadySaved) {
        showToast('Removed from saved partners');
        return prev.filter((i) => i !== id);
      } else {
        showToast('Saved to your partner list!');
        return [...prev, id];
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add new profile
  const handleAddPartner = (newPartner: BusinessPartner | LifePartner) => {
    if (mode === 'business') {
      setBusinessPartners((prev) => [newPartner as BusinessPartner, ...prev]);
    } else {
      setLifePartners((prev) => [newPartner as LifePartner, ...prev]);
    }
    showToast('Your partner profile is now live on Partner Hub!');
  };

  // Recommendation from Quiz
  const handleSelectPartnerRecommendation = (partnerId: string) => {
    const all = [...businessPartners, ...lifePartners];
    const match = all.find((p) => p.id === partnerId);
    if (match) {
      setSelectedPartner(match);
    }
  };

  // Saved partners array
  const allPartners = [...businessPartners, ...lifePartners];
  const savedPartnersList = allPartners.filter((p) => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F3F4F6] flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0F1422] border border-cyan-500/30 text-white text-xs shadow-2xl flex items-center space-x-2.5 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        mode={mode}
        onToggleMode={setMode}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenPostProfile={() => setIsPostProfileOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {/* Dynamic Hero */}
        <Hero
          mode={mode}
          onToggleMode={setMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Discovery Grid & Filters */}
        <DiscoverySection
          mode={mode}
          partners={activePartners}
          searchQuery={searchQuery}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onViewProfile={(partner) => setSelectedPartner(partner)}
          onConnect={(partner) => setConnectingPartner(partner)}
        />

        {/* How It Works & Trust Framework */}
        <HowItWorks mode={mode} />
      </main>

      {/* Footer */}
      <Footer mode={mode} onToggleMode={setMode} />

      {/* Modals & Drawers */}
      <PartnerProfileDrawer
        partner={selectedPartner}
        mode={mode}
        isSaved={selectedPartner ? savedIds.includes(selectedPartner.id) : false}
        onClose={() => setSelectedPartner(null)}
        onToggleSave={handleToggleSave}
        onConnect={(partner) => setConnectingPartner(partner)}
      />

      <ConnectModal
        partner={connectingPartner}
        mode={mode}
        onClose={() => setConnectingPartner(null)}
        onSuccess={(msg) => showToast(msg)}
      />

      <CompatibilityQuiz
        mode={mode}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectPartnerRecommendation={handleSelectPartnerRecommendation}
      />

      <PostProfileModal
        mode={mode}
        isOpen={isPostProfileOpen}
        onClose={() => setIsPostProfileOpen(false)}
        onAddPartner={handleAddPartner}
      />

      <SavedPartnersDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedPartners={savedPartnersList}
        mode={mode}
        onRemoveSave={handleToggleSave}
        onViewProfile={(partner) => setSelectedPartner(partner)}
        onConnect={(partner) => setConnectingPartner(partner)}
      />
    </div>
  );
}
