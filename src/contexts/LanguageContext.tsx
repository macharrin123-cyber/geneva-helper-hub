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

    // Service Pages
    'services.plumbing': 'Plumbing Services in Geneva',
    'services.electrical': 'Electrical Services in Geneva',
    'services.moving': 'Moving Services in Geneva',
    'services.carpentry': 'Carpentry Services in Geneva',
    'services.painting': 'Painting Services in Geneva',
    'services.cleaning': 'Cleaning Services in Geneva',
    'services.availableProviders': 'Available Providers',
    'services.selectDateTime': 'Select Date & Time',
    'services.rating': 'Rating',
    'services.rate': 'Rate',
    'services.experience': 'years of experience',
    'services.selectTime': 'Select time',
    'services.bookAppointment': 'Book Appointment',
    'services.callProvider': 'Call Provider',
    'services.selectDateTimeError': 'Please select both date and time',
    'services.selectDateTimeErrorDesc': 'You need to select both a date and time before booking',
    'services.providerNotFound': 'Error',
    'services.providerNotFoundDesc': 'Selected provider not found',
    'services.callingProvider': 'Calling Provider',
    'services.connectingWith': 'Connecting you with',

    // Reset Password
    'reset.title': 'Reset Your Password',
    'reset.subtitle': 'Enter your email to receive a reset link',
    'reset.email': 'Email',
    'reset.sendLink': 'Send Reset Link',
    'reset.newPassword': 'New Password',
    'reset.updatePassword': 'Update Password',
    'reset.checkEmail': 'Check your email',
    'reset.emailSent': "We've sent you a password reset link.",
    'reset.success': 'Your password has been updated.',

    // How We Work
    'howWeWork.title': 'How We Work',
    'howWeWork.process': 'Our Process',
    'howWeWork.browse': 'Browse Services',
    'howWeWork.browseDesc': 'Browse through our wide range of professional services and select the one that matches your needs.',
    'howWeWork.book': 'Book a Service',
    'howWeWork.bookDesc': 'Choose your preferred date and time, provide your address, and any specific requirements you may have.',
    'howWeWork.payment': 'Secure Payment',
    'howWeWork.paymentDesc': 'Make a secure payment through our platform. Your payment is held until the service is completed to your satisfaction.',
    'howWeWork.delivery': 'Service Delivery',
    'howWeWork.deliveryDesc': 'Our verified professional will arrive at the scheduled time and complete the service according to your requirements.',
    'howWeWork.quality': 'Quality Assurance',
    'howWeWork.verified': 'Verified Professionals',
    'howWeWork.verifiedDesc': 'All service providers undergo thorough background checks and must provide proof of their qualifications and experience.',
    'howWeWork.standards': 'Quality Standards',
    'howWeWork.standardsDesc': 'We maintain high standards of service quality through regular monitoring and customer feedback.',
    'howWeWork.insurance': 'Insurance Coverage',
    'howWeWork.insuranceDesc': 'All services are covered by insurance for your peace of mind.',
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

    // Service Pages
    'services.plumbing': 'Services de plomberie à Genève',
    'services.electrical': 'Services d\'électricité à Genève',
    'services.moving': 'Services de déménagement à Genève',
    'services.carpentry': 'Services de menuiserie à Genève',
    'services.painting': 'Services de peinture à Genève',
    'services.cleaning': 'Services de nettoyage à Genève',
    'services.availableProviders': 'Prestataires disponibles',
    'services.selectDateTime': 'Sélectionner la date et l\'heure',
    'services.rating': 'Note',
    'services.rate': 'Tarif',
    'services.experience': 'ans d\'expérience',
    'services.selectTime': 'Sélectionner l\'heure',
    'services.bookAppointment': 'Prendre rendez-vous',
    'services.callProvider': 'Appeler le prestataire',
    'services.selectDateTimeError': 'Veuillez sélectionner une date et une heure',
    'services.selectDateTimeErrorDesc': 'Vous devez sélectionner une date et une heure avant de réserver',
    'services.providerNotFound': 'Erreur',
    'services.providerNotFoundDesc': 'Prestataire non trouvé',
    'services.callingProvider': 'Appel du prestataire',
    'services.connectingWith': 'Connexion avec',

    // Reset Password
    'reset.title': 'Réinitialiser votre mot de passe',
    'reset.subtitle': 'Entrez votre email pour recevoir un lien de réinitialisation',
    'reset.email': 'Email',
    'reset.sendLink': 'Envoyer le lien',
    'reset.newPassword': 'Nouveau mot de passe',
    'reset.updatePassword': 'Mettre à jour le mot de passe',
    'reset.checkEmail': 'Vérifiez votre email',
    'reset.emailSent': 'Nous vous avons envoyé un lien de réinitialisation.',
    'reset.success': 'Votre mot de passe a été mis à jour.',

    // How We Work
    'howWeWork.title': 'Comment ça marche',
    'howWeWork.process': 'Notre processus',
    'howWeWork.browse': 'Parcourir les services',
    'howWeWork.browseDesc': 'Parcourez notre large gamme de services professionnels et sélectionnez celui qui correspond à vos besoins.',
    'howWeWork.book': 'Réserver un service',
    'howWeWork.bookDesc': 'Choisissez votre date et heure préférées, fournissez votre adresse et vos exigences spécifiques.',
    'howWeWork.payment': 'Paiement sécurisé',
    'howWeWork.paymentDesc': 'Effectuez un paiement sécurisé via notre plateforme. Votre paiement est conservé jusqu\'à ce que le service soit terminé à votre satisfaction.',
    'howWeWork.delivery': 'Prestation de service',
    'howWeWork.deliveryDesc': 'Notre professionnel vérifié arrivera à l\'heure prévue et effectuera le service selon vos exigences.',
    'howWeWork.quality': 'Assurance qualité',
    'howWeWork.verified': 'Professionnels vérifiés',
    'howWeWork.verifiedDesc': 'Tous les prestataires de services passent des vérifications approfondies et doivent fournir la preuve de leurs qualifications et de leur expérience.',
    'howWeWork.standards': 'Normes de qualité',
    'howWeWork.standardsDesc': 'Nous maintenons des normes élevées de qualité de service grâce à un suivi régulier et aux retours des clients.',
    'howWeWork.insurance': 'Couverture d\'assurance',
    'howWeWork.insuranceDesc': 'Tous les services sont couverts par une assurance pour votre tranquillité d\'esprit.',
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