import { Navigate, Route, Routes } from "react-router"
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';
import OnBoarding from "../pages/OnBoarding";

const RoutePage = ({ isAuthenticated, isOnboarded }) => {
    return (
        <Routes>
            <Route path="/" element={isAuthenticated && isOnboarded? <Home/> : <Navigate to={'/login'} />} />
            <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to={'/onboarding'} />} />
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={'/onboarding'} />} />
            <Route path="/onboarding" element={!isOnboarded ? <OnBoarding /> : <Navigate to={'/'} />} />
        </Routes>
    );
};

export default RoutePage;