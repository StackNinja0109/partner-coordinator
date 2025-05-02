'use client'
import React, { useState, useEffect } from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

import { createTw } from 'react-pdf-tailwind'
import { IoIosWarning } from "react-icons/io";
import { Profile } from '../shared/types'
import { calculateAge, fromTimestampToString, formatBirthdayStringToMonth } from '@/utils/convert'

import { AiOutlineConsoleSql } from 'react-icons/ai'

Font.register({
  family: 'Noto Sans JP, sans-serif;',
  src: '/fonts/notosan/static/NotoSansJP-Regular.ttf',
})



const tw = createTw({
  theme: {
    extend: {
      colors: {
        primary: 'cornflowerblue',
      },
      fontFamily: {
        notojp: ['Noto Sans', 'sans-serif'],
      },
    },
  },
})

const styles = StyleSheet.create({
  page: {
    padding: 20,
    maxWidth: '800px',
    fontFamily: 'Noto Sans JP, sans-serif;',
  },
  headerContent: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCell: {
    width: '50%',
    paddingRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    width: 48,
    height: 48,
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gap1: {
    gap: 4,
  },
  gap2: {
    gap: 8,
  },
  gap3: {
    gap: 12,
  },
  rowGap1: {
    rowGap: 4,
  },
  rowGap2: {
    rowGap: 8,
  },
  rowGap3: {
    rowGap: 12,
  },
  colGap1: {
    columnGap: 4,
  },
  colGap2: {
    columnGap: 8,
  },
  colGap3: {
    columnGap: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  colorGray: {
    color: 'gray',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: '100%',
    backgroundColor: 'black',
  },
})

const japaneseDays = ['', '月', '火', '水', '木', '金', '土', '日']
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

interface ThisProps {
  data: Profile
  authority?: boolean
}

const ProfilePdfPage = ({ data, authority = false }: ThisProps) => {
  const [hours, setHours] = useState([])

  useEffect(() => {
    const getStatus = (activity: string[]) => {
      const ans: number[] = [0, 0];
      for (let i = 0; i < activity.length; i++) {
        if (activity[i] === 'am') ans[0] = 1;
        if (activity[i] === 'pm') ans[1] = 1;
      }
      return ans;
    }

    const getHours = async () => {
      let Hs = []
      if (data.officeHours) {
        await Hs.push(getStatus(data.officeHours.monday));
        await Hs.push(getStatus(data.officeHours.tuesday));
        await Hs.push(getStatus(data.officeHours.wednesday));
        await Hs.push(getStatus(data.officeHours.thursday));
        await Hs.push(getStatus(data.officeHours.friday));
        await Hs.push(getStatus(data.officeHours.saturday));
        await Hs.push(getStatus(data.officeHours.sunday));
      }
      setHours(Hs)
    }
    getHours()
  }, [data])

  const breakWord = (str: string) => {
    const maxLineLength = 46
    let breakWordStr = ''

    for (let currentIndex = 0; currentIndex < str.length; currentIndex += maxLineLength) {
      const line = str.substr(currentIndex, maxLineLength)
      breakWordStr += line + '\n'
    }
    return breakWordStr
  }

  return (
    <Document>
      <Page size="A4" style={[styles.page, tw('text-sm')]}>
        <View style={tw('flex flex-row justify-between items-start')}>
          <View style={tw('flex flex-row gap-x-2')}>
            <View style={tw('w-12 h-12 overflow-hidden rounded-full')}>
              {data.avatar ?
                <Image src={data.avatar} style={styles.image} /> :
                <Image src={'/images/avatar/no_avatar.png'} style={styles.image} />
              }
            </View>
            <View style={tw('flex flex-col gap-x-4')}>
              <View>
                <Text style={tw('text-xl')}>
                  {authority ? data.name.sei + data.name.mei : `No.${data.userIdOfPrefecture}`}
                </Text>
              </View>
              <View style={tw('flex flex-row gap-x-2')}>
                <Text>{data.gender}</Text>
                <Text>{calculateAge(data.birthday)}歳</Text>
              </View>
              {data.precautions && (
                <View style={tw('flex gap-[2px] text-mini text-core-red')}>
                  <IoIosWarning size={14} />
                  <Text>{data.precautions}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={tw('flex flex-col ml-auto items-end gap-2')}>
            <Text>登録日 : {fromTimestampToString(data.createdAt)} </Text>
            <Text>プロフィール更新日 : {fromTimestampToString(data.updatedAt)}</Text>
          </View>
        </View>
        <View style={tw('pl-5 my-5 tracking-wide')}>
          <View style={tw('flex flex-col w-full mb-6 bg-gray-white rounded-[10px] border border-zinc-300')}>
            <View style={tw('w-full rounded-t-[10px] bg-zinc-300 border-0')}>
              <Text style={tw('text-lg px-4 py-2')}>基本情報</Text>
            </View>
            <View style={tw('w-full px-4')}>
              <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                <Text style={[styles.boldText, tw('text-base w-48')]}>職業</Text>
                <View style={tw('flex flex-col gap-1')}>
                  <Text>{data.occupation.type}</Text>
                  <Text>{data.occupation.organization}{data.occupation.type === '大学生' ? ` ${data.occupation.faculty} ${data.occupation.grade}年生` : ''}</Text>
                </View>
              </View>

              {authority && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base w-48')}>生年月</Text>
                  <Text>{formatBirthdayStringToMonth(data.birthday)}(満{calculateAge(data.birthday)}歳)</Text>
                </View>
              )}

              {authority && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>電話番号</Text>
                  <Text>{data.phoneNumber}</Text>
                </View>
              )}

              {authority && data.zipCode && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>住所</Text>
                  <View style={tw('flex flex-col gap-1')}>
                    <Text>{`〒${data.zipCode.toString().slice(0, 3)}-${data.zipCode.toString().slice(3)}`}</Text>
                    <Text>{data.address}</Text>
                  </View>
                </View>
              )}

              {authority && (
                <View style={tw('flex flex-row items-center py-3 border-b-0')}>
                  <Text style={tw('text-base font-bold w-48')}>メールアドレス</Text>
                  <Text>{data.email}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={tw('flex flex-col w-full rounded-[10px] border border-zinc-300')}>
            <View style={tw('w-full rounded-t-[10px] bg-zinc-300 border-0')}>
              <Text style={tw('text-lg px-4 py-2')}>スキル・条件</Text>
            </View>
            <View style={tw('w-full px-4')}>
              <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                <Text style={tw('text-base font-bold w-48')}>指導できる種目</Text>
                <View>
                  {data.clubs.map((club, index) => (
                    <Text key={index} style={tw('py-[2px]')}>
                      {club}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                <Text style={tw('text-base font-bold w-48')}>指導できる地域</Text>
                {data.areasOfActivity.map((area, index) => (
                  <Text key={index} style={tw('py-[2px]')}>
                    {breakWord(area)}
                  </Text>
                ))}
              </View>

              <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                <Text style={tw('text-base font-bold w-48')}>指導できる日時</Text>
                <View style={tw('w-[80%] ml-auto mr-auto')}>
                  <View style={tw('flex flex-row text-center')}>
                    {japaneseDays.map((day, index) => (
                      <Text key={index} style={{ ...tw('w-[12.5%] border border-black py-[3px] bg-gray-200 mr-[-1]') }}>{day}</Text>
                    ))}
                  </View>
                  <View style={tw('flex flex-row text-center')}>
                    <Text style={tw('w-[12.5%] border border-black bg-gray-200 mt-[-1] mr-[-1]')}>午前</Text>
                    {hours.map((item, index) => (
                      <View key={index} style={tw('flex items-center justify-center w-[12.5%] border border-black py-[3px] mt-[-1] mr-[-1]')}>
                        {item[0] === 1 && <Text style={[styles.circle]}></Text>}
                      </View>
                    ))}
                  </View>
                  <View style={tw('flex flex-row text-center')}>
                    <Text style={tw('w-[12.5%] border border-black py-[3px] bg-gray-200 mt-[-1] mr-[-1]')}>午後</Text>
                    {hours.map((item, index) => (
                      <View key={index} style={tw('flex items-center justify-center w-[12.5%] border border-black py-[3px] mt-[-1] mr-[-1]')}>
                        {item[1] === 1 && <Text style={[styles.circle]}></Text>}
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {data.isExpeditionPossible && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>遠征への同行可否</Text>
                  <Text>{data.isExpeditionPossible}</Text>
                </View>
              )}

              {data.experienceNote && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>指導経験</Text>
                  <Text>{data.experienceNote}</Text>
                </View>
              )}

              {data.teacherLicenseStatus && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>教員免許</Text>
                  <Text>{data.teacherLicenseStatus}</Text>
                </View>
              )}

              {data.otherLicenseNote && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>指導者資格</Text>
                  <Text>{data.otherLicenseNote}</Text>
                </View>
              )}

              {data.hasDriverLicense && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>自動車運転免許</Text>
                  <Text>{data.hasDriverLicense ? 'あり' : 'なし'}</Text>
                </View>
              )}

              {/* {data.teacherLicenseNote && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>教員免許種別</Text>
                  <Text>{data.teacherLicenseNote}</Text>
                </View>
              )} */}

              {data.pr && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>自己アピール</Text>
                  <Text>{data.pr}</Text>
                </View>
              )}

              {data.questionsForPrefecture && data.questionsForPrefecture.length > 0 && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>地域項目</Text>
                  {data.questionsForPrefecture.map((item, index) => (
                    <View key={index}>
                      <Text>{item.prefecture}</Text>
                      <View style={tw('mt-2 border border-gray-gray')}>
                        <Text style={tw('px-2 py-1 bg-gray-200')}>
                          {item.question}
                        </Text>
                        <Text style={tw('px-2 py-1')}>
                          {item.answer}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {data.career && data.career.length > 0 && (
                <View style={tw('flex flex-row items-center py-3 border-b border-b-zinc-300')}>
                  <Text style={tw('text-base font-bold w-48')}>経歴</Text>
                  {data.career.map((item, index) => (
                    <View key={index} style={tw('flex flex-row gap-5')}>
                      <View style={tw('flex flex-row gap-[5px]')}>
                        <Text>{fromTimestampToString(item.termOfStart).slice(0, 7)}</Text>
                        <Text>~</Text>
                        <Text>{fromTimestampToString(item.termOfEnd).slice(0, 7)}</Text>
                      </View>
                      <Text>{item.organizationName}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document >
  )
}

export default React.memo(ProfilePdfPage)

