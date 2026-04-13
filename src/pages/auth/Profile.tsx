import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/authService";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearAuth();
      toast.success("Logged out");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          My Profile
        </h1>

        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}