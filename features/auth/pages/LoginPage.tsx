'use client'

import Link from "next/link";

import { InputStatus } from "@/components/atoms";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules";
import { useAuthUserStateProvider } from '../providers/useAuthProvider';
import { FormProvider } from "react-hook-form";

function LoginPage() {

  const {
    methods,
    errorEmail,
    errorPassword,
    handleLogin,
  } = useAuthUserStateProvider();

  const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = methods;

  return (
    <div className="flex items-center flex-grow bg-gray-white">
      <div className="border pc:w-[480px] w-[90%] pc:max-w-full max-w-[400px] mx-auto py-10 bg-gray-gray_lighter border-gray-gray rounded-[10px] inline-flex items-center flex-col">
        <h1 className="pc:text-h1 text-h2 text-gray-black">ログイン</h1>
        <FormProvider {...methods}>
          <form className="mt-7 pc:mt-10" onSubmit={handleSubmit(handleLogin)}>
            <div className="pc:w-[279px] w-[240px] m-auto">
              <label className="block mb-2 pc:text-h3 text-h4 text-gray-black">メールアドレス</label>
              <FormField
                control={control}
                input={{
                  name: "email",
                  status: InputStatus.DEFAULT,
                }}
                attention={{ text: "" }}
                error={errors.email ? errors.email.message : errorEmail}
              />
              <label className="block mt-4 mb-2 pc:text-h3 text-h4 text-gray-black">パスワード</label>
              <FormField
                control={control}
                input={{
                  name: "password",
                  status: InputStatus.PASSWORD,
                }}
                attention={{ text: "" }}
                error={errors.password ? errors.password.message : errorPassword}
              />
              <Button
                disabled={!isDirty || Object.keys(errors).length > 0 || !dirtyFields.email || !dirtyFields.password}
                text={"ログインする"}
                type="submit"
                color={ButtonColor.SUB}
                shape={ButtonShape.ELLIPSE}
                onclick={(e) => e.stopPropagation}
                className="pc:w-[216px] w-[180px] pc:py-[16.5px] py-3 pc:mt-10 mt-7 mx-auto"
              />
              <p className="text-center pc:mt-10 mt-7">
                <Link href="/forgot-password" className="underline text-timestamp text-core-blue">
                  パスワードをお忘れの方はこちら
                </Link>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default LoginPage;