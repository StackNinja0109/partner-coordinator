'use client'

import { Control, FormProvider, useForm } from "react-hook-form"

import { useState, useEffect } from "react"
import Input from "@/components/molecules/Input/Input"
import { useRecoilState } from "recoil"
import { eventListAtom } from "@/recoil/atom/events/eventListAtom"
import { CheckBoxGroup } from "@/components/molecules/Input/CheckBoxGroup"
import axios from "axios"
import Loading from "@/components/layouts/loading"

interface FormValues {
  keyword: string
  isShowRequiredOption: string[],
}

export const Top = ({ caption }: { caption: string }) => {

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
      isShowRequiredOption: [],
    },
    mode: 'onChange'
  })
  const { control, watch, handleSubmit } = methods
  const keyword = watch('keyword')
  const isShowRequiredOption = watch('isShowRequiredOption')

  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [_, setEventList] = useRecoilState(eventListAtom)

  useEffect(() => {
    const fetchProject = async ({
      keyword, isShowRequiredOption,
    }: {
      keyword: string | undefined,
      isShowRequiredOption: string[],
    }) => {
      setIsLoading(true)
      const result = await axios.post(`/api/events/event/search?q=${keyword}&isOnly=${isShowRequiredOption}`)
      setEventList(result.data)
      setCount(result.data.length)
      setIsLoading(false)
    }

    fetchProject({ keyword, isShowRequiredOption })
  }, [keyword, isShowRequiredOption, setIsLoading, setEventList])

  const onSubmit = async (data: FormValues) => {
    const { keyword, isShowRequiredOption } = data
    setIsLoading(true)
    const result = await axios.post(`/api/events/event/search?q=${keyword}&isOnly=${isShowRequiredOption}`)
    setEventList(result.data)
    setCount(result.data.length)
    setIsLoading(false)
  }

  return (
    <FormProvider {...methods}>
      { isLoading && <Loading /> }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 px-[10px] pt-[31.5px] pb-1">
          <div className="text-h1 text-gray-black">{caption}</div>
          <div className="flex gap-1">
            <div className="text-h2 text-core-blue">{count}</div>
            <div className="flex flex-col gap-[10px] pb-[3px]">
              <div></div>
              <div className="text-small text-core-blue">件</div>
            </div>
          </div>
          <Input
            control={control}
            name="keyword"
            type="searchbox"
            placeholder="キーワードで検索"
          />
          <CheckBoxGroup
            className="bg-gray-gray_lighter"
            name="isShowRequiredOption"
            options={[
              { label: '要対応のみ', value: 'isShowRequiredOption' }
            ]}
            onChange={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  )
}