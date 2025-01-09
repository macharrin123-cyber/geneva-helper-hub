import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const HowWeWork = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('howWeWork.title')}
          </h1>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('howWeWork.process')}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">{t('howWeWork.browse.title')}</h3>
                    <p className="text-gray-600">{t('howWeWork.browse.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">{t('howWeWork.book.title')}</h3>
                    <p className="text-gray-600">{t('howWeWork.book.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">{t('howWeWork.payment.title')}</h3>
                    <p className="text-gray-600">{t('howWeWork.payment.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">{t('howWeWork.delivery.title')}</h3>
                    <p className="text-gray-600">{t('howWeWork.delivery.desc')}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('howWeWork.quality.title')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">{t('howWeWork.verified.title')}</h3>
                  <p className="text-gray-600">{t('howWeWork.verified.desc')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">{t('howWeWork.standards.title')}</h3>
                  <p className="text-gray-600">{t('howWeWork.standards.desc')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">{t('howWeWork.insurance.title')}</h3>
                  <p className="text-gray-600">{t('howWeWork.insurance.desc')}</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('howWeWork.refund.title')}</h2>
              <div className="space-y-4">
                <p className="text-gray-600">{t('howWeWork.refund.desc')}</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>{t('howWeWork.refund.late')}</li>
                  <li>{t('howWeWork.refund.quality')}</li>
                  <li>{t('howWeWork.refund.incomplete')}</li>
                  <li>{t('howWeWork.refund.cancel')}</li>
                </ul>
                <p className="text-gray-600">
                  {t('howWeWork.refund.contact')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowWeWork;