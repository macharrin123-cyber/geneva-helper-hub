import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import PlumbingPage from "./pages/PlumbingPage";
import ElectricalPage from "./pages/ElectricalPage";
import PaintingPage from "./pages/PaintingPage";
import CarpentryPage from "./pages/CarpentryPage";
import CleaningPage from "./pages/CleaningPage";
import MovingPage from "./pages/MovingPage";
import PaymentPage from "./pages/PaymentPage";
import ProviderDashboard from "./pages/ProviderDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ThankYouPage from "./pages/ThankYouPage";
import ContactPage from "./pages/ContactPage";
import HowWeWork from "./pages/HowWeWork";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/plumbing" element={<PlumbingPage />} />
          <Route path="/electrical" element={<ElectricalPage />} />
          <Route path="/painting" element={<PaintingPage />} />
          <Route path="/carpentry" element={<CarpentryPage />} />
          <Route path="/cleaning" element={<CleaningPage />} />
          <Route path="/moving" element={<MovingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;