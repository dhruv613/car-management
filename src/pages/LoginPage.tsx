
import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useState } from "react";

const LoginPage = () => {
  const { user } = useApp();
  const [showLogin, setShowLogin] = useState(true);

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm onShowRegister={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onShowLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
