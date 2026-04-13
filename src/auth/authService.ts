import authApi from "../api/authApi";

export const loginUser = async (email: string, password: string) => {
  const res = await authApi.post("/login", { email, password });
  return res.data;
};

export const getProfile = async (token: string) => {
  const res = await authApi.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await authApi.post("/logout");
  return res.data;
};

export const sendRegisterOtp = async (email: string) => {
  const res = await authApi.post("/send-register-otp", {
    email,
  });
  return res.data;
};

export const registerUser = async (formData: FormData) => {
  const res = await authApi.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};