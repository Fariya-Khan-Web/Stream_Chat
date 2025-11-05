import { Navigate, Route, Routes } from "react-router"
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';
import OnBoarding from "../pages/OnBoarding";

const RoutePage = ({ isAuthenticated, isOnboarded }) => {
    return (
        <Routes>
            <Route path="/"
                element={
                    isAuthenticated
                        ? (isOnboarded ? <Home /> : <Navigate to="/onboarding" />)
                        : <Navigate to="/login" />
                }
            />
            <Route path="/signup"
                element={!isAuthenticated
                    ? <SignUp />
                    : (isOnboarded ? <Navigate to='/' /> : <Navigate to='/onboarding' />)}
            />
            <Route path="/login"
                element={!isAuthenticated
                    ? <LoginPage />
                    : (isOnboarded ? <Navigate to='/' /> : <Navigate to='/onboarding' />)}
            />
            <Route path="/onboarding"
                element={isAuthenticated
                    ? (!isOnboarded ? <OnBoarding /> : <Navigate to='/' />) 
                    : <Navigate to='/login' />}
            />
        </Routes>
    );
};

export default RoutePage;