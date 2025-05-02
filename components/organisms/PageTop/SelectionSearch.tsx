'use client'

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import Loading from "@/components/layouts/loading";
import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup";
import Input from "@/components/molecules/Input/Input";

import { projectSelectionAtom, projectSelectionPaginationAtom } from "@/recoil/atom/projectSelectionAtom";
import { LeaderProject } from "@/features/projects/shared/types";

interface ThisProps {
  caption: string
  project: LeaderProject
  statusTabIndex: { status: string, tabIndex: number }
}

interface FormValues {
  keyword: string;
  isOnly: string;
  isDecline: string;
}

export const SelectionSearch = ({ caption, project, statusTabIndex }: ThisProps) => {

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
      isOnly: '',
      isDecline: '',
    },
  });
  const { control, watch, handleSubmit } = methods;
  const keyword = watch("keyword");
  const isOnly = watch("isOnly");
  const isDecline = watch("isDecline");

  const [isLoading, setIsLoading] = useState(false);
  const [_, setSelectionList] = useRecoilState(projectSelectionAtom);
  const paginationData = useRecoilValue(projectSelectionPaginationAtom);
  const [displayCnt, setDisplayCnt] = useState(0);

  useEffect(() => {
    setDisplayCnt(Math.min(paginationData.numberOfSelections - paginationData.currentPage * paginationData.pageSize, paginationData.pageSize));
  }, [paginationData])


  useEffect(() => {
    if (statusTabIndex.status === "inpreparation") return
    const fetchProject = async ({ keyword, isOnly, isDecline }: {
      keyword: string | undefined,
      isOnly: string | undefined,
      isDecline: string | undefined,
    }) => {
      setIsLoading(true);

      // fetch data from leaderscoutlist of Elastic Search Engine
      const result = await axios.post(`/api/projects/selection/search?organization=${keyword}&isOnly=${isOnly}&isDecline=${isDecline}&projectId=${project.id}`);
      setSelectionList(result.data);

      setIsLoading(false);
    }

    fetchProject({ keyword, isOnly, isDecline });
  }, [keyword, isOnly, isDecline, setSelectionList]);

  const onSubmit = async (data: FormValues) => {
    if (statusTabIndex.status === "inpreparation") return
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-center gap-3 pc:gap-5">
          <div className="text-h5 pc:text-h1 text-gray-black">{caption}</div>
          <div className="flex items-end gap-1 text-core-blue">
            <h2 className="leading-none text-h2">{displayCnt}</h2>
            <span className="text-small">名</span>
          </div>
          <Input
            className="w-[180px] pc:w-[200px]"
            control={control}
            name="keyword"
            type="searchbox"
            placeholder="キーワードで検索"
            onChange={handleSubmit(onSubmit)}
          />
          <CheckBoxGroup
            name="isOnly"
            className="bg-transparent"
            options={[
              { label: 'メッセージ未読のみ', value: 'isUnreadMessagesOnly' }
            ]}
            isSmall
            onChange={handleSubmit(onSubmit)}
          />
          <div className="hidden pc:block w-[1px] h-[24px] bg-gray-gray">
          </div>
          <CheckBoxGroup
            name="isDecline"
            className="bg-transparent"
            options={[
              { label: '不採用・辞退も表示', value: 'isShowRejectionAndDecline' },
            ]}
            isSmall
            onChange={handleSubmit(onSubmit)}
          />
        </div>
      </form>
      {isLoading && <Loading />}
    </FormProvider>
  );
};