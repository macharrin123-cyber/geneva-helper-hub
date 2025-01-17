import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-primary mb-6 font-poppins">
              {t('about.title')}
            </h1>
            <p className="text-lg leading-relaxed text-gray-700">
              {t('about.description')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;