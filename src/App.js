import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </div> 
    </>
  );
}

export default App;
