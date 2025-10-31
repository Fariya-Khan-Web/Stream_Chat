import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <div className="min-h-screen" >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
