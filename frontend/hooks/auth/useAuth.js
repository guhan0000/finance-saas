"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { registerUser, loginUser } from "@/services/auth/auth.service";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      router.push("/dashboard");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      router.push("/dashboard");
    },
  });
};
