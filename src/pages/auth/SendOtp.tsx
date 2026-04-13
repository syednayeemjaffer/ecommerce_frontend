import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/layout/AuthLayout";
import { sendRegisterOtp } from "../../auth/authService";

export default function SendOtp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendRegisterOtp(email);

      toast.success("OTP sent successfully");

      navigate("/register", {
        state: { email },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">
        Create Account
      </h1>

      <p className="text-center text-slate-500 mb-6">
        Enter your email to receive OTP
      </p>

      <form
        onSubmit={handleSendOtp}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-xl"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </AuthLayout>
  );
}