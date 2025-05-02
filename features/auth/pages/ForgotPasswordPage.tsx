'use client'

import ClipLoader from "react-spinners/ClipLoader";

import { InputStatus } from "@/components/atoms";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules";
import { FormProvider } from "react-hook-form";
import { useForgotPasswordProvider } from "../providers/useForgotPasswordProvider";

function ForgotPasswordPage() {
  
  const {
    methods,
    isLoading,
    errorEmail,
    onSubmit,
  } = useForgotPasswordProvider();
  
  const { control, handleSubmit, formState: { errors, isDirty } } = methods;

  return (
    <div className="border pc:w-[480px] w-[90%] pc:max-w-full max-w-[400px] mx-auto py-10 bg-gray-gray_lighter border-gray-gray rounded-[10px] inline-flex items-center flex-col">
      <h1 className="pc:text-h1 text-h2 text-gray-black">パスワード再設定</h1>
      <p className="text-center pc:mt-10 mt-7 pc:text-body_pc text-timestamp text-gray-black">
        パスワード再設定のご案内をお送りいたします<br />
        ご登録のメールアドレスを入力してください
      </p>
      <FormProvider {...methods}>
        <form className="pc:mt-10 mt-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="pc:w-[279px] w-[240px] m-auto">
            <label className="block mb-2 pc:text-h3 text-h4 text-gray-black">メールアドレス</label>
            <FormField
              control={control}
              input={{
                name: "email",
                status: InputStatus.DEFAULT,
              }}
              attention={{text: ""}}
              error={errors.email ? errors.email.message : errorEmail}
            />
            <Button
              disabled={!isDirty || Object.keys(errors).length > 0 || isLoading}
              text={isLoading ? <ClipLoader size={"1.5em"} color="inherit" /> : "送信する"}
              type="submit"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              onclick={(e) => e.stopPropagation}
              className="pc:w-[184px] w-[160px] pc:py-[16.5px] py-3 pc:mt-10 mt-7 mx-auto"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ForgotPasswordPage;