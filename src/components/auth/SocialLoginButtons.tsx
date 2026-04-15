export default function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5001/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:5001/api/auth/github";
  };

  return (
    <div className="space-y-3 mt-6">
      <button
        onClick={handleGoogleLogin}
        className="w-full border rounded-xl py-3 hover:bg-slate-50 transition"
      >
        Continue with Google
      </button>

      <button
        onClick={handleGithubLogin}
        className="w-full border rounded-xl py-3 hover:bg-slate-50 transition"
      >
        Continue with GitHub
      </button>
    </div>
  );
}