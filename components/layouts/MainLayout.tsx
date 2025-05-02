'use client'

import {
  IconType,
  SelectNotice,
  SelectSize,
  SelectStatus,
} from '@/components/atoms'
import {
  CoordinatorHeader,
  Sidebar,
  SidebarProps,
} from '@/components/organisms'
import { useState, useEffect } from 'react'
import { useRecoilValue } from "recoil";
import { authUserState } from '@/recoil/atom/auth/authUserAtom';
import Layout from './Layout'
import { Transition } from '@headlessui/react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { getDoc } from 'firebase/firestore';
import { DocRef } from '@/libs/firebase/firestore';

export default function MainLayout({
  children,
  setCurrentPage,
}: {
  children: React.ReactNode
  setCurrentPage?: (href: string) => void
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const router = useRouter()

  const [activeItem, setActiveItem] = useState({
    group: 0,
    item: 1,
    option: -1,
  })

  const authUser = useRecoilValue(authUserState)
  const organizationName = authUser.organizationName
  const organizationType = authUser.organizationType
  const groups = {
    activeItem: activeItem,
    setActiveItem: setActiveItem,
    groups: [
      {
        isShowItems: organizationType !== '公的機関',
        items: [
          {
            item: {
              text: organizationName,
              options: [
                { text: '○○市', href: '#1' },
                { text: 'その他', href: '#12' },
                { text: 'その他 : ○○中学校', href: '#13' },
                { text: 'その他 : ○○中学校', href: '#14' },
                { text: 'その他 : ○○中学校', href: '#15' },
                { text: 'その他 : ○○中学校', href: '#16' },
              ],
            },
          },
        ],
      },
      {
        isShowItems: true,
        label: '指導者募集',
        items: [
          {
            item: {
              text: '募集中',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.CAMPAIGN,
              href: '/projects',
            },
          },
          {
            item: {
              text: '準備中',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.EDIT_NOTE,
              href: '/projects/prepare',
            },
          },
          {
            item: {
              text: '終了',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.LIBRARY_ADD_CHECK,
              href: '/projects/finish',
            },
          },
          {
            item: {
              text: '新規募集',
              onclick: () => {
                router.push('/projects/create')
              },
            },
          },
        ],
      },
      {
        isShowItems: true,
        label: 'イベント募集',
        items: [
          {
            item: {
              text: '募集中',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.CAMPAIGN,
              href: '/events',
            },
          },
          {
            item: {
              text: '準備中',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.EDIT_NOTE,
              href: '/events/prepare',
            },
          },
          {
            item: {
              text: '終了',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.LIBRARY_ADD_CHECK,
              href: '/events/finish',
            },
          },
          {
            item: {
              text: '新規募集',
              onclick: () => {
                router.push('/events/create')
              },
            },
          },
        ],
      },
      {
        isShowItems: true,
        items: [
          {
            item: {
              text: '登録者',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.GROUPS,
              href: '/users',
            },
          },
        ],
      },
      {
        isShowItems: true,
        items: [
          {
            item: {
              text: 'メッセージ',
              status: SelectStatus.OFF,
              notice: SelectNotice.OFF,
              size: SelectSize.DEFAULT,
              icon: IconType.QUESTION_ANSWER,
              href: '/messages',
            },
          },
        ],
      },
    ],
  }


  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <CoordinatorHeader />
        <div className="relative flex flex-grow mt-[64px]">
          {!isSidebarOpen && (
            <div className="absolute pc:hidden top-2 left-2">
              <button
                type="button"
                onClick={toggleSidebar}
                className="text-[30px]"
              >
                <BiMenuAltLeft />
              </button>
            </div>
          )}
          <div className="hidden pc:flex">
            <Sidebar
              groups={groups.groups}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {children}
          {/* Sidebar on small screens */}
          <Transition
            show={isSidebarOpen}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 z-40 flex">
              <div className="flex">
                <Sidebar
                  groups={groups.groups}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  setCurrentPage={setCurrentPage}
                />
              </div>
              <div
                className="flex flex-auto bg-gray-800 opacity-50"
                onClick={toggleSidebar}
              ></div>
            </div>
          </Transition>
        </div>
      </div>
    </Layout>
  )
}
