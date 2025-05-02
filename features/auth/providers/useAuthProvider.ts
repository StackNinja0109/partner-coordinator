"use client";

import { useState } from "react";
import { auth } from "@/libs/firebase/firebase";
import { EmailAuthCredential, EmailAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

interface FormValues {
  email?: string;
  password?: string;
}

export const useAuthUserStateProvider = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const schema = yup.object().shape({
    email: yup.string().required('メールアドレスは必須です').email('メールアドレスを正しく入力してください'),
    password: yup.string().required('パスワードは必須です'),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleLogin = async (formData: FormValues) => {
    setIsLoading(true);
    setErrorEmail("");
    setErrorPassword("");

    const { email, password } = formData;
    const { result, error } = await login({ email, password });

    // LOGIN FAILED
    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorEmail("メールアドレスを正しく入力してください");
            console.log("invalid email");
            break;
          case "auth/wrong-password":
            setErrorPassword("パスワードが間違っています");
            break;
          case "auth/user-not-found":
            setErrorEmail("入力されたメールアドレスは登録されていません");
            console.log("user-not-found");
            break;
          default:
            setErrorPassword("ログインに失敗しました");
            console.error(error);
            break;
        }
      } else {
        setErrorPassword("ログインに失敗しました");
        console.error(error);
      }
      setIsLoading(false);
      return;
    }

    // LOGIN SUCCESSFUL
    return router.push("/");
  };

  return {
    methods,
    errorEmail,
    errorPassword,
    isLoading,
    handleLogin,
  };
};

export async function login({ email, password }: {
  email: string;
  password: string;
}) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function logout() {
  await signOut(auth);
  return;
}
