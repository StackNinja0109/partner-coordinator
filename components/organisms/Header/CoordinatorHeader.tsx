'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from "recoil";
import { authUserState } from '@/recoil/atom/auth/authUserAtom';

import {
  MdSupervisorAccount,
  MdMarkEmailRead,
  MdHelp,
  MdArrowDropDown,
} from 'react-icons/md'
import Link from 'next/link'
import { logout } from '@/features/auth/providers/useAuthProvider'

export const CoordinatorHeader = () => {
  const system_name = 'スポーツ・カルチャー人材バンク'

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const authUser = useRecoilValue(authUserState)
  const organizationName = authUser.organizationName

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen((prevState) => !prevState)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectRef])

  return (
    <header
      id="header"
      className="fixed top-0 left-0 z-50 w-full flex flex-row items-center justify-between pc:px-10 px-[10px] pc:py-[14.5px] py-[22px] bg-core-blue_dark text-gray-white"
    >
      <Link href="/" className="pc:text-h1 text-small">
        <h1>{system_name}</h1>
      </Link>
      <div className="flex flex-row items-center gap-[10px] pc:gap-5 text-timestamp">
        <Link
          href="/account-info"
          className="flex flex-row items-center gap-1 hover:cursor-pointer"
        >
          <span className="pc:text-[12px] text-[20px]">
            <MdSupervisorAccount />
          </span>
          <div className="hidden pc:block">アカウント情報</div>
        </Link>
        <Link
          href="/notification-settings"
          className="flex flex-row items-center gap-1 hover:cursor-pointer"
        >
          <span className="pc:text-[12px] text-[20px]">
            <MdMarkEmailRead />
          </span>
          <div className="hidden pc:block">通知メール設定</div>
        </Link>
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
          <span className="pc:text-[12px] text-[20px]">
            <MdHelp />
          </span>
          <div className="hidden pc:block">ヘルプ</div>
        </div>
        <div className="relative" ref={selectRef}>
          <button
            className="flex flex-row items-center gap-1 hover:cursor-pointer pc:text-body_pc text-small"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span>{organizationName}</span>
            <span className="hidden pc:block">
              <MdArrowDropDown size={30} />
            </span>
          </button>
          {isMenuOpen && (
            <div
              className="absolute z-10 w-full mt-1 pc:mt-3 bg-core-blue_dark pc:text-timestamp text-mini"
              ref={optionsRef}
            >
              <div className="flex flex-col items-center justify-center h-full gap-2 py-2 pc:gap-3 pc:py-3">
                <div
                  className="flex flex-row items-center gap-1 hover:cursor-pointer"
                  onClick={() => {
                    logout()
                  }}
                >
                  <div>ログアウト</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
