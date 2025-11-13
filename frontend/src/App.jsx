import RoutePage from "./routes/RoutePage.jsx"
import PageLoader from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js"
import { useThemeStore } from "./store/useThemeStore.js"


function App() {

  const { authUser, isLoading } = useAuthUser()
  const { theme } = useThemeStore()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className="min-h-screen" data-theme={theme}>
      <RoutePage isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} />
    </div>
  )
}

export default App
