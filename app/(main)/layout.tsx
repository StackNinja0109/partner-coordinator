'use client'

import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc } from 'firebase/firestore';
import { DocRef } from '@/libs/firebase/firestore';

import { auth } from '@/libs/firebase/firebase'
import Loading from '../loading'
import { authUserState } from '@/recoil/atom/auth/authUserAtom'
import { CoordinatorHeader } from '@/components/organisms'

const Auth = ({ children }: { children: React.ReactNode }) => {

  const [_, setAuthUser] = useRecoilState(authUserState)
  const [isLoading, setIsLoading] = useState(true)
  // console.log(auth.currentUser)

  useEffect(() => {
    const authUserChangedFunction = new Promise((resolve) => {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          const authUserId = user.uid
          const fetchCoordinator = async () => {
            const coordinatorDocRef = DocRef.coordinators(authUserId)
            const coordinatorDoc = await getDoc(coordinatorDocRef)
            const coordinatorObject = coordinatorDoc.data()
            const coordinatorOrganizationTypeId = coordinatorObject.organizationType
            const prefecturesId = coordinatorObject.prefectures

            const organizationTypeDocRef = DocRef.organizationType(coordinatorOrganizationTypeId)
            const organizationTypeDoc = await getDoc(organizationTypeDocRef)
            const organizationTypeObject = organizationTypeDoc.data()

            const prefecturesDocRef = DocRef.prefectures(prefecturesId)
            const prefecturesDoc = await getDoc(prefecturesDocRef)
            const prefectureObject = prefecturesDoc.data()
            setAuthUser({
              user: user,
              prefecture: prefectureObject?.prefecture || '',
              organizationName: coordinatorObject?.organizationName || '',
              organizationType: organizationTypeObject?.name || '',
            })
          }
          fetchCoordinator()
        } else {
          setAuthUser({
            user: null,
            prefecture: '',
            organizationName: '',
            organizationType: '',
          })
        }
        setIsLoading(false)
        resolve(user)
      })
    })

    setIsLoading(true)
    authUserChangedFunction.finally(() => {
      setIsLoading(false)
    })
  }, [setAuthUser])

  return (
    <>
      {isLoading ? <Loading /> : children}
    </>
  )
}

const Middleware = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
      if (user) {
        if (pathName === '/login') {
          router.push('/')
        }
      }
    })
  }, [pathName, router])
  return (
    <>
      {children}
    </>
  )
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const authUser = useRecoilValue(authUserState)

  return (
    <Auth>
      <Middleware>
        {authUser.user ? (
          <div className="flex flex-col h-screen overflow-hidden">
            <CoordinatorHeader />
            {children}
          </div>
        ) : <Loading />}
      </Middleware>
    </Auth>
  )
}
