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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-6 text-gray-700"
            >
              <p className="leading-relaxed">
                Our purpose goes beyond just facilitating tasks; it's about fostering meaningful connections within our community. By bringing together those who need help with those who can provide it, we aim to create a shared sense of purpose and belonging. Helpify doesn't just supplement income for those offering their skills—it creates opportunities for people to feel valued, respected, and empowered through their contributions.
              </p>

              <p className="leading-relaxed">
                For the families and professionals using our service, Helpify offers more than just convenience—it delivers peace of mind. In a city as dynamic as Geneva, time is precious. Our platform ensures that people can delegate with confidence, knowing that every task is handled by someone reliable and capable.
              </p>

              <p className="leading-relaxed">
                We see Helpify as a bridge that strengthens community ties. It's not just about transactions; it's about trust. Whether it's a student earning extra income by assisting with groceries or a professional helping with home repairs, every interaction on our platform contributes to building a network of support and collaboration.
              </p>

              <p className="leading-relaxed">
                At its core, Helpify is about empowering lives—helping people reclaim their time, empowering helpers to achieve their goals, and fostering a community where everyone thrives together. By facilitating these connections, we aim to redefine what it means to be part of a supportive and vibrant local network.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;