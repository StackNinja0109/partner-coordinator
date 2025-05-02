'use client'

import { IoMdPerson } from "react-icons/io"

interface CandidacyProps {
  status: boolean
}

const Candidacy: React.FC<CandidacyProps> = ({ status }) => {
  return (
    <div className={`text-[18px] ${status ? 'text-core-sky' : 'text-gray-gray'}`}>
      <IoMdPerson />
    </div>
  )
}

export default Candidacy