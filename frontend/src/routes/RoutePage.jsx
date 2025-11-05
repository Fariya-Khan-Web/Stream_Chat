import { Navigate, Route, Routes } from "react-router"
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';

const RoutePage = ({ authUser }) => {
    return (
        <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
            <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={'/'} />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        </Routes>
    );
};

export default RoutePage;