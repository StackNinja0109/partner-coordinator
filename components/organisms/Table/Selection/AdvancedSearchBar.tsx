'use client'

import { useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import {  MdSearch } from "react-icons/md";
import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup";

export interface FormValues {
  desiredGender: string;
  desiredAge: string;
  desiredQualifications: string;
  other: string;
}

interface SearchResultItem{
  total: number
  selection: number
}

interface AdvancedSearchBarProps{
  methodsSearch: UseFormReturn<FormValues>
  onSubmitSearch: (data: FormValues) => void
  result: SearchResultItem
}

const AdvancedSearchBar = ({methodsSearch, onSubmitSearch, result} : AdvancedSearchBarProps) =>{

  const [isShowSearch, setIsShowSearch] = useState(false);

  const handleClickSearch = () => {
    setIsShowSearch(!isShowSearch);
  }



  return(
    <div>
      <div className="flex flex-wrap items-end gap-3 pc:gap-5 p-[10px] text-small mt-5">
        <div className="flex items-end gap-1 text-core-blue">
          <span className="leading-none text-h2">{result.selection}</span>
          <span>名</span>
          <span>(総候補者数 : {result.total}名)</span>
        </div>
        <span>候補選出条件</span>
        <span>種目 : サッカー</span>
        <span>指導可能地域 : 山梨県甲府市大和町</span>
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
        <FormProvider {...methodsSearch}>
          <form onSubmit={methodsSearch.handleSubmit(onSubmitSearch)}>
            <div className="flex flex-col bg-gray-gray_light gap-2 pc:gap-0 rounded-[10px] px-5 pc:px-[30px] py-[10px]">
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>性別 :</span>
                <CheckBoxGroup
                  name="desiredGender"
                  className="bg-transparent"
                  options={[
                    { label: '男性', value: 'male' },
                    { label: '女性', value: 'female' },
                    { label: '無回答', value: 'noanswer' },
                  ]}
                  isSmall
                  noPadding
                  onChange={methodsSearch.handleSubmit(onSubmitSearch)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>年齢 :</span>
                <CheckBoxGroup
                  name="desiredAge"
                  className="bg-transparent"
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
                  onChange={methodsSearch.handleSubmit(onSubmitSearch)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>資格 :</span>
                <CheckBoxGroup
                  name="desiredQualifications"
                  className="bg-transparent"
                  options={[
                    { label: '教員免許あり', value: '教員免許あり' },
                    { label: '教員免許取得予定', value: '教員免許取得予定' },
                    { label: '教員免許以外の指導者資格あり', value: '教員免許以外の指導者資格あり' },
                    { label: '自動車運転免許あり', value: '自動車運転免許あり' },
                  ]}
                  isSmall
                  noPadding
                  onChange={methodsSearch.handleSubmit(onSubmitSearch)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-[10px] text-small font-bold">
                <span>その他 :</span>
                <CheckBoxGroup
                  name="other"
                  className="bg-transparent"
                  options={[
                    { label: '大会・合宿遠征同行可・要相談', value: '大会・合宿遠征同行可・要相談' },
                    { label: '指導経験あり', value: '指導経験あり' },
                  ]}
                  isSmall
                  noPadding
                  onChange={methodsSearch.handleSubmit(onSubmitSearch)}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default AdvancedSearchBar