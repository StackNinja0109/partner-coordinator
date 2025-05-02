'use client'

import CheckBox from './CheckBox'
import { SelectionSort } from './SelectionDataTable'
import { MdUnfoldMore } from 'react-icons/md'
import Image from "next/image";

interface SelectionDataTableHeaderProps{
  checkAll: boolean
  setCheckAll: (check: boolean) => void
  currentSort: SelectionSort
  setCurrentSort: (sort: SelectionSort) => void
}

const SelectionDataTableHeader = ({checkAll, setCheckAll, currentSort, setCurrentSort} :  SelectionDataTableHeaderProps) =>{
  const handleClick = (sort_name: SelectionSort['name']) => {
    if(currentSort.name === sort_name){
      setCurrentSort({
        name: sort_name,
        direction: currentSort.direction === "down" ? "up" : "down"
      })
    } else{
      setCurrentSort({
        name: sort_name,
        direction: "down"
      })
    }
  }
  
  return(
    <thead className="">
      <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-gray_dark">
        <th>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("name")}>
            <span>氏名</span>
            {currentSort.name === "name" && currentSort.direction === "up" && <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "name" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "name" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "name" && <MdUnfoldMore size={16} /> }
            
          </div>
        </th>
        <th className=''>
          <div className="flex items-center">
            <span></span>
          </div>
        </th>
        <th className=''>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("age")}>
            <span>年齢</span>
            {currentSort.name === "age" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "age" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "age" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "age" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th className=''>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("gender")}>
            <span>性別</span>
            {currentSort.name === "gender" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "gender" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "gender" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "gender" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th className=''>
          <div className="flex items-center">
            <span>職業</span>
          </div>
        </th>
        <th>
          <div className="flex items-center">
            <span>所属</span>
          </div>
        </th>
        <th className=''>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("status")}>
            <span>ステータス</span>
            {currentSort.name === "status" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "status" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "status" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "status" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("interviewAt")}>
            <span>面接日時</span>
            {currentSort.name === "interviewAt" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "interviewAt" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "interviewAt" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "interviewAt" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th>
          <div className="flex items-center cursor-pointer" onClick={() => handleClick("lastMessageAt")}>
            <span>最終メッセージ</span>
            {currentSort.name === "lastMessageAt" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "lastMessageAt" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "lastMessageAt" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "lastMessageAt" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th>
          <div className="flex items-center">
            <span>メッセージ</span>
          </div>
        </th>
        <th className='' >
          <div className='flex items-center py-[18px]'>
            <CheckBox checked={checkAll} onChange={(checked) => setCheckAll(checked)} />
          </div>
        </th>
      </tr>
    </thead>
  )
}

export default SelectionDataTableHeader