import { useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "sonner";
import { getProfile } from "../../auth/authService";
import { useAuthStore } from "../../store/authStore";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const setAccessToken = useAuthStore(
    (s) => s.setAccessToken
  );
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const token = params.get("token");

        if (!token) {
          toast.error("OAuth token missing");
          return navigate("/login");
        }

        setAccessToken(token);

        const profile = await getProfile(token);

        setUser(profile.user || profile);

        toast.success("OAuth login successful");

        navigate("/profile");
      } catch {
        toast.error("OAuth login failed");
        navigate("/login");
      }
    };

    handleOAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging you in...
    </div>
  );
}