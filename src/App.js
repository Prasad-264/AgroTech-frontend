import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Crop from "./components/Crop";
import Chemical from "./components/Chemical";
import Sell from "./components/Sell";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup", "/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crop/:farmerId" element={<Crop />} />
          <Route path="/chemical/:cropId" element={<Chemical />} />
          <Route path="/sell/:cropId" element={<Sell />} />
        </Routes>
      </div> 
    </>
  );
}

export default App;
