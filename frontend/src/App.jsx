import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import LoginPage from "./pages/LoginPage"
import { useQuery } from '@tanstack/react-query'
import axiosInst from './lib/axios.js'

function App() {

  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await axiosInst.get('/auth/me')
      return res.data
    }
  })

  const authUser = authData?.user
  console.log({authData})

  return (
    <div className="min-h-screen" >
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App
