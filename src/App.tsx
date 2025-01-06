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

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/plumbing" element={<PlumbingPage />} />
              <Route path="/electrical" element={<ElectricalPage />} />
              <Route path="/painting" element={<PaintingPage />} />
              <Route path="/carpentry" element={<CarpentryPage />} />
              <Route path="/cleaning" element={<CleaningPage />} />
              <Route path="/payment/:bookingId" element={<PaymentPage />} />
            </Routes>
            <Toaster />
            <Sonner />
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;