import { useEffect } from "react";
import { refreshAccessToken, getProfile } from "../../auth/authService";
import { useAuthStore } from "../../store/authStore";

export default function SessionInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAccessToken = useAuthStore(
    (s) => s.setAccessToken
  );
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshRes =
          await refreshAccessToken();

        const token = refreshRes.accessToken;

        setAccessToken(token);

        const profile = await getProfile();

        setUser(profile.user || profile);
      } catch {
        // user not logged in
      }
    };

    restoreSession();
  }, []);

  return <>{children}</>;
}