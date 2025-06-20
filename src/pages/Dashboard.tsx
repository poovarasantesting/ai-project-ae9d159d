import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-700">Your Profile</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">User ID:</span> {user.id}</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-blue-800">
                This is a simulated dashboard. In a real application, you would see personalized content here.
              </p>
            </div>
            
            <Button asChild className="mt-4">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}