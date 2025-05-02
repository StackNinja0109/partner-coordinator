import * as yup from "yup";
import emojiRegex from 'emoji-regex';

export interface EventProjectFormValues {
  title?: string
  organizer?: string;
  numberOfApplicants?: number;
  workZipCode?: string;
  workplace?: string;
  officeHoursNote?: string;
  jobDescription?: string;

  gender?: string;
  people?: string;
  salary?: string;
  note?: string;

  sei?: string;
  mei?: string;
  seiKana?: string;
  meiKana?: string;
  position?: string;
  addressZipCode?: string;
  addressPrefectures?: { label: string, value: string }
  addressCity?: string;
  addressAddress1?: string;
  addressAddress2?: string;
  phoneNumber?: string;
  email?: string;
  confirmEmail?: string;
}

export const EventProjectInitialFormValues = {
  title: "",
  organizer: "",
  numberOfApplicants: 1,
  workplace: "",
  officeHoursNote: "",
  jobDescription: "",

  gender: "男性",
  people: "",
  salary: "",
  note: "",

  sei: "",
  mei: "",
  seiKana: "",
  meiKana: "",
  position: "",
  addressPrefectures: { value: '', label: '選択してください' },
  addressCity: "",
  addressAddress1: "",
  addressAddress2: "",
  email: "",
  confirmEmail: "",
}

const katakanaRegex = /^[\u30A0-\u30FFー]+$/
const emojiPattern = emojiRegex()

export const schema = yup.object().shape({
  title: yup.string().required("タイトルは必須です")
    .max(30, "30字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  organizer: yup.string().required("主催団体は必須です")
    .max(30, "30字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  numberOfApplicants: yup.number()
    .nullable()
    .typeError('募集人数は必須です')
    .required("募集人数は必須です")
    .min(1, "整数を入力してください")
    .max(999, "3桁までの数字で入力してください")
    .integer("募集人数は整数でなければなりません"),
  workZipCode: yup.string()
    .required("郵便番号は必須です")
    .test('is-not-empty', '7桁の数字で入力してください', (value) => {
      value = value.replaceAll('-', '')
      return /^\d+$/.test(value) && value.length === 7;
    }),
  workplace: yup.string().required("住所は必須です"),
  officeHoursNote: yup.string().notRequired()
    .max(400, "400字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  jobDescription: yup.string().required("業務の内容は必須です")
    .max(400, "400字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),

  gender: yup.string().required("性別は必須です"),
  people: yup.string().notRequired()
    .max(400, "400字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  salary: yup.string().required("給与・報酬は必須です")
    .max(400, "400字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  note: yup.string().notRequired()
    .max(400, "400字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),

  sei: yup.string().required("担当者名は必須です")
    .max(10, "10字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  mei: yup.string().required("担当者名は必須です")
    .max(10, "10字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  seiKana: yup.string().required("担当者名は必須です")
    .matches(katakanaRegex, 'カタカナで入力してください')
    .max(10, "10字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  meiKana: yup.string().required("担当者名は必須です")
    .matches(katakanaRegex, 'カタカナで入力してください')
    .max(10, "10字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  position: yup.string().notRequired()
    .max(10, "10字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  addressZipCode: yup.string()
    .required("郵便番号は必須です")
    .test('is-not-empty', '7桁の数字で入力してください', (value) => {
      value = value.replaceAll('-', '')
      return /^\d+$/.test(value) && value.length === 7;
    }),
  // addressPrefectures: yup.string().required("都道府県は必須です"),
  addressCity: yup.string().required("市区町村は必須です"),
  addressAddress1: yup.string().required("番地は必須です"),
  addressAddress2: yup.string().notRequired()
    .max(50, "50字以内で入力してください")
    .test('no-emojis', '絵文字は入力できません', (value) => {
      return !emojiPattern.test(value);
    }),
  phoneNumber: yup.string()
    .required("電話番号は必須です")
    .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
      value = value.replaceAll('-', '')
      return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
    }),
  email: yup
    .string().required("メールアドレスは必須です。")
    .email("メールアドレスを正しく入力してください")
    .max(80, "80字以内で入力してください"),
  confirmEmail: yup.string()
    .required("メールアドレスは必須です")
    .oneOf([yup.ref('email'), null], 'メールアドレスが一致しません'),
});