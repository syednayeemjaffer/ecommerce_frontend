import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/layout/AuthLayout";
import { registerUser } from "../../auth/authService";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [image, setImage] = useState<File | null>(
    null
  );
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

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", email);
      formData.append("password", form.password);
      formData.append("otp", form.otp);

      if (image) {
        formData.append("user_image", image);
      }

      await registerUser(formData);

      toast.success(
        "Registration successful. Please login."
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">
        Complete Registration
      </h1>

      <p className="text-center text-slate-500 mb-6">
        OTP sent to {email}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

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
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}