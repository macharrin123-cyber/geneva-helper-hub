import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, save to database
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([{ name, email, message }]);

      if (dbError) throw dbError;

      // Then, send email notification
      const { error: emailError } = await supabase.functions.invoke('notify-contact-message', {
        body: { name, email, message }
      });

      if (emailError) throw emailError;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <MessageSquare className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="transition-all duration-300 hover:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="transition-all duration-300 hover:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your message..."
                className="min-h-[150px] transition-all duration-300 hover:border-primary focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;