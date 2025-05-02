'use client'

import ClipLoader from "react-spinners/ClipLoader";
import { InputStatus } from "@/components/atoms";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules";
import { useNotificationSettingsProvider } from "../providers/useNotificationSettingsProvider";
import { FormProvider } from "react-hook-form";
import { logout } from "@/features/auth/providers/useAuthProvider";
import Loading from "@/components/layouts/loading";
import { PCFooter } from "@/components/organisms";

function NotificationSettingsPage () {

  const {
    methods,
    isLoading,
    errorEmail,
    onSubmit,
  } = useNotificationSettingsProvider();

  const { control, handleSubmit, formState: { errors } } = methods;

  return (
    <div className="w-full p-10 pb-0 bg-gray-white">
      { isLoading && <Loading /> }
      <div className="flex flex-col pc:px-[60px] pc:py-10 gap-7 pc:gap-10 pc:w-[480px] w-[90%] pc:max-w-full max-w-[300px] mx-auto text-left">
        <div className="flex flex-col gap-5">
          <h1 className="text-center pc:text-h1 text-h2">通知メール設定</h1>
          <p className="text-timestamp">
            設定したメールアドレスに新規募集やメッセージの通知が届きます
          </p>
        </div>
        <FormProvider {...methods}>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col m-auto gap-7 pc:gap-10">
              <FormField
                control={control}
                input={{
                  name: "email1",
                  status: InputStatus.DEFAULT,
                  placeholder: "メールアドレス➀"
                }}
                attention={{text: ""}}
                error={errors.email1 ? errors.email1.message : errorEmail}
              />
              <FormField
                control={control}
                input={{
                  name: "email2",
                  status: InputStatus.DEFAULT,
                  placeholder: "メールアドレス➁"
                }}
                attention={{text: ""}}
                error={errors.email2 ? errors.email2.message : errorEmail}
              />
              <FormField
                control={control}
                input={{
                  name: "email3",
                  status: InputStatus.DEFAULT,
                  placeholder: "メールアドレス➂"
                }}
                attention={{text: ""}}
                error={errors.email3 ? errors.email3.message : errorEmail}
              />
              <FormField
                control={control}
                input={{
                  name: "email4",
                  status: InputStatus.DEFAULT,
                  placeholder: "メールアドレス➃"
                }}
                attention={{text: ""}}
                error={errors.email4 ? errors.email4.message : errorEmail}
              />
              <FormField
                control={control}
                input={{
                  name: "email5",
                  status: InputStatus.DEFAULT,
                  placeholder: "メールアドレス➄"
                }}
                attention={{text: ""}}
                error={errors.email5 ? errors.email5.message : errorEmail}
              />
              <Button
                disabled={Object.keys(errors).length > 0}
                text={"更新する"}
                type="submit"
                color={ButtonColor.SUB}
                shape={ButtonShape.ELLIPSE}
                onclick={(e) => e.stopPropagation}
                className="pc:w-[156px] w-[140px] pc:py-[16.5px] py-3 mx-auto"
              />
              <button className="underline text-core-blue text-body_sp" onClick={() => logout()}>
                ログアウト
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      <PCFooter />
    </div>
  );
}

export default NotificationSettingsPage;