import { useState } from "react";
import { toast } from "sonner";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuthStore } from "../../store/authStore";
import { changePassword } from "../../auth/authService";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  const token = useAuthStore(
    (s) => s.accessToken
  );

  const [form, setForm] = useState({
    oldPassword: "",
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

    if (!token) {
      return toast.error("Unauthorized");
    }

    setLoading(true);

    try {
      await changePassword(
        token,
        form.oldPassword,
        form.newPassword
      );

      toast.success("Password changed");
      navigate("/profile");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-6">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="password"
          name="oldPassword"
          placeholder="Old password"
          value={form.oldPassword}
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
            ? "Updating..."
            : "Change Password"}
        </button>
      </form>
    </AuthLayout>
  );
}