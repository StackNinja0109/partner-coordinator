'use client'

import ClipLoader from "react-spinners/ClipLoader";
import { InputStatus } from "@/components/atoms";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules";
import LabelSub from "@/components/atoms/Input/LabelSub";
import { useAccountInfoProvider } from "../providers/useAccountInfoProvider";
import { logout } from "@/features/auth/providers/useAuthProvider";
import { PCFooter } from "@/components/organisms";

export default function AccountInfoPage() {

  const {
    methods,
    organizationName,
    prefecture,
    emailError,
    oldPasswordError,
    passwordError,
    confirmPasswordError,
    isLoading,
    handleUpdate,
  } = useAccountInfoProvider();

  const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = methods;

  return (
    <div className='w-full p-10 pb-0 bg-gray-white'>
      <div className='flex flex-col pc:px-[60px] pc:py-10 gap-7 pc:gap-10 pc:w-[480px] w-[90%] pc:max-w-full max-w-[300px] mx-auto text-left'>
        <h1 className="text-center pc:text-h1 text-h2">アカウント情報</h1>
        <div className="flex flex-col gap-3 pc:gap-4">
          <label htmlFor="" className="text-h5 pc:text-h4">部署・団体名</label>
          <p className="pc:text-body_pc text-timestamp">{organizationName}</p>
        </div>
        <div className="flex flex-col gap-3 pc:gap-4">
          <label htmlFor="" className="text-h5 pc:text-h4">都道府県</label>
          <p className="pc:text-body_pc text-timestamp">{prefecture}</p>
        </div>
        <form className="" onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-10 m-auto">
            <div className="flex flex-col gap-3 pc:gap-4">
              <label className="block pc:text-h4 text-h5">ログインメールアドレス</label>
              <FormField
                control={control}
                input={{
                  name: "email",
                  status: InputStatus.DEFAULT,
                }}
                attention={{ text: "" }}
                error={errors.email ? errors.email.message : emailError}
              />
            </div>
            <div className="flex flex-col gap-3 pc:gap-4">
              <label className="block pc:text-h4 text-h5">パスワード変更</label>
              <div className="flex flex-col gap-3 py-5 pc:gap-4">
                <div className="hidden">
                  <LabelSub text="パスワード" />
                  <FormField
                    control={control}
                    input={{
                      name: "fakePassword",
                      status: InputStatus.PASSWORD,
                    }}
                    attention={{ text: "" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <LabelSub text="現在のパスワード" />
                  <FormField
                    control={control}
                    input={{
                      name: "oldPassword",
                      status: InputStatus.PASSWORD,
                    }}
                    attention={{ text: "" }}
                    error={errors.oldPassword ? errors.oldPassword.message : oldPasswordError}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <LabelSub text="新しいパスワード" />
                  <FormField
                    control={control}
                    input={{
                      name: "password",
                      status: InputStatus.PASSWORD,
                    }}
                    attention={{ text: "英数字8文字以上で入力してください" }}
                    error={errors.password ? errors.password.message : passwordError}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <LabelSub text="パスワードの確認" />
                  <FormField
                    control={control}
                    input={{
                      name: "confirmPassword",
                      status: InputStatus.PASSWORD,
                    }}
                    attention={{ text: "もう一度同じパスワードを入力してください" }}
                    error={errors.confirmPassword ? errors.confirmPassword.message : confirmPasswordError}
                  />
                </div>
              </div>
            </div>
            <Button
              disabled={!isDirty || Object.keys(errors).length > 0 || isLoading}
              text={isLoading ? <ClipLoader size={"1.5em"} color="inherit" /> : "送信する"}
              type="submit"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              onclick={(e) => e.stopPropagation}
              className="pc:w-[184px] w-[160px] pc:py-[16.5px] py-3 mx-auto"
            />
            <button className="underline text-core-blue text-body_sp" onClick={() => logout()}>
              ログアウト
            </button>
          </div>
        </form>
      </div>
      <PCFooter className="bg-gray-white" />
    </div>
  );
};