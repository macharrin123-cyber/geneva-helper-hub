import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
