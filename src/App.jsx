import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import LoginNavigator from "./pages/LoginNavigator";
import AdminLogin from "./pages/AdminLogin";
import AdminDashBoad from "./pages/AdminDashBoad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login/navigator" element={<LoginNavigator />} />
        <Route path="/admin/dashboard" element={<AdminDashBoad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
