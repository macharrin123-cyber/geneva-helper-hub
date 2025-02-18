import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr' | 'de' | 'it';

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
    'nav.aboutUs': 'About Us',

    // About page
    'about.title': 'About Us',
    'about.description': 'At Helpify, we believe in creating a community where finding help is as seamless and trustworthy as asking a friend. We exist to empower busy individuals and families in Geneva by connecting them with reliable assistance, so they can focus on what truly matters in their lives.',

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
    'nav.aboutUs': 'À propos',

    // About page
    'about.title': 'À propos de nous',
    'about.description': 'Chez Helpify, nous croyons en la création d\'une communauté où trouver de l\'aide est aussi simple et fiable que de demander à un ami. Nous existons pour permettre aux individus et aux familles occupés de Genève de se connecter avec une assistance fiable, afin qu\'ils puissent se concentrer sur ce qui compte vraiment dans leur vie.',

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
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.howWeWork': 'Wie wir arbeiten',
    'nav.contact': 'Kontakt',
    'nav.signIn': 'Anmelden',
    'nav.signOut': 'Abmelden',
    'nav.becomeProvider': 'Anbieter werden',
    'nav.aboutUs': 'Über uns',

    // About page
    'about.title': 'Über uns',
    'about.description': 'Bei Helpify glauben wir daran, eine Gemeinschaft zu schaffen, in der Hilfe zu finden so einfach und vertrauenswürdig ist wie einen Freund zu fragen. Wir existieren, um beschäftigte Menschen und Familien in Genf zu unterstützen, indem wir sie mit zuverlässiger Hilfe verbinden.',

    // Home page
    'home.title': 'Finden Sie lokale Dienstleistungen in Genf',
    'home.subtitle': 'Verbinden Sie sich mit vertrauenswürdigen lokalen Fachleuten für alle Ihre Haushaltsdienstleistungen',
    'home.searchPlaceholder': 'Suche nach Dienstleistungen...',

    // Services
    'service.plumbing': 'Sanitär',
    'service.plumbingDesc': 'Professionelle Sanitärarbeiten und Installationen',
    'service.electrical': 'Elektrik',
    'service.electricalDesc': 'Professionelle Elektrodienstleistungen',
    'service.painting': 'Malerei',
    'service.paintingDesc': 'Innen- und Außenmalerarbeiten',
    'service.carpentry': 'Schreinerei',
    'service.carpentryDesc': 'Maßgeschneiderte Holzarbeiten und Möbelreparaturen',
    'service.cleaning': 'Reinigung',
    'service.cleaningDesc': 'Professionelle Haus- und Büroreinigung',
    'service.moving': 'Umzug',
    'service.movingDesc': 'Zuverlässige Umzugs- und Transportdienste',

    // Reviews Section
    'reviews.title': 'Was unsere Community sagt',
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.howWeWork': 'Come lavoriamo',
    'nav.contact': 'Contatti',
    'nav.signIn': 'Accedi',
    'nav.signOut': 'Esci',
    'nav.becomeProvider': 'Diventa fornitore',
    'nav.aboutUs': 'Chi siamo',

    // About page
    'about.title': 'Chi siamo',
    'about.description': 'In Helpify crediamo nel creare una comunità dove trovare aiuto sia semplice e affidabile come chiedere a un amico. Esistiamo per supportare individui e famiglie impegnate a Ginevra, collegandoli con assistenza affidabile.',

    // Home page
    'home.title': 'Trova servizi locali a Ginevra',
    'home.subtitle': 'Connettiti con professionisti locali affidabili per tutti i tuoi servizi domestici',
    'home.searchPlaceholder': 'Cerca servizi...',

    // Services
    'service.plumbing': 'Idraulica',
    'service.plumbingDesc': 'Riparazioni e installazioni idrauliche professionali',
    'service.electrical': 'Elettricità',
    'service.electricalDesc': 'Servizi elettrici professionali',
    'service.painting': 'Pittura',
    'service.paintingDesc': 'Servizi di pittura interni ed esterni',
    'service.carpentry': 'Falegnameria',
    'service.carpentryDesc': 'Lavori in legno su misura e riparazioni mobili',
    'service.cleaning': 'Pulizie',
    'service.cleaningDesc': 'Pulizie professionali per casa e ufficio',
    'service.moving': 'Traslochi',
    'service.movingDesc': 'Servizi di trasloco e trasporto affidabili',

    // Reviews Section
    'reviews.title': 'Cosa dice la nostra community',
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
