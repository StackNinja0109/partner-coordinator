'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRecoilValue } from "recoil";
import { authUserState } from "@/recoil/atom/auth/authUserAtom";
import { useRouter } from "next/navigation";
import 'firebase/functions';
import { DocRef } from "@/libs/firebase/firestore";
import { getDoc, updateDoc } from "firebase/firestore";

type EmailParamName = "email1" | "email2" | "email3" | "email4" | "email5"

interface FormValues {
  email1?: string
  email2?: string
  email3?: string
  email4?: string
  email5?: string
}

export const useNotificationSettingsProvider = () => {
  const schema = yup.object().shape({
    email1: yup.string()
      .email('メールアドレスを正しく入力してください')
      .test('is-not-empty', '1つ以上登録されている必要がある', function(value) {
        return value || this.parent.email2 || this.parent.email3 || this.parent.email4 || this.parent.email5
      }),
    email2: yup.string()
      .email('メールアドレスを正しく入力してください')
      .test('email-match', '同じメールアドレスが入力されました', function (value) {
        return !value || (value && value !== this.parent.email1)
      }),
    email3: yup.string()
      .email('メールアドレスを正しく入力してください')
      .test('email-match', '同じメールアドレスが入力されました', function (value) {
        return !value || (value && value !== this.parent.email1 && value !== this.parent.email2)
      }),
    email4: yup.string()
      .email('メールアドレスを正しく入力してください')
      .test('email-match', '同じメールアドレスが入力されました', function (value) {
        return !value || (value && value !== this.parent.email1 && value !== this.parent.email2 && value !== this.parent.email3)
      }),
    email5: yup.string()
      .email('メールアドレスを正しく入力してください')
      .test('email-match', '同じメールアドレスが入力されました', function (value) {
        return !value || (value && value !== this.parent.email1 && value !== this.parent.email2 &&
          value !== this.parent.email3 && value !== this.parent.email4)
      }),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      email1: '',
      email2: '',
      email3: '',
      email4: '',
      email5: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const { setValue } = methods

  const authUser = useRecoilValue(authUserState)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState("")

  useEffect(() => {
    setIsLoading(true)
    if (!authUser.user) return
    const authUserId = authUser.user.uid

    const fetchCoordinator = async () => {
      const coordinatorDocRef = DocRef.coordinators(authUserId)
      const coordinatorDoc = await getDoc(coordinatorDocRef)
      const coordinatorObject = coordinatorDoc.data()
      const notificationEmails: string[] = coordinatorObject.notificationEmails
      notificationEmails.forEach((notificationEmail, index) => {
        setValue(`email${index + 1}` as EmailParamName, notificationEmail);
      })
    }

    fetchCoordinator()
    setIsLoading(false)
  }, [authUser])

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsLoading(true);
    setErrorEmail('');

    const { email1, email2, email3, email4, email5, } = formData;
    const emails = [email1, email2, email3, email4, email5];

    const updateNotificationEmailsOfCoordinator = async () => {
      const authUserId = authUser.user.uid
      await updateDoc(DocRef.coordinators(authUserId), {
        notificationEmails: emails,
      })
    }

    updateNotificationEmailsOfCoordinator()

    for (let i = 0; i < 5; i ++) {
      if (!emails[i]) continue;
      let content = `【AS-FEEL】\n
      ご担当者 様\n
      ------------------------------------------------------------------\n
      本メールは送信専用メールアドレスから配信されています。
      ご返信頂いても対応できませんので、あらかじめご了承ください。

      ------------------------------------------------------------------
      【AS-FEEL】`
      const params = {
        to: emails[i],
        subject: 'メッセージが届いています【AS-FEEL】',
        content: content,
      }
      const result = await axios.post(`/api/sendEmail`, params)
    }
    return router.push('/projects/prepare');

  };

  return {
    methods,
    isLoading,
    errorEmail,
    onSubmit,
  }
}