'use client'

import { useEffect, useState } from 'react';
import { auth } from '@/libs/firebase/firebase';
import {
  ActionCodeSettings,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';

export const useForgotPasswordProvider = () => {
  interface FormValues {
    email?: string;
  }
  
  const schema = yup.object().shape({
    email: yup.string().required('メールアドレスは必須です').email('メールアドレスを正しく入力してください'),
  });
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    setErrorEmail('');

    const { email } = formData;

    const baseUrl = window.location.origin
    console.log("baseUrl => ", baseUrl)

    const { result, error } = await sendLink(email, {
      url: `${baseUrl}/login`,
    })

    // PASSWORD RESET FAILED
    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorEmail('メールアドレスを正しく入力してください');
            break;
          case 'auth/user-not-found':
            setErrorEmail('このアドレスは登録されていません');
            break;
          default:
            setErrorEmail('パスワード再設定に失敗しました');
            break;
        }
      } else {
        setErrorEmail('パスワード再設定に失敗しました');
      }
      setIsLoading(false);
      return;
    }

    // PASSWORD RESET SUCCESSFUL
    router.push(`/send-link-confirm/?email=${email}`);
    
  };
  return {
    isLoading,
    errorEmail,
    methods,
    onSubmit,
    sendLink,
  };
};

export async function sendLink(email: string, settings?: ActionCodeSettings) {
  let result = null,
    error = null
  try {
    result = await sendPasswordResetEmail(auth, email, settings)
  } catch (e) {
    error = e
  }

  return { result, error }
}