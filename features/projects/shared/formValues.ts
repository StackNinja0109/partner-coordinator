import * as yup from 'yup'
import emojiRegex from 'emoji-regex'

export interface LeaderProjectFormValues {
  type?: string
  target?: string[]
  organizationType?: { label: string; value: string }
  organizationName?: string
  applyForProject?: { label: string; value: string }
  eventType?: string
  eventName?: { label: string; value: string }
  gender?: string
  recruitment?: number
  zipcode?: string
  workplace?: string
  workingHours_monday?: string[]
  workingHours_tuesday?: string[]
  workingHours_wednesday?: string[]
  workingHours_thursday?: string[]
  workingHours_friday?: string[]
  workingHours_saturday?: string[]
  workingHours_sunday?: string[]
  workingHours_note?: string
  activityDescription?: string
  desiredGender?: string
  desiredAge?: string[]
  desiredQualifications?: string
  desiredTalent?: string
  desiredSalary?: string
  desiredNote?: string
  sei?: string
  mei?: string
  seiKana?: string
  meiKana?: string
  position?: string
  phoneNumber?: string
  email?: string
  confirmEmail?: string
}

export const LeaderProjectInitialFormValues = {
  type: '学 校',
  target: [],
  organizationName: '',
  organizationType: { label: '学校区分を選択', value: '' },
  eventType: '運動系',
  applyForProject: { label: '選択してください', value: '' },
  eventName: { label: '選択してください', value: '' },
  gender: '男子',
  recruitment: 1,
  workplace: '',
  workingHours_monday: [],
  workingHours_tuesday: [],
  workingHours_wednesday: [],
  workingHours_thursday: [],
  workingHours_friday: [],
  workingHours_saturday: [],
  workingHours_sunday: [],
  workingHours_note: '',
  activityDescription: '',
  desiredGender: '男性',
  desiredAge: [],
  desiredQualifications: '',
  desiredTalent: '',
  desiredSalary: '',
  desiredNote: '',
  sei: '',
  mei: '',
  seiKana: '',
  meiKana: '',
  position: '',
  phoneNumber: '',
  email: '',
  confirmEmail: '',
}

const katakanaRegex = /^[\u30A0-\u30FFー]+$/
const emojiPattern = emojiRegex()

export const schema = yup.object().shape({
  organizationName: yup
    .string()
    .required('学校・団体名は必須です')
    .max(30, '30字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  recruitment: yup
    .number()
    .nullable()
    .typeError('募集人数は必須です')
    .required('募集人数は必須です')
    .min(1, '整数を入力してください')
    .max(999, '3桁までの数字で入力してください')
    .integer('募集人数は整数でなければなりません'),
  zipcode: yup
    .string()
    .required('郵便番号は必須です')
    .test('is-not-empty', '7桁の数字で入力してください', (value) => {
      value = value.replaceAll('-', '')
      return /^\d+$/.test(value) && value.length === 7
    }),
  workplace: yup.string().required('住所は必須です'),
  workingHours_note: yup
    .string()
    .notRequired()
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  activityDescription: yup
    .string()
    .required('活動の紹介は必須です')
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  desiredQualifications: yup
    .string()
    .notRequired()
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  desiredTalent: yup
    .string()
    .notRequired()
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  desiredSalary: yup
    .string()
    .required('給与・報酬は必須です')
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  desiredNote: yup
    .string()
    .notRequired()
    .max(400, '400字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),

  sei: yup
    .string()
    .required('担当者名は必須です')
    .max(10, '10字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  mei: yup
    .string()
    .required('担当者名は必須です')
    .max(10, '10字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  seiKana: yup
    .string()
    .required('担当者名は必須です')
    .matches(katakanaRegex, 'カタカナで入力してください')
    .max(10, '10字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  meiKana: yup
    .string()
    .required('担当者名は必須です')
    .matches(katakanaRegex, 'カタカナで入力してください')
    .max(10, '10字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  position: yup
    .string()
    .notRequired()
    .max(10, '10字以内で入力してください')
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value)
    }),
  phoneNumber: yup
    .string()
    .required('電話番号は必須です')
    .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
      value = value.replaceAll('-', '')
      return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
    }),
  email: yup
    .string()
    .required('メールアドレスは必須です。')
    .email('メールアドレスを正しく入力してください')
    .max(80, '80字以内で入力してください'),
  confirmEmail: yup
    .string()
    .required('メールアドレスは必須です')
    .oneOf([yup.ref('email'), null], 'メールアドレスが一致しません'),
})
