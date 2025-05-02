
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";

export const useResetPasswordProvider = () => {

  interface FormValues {
    password?: string;
    confirmPassword?: string;
  }

  const schema = yup.object().shape({
    password: yup
      .string().required('パスワードは必須です')
      .min(8, '英数字8文字以上で入力してください')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, '英数字8文字以上で入力してください'),
    confirmPassword: yup.string().required('パスワードは必須です')
  });
  
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmErrorPassword, setConfirmErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<FormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });
  
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsLoading(true);

    setErrorPassword('');
    setConfirmErrorPassword('');

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setConfirmErrorPassword("パスワードが一致しません");
      setIsLoading(false);
      return;
    }
    
    const oobCode = searchParams.get('oobCode');
    const continueUrl = searchParams.get('continueUrl');

    const actionCode = oobCode as string;

    const { result, error } = await passwordReset(actionCode, password);

    // PASSWORD RESET FAILED
    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-action-code':
            setErrorPassword('無効なリンクです');
            break;
          case 'auth/expired-action-code':
            setErrorPassword('リンクの有効期限が切れました');
            break;
          default:
            setErrorPassword('パスワード再設定に失敗しました');
            break;
        }
      } else {
        setErrorPassword('パスワード再設定に失敗しました');
      }
      setIsLoading(false);
      return;
    }

    // PASSWORD RESET SUCCESSFUL
    return router.push(continueUrl || "/login");
  };

  return {
    methods,
    errorPassword,
    confirmErrorPassword,
    isLoading,
    onSubmit,
  }
}


export async function passwordReset(oobCode: string, newPassword: string) {
  let result = null, error = null;
  try {
    result = await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (e) {
    error = e;
  }

  return { result, error };
}