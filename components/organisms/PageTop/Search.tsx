'use client'

import React from "react";
import { Control, FormProvider, useForm } from "react-hook-form";

import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup";
import Input from "@/components/molecules/Input/Input";

import { useRecoilState } from "recoil";

export interface SearchProps {
  caption: string;
  control: Control<any>;
  eventOptions: { value: string; label: string }[];
  hasRequiredCheck?: boolean;
}

export const Search = ({
  caption,
}: SearchProps) => {

  interface FormValues {
    keyword: string;
    isShowRequiredOption: string;
  }

  // const [_, setCandidateKey] = useRecoilState(CandidateKey);

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
      isShowRequiredOption: '',
    },
  });

  const { control } = methods;

  const onSubmit = (data: FormValues) => {
    // setCandidateKey({ ..._, keyword: data.keyword });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-center gap-3 pc:gap-5">
          <div className="text-h5 pc:text-h1 text-gray-black">{caption}</div>
          <Input
            className="w-[180px] pc:w-[200px]"
            control={control}
            name="keyword"
            type="searchbox"
            placeholder="キーワードで検索"
            onChange={methods.handleSubmit(onSubmit)}
          />
          <CheckBoxGroup
            name="isOnly"
            className="bg-transparent"
            options={[
              { label: 'スカウト未送信のみ', value: 'isScoutUnsentOnly' },
              { label: 'メッセージ未読のみ', value: 'isUnreadMessagesOnly' }
            ]}
            isSmall
            onChange={methods.handleSubmit(onSubmit)}
          />
          <div className="hidden pc:block w-[1px] h-[24px] bg-gray-gray">
          </div>
          <CheckBoxGroup
            name="isShowNG"
            className="bg-transparent"
            options={[
              { label: '興味なし・NGも表示', value: 'isShowNG' },
            ]}
            isSmall
            onChange={methods.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  );
};