import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.howWeWork': 'How We Work',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.becomeProvider': 'Become a Provider',

    // Home page
    'home.title': 'Find Local Services in Geneva',
    'home.subtitle': 'Connect with trusted local professionals for all your home service needs',
    'home.searchPlaceholder': 'Search for services...',

    // Services
    'service.plumbing': 'Plumbing',
    'service.plumbingDesc': 'Professional plumbing services for your home',
    'service.electrical': 'Electrical',
    'service.electricalDesc': 'Licensed electricians for all your needs',
    'service.painting': 'Painting',
    'service.paintingDesc': 'Transform your space with our painting services',
    'service.carpentry': 'Carpentry',
    'service.carpentryDesc': 'Expert carpentry and woodworking',
    'service.cleaning': 'Cleaning',
    'service.cleaningDesc': 'Professional cleaning services',
    'service.moving': 'Moving',
    'service.movingDesc': 'Professional moving and relocation services',

    // Common
    'button.book': 'Book Appointment',
    'button.call': 'Call Provider',
    'select.time': 'Select time',
    'rating': 'Rating',
    'rate': 'Rate',
    'experience': 'years of experience',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.howWeWork': 'Comment ça marche',
    'nav.contact': 'Contact',
    'nav.signIn': 'Connexion',
    'nav.signOut': 'Déconnexion',
    'nav.becomeProvider': 'Devenir prestataire',

    // Home page
    'home.title': 'Trouvez des services locaux à Genève',
    'home.subtitle': 'Connectez-vous avec des professionnels de confiance pour tous vos besoins',
    'home.searchPlaceholder': 'Rechercher des services...',

    // Services
    'service.plumbing': 'Plomberie',
    'service.plumbingDesc': 'Services de plomberie professionnels pour votre maison',
    'service.electrical': 'Électricité',
    'service.electricalDesc': 'Électriciens agréés pour tous vos besoins',
    'service.painting': 'Peinture',
    'service.paintingDesc': 'Transformez votre espace avec nos services de peinture',
    'service.carpentry': 'Menuiserie',
    'service.carpentryDesc': 'Menuiserie et travail du bois expert',
    'service.cleaning': 'Nettoyage',
    'service.cleaningDesc': 'Services de nettoyage professionnels',
    'service.moving': 'Déménagement',
    'service.movingDesc': 'Services professionnels de déménagement',

    // Common
    'button.book': 'Prendre rendez-vous',
    'button.call': 'Appeler le prestataire',
    'select.time': 'Sélectionner l\'heure',
    'rating': 'Note',
    'rate': 'Tarif',
    'experience': 'ans d\'expérience',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};