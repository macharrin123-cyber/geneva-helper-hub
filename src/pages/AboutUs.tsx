import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const AboutUs = () => {
  const { t } = useLanguage();

  const coreValues = [
    {
      title: "Community",
      description: "Helpify brings people together, creating a network where everyone feels valued and supported.",
      icon: "🤝"
    },
    {
      title: "Trust",
      description: "A foundation of reliability and integrity ensures users and helpers can confidently engage.",
      icon: "🛡️"
    },
    {
      title: "Convenience",
      description: "Simplifying everyday challenges, freeing up time for users to focus on what matters most.",
      icon: "⚡"
    },
    {
      title: "Empowerment",
      description: "Offering opportunities for supplemental income and purpose-driven engagement for helpers.",
      icon: "💪"
    },
    {
      title: "Belonging",
      description: "Building a sense of unity and collaboration in Geneva's diverse population.",
      icon: "🌟"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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

            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-primary mb-8 text-center font-poppins">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    style={{
                      background: `linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)`,
                    }}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;