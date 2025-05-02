import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useRecoilValue } from "recoil";
import { authUserState } from '@/recoil/atom/auth/authUserAtom'
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail, updateCurrentUser, sendEmailVerification, getAuth, updatePhoneNumber, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import { FirebaseError } from "firebase/app";

interface IFormInput {
  currentEmail?: string,
  email?: string;
  fakePassword?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export const useAccountInfoProvider = () => {

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("メールアドレスは必須です")
      .email("メールアドレスを正しく入力してください"),
    // oldPassword: yup.string().required("パスワードは必須です"),
    // password: yup
    //   .string()
    //   .required("パスワードは必須です")
    //   .min(8, "英数字8文字以上で入力してください")
    //   .matches(
    //     /^(?=.*[a-zA-Z])(?=.*\d).+$/,
    //     "英数字8文字以上で入力してください"
    //   ),
    // confirmPassword: yup.string().required("パスワードは必須です"),
  });

  const authUser = useRecoilValue(authUserState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const organizationName = authUser.organizationName
  const prefecture = authUser.prefecture

  const methods = useForm<IFormInput>({
    defaultValues: {
      currentEmail: '',
      email: '',
      fakePassword: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { setValue } = methods

  useEffect(() => {
    if (!authUser.user) return
    setValue('email', authUser.user.email)
    setValue('currentEmail', authUser.user.email)
  }, [authUser])

  const handleUpdate: SubmitHandler<IFormInput> = async (formData) => {
    setIsLoading(true);
    setEmailError("");
    setOldPasswordError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const { email, oldPassword, password, confirmPassword, currentEmail } = formData;

    if (password !== confirmPassword) {
      setConfirmPasswordError("パスワードが一致しません");
      setIsLoading(false);
      return;
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(currentEmail, oldPassword);
    let result = null,
      error = null;
    if (user) {
      try {
        result = await reauthenticateWithCredential(user, credential);
        await Promise.all([!!password && password !== oldPassword ? updatePassword(user, password) : true, email !== currentEmail ? updateEmail(user, email) : true])
        // const updateEmailPromise = updateEmail(user, 'abc@gmail.com');
        // return Promise.all([updateEmailPromise, updatePasswordPromise]);
      } catch (e) {
        error = e;
      }
    }

    // PASSWORD UPDATE FAILED
    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("メールアドレスを正しく入力してください");
            break;
          case "auth/user-not-found":
            setEmailError("このアドレスは登録されていません");
            break;
          case "auth/wrong-password":
            setOldPasswordError("パスワードが間違っています");
            break;
          default:
            setConfirmPasswordError("パスワードの更新に失敗しました");
            break;
        }
      } else {
        setConfirmPasswordError("パスワードの更新に失敗しました");
      }
      setIsLoading(false);
      return;
    }
    // PASSWORD UPDATE SUCCESSFUL
    return router.push("/");
  };

  return {
    methods,
    organizationName,
    prefecture,
    emailError,
    oldPasswordError,
    passwordError,
    confirmPasswordError,
    isLoading,
    handleUpdate,
  };
};
