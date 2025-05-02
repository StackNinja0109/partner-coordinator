'use client'
import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

import { createTw } from 'react-pdf-tailwind'
import { Profile } from '@/features/users/shared/types'
import { calculateAge, fromTimestampToString, formatBirthdayString } from '@/utils/convert'
import { SelectionItem } from '@/components/organisms/Table/Selection/SelectionDataTable';

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
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    maxWidth: '800px',
    fontFamily: 'Noto Sans JP, sans-serif;',
  },
  landscapePage: {
    transform: 'rotate(-90deg)', // Rotate the page to landscape orientation
    transformOrigin: 'top left',
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
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableCell: {
    width: '50%',
    paddingRight: 10,
  },
  image: {
    width: 60,
    height: 60,
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

const SelectionPdfPage = ({ data }: { data: SelectionItem[] }) => {
  return (
    <Document>
      <Page size="A4" style={[styles.page, tw('text-sm')]}>
        <View style={{ ...tw(`h-[55px] border-gray-gray_light text-timestamp text-gray-gray_dark flex flex-row`) }}>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>氏名</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>年齢</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>性別</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>職業</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>所属</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>面接日時</Text>
          </View>
          <View style={{ ...tw(`flex items-center`) }}>
            <Text>最終メッセージ</Text>
          </View>
        </View>
      </Page>
    </Document >
  )
}

export default SelectionPdfPage