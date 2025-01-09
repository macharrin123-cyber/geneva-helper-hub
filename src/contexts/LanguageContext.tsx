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

    // Services
    'services.plumbing': 'Plumbing Services',
    'services.electrical': 'Electrical Services',
    'services.painting': 'Painting Services',
    'services.carpentry': 'Carpentry Services',
    'services.cleaning': 'Cleaning Services',
    'services.moving': 'Moving Services',
    'services.availableProviders': 'Available Providers',
    'services.rating': 'Rating',
    'services.rate': 'Rate',
    'services.experience': 'years of experience',
    'services.selectDateTime': 'Select Date & Time',
    'services.selectTime': 'Select time',
    'services.bookAppointment': 'Book Appointment',
    'services.callProvider': 'Call Provider',
    'services.selectDateTimeError': 'Please select both date and time',
    'services.selectDateTimeErrorDesc': 'You need to select both a date and time before booking',
    'services.providerNotFound': 'Error',
    'services.providerNotFoundDesc': 'Selected provider not found',
    'services.callingProvider': 'Calling Provider',
    'services.connectingWith': 'Connecting you with',

    // Home page
    'home.title': 'Find Local Services in Geneva',
    'home.subtitle': 'Connect with trusted local professionals for all your home service needs',
    'home.searchPlaceholder': 'Search for services...',

    // How We Work
    'howWeWork.title': 'How We Work',
    'howWeWork.process': 'Our Process',
    'howWeWork.browse.title': 'Browse Services',
    'howWeWork.browse.desc': 'Browse through our wide range of professional services and select the one that matches your needs.',
    'howWeWork.book.title': 'Book a Service',
    'howWeWork.book.desc': 'Choose your preferred date and time, provide your address, and any specific requirements you may have.',
    'howWeWork.payment.title': 'Secure Payment',
    'howWeWork.payment.desc': 'Make a secure payment through our platform. Your payment is held until the service is completed to your satisfaction.',
    'howWeWork.delivery.title': 'Service Delivery',
    'howWeWork.delivery.desc': 'Our verified professional will arrive at the scheduled time and complete the service according to your requirements.',
    'howWeWork.quality.title': 'Quality Assurance',
    'howWeWork.verified.title': 'Verified Professionals',
    'howWeWork.verified.desc': 'All service providers undergo thorough background checks and must provide proof of their qualifications and experience.',
    'howWeWork.standards.title': 'Quality Standards',
    'howWeWork.standards.desc': 'We maintain high standards of service quality through regular monitoring and customer feedback.',
    'howWeWork.insurance.title': 'Insurance Coverage',
    'howWeWork.insurance.desc': 'All services are covered by insurance for your peace of mind.',
    'howWeWork.refund.title': 'Our Refund Policy',
    'howWeWork.refund.desc': 'We offer refunds under the following conditions:',
    'howWeWork.refund.contact': 'Contact our customer support team within 48 hours of service completion to request a refund.',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have a question or feedback? We\'d love to hear from you.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent!',
    'contact.successDesc': 'We\'ll get back to you as soon as possible.',
    'contact.error': 'Error',
    'contact.errorDesc': 'Failed to send message. Please try again.',

    // Sign In/Up
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.joinNetwork': 'Join Our Service Provider Network',
    'auth.joinDesc': 'Fill out the form below to start offering your services in Geneva',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.serviceType': 'Service Type',
    'auth.hourlyRate': 'Hourly Rate (CHF)',
    'auth.experience': 'Years of Experience',
    'auth.description': 'Description of Services',
    'auth.profileImage': 'Profile Image',
    'auth.submit': 'Submit Application',
    'auth.submitting': 'Submitting...',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.howWeWork': 'Comment ça marche',
    'nav.contact': 'Contact',
    'nav.signIn': 'Connexion',
    'nav.signOut': 'Déconnexion',
    'nav.becomeProvider': 'Devenir prestataire',

    // Services
    'services.plumbing': 'Services de plomberie',
    'services.electrical': 'Services électriques',
    'services.painting': 'Services de peinture',
    'services.carpentry': 'Services de menuiserie',
    'services.cleaning': 'Services de nettoyage',
    'services.moving': 'Services de déménagement',
    'services.availableProviders': 'Prestataires disponibles',
    'services.rating': 'Évaluation',
    'services.rate': 'Tarif',
    'services.experience': 'ans d\'expérience',
    'services.selectDateTime': 'Sélectionner la date et l\'heure',
    'services.selectTime': 'Sélectionner l\'heure',
    'services.bookAppointment': 'Réserver un rendez-vous',
    'services.callProvider': 'Appeler le prestataire',
    'services.selectDateTimeError': 'Veuillez sélectionner une date et une heure',
    'services.selectDateTimeErrorDesc': 'Vous devez sélectionner une date et une heure avant de réserver',
    'services.providerNotFound': 'Erreur',
    'services.providerNotFoundDesc': 'Prestataire sélectionné non trouvé',
    'services.callingProvider': 'Appel du prestataire',
    'services.connectingWith': 'Connexion avec',

    // Home page
    'home.title': 'Trouvez des services locaux à Genève',
    'home.subtitle': 'Connectez-vous avec des professionnels de confiance pour tous vos besoins',
    'home.searchPlaceholder': 'Rechercher des services...',

    // How We Work
    'howWeWork.title': 'Comment ça marche',
    'howWeWork.process': 'Notre processus',
    'howWeWork.browse.title': 'Parcourir les services',
    'howWeWork.browse.desc': 'Parcourez notre large gamme de services professionnels et sélectionnez celui qui correspond à vos besoins.',
    'howWeWork.book.title': 'Réserver un service',
    'howWeWork.book.desc': 'Choisissez votre date et heure préférées, fournissez votre adresse et vos exigences spécifiques.',
    'howWeWork.payment.title': 'Paiement sécurisé',
    'howWeWork.payment.desc': 'Effectuez un paiement sécurisé via notre plateforme. Votre paiement est conservé jusqu\'à ce que le service soit terminé à votre satisfaction.',
    'howWeWork.delivery.title': 'Prestation de service',
    'howWeWork.delivery.desc': 'Notre professionnel vérifié arrivera à l\'heure prévue et effectuera le service selon vos exigences.',
    'howWeWork.quality.title': 'Assurance qualité',
    'howWeWork.verified.title': 'Professionnels vérifiés',
    'howWeWork.verified.desc': 'Tous les prestataires de services font l\'objet de vérifications approfondies et doivent fournir la preuve de leurs qualifications et de leur expérience.',
    'howWeWork.standards.title': 'Normes de qualité',
    'howWeWork.standards.desc': 'Nous maintenons des normes élevées de qualité de service grâce à un suivi régulier et aux retours des clients.',
    'howWeWork.insurance.title': 'Couverture d\'assurance',
    'howWeWork.insurance.desc': 'Tous les services sont couverts par une assurance pour votre tranquillité d\'esprit.',
    'howWeWork.refund.title': 'Notre politique de remboursement',
    'howWeWork.refund.desc': 'Nous offrons des remboursements dans les conditions suivantes :',
    'howWeWork.refund.contact': 'Contactez notre équipe de support client dans les 48 heures suivant la fin du service pour demander un remboursement.',

    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Vous avez une question ou un retour ? Nous aimerions vous entendre.',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Message envoyé !',
    'contact.successDesc': 'Nous vous répondrons dès que possible.',
    'contact.error': 'Erreur',
    'contact.errorDesc': 'Échec de l\'envoi du message. Veuillez réessayer.',

    // Sign In/Up
    'auth.signIn': 'Connexion',
    'auth.signUp': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.noAccount': 'Vous n\'avez pas de compte ?',
    'auth.hasAccount': 'Vous avez déjà un compte ?',
    'auth.joinNetwork': 'Rejoignez notre réseau de prestataires',
    'auth.joinDesc': 'Remplissez le formulaire ci-dessous pour commencer à offrir vos services à Genève',
    'auth.fullName': 'Nom complet',
    'auth.phone': 'Numéro de téléphone',
    'auth.serviceType': 'Type de service',
    'auth.hourlyRate': 'Tarif horaire (CHF)',
    'auth.experience': 'Années d\'expérience',
    'auth.description': 'Description des services',
    'auth.profileImage': 'Image de profil',
    'auth.submit': 'Soumettre la candidature',
    'auth.submitting': 'Soumission en cours...',
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