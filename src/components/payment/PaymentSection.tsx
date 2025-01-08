import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
}

const PaymentForm = ({ amount, onSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-md border p-4 bg-white">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Card Details</h3>
          <PaymentElement options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            },
            paymentMethodOrder: ['card', 'apple_pay']
          }} />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : `Pay CHF ${amount}`}
      </button>
    </form>
  );
};

interface PaymentSectionProps {
  amount: number;
  onSuccess: () => void;
}

const PaymentSection = ({ amount, onSuccess }: PaymentSectionProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: { amount },
        });

        if (error) throw error;
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Payment Setup Failed",
          description: "Unable to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [amount, toast]);

  if (!clientSecret) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={{ 
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#0F172A',
            },
          },
        }}>
          <PaymentForm amount={amount} onSuccess={onSuccess} />
        </Elements>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;