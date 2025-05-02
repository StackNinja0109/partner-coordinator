'use client'

import { FormProvider } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

import { InputStatus } from "@/components/atoms";
import Button, { ButtonColor, ButtonShape } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules";
import { useResetPasswordProvider } from "../providers/useResetPasswordProvider";

function ResetPasswordPage () {
  
  const {
    methods,
    isLoading,
    errorPassword,
    confirmErrorPassword,
    onSubmit,
  } = useResetPasswordProvider();

  const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = methods;

  return (
    <div className="border pc:w-[480px] w-[90%] pc:max-w-full max-w-[400px] mx-auto py-10 bg-gray-gray_lighter border-gray-gray rounded-[10px] inline-flex items-center flex-col">
      <h1 className="pc:text-h1 text-h2 text-gray-black">パスワード再設定</h1>
      <FormProvider {...methods}>
        <form className="mt-7 pc:mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="pc:w-[279px] w-[240px] m-auto">
            <label className="block mb-2 pc:text-h3 text-h4 text-gray-black">新しいパスワード</label>
            <FormField
              control={control}
              input={{
                name: "password",
                status: InputStatus.PASSWORD,
              }}
              attention={{text: ""}}
              error={errors.password ? errors.password.message : errorPassword}
            />
            <label className="block mt-[14px] mb-2 pc:text-h3 text-h4 text-gray-black">パスワードの確認</label>
            <FormField
              control={control}
              input={{
                name: "confirmPassword",
                status: InputStatus.PASSWORD,
              }}
              attention={{text: ""}}
              error={errors.confirmPassword ? errors.confirmPassword.message : confirmErrorPassword}
            />
            <Button
              disabled={!isDirty || Object.keys(errors).length > 0 || !dirtyFields.password || !dirtyFields.confirmPassword || isLoading}
              text={isLoading ? <ClipLoader size={"1.5em"} color="inherit" /> : "設定する"}
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

};

export default ResetPasswordPage;
