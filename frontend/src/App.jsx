import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import LoginPage from "./pages/LoginPage"
import { useQuery } from '@tanstack/react-query'
import axiosInst from './lib/axios.js'
import RoutePage from "./routes/RoutePage.jsx"

function App() {

  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await axiosInst.get('/auth/me')
      return res.data
    }
  })
  const authUser = authData?.user

  
  return (
    <div className="min-h-screen" >
     <RoutePage authUser={authUser}/>
    </div>
  )
}

export default App
