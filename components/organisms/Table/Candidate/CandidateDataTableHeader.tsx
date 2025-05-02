'use client'

import CheckBox from './CheckBox'
import { CandidateSort } from './CandidateDataTable'
import { MdUnfoldMore } from 'react-icons/md'
import Image from "next/image";
import { useRecoilValue } from 'recoil';
import { authUserState } from '@/recoil/atom/auth/authUserAtom';

interface CandidateDataTableHeaderProps{
  checkAll: boolean
  setCheckAll: (check: boolean) => void
  currentSort: CandidateSort
  setCurrentSort: (sort: CandidateSort) => void
}

const CandidateDataTableHeader = ({checkAll, setCheckAll, currentSort, setCurrentSort} :  CandidateDataTableHeaderProps) =>{

  const handleClick = (sort_name: CandidateSort['name']) => {
    if(currentSort.name === sort_name){
      setCurrentSort({
        name: sort_name,
        direction: currentSort.direction === "down" ? "up" : "down"
      })
    }else{
      setCurrentSort({
        name: sort_name,
        direction: "down"
      })
    }
  }

  const authUser = useRecoilValue(authUserState)
  const organizationType = authUser.organizationType
  
  return(
    <thead className="">
      <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-gray_dark">
        <th>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("userId")}>
            <span>{organizationType === '公的機関' ? '氏名' : 'No'}</span>
            {currentSort.name === "userId" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "userId" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "userId" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "userId" && <MdUnfoldMore size={16} /> }
            
          </div>
        </th>
        <th className=''>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("age")}>
            <span>年齢</span>
            {currentSort.name === "age" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "age" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "age" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "age" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th  className=''>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("gender")}>
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
        <th>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("candidateAt")}>
            <span>候補選出日</span>
            {currentSort.name === "candidateAt" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "candidateAt" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "candidateAt" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "candidateAt" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("status")}>
            <span>スカウト</span>
            {currentSort.name === "status" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "status" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "status" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "status" && <MdUnfoldMore size={16} /> }
          </div>
        </th>
        <th>
          <div className="flex items-center cursor-pointer" onClick={()=>handleClick("scoutAt")}>
            <span>スカウト送信日</span>
            {currentSort.name === "scoutAt" && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
            {currentSort.name === "scoutAt" && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
            {currentSort.name === "scoutAt" && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
            {currentSort.name !== "scoutAt" && <MdUnfoldMore size={16} /> }
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

export default CandidateDataTableHeader