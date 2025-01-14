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
    'service.plumbingDesc': 'Expert plumbing repairs and installations',
    'service.electrical': 'Electrical',
    'service.electricalDesc': 'Professional electrical services and repairs',
    'service.painting': 'Painting',
    'service.paintingDesc': 'Interior and exterior painting services',
    'service.carpentry': 'Carpentry',
    'service.carpentryDesc': 'Custom woodwork and furniture repairs',
    'service.cleaning': 'Cleaning',
    'service.cleaningDesc': 'Professional home and office cleaning',
    'service.moving': 'Moving',
    'service.movingDesc': 'Reliable moving and relocation services',

    // Service Pages
    'services.plumbing': 'Plumbing Services',
    'services.electrical': 'Electrical Services',
    'services.painting': 'Painting Services',
    'services.carpentry': 'Carpentry Services',
    'services.cleaning': 'Cleaning Services',
    'services.moving': 'Moving Services',
    'services.availableProviders': 'Available Service Providers',
    'services.rating': 'Rating',
    'services.rate': 'Rate',
    'services.experience': 'years of experience',
    'services.selectDateTime': 'Select Date & Time',
    'services.selectTime': 'Select time',
    'services.bookAppointment': 'Book Appointment',
    'services.callProvider': 'Call Provider',
    'services.selectDateTimeError': 'Please select date and time',
    'services.selectDateTimeErrorDesc': 'You need to select both a date and time before booking',
    'services.providerNotFound': 'Provider not found',
    'services.providerNotFoundDesc': 'The selected provider could not be found',
    'services.callingProvider': 'Calling Provider',
    'services.connectingWith': 'Connecting you with',

    // Freelance Section
    'freelance.title': 'Make Extra Income as a Service Provider',
    'freelance.subtitle': 'Whether you\'re a professional or skilled individual, join our platform to offer your services. Set your own schedule, choose your services, and earn on your terms.',
    'freelance.flexibleSchedule': 'Flexible Schedule',
    'freelance.flexibleScheduleDesc': 'Work when it suits you - full-time, part-time, or weekends only',
    'freelance.setRates': 'Set Your Rates',
    'freelance.setRatesDesc': 'Choose your own hourly rate and the services you want to offer',
    'freelance.easyStart': 'Easy to Start',
    'freelance.easyStartDesc': 'Simple signup process - start earning as soon as you\'re verified',
    'freelance.joinButton': 'Join as a Service Provider',

    // Reviews Section
    'reviews.title': 'What Our Community Says',
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
    'service.plumbingDesc': 'Réparations et installations de plomberie expertes',
    'service.electrical': 'Électricité',
    'service.electricalDesc': 'Services et réparations électriques professionnels',
    'service.painting': 'Peinture',
    'service.paintingDesc': 'Services de peinture intérieure et extérieure',
    'service.carpentry': 'Menuiserie',
    'service.carpentryDesc': 'Travaux sur bois et réparations de meubles',
    'service.cleaning': 'Nettoyage',
    'service.cleaningDesc': 'Nettoyage professionnel de maisons et bureaux',
    'service.moving': 'Déménagement',
    'service.movingDesc': 'Services de déménagement et relocation fiables',

    // Service Pages
    'services.plumbing': 'Services de Plomberie',
    'services.electrical': 'Services d\'Électricité',
    'services.painting': 'Services de Peinture',
    'services.carpentry': 'Services de Menuiserie',
    'services.cleaning': 'Services de Nettoyage',
    'services.moving': 'Services de Déménagement',
    'services.availableProviders': 'Prestataires Disponibles',
    'services.rating': 'Évaluation',
    'services.rate': 'Tarif',
    'services.experience': 'ans d\'expérience',
    'services.selectDateTime': 'Sélectionnez Date et Heure',
    'services.selectTime': 'Sélectionnez l\'heure',
    'services.bookAppointment': 'Réserver un Rendez-vous',
    'services.callProvider': 'Appeler le Prestataire',
    'services.selectDateTimeError': 'Veuillez sélectionner une date et une heure',
    'services.selectDateTimeErrorDesc': 'Vous devez sélectionner une date et une heure avant de réserver',
    'services.providerNotFound': 'Prestataire non trouvé',
    'services.providerNotFoundDesc': 'Le prestataire sélectionné n\'a pas pu être trouvé',
    'services.callingProvider': 'Appel du Prestataire',
    'services.connectingWith': 'Connexion avec',

    // Freelance Section
    'freelance.title': 'Gagnez un Revenu Supplémentaire en tant que Prestataire',
    'freelance.subtitle': 'Que vous soyez professionnel ou qualifié, rejoignez notre plateforme pour offrir vos services. Définissez votre emploi du temps, choisissez vos services et gagnez selon vos conditions.',
    'freelance.flexibleSchedule': 'Horaires Flexibles',
    'freelance.flexibleScheduleDesc': 'Travaillez quand cela vous convient - temps plein, temps partiel ou weekends uniquement',
    'freelance.setRates': 'Fixez vos Tarifs',
    'freelance.setRatesDesc': 'Choisissez votre tarif horaire et les services que vous souhaitez proposer',
    'freelance.easyStart': 'Démarrage Facile',
    'freelance.easyStartDesc': 'Processus d\'inscription simple - commencez à gagner dès que vous êtes vérifié',
    'freelance.joinButton': 'Rejoindre en tant que Prestataire',

    // Reviews Section
    'reviews.title': 'Ce que dit notre Communauté',
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