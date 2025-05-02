'use client'

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { MdSearch } from "react-icons/md";

import SelectBox, {ISelectOptionsProps} from "@/components/atoms/Input/SelectBox";
import Input from "@/components/molecules/Input/Input";
import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup";

import { usersListAtom } from "@/recoil/atom/usersListAtom";
import Loading from "@/components/layouts/loading";
import { authUserState } from "@/recoil/atom/auth/authUserAtom";

export interface FormValues {
  keyword: string;
  event: {label: string, value: string};
  desiredGender: string;
  desiredAge: string;
  desiredQualifications: string;
  other: string;
}

interface UserSearchBarProps {
  caption: string;
  eventOptions: ISelectOptionsProps[];
}

export const UserSearchBar = ({ 
  caption,
  eventOptions,
}: UserSearchBarProps) => {

  const [isShowSearch, setIsShowSearch] = useState(false);
  const handleClickSearch = () => {
    setIsShowSearch(!isShowSearch);
  }

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
      event: { value: '', label: 'すべての種目' },
      desiredGender: '',
      desiredAge: '',
      desiredQualifications: '',
      other: '',
    },
    mode: 'onChange'
  });

  const authUser = useRecoilValue(authUserState)
  const prefecture = authUser.prefecture
  const { control, watch, handleSubmit } = methods;
  const keyword = watch('keyword');
  const event = watch('event')['value'] || '';
  const desiredGender = watch('desiredGender');
  const desiredAge = watch('desiredAge');
  const desiredQualifications = watch('desiredQualifications');
  const other = watch('other');
  
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setUsersList] = useRecoilState(usersListAtom);

  useEffect(() => {
    const fetchProject = async ({
      keyword, event, desiredGender, desiredAge, 
      desiredQualifications, other
    } : {
      keyword: string | undefined,
      event: string | undefined,
      desiredGender: string | undefined,
      desiredAge: string | undefined,
      desiredQualifications: string | undefined,
      other: string | undefined,
    }) => {
      setIsLoading(true);

      const result = await axios.post('/api/users/search', {
        prefecture: prefecture || '',
        keyword: keyword || '',
        event: event || '',
        desiredGender: desiredGender || '',
        desiredAge: desiredAge || '',
        desiredQualifications: desiredQualifications || '',
        other: other || '',
      });
      setUsersList(result.data);
      setCount(result.data.length);

      setIsLoading(false);
    }

    fetchProject({keyword, event, desiredGender, desiredAge, desiredQualifications, other});
  }, [prefecture, keyword, event, desiredGender, desiredAge, desiredQualifications, other, setIsLoading, setUsersList]);

  const onSubmit = async (data: FormValues) => {
    
  }

  return (
    <FormProvider {...methods}>
      { isLoading && <Loading /> }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col py-[30px] gap-[10px] ${isShowSearch ? 'pb-0' : ''}`}>
          <div className="flex flex-wrap items-center gap-5">
            <div className="text-h3 pc:text-h1 text-gray-black">{caption}</div>
            <Input
              className="w-[200px] border-transparent"
              control={control}
              name="keyword"
              type="searchbox"
              placeholder="キーワードで検索"
              onChange={handleSubmit(onSubmit)}
            />
            <SelectBox
              control={control}
              name="event"
              className="w-[200px]"
              placeholder="すべての種目"
              options={eventOptions}
            />
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
            <div className="flex flex-col bg-gray-gray_light gap-2 pc:gap-0 rounded-[10px] px-5 pc:px-[30px] py-[10px]">
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
  )
}

export default UserSearchBar;