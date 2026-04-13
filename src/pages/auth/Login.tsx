import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/layout/AuthLayout";
import { loginUser, getProfile } from "../../auth/authService";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginRes = await loginUser(form.email, form.password);

      const token = loginRes.accessToken;

      setAccessToken(token);

      const profile = await getProfile(token);

      setUser(profile.user || profile);

      toast.success("Login successful");

      navigate("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-slate-500 text-center mb-6">
        Sign in to continue shopping
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-600"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-600"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link to="/forgot-password" className="text-yellow-700 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <div className="mt-6 text-center text-sm">
        Don’t have an account?{" "}
        <Link
          to="/send-otp"
          className="text-yellow-700 font-semibold hover:underline"
        >
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}
