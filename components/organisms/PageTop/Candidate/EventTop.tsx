'use client'

import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { MdSearch } from "react-icons/md";

import Input from "@/components/molecules/Input/Input";
import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup";
import { EventProject } from "@/features/events/shared/types";
import Loading from "@/components/layouts/loading";
import { eventCandidatePaginationAtom, eventCandidateAtom } from "@/recoil/atom/events/eventCandidateAtom";

interface ThisProps {
  caption: string
  event: EventProject
  statusTabIndex: { status: string, tabIndex: number }
}

export interface FormValues {
  keyword: string;
  isOnly: string;
  isShowNG: string;
  desiredGender: string;
  desiredAge: string;
  desiredQualifications: string;
  other: string;
}

export const EventTop = ({ caption, event, statusTabIndex }: ThisProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
      isOnly: '',
      isShowNG: '',
      desiredGender: '',
      desiredAge: '',
      desiredQualifications: '',
      other: '',
    }
  });

  const { control, watch, handleSubmit } = methods;
  const keyword = watch('keyword');
  const isOnly = watch('isOnly');
  const isShowNG = watch('isShowNG');
  const desiredGender = watch('desiredGender');
  const desiredAge = watch('desiredAge');
  const desiredQualifications = watch('desiredQualifications');
  const other = watch('other');

  const [isShowSearch, setIsShowSearch] = useState(false);
  const handleClickSearch = () => {
    setIsShowSearch(!isShowSearch);
  }

  const [count, setCount] = useState(0);
  const [_, setCandidateList] = useRecoilState(eventCandidateAtom)
  const paginationData = useRecoilValue(eventCandidatePaginationAtom);
  const [displayCnt, setDisplayCnt] = useState(0);

  useEffect(() => {
    if (statusTabIndex.status === "inpreparation") return
    setDisplayCnt(Math.min(paginationData.numberOfCandidates - paginationData.currentPage * paginationData.pageSize, paginationData.pageSize));
  }, [paginationData])

  useEffect(() => {
    if (statusTabIndex.status === "inpreparation") return
    const fetchProject = async ({
      keyword, isOnly, isShowNG, desiredGender, 
      desiredAge, desiredQualifications, other
    }: {
      keyword: string | undefined,
      isOnly: string | undefined,
      isShowNG: string | undefined,
      desiredGender: string | undefined,
      desiredAge: string | undefined,
      desiredQualifications: string | undefined,
      other: string | undefined,
    }) => {
      setIsLoading(true);

      // fetch data from leaderscandidates of Elastic Search Engine
      const result = await axios.post(`/api/events/candidate/search?organization=${keyword}&isOnly=${isOnly}&isShowNG=${isShowNG}&desiredGender=${desiredGender}&desiredAge=${desiredAge}&desiredQualifications=${desiredQualifications}&other=${other}&eventId=${event.id}`);
      setCandidateList(result.data);
      setCount(result.data.length);

      setIsLoading(false);
    }

    fetchProject({ keyword, isOnly, isShowNG, desiredGender, 
      desiredAge, desiredQualifications, other });
  }, [keyword, isOnly, isShowNG, desiredGender, desiredAge, desiredQualifications, other, setCandidateList]);

  const onSubmit = async (data: FormValues) => {

  };

  return (
    <FormProvider {...methods}>
      { isLoading && <Loading /> }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-center gap-3 pc:gap-5">
          <div className="text-h5 pc:text-h1 text-gray-black">{caption}</div>
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
            isBg={false}
            options={[
              { label: 'スカウト未送信のみ', value: 'isScoutUnsentOnly' },
              { label: 'メッセージ未読のみ', value: 'isUnreadMessagesOnly' }
            ]}
            isSmall
            onChange={handleSubmit(onSubmit)}
          />
          <div className="hidden pc:block w-[1px] h-[24px] bg-gray-gray">
          </div>
          <CheckBoxGroup
            name="isShowNG"
            className="bg-transparent"
            isBg={false}
            options={[
              { label: '興味なし・NGも表示', value: 'isShowNG' },
            ]}
            isSmall
            onChange={handleSubmit(onSubmit)}
          />
        </div>
        <div>
          <div className="flex flex-wrap items-end gap-3 pc:gap-5 p-[10px] text-small mt-5">
            <div className="flex items-end gap-1 text-core-blue">
              <span className="leading-none text-h2">{displayCnt}</span>
              <span>名</span>
              <span>(総候補者数 : {count}名)</span>
            </div>
            <span>候補選出条件</span>
            <span>種目 : { event.schoolName }</span>
            <span>指導可能地域 : {event.workplace.prefecture}{event.workplace.city}{event.workplace.address1}</span>
            <button
              type="button"
              className="inline-flex gap-1 border-b text-core-blue text-small border-core-blue"
              onClick={handleClickSearch}
            >
              <MdSearch size={18} />
              絞り込み
            </button>
          </div>
          {isShowSearch && (
            <div className="flex flex-col gap-2 pc:gap-0 bg-gray-gray_light rounded-[10px] px-5 pc:px-[30px] py-[10px]">
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>性別 :</span>
                <CheckBoxGroup
                  name="desiredGender"
                  className="bg-transparent"
                  isBg={false}
                  options={[
                    { label: '男性', value: '男' },
                    { label: '女性', value: '女' },
                    { label: '無回答', value: '無回答' },
                  ]}
                  isSmall
                  noPadding
                  onChange={handleSubmit(onSubmit)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>年齢 :</span>
                <CheckBoxGroup
                  name="desiredAge"
                  className="bg-transparent"
                  isBg={false}
                  options={[
                    { label: '10代', value: '10' },
                    { label: '20代', value: '20' },
                    { label: '30代', value: '30' },
                    { label: '40代', value: '40' },
                    { label: '50代', value: '50' },
                    { label: '60代～', value: '60' },
                  ]}
                  isSmall
                  noPadding
                  onChange={handleSubmit(onSubmit)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>資格 :</span>
                <CheckBoxGroup
                  name="desiredQualifications"
                  className="bg-transparent"
                  isBg={false}
                  options={[
                    { label: '教員免許あり', value: 'teacherLicenseStatus' },
                    { label: '教員免許取得予定', value: 'teacherLicenseNote' },
                    { label: '教員免許以外の指導者資格あり', value: 'otherLicense' },
                    { label: '自動車運転免許あり', value: 'hasDriverLicense' },
                  ]}
                  isSmall
                  noPadding
                  onChange={handleSubmit(onSubmit)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>その他 :</span>
                <CheckBoxGroup
                  name="other"
                  className="bg-transparent"
                  isBg={false}
                  options={[
                    { label: '大会・合宿遠征同行可・要相談', value: 'isExpeditionPossible' },
                    { label: '指導経験あり', value: 'experience' },
                  ]}
                  isSmall
                  noPadding
                  onChange={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          )}
        </div>
      </form>  
    </FormProvider>
  );
};