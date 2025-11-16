import { Navigate, Route, Routes } from "react-router"
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import LoginPage from '../pages/LoginPage';
import OnBoarding from "../pages/OnBoarding";
import Layout from "../components/Layout";
import Notifications from "../pages/Notifications";
import ChatPage from "../pages/ChatPage";
import CallPage from "../pages/CallPage";

const RoutePage = ({ isAuthenticated, isOnboarded }) => {
    return (
        <Routes>
            <Route path="/"
                element={
                    isAuthenticated
                        ? (isOnboarded
                            ? <Layout>
                                <Home />
                            </Layout>
                            : <Navigate to="/onboarding" />)
                        : <Navigate to="/login" />
                }
            />
            <Route path="/notifications"
                element={
                    isAuthenticated
                        ? (isOnboarded
                            ? <Layout>
                                <Notifications />
                            </Layout>
                            : <Navigate to="/onboarding" />)
                        : <Navigate to="/login" />
                }
            />
            <Route path="/chat/:id"
                element={
                    isAuthenticated
                        ? (isOnboarded
                            ? <Layout showSidebar={false}>
                                <ChatPage />
                            </Layout>
                            : <Navigate to="/onboarding" />)
                        : <Navigate to="/login" />
                }
            />
            <Route path="/call/:id"
                element={
                    isAuthenticated
                        ? (isOnboarded
                            ? <Layout showSidebar={false}>
                                <CallPage />
                            </Layout>
                            : <Navigate to="/onboarding" />)
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