import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import LoginPage from "./pages/LoginPage"
import RoutePage from "./routes/RoutePage.jsx"
import PageLoader from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js"

function App() {

  const { authUser, isLoading } = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  console.log(isAuthenticated, isOnboarded, isLoading)

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen" >
      <RoutePage isAuthenticated={isAuthenticated} isOnboarded={isOnboarded}   />
    </div>
  )
}

export default App
