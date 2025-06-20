import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            <p className="mb-4">Hello, <span className="font-medium">{user?.name}</span>!</p>
            <p className="mb-4">You are logged in with {user?.email}</p>
            <Button asChild className="w-full">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="mb-6">Please log in or register to continue</p>
            <div className="grid gap-4">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}