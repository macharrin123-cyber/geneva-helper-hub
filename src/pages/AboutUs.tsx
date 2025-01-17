import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const AboutUs = () => {
  const { t } = useLanguage();

  const coreValues = [
    {
      title: "Community",
      description: "Helpify brings people together, creating a network where everyone feels valued and supported.",
      icon: "🤝",
      gradient: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)"
    },
    {
      title: "Trust",
      description: "A foundation of reliability and integrity ensures users and helpers can confidently engage.",
      icon: "🛡️",
      gradient: "linear-gradient(to right, #243949 0%, #517fa4 100%)"
    },
    {
      title: "Convenience",
      description: "Simplifying everyday challenges, freeing up time for users to focus on what matters most.",
      icon: "⚡",
      gradient: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
    },
    {
      title: "Empowerment",
      description: "Offering opportunities for supplemental income and purpose-driven engagement for helpers.",
      icon: "💪",
      gradient: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)"
    },
    {
      title: "Belonging",
      description: "Building a sense of unity and collaboration in Geneva's diverse population.",
      icon: "🌟",
      gradient: "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)"
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
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                    style={{
                      background: value.gradient,
                    }}
                  >
                    <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-200">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {value.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
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