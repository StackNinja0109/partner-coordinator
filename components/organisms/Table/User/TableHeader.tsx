'use client'

import {SortInterface} from './Table'
import { MdUnfoldMore } from 'react-icons/md';
import Image from "next/image";
import { useRecoilValue } from 'recoil';
import { authUserState } from '@/recoil/atom/auth/authUserAtom';

interface TableHeaderProps{
  currentSort: SortInterface;
  setCurrentSort: (sort: SortInterface) => void;
}

interface TableHeaderLabelProps{
  label: string;
  sortName: SortInterface['name'];
  currentSort: SortInterface;
  onClick?: (sortName: SortInterface['name']) => void;
}

const TableHeaderLabel = ({label, sortName, currentSort, onClick} : TableHeaderLabelProps) =>{

  const handleClick = () =>{
    if(onClick){
      onClick(sortName)
    }
  }

  return(
    <div className="flex items-center gap-1 p-1 cursor-pointer" onClick={handleClick}>
      <span>{label}</span>
      {currentSort.name === sortName && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
      {currentSort.name === sortName && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
      {currentSort.name === sortName && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
      {currentSort.name !== sortName && <MdUnfoldMore size={16} /> }
    </div>
  )
}

const TableHeader = ({currentSort, setCurrentSort} :  TableHeaderProps) =>{

  const handleClick = (sort_name: SortInterface['name']) =>{
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
          <TableHeaderLabel  label={organizationType === '公的機関' ? '氏名' : 'No'} sortName="id" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th>
          <TableHeaderLabel  label='種目' sortName="club" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th>
          <TableHeaderLabel  label='年齢' sortName="age" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th>
          <TableHeaderLabel  label='性別' sortName="gender" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th className='px-1 pc:px-3'>          
          <div className="flex items-center">
            <span>職業</span>
          </div>
        </th>
        <th className='px-1 pc:px-3'>          
          <div className="flex items-center">
            <span>所属</span>
          </div>
        </th>
        <th>
          <TableHeaderLabel  label='登録日' sortName="createdAt" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th>
          <TableHeaderLabel  label='プロフィール最終更新' sortName="updatedAt" currentSort={currentSort} onClick={handleClick}   />
        </th>
      </tr>
    </thead>
  )
}

export default TableHeader