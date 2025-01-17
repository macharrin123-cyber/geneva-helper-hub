import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold text-primary mb-6 font-poppins">
              Terms and Conditions
            </h1>
            
            <div className="text-sm text-gray-600 mb-8">
              Effective Date: 17th January, 2025
            </div>

            <ScrollArea className="h-[70vh] pr-4">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 mb-6">
                  Welcome to Helpify Solutions ("we," "our," "us"). These Terms and Conditions ("Terms") govern your access to and use of the Helpify Solutions website ("Website") and related services ("Services"). By accessing or using our Website or Services, you agree to comply with these Terms. If you do not agree, you must not use our Website or Services.
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">1. Use of Services</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">1.1 Eligibility</h3>
                  <p className="text-gray-700 mb-4">
                    You must be at least 18 years old or have legal parental/guardian consent to use our Services.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">1.2 Account Registration</h3>
                  <p className="text-gray-700 mb-4">
                    Some features of the Website may require you to register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">1.3 Prohibited Activities</h3>
                  <p className="text-gray-700 mb-2">You agree not to:</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Use the Website for unlawful purposes or activities.</li>
                    <li>Post or transmit harmful, offensive, or infringing content.</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts.</li>
                    <li>Interfere with the Website's functionality or security.</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">2. Service Provider Relationships</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Facilitation Role</h3>
                  <p className="text-gray-700 mb-4">
                    Helpify Solutions acts as a platform to connect users seeking services ("Clients") with independent service providers ("Providers"). We do not employ Providers or guarantee the quality of their work.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">2.2 Responsibilities</h3>
                  <p className="text-gray-700 mb-4">
                    Clients and Providers are solely responsible for their interactions, including the negotiation of service terms and payments.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">2.3 Disputes</h3>
                  <p className="text-gray-700 mb-4">
                    We are not liable for any disputes or issues arising between Clients and Providers. We may, at our discretion, assist in resolving disputes but are not obligated to do so.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">3. Payments</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">3.1 Fees</h3>
                  <p className="text-gray-700 mb-4">
                    Payments for services will be processed through the platform. Helpify will retain a low commission of 7% from each transaction to maintain and improve our services.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">3.2 Taxes</h3>
                  <p className="text-gray-700 mb-4">
                    Clients and Providers are responsible for determining and fulfilling any tax obligations arising from transactions made through the Website.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">4. Intellectual Property</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">4.1 Ownership</h3>
                  <p className="text-gray-700 mb-4">
                    All content, logos, trademarks, and other intellectual property on the Website are owned by Helpify Solutions or licensed to us. You may not use, reproduce, or distribute our intellectual property without prior written consent.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">4.2 User Content</h3>
                  <p className="text-gray-700 mb-4">
                    By submitting content to the Website, you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display such content for the purpose of providing our Services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">5. Privacy</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">5.1 Data Collection</h3>
                  <p className="text-gray-700 mb-4">
                    We collect and process personal data as outlined in our Privacy Policy. By using our Services, you consent to such collection and processing.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">5.2 Third-Party Sharing</h3>
                  <p className="text-gray-700 mb-4">
                    We may share data with third parties only as necessary to provide the Services or comply with legal obligations.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">6. Limitation of Liability</h2>
                  
                  <h3 className="text-lg font-medium text-gray-800 mb-2">6.1 No Warranty</h3>
                  <p className="text-gray-700 mb-4">
                    We provide the Website and Services "as is" without any warranties of any kind, express or implied.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">6.2 Exclusion of Liability</h3>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or Services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">7. Indemnification</h2>
                  <p className="text-gray-700 mb-4">
                    You agree to indemnify and hold Helpify Solutions harmless from any claims, losses, damages, or expenses arising out of your use of the Website or Services, your violation of these Terms, or your infringement of any third-party rights.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">8. Termination</h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to suspend or terminate your access to the Website and Services at our discretion, without notice, if we determine that you have violated these Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">9. Modifications</h2>
                  <p className="text-gray-700 mb-4">
                    We may update these Terms at any time. Changes will take effect upon posting on the Website. Continued use of the Website after changes are posted constitutes your acceptance of the revised Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">10. Governing Law</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms are governed by the laws of Switzerland. Any disputes will be subject to the exclusive jurisdiction of the courts in Geneva.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">11. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 space-y-2 text-gray-700">
                    <p>Email: Support@helpify.solutions</p>
                    <p>Address: Geneva, Switzerland</p>
                    <p>Phone: +41 772101357</p>
                  </div>
                </section>

                <div className="text-gray-700 mt-8 text-center">
                  Thank you for using Helpify Solutions!
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsAndConditions;