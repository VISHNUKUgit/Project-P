import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import { tokenAuthorisationContext } from "./Context/TokenAuthContext";
import { useContext } from "react";


function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={ isAuthorized ? <Dashboard  />:<Auth/>} />
        <Route path="/projects" element={ isAuthorized ? <Projects />:<Auth/>} />
        <Route path="/register" element={<Auth register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
