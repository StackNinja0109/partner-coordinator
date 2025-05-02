'use client'

import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface CheckBoxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckBox = ({checked, onChange} : CheckBoxProps) => {


  if(checked){
    return <MdCheckBox className="text-[26.68px]  text-[#55B9F8] cursor-pointer" onClick={() => onChange(!checked)} />
  }else{
    return <MdCheckBoxOutlineBlank className="text-[26.68px] text-gray-gray_dark cursor-pointer" onClick={() => onChange(!checked)}/>
  }

}

export default CheckBox