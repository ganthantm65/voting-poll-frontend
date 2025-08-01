import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./admin/LandingPage";
import UserLogin from "./admin/UserLogin";
import LoginNavigator from "./admin/LoginNavigator";
import AdminLogin from "./admin/AdminLogin";
import AdminDashBoad from "./admin/AdminDashBoad";
import AdminPolls from "./admin/AdminPolls";
import PollCreator from "./admin/PollCreator";
import PollEdit from "./admin/PollEdit";
import Voters from "./admin/Voters";
import AddAdmin from "./admin/AddAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/add" element={<AddAdmin/>}/>
        <Route path="/login/navigator" element={<LoginNavigator />} />
        <Route path="/admin/dashboard" element={<AdminDashBoad/>} />
        <Route path="/admin/polls" element={<AdminPolls/>}/>
        <Route path="/admin/polls/create" element={<PollCreator />} />
        <Route path="/admin/polls/edit" element={<PollEdit/>}/>
        <Route path="/admin/voters" element={<Voters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
