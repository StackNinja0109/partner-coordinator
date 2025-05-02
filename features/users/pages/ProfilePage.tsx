import axios from 'axios';
import { Tab, Transition } from '@headlessui/react'
import Link from 'next/link';
import TabList from "@/components/atoms/PageTop/TabList";
import Image from 'next/image'
import { Icon } from "@/components/atoms";
import { MdArrowForwardIos, MdDownload, MdMail, MdPhone } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import Schedule from "@/components/molecules/Table/Schedule";
import { BalloonColor, BalloonType } from "@/components/atoms/Message/Balloon";
import { HowToApply } from "@/components/atoms/Table/HowToApply";
import { Profile } from '../shared/types';
import { calculateAge, fromTimestampToString, formatBirthdayString } from "@/utils/convert";
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore";
import MsgText from "@/components/molecules/Message/MsgText";
import DateLabel from "@/components/atoms/Message/DateLabel";
import InputArea from "@/components/organisms/Message/InputArea";
import { Address } from '../shared/types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfilePdfPage from './ProfilePdfPage';
import { useEffect, useState } from 'react';
import { db, doc } from '@/libs/firebase/firebase';
import { collection } from '@/libs/firebase/firebase';
import MessageContent from '@/components/organisms/Message/MessageContent'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { getDoc } from 'firebase/firestore';
import { v4 } from 'uuid'

interface ThisProps {
  userId: string
  projectId?: string
  isProfilebarOpen: boolean
  handleToggleBar: () => void
  authority?: boolean
  setIsLoading: (isLoading: boolean) => void
}

const getClubsToStrings = async (docIds: string[]) => {
  let groupedClub = {};
  const fetchPromises = docIds.map(async docId => {
    try {
      let clubTypeCategoriesDoc = doc(db, 'clubTypeCategories', docId)
      let clubTypeCategoriesDocSnap = await getDoc(clubTypeCategoriesDoc)
      let clubTypeCategoriesObject = clubTypeCategoriesDocSnap.data();
      let largeCategoryId = clubTypeCategoriesObject.largeCategory;
      let mediumCategoryId = clubTypeCategoriesObject.mediumCategory;
      let clubCategoryName = clubTypeCategoriesObject.name;
      try {
        let clubTypeLargeCategoriesDoc = doc(db, 'clubTypeLargeCategories', largeCategoryId)
        let clubTypeLargeCategoriesDocSnap = await getDoc(clubTypeLargeCategoriesDoc)
        let clubTypeLargeCategoriesObject = clubTypeLargeCategoriesDocSnap.data();
        let clubTypeLargeCategoryName = clubTypeLargeCategoriesObject.name;
        if (!groupedClub[clubTypeLargeCategoryName]) {
          groupedClub[clubTypeLargeCategoryName] = [];
        }
        groupedClub[clubTypeLargeCategoryName].push(clubCategoryName);
      } catch (error) {
        console.log("ProfilePage: clubTypeLargeCategory doesn't exist => clubTypeLargeCategoriesDocId : ", docId);
      }
    } catch (error) {
      console.log("ProfilePage: ClubTypeCategory doesn't exist => clubTypeCategoriesDocId : ", docId);
    }
  })
  await Promise.all(fetchPromises);
  const groupedClubArray = Object.entries(groupedClub)
  const groupedClubStrings: string[] = groupedClubArray.map(groupedClub => {
    const clubs: string[] = Object.values(groupedClub[1])
    return groupedClub[0] + "：" + clubs.join('、')
  })
  return groupedClubStrings
}

const getAreasOfActivityToStrings = async (docIds: string[]) => {
  let groupedAreasOfActivity = {};
  const fetchPromises = docIds.map(async docId => {
    try {
      let citiesDoc = doc(db, 'cities', docId)
      let citiesDocSnap = await getDoc(citiesDoc)
      let cityObject = citiesDocSnap.data();
      let cityName = cityObject.city
      let areaId = cityObject.area
      let prefectureId = cityObject.prefecture
      try {
        const areasDoc = doc(db, 'areas', areaId)
        const areasDocSnap = await getDoc(areasDoc)
        const areaObject = areasDocSnap.data();
        const areaName = areaObject.area

        const prefectureDoc = doc(db, 'prefectures', prefectureId)
        const prefectureDocSnap = await getDoc(prefectureDoc)
        const prefectureObject = prefectureDocSnap.data()
        const prefectureName = prefectureObject.prefecture

        if (!groupedAreasOfActivity[prefectureName]) {
          groupedAreasOfActivity[prefectureName] = [];
        }
        groupedAreasOfActivity[prefectureName].push(cityName);
      } catch (error) {
        console.log("ProfilePage: areas doesn't exist => areasDocId : ", areaId);
      }
    } catch (error) {
      console.log("ProfilePage: cities doesn't exist => citiesDocId : ", docId);
    }
  })
  await Promise.all(fetchPromises);
  const groupedAreasOfActivityArray = Object.entries(groupedAreasOfActivity)
  const groupedAreasOfActivityStrings: string[] = groupedAreasOfActivityArray.map(groupedAreasOfActivity => {
    const areasOfActivity: string[] = Object.values(groupedAreasOfActivity[1])
    return groupedAreasOfActivity[0] + "：" + areasOfActivity.join('、')
  })
  return groupedAreasOfActivityStrings
}

const ProfilePage = ({ userId, projectId = null, isProfilebarOpen, handleToggleBar, authority = false, setIsLoading }: ThisProps) => {
  const [profileObject, setProfileObject] = useState<Profile>(null)
  const [roomId, setRoomId] = useState(null)

  useEffect(() => {
    if (userId === null || projectId === null) return
    const fetchRoom = async () => {
      const result = await axios.post(`/api/message/room?projectId=${projectId}&userId=${userId}`)
      if (result.data.length > 0) setRoomId(result.data[0].roomId)
    }

    fetchRoom()
  }, [userId, projectId])

  useEffect(() => {
    if (userId === null) return
    const fetchUser = async () => {
      setIsLoading(true);
      const [user] = await Promise.all([
        getDoc(DocRef.privateUsers(userId))
      ])

      const userObject = await getDocIdWithData(user)
      const age = calculateAge(userObject.birthday)
      const clubs = await getClubsToStrings(userObject.clubs || [])
      const areasOfActivity = await getAreasOfActivityToStrings(userObject.areasOfActivity || [])

      const gender = userObject.gender === 'male' ? '男性' : userObject.gender === 'female' ? '女性' : '回答しない'
      const isExpeditionPossible = !userObject.isExpeditionPossible ? '' : userObject.isExpeditionPossible === 'possible' ? '可能' : userObject.isExpeditionPossible === 'notPossible' ? '不可' : '要相談'
      const teacherLicenseStatus = !userObject.teacherLicenseStatus ? '' : userObject.teacherLicenseStatus === 'having' ? 'あり' : userObject.teacherLicenseStatus === 'nothing' ? 'なし' : '取得予定'

      const profile: Profile = {
        id: userId,
        userIdOfPrefecture: userObject.userIdOfPrefecture || '',
        name: userObject.name,
        gender,
        createdAt: userObject.createdAt,
        updatedAt: userObject.updatedAt,
        occupation: userObject.occupation,
        birthday: userObject.birthday,
        age: age,
        phoneNumber: userObject.phoneNumber,
        zipCode: userObject.address?.zip || 1000000,
        address: (userObject.address?.prefecture || '') + (userObject.address?.city || '') + (userObject.address.address1 || '') + (userObject.address.address2 || ''),
        email: userObject.email,
        clubs: clubs,
        areasOfActivity: areasOfActivity,
        officeHours: userObject.officeHours,
        isExpeditionPossible,
        experienceNote: userObject.experienceNote,
        teacherLicenseStatus,
        teacherLicenseNote: userObject.teacherLicenseNote,
        hasDriverLicense: userObject.hasDriverLicense,
        otherLicense: userObject.otherLicense,
        otherLicenseNote: userObject.otherLicenseNote,
        pr: userObject.pr || '',
        questionsForPrefecture: userObject.questionsForPrefecture,
        career: userObject.career,
        subscribeEmail: userObject.subscribeEmail,
        avatar: userObject.avatar || '',
        precautions: userObject.precautions || '',
      }
      setProfileObject(profile)
      setIsLoading(false)
    }
    fetchUser()
  }, [userId])

  return (
    profileObject ? (
      <Transition
        show={isProfilebarOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-0 flex z-100">
          <div className="flex">
            <div className="fixed w-[90vw] overflow-x-auto pc:w-[470px] z-50 top-16 right-0 bg-gray-white border border-gray-gray_dark text-left h-screen">
              <div className="flex flex-wrap items-start p-5 justfy-between">
                <div className="flex gap-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    {profileObject.avatar ?
                      <Image src={profileObject.avatar} width={40} height={40} alt={''} /> :
                      <Icon size={40} src={'/images/avatar/no_avatar.png'} alt="avatar" />
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-body_sp">
                      {authority ? profileObject.name.sei + profileObject.name.mei : `No.${profileObject.userIdOfPrefecture}`}
                    </div>
                    <div className="flex gap-[10px] text-timestamp">
                      <span>{profileObject.gender}</span>
                      <span>{calculateAge(profileObject.birthday)}歳</span>
                    </div>
                    {profileObject.precautions && (
                      <div className="flex gap-[2px] text-mini text-core-red">
                        <IoIosWarning size={14} />
                        <span>{profileObject.precautions}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col ml-auto items-end gap-4">
                  <div className="text-right text-mini text-gray-gray_dark">
                    <p>登録日 : {fromTimestampToString(profileObject.createdAt)} </p>
                    <p>プロフィール更新日 : {fromTimestampToString(profileObject.updatedAt)}</p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <PDFDownloadLink
                      document={
                        <ProfilePdfPage data={profileObject} authority={authority} />
                      }
                      fileName={authority ? `${profileObject.name.sei} ${profileObject.name.mei}.pdf` : `No.${profileObject.userIdOfPrefecture}.pdf`}
                    >
                      <button
                        className="inline-flex items-center justify-center text-core-blue text-mini gap-[2px] w-[70px] h-5 rounded border border-core-blue"
                      >
                        <MdDownload size={14} />
                        <span>PDF出力</span>
                      </button>
                    </PDFDownloadLink>
                    <Link className='text-mini underline' href='https://forms.gle/UfqaKyQp9kyE271K6' target='_blank'>報告する</Link>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Tab.Group>
                  <Tab.List className="border-b border-gray-gray">
                    <Tab className="outline-none">
                      {({ selected }) => (
                        <TabList
                          label="プロフィール"
                          selected={selected}
                          className="text-small pc:text-h5"
                        />
                      )}
                    </Tab>
                    <Tab className="outline-none">
                      {({ selected }) => (
                        <TabList
                          label="選考履歴"
                          selected={selected}
                          className="text-small pc:text-h5"
                        />
                      )}
                    </Tab>
                    {projectId && (
                      <Tab className="outline-none">
                        {({ selected }) => (
                          <TabList
                            label="メッセージ"
                            selected={selected}
                            className="text-small pc:text-h5"
                          />
                        )}
                      </Tab>
                    )}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div className={`flex flex-col px-4 pc:px-[30px] py-5 gap-5 w-[440px] pc:w-full h-[calc(100vh-64px-225px)] pc:h-[calc(100vh-64px-147px)] overflow-auto`}>
                        <div className="flex flex-col gap-2">
                          <div className="text-small">職業</div>
                          <div className="text-timestamp">
                            <div>{profileObject.occupation.type}</div>
                            <div>{profileObject.occupation.organization}{profileObject.occupation.type === '大学生' ? ` ${profileObject.occupation.grade}年生` : ''}</div>
                          </div>
                        </div>
                        {authority && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">生年月日</div>
                            <div className="text-timestamp">
                              <div>
                                {formatBirthdayString(profileObject.birthday)}(満{calculateAge(profileObject.birthday)}歳)
                              </div>
                            </div>
                          </div>
                        )}
                        {authority && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">電話番号</div>
                            <div className="text-timestamp">
                              <div>
                                {profileObject.phoneNumber}
                              </div>
                            </div>
                          </div>
                        )}
                        {authority && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">住所</div>
                            <div className="text-timestamp">
                              <p className="py-[2px]">
                                {`〒${profileObject.zipCode.toString().slice(0, 3)}-${profileObject.zipCode.toString().slice(3)}`}
                              </p>
                              <p className="py-[2px]">
                                {profileObject.address}
                              </p>
                            </div>
                          </div>
                        )}
                        {authority && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">メールアドレス</div>
                            <div className="text-timestamp">
                              <div>
                                {profileObject.email}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <div className="text-small">指導できる種目</div>
                          <div className="text-timestamp">
                            <div className="flex flex-col gap-1.5">
                              {profileObject.clubs.map(club => (
                                <div key={v4()}>{club}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-small">指導できる地域</div>
                          <div className="text-timestamp">
                            <div className="flex flex-col gap-1.5">
                              {profileObject.areasOfActivity.map(area => (
                                <div key={v4()}>{area}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-small">指導できる日時</div>
                          <div className="text-timestamp">
                            <Schedule className="w-full mt-[2px]" schedule={profileObject.officeHours} size="mini" />
                          </div>
                        </div>
                        {profileObject.isExpeditionPossible && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">遠征への同行可否</div>
                            <div className="text-timestamp">
                              {profileObject.isExpeditionPossible}
                            </div>
                          </div>
                        )}
                        {profileObject.experienceNote && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">指導経験</div>
                            <div className="text-timestamp">
                              <div>{profileObject.experienceNote}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.teacherLicenseStatus && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">教員免許</div>
                            <div className="text-timestamp">
                              <div>{profileObject.teacherLicenseStatus}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.teacherLicenseNote && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">教員免許種別</div>
                            <div className="text-timestamp">
                              <div>{profileObject.teacherLicenseNote}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.hasDriverLicense && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">自動車運転免許</div>
                            <div className="text-timestamp">
                              <div>{profileObject.hasDriverLicense}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.otherLicenseNote && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">指導者資格<span className="text-mini ml-[6px]">(教員免許以外)</span></div>
                            <div className="text-timestamp">
                              <div>{profileObject.otherLicenseNote}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.pr && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">自己アピール</div>
                            <div className="text-timestamp">
                              <div>{profileObject.pr}</div>
                            </div>
                          </div>
                        )}
                        {profileObject.questionsForPrefecture && profileObject.questionsForPrefecture.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">地域項目</div>
                            {profileObject.questionsForPrefecture.map((item, index) => (
                              <div className="text-timestamp">
                                <div>{item.prefecture}</div>
                                <div className="mt-2 border border-gray-gray">
                                  <div className="px-2 py-1 bg-gray-gray_light">
                                    {item.question}
                                  </div>
                                  <div className="px-2 py-1">
                                    {item.answer}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {profileObject.career && profileObject.career.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <div className="text-small">経歴</div>
                            {profileObject.career.map((item, index) => (
                              <div className="flex gap-2 text-timestamp">
                                <div className="flex gap-[5px]">
                                  <span>{fromTimestampToString(item.termOfStart).slice(0, 7)}</span>
                                  <span>～</span>
                                  <span>{fromTimestampToString(item.termOfEnd).slice(0, 7)}</span>
                                </div>
                                <div>{item.organizationName}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <div className="text-small">メール受信設定</div>
                          <div className="text-timestamp">
                            <div>{profileObject.subscribeEmail}</div>
                            <div className="mt-2 text-mini text-gray-gray_dark">※「受け取らない」に設定しても個別メッセージなど大切なお知らせは届きます。</div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* <div className={`flex flex-col px-4 pc:px-[30px] py-5 gap-3 w-[440px] pc:w-full h-[calc(100vh-64px-225px)] pc:h-[calc(100vh-64px-147px)] overflow-auto`}>
                        <div className="flex items-center gap-4 px-4 py-3 border cursor-pointer border-gray-gray_light">
                          <HowToApply applyType="スカウト" />
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-[6px] text-h5">
                              <span>甲府市立明光学園</span>
                              <span>サッカー</span>
                              <span>男子</span>
                            </div>
                            <div className="flex gap-2">
                              <div>
                                <div className="text-mini">ステータス</div>
                                <div className="text-timestamp">面談</div>
                              </div>
                              <div>
                                <div className="text-mini">面談日時</div>
                                <div className="text-timestamp">2022/12/10(金) 14:21</div>
                              </div>
                              <div>
                                <div className="text-mini">最終更新日</div>
                                <div className="text-timestamp">2023/12/10(金)</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[18px]">
                            <MdArrowForwardIos />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 border cursor-pointer border-gray-gray_light">
                          <HowToApply applyType="スカウト" />
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-[6px] text-h5">
                              <span>甲府市立明光学園</span>
                              <span>サッカー</span>
                              <span>男子</span>
                            </div>
                            <div className="flex gap-2">
                              <div>
                                <div className="text-mini">ステータス</div>
                                <div className="text-timestamp">面談</div>
                              </div>
                              <div>
                                <div className="text-mini">面談日時</div>
                                <div className="text-timestamp">2022/12/10(金) 14:21</div>
                              </div>
                              <div>
                                <div className="text-mini">最終更新日</div>
                                <div className="text-timestamp">2023/12/10(金)</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[18px]">
                            <MdArrowForwardIos />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 border cursor-pointer border-gray-gray_light">
                          <HowToApply applyType="スカウト" />
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-[6px] text-h5">
                              <span>甲府市立明光学園</span>
                              <span>サッカー</span>
                              <span>男子</span>
                            </div>
                            <div className="flex gap-2">
                              <div>
                                <div className="text-mini">ステータス</div>
                                <div className="text-timestamp">面談</div>
                              </div>
                              <div>
                                <div className="text-mini">面談日時</div>
                                <div className="text-timestamp">2022/12/10(金) 14:21</div>
                              </div>
                              <div>
                                <div className="text-mini">最終更新日</div>
                                <div className="text-timestamp">2023/12/10(金)</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[18px]">
                            <MdArrowForwardIos />
                          </div>
                        </div>
                      </div> */}
                    </Tab.Panel>
                    {projectId && (
                      <Tab.Panel>
                        {roomId ? (
                          <div className={`flex flex-col w-[440px] pc:w-full h-[calc(100vh-64px-225px)] pc:h-[calc(100vh-64px-147px)] overflow-auto`}>
                            <MessageContent
                              selectedRoomId={roomId}
                            />
                          </div>
                        ) : <></>}
                      </Tab.Panel>
                    )}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
          <div
            className="flex flex-auto"
            onClick={handleToggleBar}
          ></div>
        </div>
      </Transition>
    ) : <></>
  )
}

export default ProfilePage;