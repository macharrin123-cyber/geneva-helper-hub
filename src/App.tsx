import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "./App.css";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;