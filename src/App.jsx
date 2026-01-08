import './App.css'
import Login from './pages/login/login'
import Singup from "./pages/singup/signup.jsx"
import { Routes, Route } from "react-router";
import Dashboard from './pages/dashbord/dashBoard.jsx';
import ProtectedRoute from "./routes/protectedroutes.jsx";




function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Singup/>}/>
      <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/> </ProtectedRoute>}/>
    </Routes>
    
    </>
  )
}

export default App
