import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-primary mb-6 font-poppins">
                {t('about.title')}
              </h1>
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.description')}
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative mt-8 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src="/lovable-uploads/133ee942-660f-4c4d-980d-7def9d7e7355.png"
                alt="Community helping each other"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;