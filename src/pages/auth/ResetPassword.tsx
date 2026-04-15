import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/layout/AuthLayout";
import { resetPassword } from "../../auth/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      await resetPassword(
        email,
        form.otp,
        form.newPassword
      );

      toast.success(
        "Password reset successful. Please login."
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">
        Reset Password
      </h1>

      <p className="text-center text-slate-500 mb-6">
        OTP sent to {email}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl"
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}