'use client'

import { SortInterface } from './ProjectFinishTable'
import { MdUnfoldMore } from 'react-icons/md';
import Image from "next/image";

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
    <div className="flex items-center gap-1 px-3 cursor-pointer" onClick={handleClick}>
      <span>{label}</span>
      {currentSort.name === sortName && currentSort.direction === "up"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-asc.png" alt="" /></span> }
      {currentSort.name === sortName && currentSort.direction === "down"&& <span className='px-1'><Image width={8} height={13} src="/images/icons/sort-desc.png" alt="" /></span> }
      {currentSort.name === sortName && currentSort.direction === "none"&& <MdUnfoldMore size={16} /> }
      {currentSort.name !== sortName && <MdUnfoldMore size={16} /> }
    </div>
  )
}

const ProjectFinishTableHeader = ({currentSort, setCurrentSort} :  TableHeaderProps) =>{

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
  
  return(
    <thead className="">
      <tr className="border-b h-[55px] border-gray-gray_light text-timestamp text-gray-gray_dark">
        <th>
          <TableHeaderLabel label='学校・団体名' sortName="organizationName" currentSort={currentSort} onClick={handleClick}   />
        </th>
        <th>
          <TableHeaderLabel label='種目' sortName="eventName" currentSort={currentSort} onClick={handleClick} />
        </th>
        <th >
          <TableHeaderLabel label='性別' sortName="gender" currentSort={currentSort} onClick={handleClick} />
        </th>
        <th className=''>          
          <div className="flex items-center px-3">
            <span>採用状況</span>
          </div>
        </th>
        <th>
          <TableHeaderLabel  label='募集終了日' sortName="finishedAt" currentSort={currentSort} onClick={handleClick} />
        </th>
      </tr>
    </thead>
  )
}

export default ProjectFinishTableHeader