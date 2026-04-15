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

export const forgotPasswordOtp = async (email: string) => {
  const res = await authApi.post("/forgot-password", {
    email,
  });
  return res.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const res = await authApi.post("/reset-password", {
    email,
    otp,
    newPassword,
  });

  return res.data;
};

export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  const res = await authApi.post(
    "/change-password",
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAllUsers = async (
  token: string
) => {
  const res = await authApi.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await authApi.post("/refresh");
  return res.data;
};