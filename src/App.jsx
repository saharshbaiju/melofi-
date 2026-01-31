import { Routes,Route } from "react-router-dom";
import Login from "./pages/login/Login";
import LoginOptions from './pages/login/LoginOptions'
import HomeMain from "./pages/home_pages/Home";
import Signup from "./pages/login/Signup"
import { useState } from "react";
function App() {
  const [currentUser, setCurrentUser] = useState(
      localStorage.getItem("username")
    );
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginOptions />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} /> 
        <Route path="/forgot-password" element={<LoginOptions />} />
        <Route path="/signup" element ={<Signup />} />
        <Route path="/home" element= {<HomeMain currentUser={currentUser} />} />
      </Routes>
        
    </div>
      
       
  
  )
}

export default App 
