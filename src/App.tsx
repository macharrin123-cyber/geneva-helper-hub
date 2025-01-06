import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import PlumbingPage from "./pages/PlumbingPage";
import ElectricalPage from "./pages/ElectricalPage";
import PaintingPage from "./pages/PaintingPage";
import CarpentryPage from "./pages/CarpentryPage";
import CleaningPage from "./pages/CleaningPage";
import PaymentPage from "./pages/PaymentPage";
import ProviderDashboard from "./pages/ProviderDashboard";
import ClientDashboard from "./pages/ClientDashboard";

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
          <Route path="/plumbing" element={<PlumbingPage />} />
          <Route path="/electrical" element={<ElectricalPage />} />
          <Route path="/painting" element={<PaintingPage />} />
          <Route path="/carpentry" element={<CarpentryPage />} />
          <Route path="/cleaning" element={<CleaningPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;