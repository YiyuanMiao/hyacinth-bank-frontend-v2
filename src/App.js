//import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuditorDashboard from "./pages/AuditorDashboard";
import Deposit from "./pages/Deposit";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import { AuditorRoute, CustomerRoute } from "./services/Guard";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/profile"
          element={<CustomerRoute element={<Profile />} />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/update-profile"
          element={<CustomerRoute element={<UpdateProfile />} />}
        ></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          path="/transactions"
          element={<CustomerRoute element={<Transactions />} />}
        ></Route>
        <Route
          path="/deposit"
          element={<CustomerRoute element={<Deposit />} />}
        ></Route>
        <Route
          path="/auditor-dashboard"
          element={<AuditorRoute element={<AuditorDashboard />} />}
        ></Route>
        <Route
          path="/transfer"
          element={<CustomerRoute element={<Transfer />} />}
        ></Route>

        <Route path="*" element={<NotFound />}></Route>

        {/*having traversed through all previous routes and non is available: 404 */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
