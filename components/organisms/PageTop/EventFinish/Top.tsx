'use client'

import { useState, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useRecoilState } from "recoil"
import axios from "axios"

import Input from "@/components/molecules/Input/Input"
import { eventFinishListAtom } from "@/recoil/atom/events/eventFinishListAtom"

interface FormValues {
  keyword: string
}

export const Top = ({ caption }: { caption: string }) => {

  const methods = useForm<FormValues>({
    defaultValues: {
      keyword: '',
    },
    mode: 'onChange'
  })
  const { control, watch, handleSubmit } = methods
  const keyword = watch('keyword')

  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [_, setEventFinishList] = useRecoilState(eventFinishListAtom)
  
  useEffect(() => {

    const fetchProject = async ({
      keyword,
    } : {
      keyword: string | undefined,
    }) => {
 
      setIsLoading(true)
      
      const result = await axios.post(`/api/events/finish/search?q=${keyword}`)
      setEventFinishList(result.data)
      setCount(result.data.length)

      setIsLoading(false)
    }

    fetchProject({keyword})
  }, [keyword, setIsLoading, setEventFinishList])

  const onSubmit = async (data: FormValues) => {
    const { keyword } = data
    setIsLoading(true)
    
    const result = await axios.post(`/api/events/finish/search?q=${keyword}`)
    setEventFinishList(result.data)
    setCount(result.data.length)
    
    setIsLoading(false)
  }

  return (
    <FormProvider {...methods}>
      <form onChange={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-5 pt-[31.5px] pb-1">
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
        </div>
      </form>
    </FormProvider>
  )
}