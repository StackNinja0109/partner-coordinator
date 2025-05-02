'use client'

import BackButton from '@/components/atoms/Button/BackButton'
import { Attention, Label, TopPageCaption } from '@/components/atoms'
import { v4 } from 'uuid'
import { FormProvider } from 'react-hook-form'
import RadioButtonGroup from '@/components/molecules/Input/RadioButtonGroup'
import Input from '@/components/molecules/Input/Input'
import { CheckBoxGroup } from '@/components/molecules/Input/CheckBoxGroup'
import SelectBox from '@/components/atoms/Input/SelectBox'
import LabelSub from '@/components/atoms/Input/LabelSub'
import Button, { ButtonColor, ButtonShape } from '@/components/atoms/Button/Button'
import { days } from '@/utils/constants'
import { convertToJapaneseDayName } from '@/utils/convert'
import TextArea from '@/components/molecules/Input/TextArea'
import Modal from '@/components/molecules/Modal/Modal'
import { Combobox } from '@headlessui/react'
import { MdSearch } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { IoIosWarning } from 'react-icons/io'

import Link from 'next/link'
import { useProjectCreateProvider } from '../providers/useProjectCreateProvider'
import Loading from '@/components/layouts/loading'
import { PCFooter } from '@/components/organisms'

function ProjectCreatePage() {
  const {
    methods,
    onSubmit,
    router,
    selecteTypeOption,
    organizationType,
    clubTypeCategoryOptions,
    handleTypeOptionChange,
    checkboxOptions,
    isSchoolSearchModalOpen,
    setIsSchoolSearchModalOpen,
    openSchoolSearchModal,
    closeSchoolSearchModal,
    organizationTypeOptions,
    filteredSchools,
    selected,
    setSelected,
    query,
    setQuery,
    getAddressFromZipcode,
    isSubmitDisabled,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
    isLoading,
  } = useProjectCreateProvider()

  const { control, handleSubmit, trigger, setValue, formState: { dirtyFields } } = methods

  return (
    <>
      {isLoading && <Loading />}
      <div className="relative flex flex-col w-full p-5 pb-0 text-center pc:p-10 pc:pb-0 bg-gray-gray_lighter">
        <BackButton
          className="absolute top-5 pc:top-10 left-5 pc:left-10"
          onClick={openCancelModal}
        />
        <h1 className="text-h2 pc:text-h1 mb-8 pc:mb-10">募集依頼内容入力</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 pc:gap-10"
          >
            <div className="flex flex-col pb-5 pc:pb-10 gap-5 pc:gap-10 pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
              <TopPageCaption
                title="学校・チーム情報"
                subTitle="※学校・チーム名はスカウトした候補者のみに提示されます"
              />

              {/* -----    START TYPE MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label text="区分" required />
                <RadioButtonGroup
                  name="type"
                  options={[
                    { label: '学 校', value: '学 校' },
                    { label: '合同チーム', value: '合同チーム' },
                    { label: '地域クラブ', value: '地域クラブ' },
                  ]}
                  onOptionChange={handleTypeOptionChange}
                />
                {selecteTypeOption === '学 校' && (
                  <>
                    <Input
                      control={control}
                      className="w-full pc:w-[400px]"
                      name="organizationName"
                      type="searchbtn"
                      placeholder="学校検索"
                      trigger={trigger}
                      disabled={isSchoolSearchModalOpen}
                      onClick={openSchoolSearchModal}
                      attention={
                        <>
                          当てはまる学校が無い場合は
                          <Link
                            href="https://www.notion.so/844496564e0740e9b293f190f687836f?pvs=4"
                            target="_blank"
                            className="underline text-core-blue"
                          >
                            こちら
                          </Link>
                        </>
                      }
                    />
                    <Modal
                      isOpen={isSchoolSearchModalOpen}
                      onClose={closeSchoolSearchModal}
                    >
                      <div className='relative'>
                        <h1 className="text-center text-h2 pc:ext-h1">
                          学校検索
                        </h1>
                        <RxCross1 className="absolute -top-3 -right-3 w-5 h-5 text-gray-gray_dark cursor-pointer" onClick={closeSchoolSearchModal} />
                      </div>
                      <div className="mt-5 pc:mt-[30px] min-w-[450px]">
                        <label htmlFor="" className="text-h5 pc:text-h4">
                          学校区分
                        </label>
                        <SelectBox
                          control={control}
                          className="w-full mt-4"
                          name="organizationType"
                          options={organizationTypeOptions}
                        />
                        {organizationType && (
                          <div className="relative mt-5 pc:mt-[30px]">
                            <Combobox value={selected} onChange={setSelected}>
                              <div className="relative mt-1">
                                <div className="relative w-full overflow-hidden text-left cursor-default bg-gray-white">
                                  <Combobox.Input
                                    className="w-full py-2 pr-10 outline-none pl-11 text-gray-black text-h5 border-y border-gray-gray bg-gray-gray_lighter"
                                    placeholder="検索"
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
                                  />
                                  <Combobox.Button className="absolute inset-y-0 flex items-center left-5">
                                    <MdSearch className="w-5 h-5 text-gray-gray_dark" />
                                  </Combobox.Button>
                                </div>
                                <Combobox.Options
                                  static
                                  className="w-full overflow-auto pc:text-body_pc text-body_sp bg-gray-white max-h-[330px] border-b border-gray-gray"
                                >
                                  {filteredSchools.length === 0 &&
                                    query !== '' ? (
                                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                      当てはまる学校が無いです。
                                    </div>
                                  ) : (
                                    filteredSchools.map((school) => (
                                      <Combobox.Option
                                        key={school.id}
                                        className={({ active }) =>
                                          `relative cursor-default select-none px-5`
                                        }
                                        value={school}
                                        onClick={() => {
                                          setValue(
                                            'organizationName',
                                            school.name,
                                          )
                                          setIsSchoolSearchModalOpen(false)
                                        }}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={`block truncate py-[5.5px] border-b border-gray-gray ${selected ? 'font-medium' : ''
                                                } ${active ? 'font-medium' : ''}`}
                                            >
                                              {school.name}
                                            </span>
                                          </>
                                        )}
                                      </Combobox.Option>
                                    ))
                                  )}
                                </Combobox.Options>
                              </div>
                            </Combobox>
                          </div>
                        )}
                      </div>
                    </Modal>
                  </>
                )}
                {selecteTypeOption === '合同チーム' && (
                  <>
                    <div className="flex flex-col gap-1 pc:gap-2" key={v4()}>
                      <LabelSub htmlFor="subject" text="対象" />
                      <CheckBoxGroup
                        className="w-[184px]"
                        name="target"
                        options={checkboxOptions}
                      />
                    </div>
                    <Input
                      control={control}
                      className="w-full pc:w-[400px]"
                      name="organizationName"
                      trigger={trigger}
                      attention="合同チームの名称を入力してください"
                    />
                  </>
                )}
                {selecteTypeOption === '地域クラブ' && (
                  <>
                    <div className="flex flex-col gap-1 pc:gap-2">
                      <LabelSub htmlFor="subject" text="対象" />
                      <CheckBoxGroup
                        className="w-[184px]"
                        name="target"
                        options={checkboxOptions}
                      />
                    </div>
                    <Input
                      control={control}
                      className="w-full pc:w-[400px]"
                      name="organizationName"
                      trigger={trigger}
                      attention="地域クラブの名称を入力してください"
                    />
                  </>
                )}
              </div>
              {/* *****    END TYPE MARKUP SECTION   ***** */}

              {/* -----    START EVENTTYPE MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label text="種目" required />
                <div className="flex flex-col gap-1 pc:gap-2">
                  <LabelSub htmlFor="eventType" text="部活タイプ" />
                  <RadioButtonGroup
                    name="eventType"
                    options={[
                      { label: '運動系', value: '運動系' },
                      { label: '文化系', value: '文化系' },
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-1 pc:gap-2">
                  <LabelSub htmlFor="eventName" text="種目" />
                  <SelectBox
                    control={control}
                    className="w-[200px]"
                    name="eventName"
                    options={clubTypeCategoryOptions}
                    attention={
                      <>
                        当てはまる種目が無い場合は
                        <Link
                          href="https://www.notion.so/06ab7f25ea5c4c288a2f9fa8f21dd798?pvs=4"
                          target="_blank"
                          className="underline text-core-blue"
                        >
                          こちら
                        </Link>
                      </>
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 pc:gap-2">
                  <LabelSub htmlFor="gender" text="男女区分" />
                  <RadioButtonGroup
                    name="gender"
                    options={[
                      { label: '男 子', value: '男子' },
                      { label: '女 子', value: '女子' },
                      { label: '男 女', value: '男女' },
                    ]}
                  />
                </div>
              </div>
              {/* *****    END EVENTTYPE MARKUP SECTION   ***** */}

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label htmlfor="recruitment" text="募集人数" required />
                <div className="flex items-center gap-3 mt-4">
                  <Input
                    control={control}
                    className="w-[100px] text-center"
                    name="recruitment"
                    trigger={trigger}
                    type="number"
                  />
                  <span>名</span>
                </div>
              </div>

              {/* -----    START WORKPLACE MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex flex-col gap-1 pc:gap-2">
                  <Label htmlfor="workplace" text="主な勤務地" required />
                  <Attention text="※勤務地が複数ある場合は, 主要な場所を入力してください" />
                </div>
                <div className="flex flex-col gap-1 pc:gap-2">
                  <LabelSub text="郵便番号" />
                  <div className="flex items-start gap-4">
                    <Input
                      control={control}
                      className="w-[90px] pc:w-[120px]"
                      name="zipcode"
                      trigger={trigger}
                      attention={
                        <>
                          郵便番号検索ができない場合は
                          <Link
                            href="https://www.notion.so/fd9c4a7ee83d427faa30b95b2ef3ecdc?pvs=4"
                            target="_blank"
                            className="underline text-core-blue"
                          >
                            こちら
                          </Link>
                        </>
                      }
                    />
                    <Button
                      className="px-3 pc:px-5 py-[6px]"
                      text="郵便番号検索"
                      disabled={!dirtyFields.zipcode}
                      onclick={() => getAddressFromZipcode()}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 pc:gap-2">
                  <LabelSub htmlFor="" text="住所" />
                  <Input
                    control={control}
                    className="w-full pc:w-[400px]"
                    name="workplace"
                    trigger={trigger}
                    readOnly
                  />
                </div>
              </div>
              {/* *****    END WORKPLACE MARKUP SECTION   ***** */}

              {/* -----    START WORKINGHOURS MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label htmlfor="workingHours" text="勤務時間" required />
                <div className="flex flex-col gap-4 pc:pl-5">
                  {days.map((day, key) => (
                    <div
                      key={key}
                      className="flex flex-wrap items-center gap-5 pc:gap-10"
                    >
                      <label
                        htmlFor={`workingHours_${day.toLowerCase()}`}
                        className="text-h5 pc:text-h4"
                      >
                        {convertToJapaneseDayName(day.toLowerCase())}
                      </label>
                      <CheckBoxGroup
                        className="w-[100px] pc:w-[160px]"
                        name={`workingHours_${day.toLowerCase()}`}
                        options={[
                          {
                            label: '午 前',
                            value: 'am',
                          },
                          {
                            label: '午 後',
                            value: 'pm',
                          },
                        ]}
                      />
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-5 pc:gap-6">
                    <label
                      htmlFor="workingHours_note"
                      className="text-h5 pc:text-h4"
                    >
                      補足
                    </label>
                    <TextArea
                      control={control}
                      className="flex-grow"
                      name="workingHours_note"
                      trigger={trigger}
                      attention={
                        '勤務時間等について, 補足事項があればご記入ください'
                      }
                    />
                  </div>
                </div>
              </div>
              {/* *****    END WORKINGHOURS MARKUP SECTION   ***** */}

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label
                  htmlfor="activityDescription"
                  text="活動の紹介"
                  required
                />
                <TextArea
                  control={control}
                  className="w-full"
                  name="activityDescription"
                  trigger={trigger}
                  attention={
                    <>
                      例1）県大会ベスト4以上の実績があり全国大会を目指しています
                      <br />
                      例2）初心者中心で部員数も少ないですが楽しみながら頑張っています
                    </>
                  }
                />
              </div>
            </div>

            <div className="flex flex-col pb-5 pc:pb-10 gap-5 pc:gap-10 pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
              <TopPageCaption title="希望条件" />

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex items-center gap-4">
                  <Label htmlfor="desiredGender" text="性別" required />
                  <Attention text="※募集者には公開されません" />
                </div>
                <RadioButtonGroup
                  name="desiredGender"
                  options={[
                    { label: '男 性', value: '男性' },
                    { label: '女 性', value: '女性' },
                    { label: 'どちらでも', value: 'どちらでも' },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex items-center gap-4">
                  <Label htmlfor="desiredAge" text="年齢" required />
                  <Attention text="※募集者には公開されません" />
                </div>
                <CheckBoxGroup
                  className="min-w-[110px]"
                  name="desiredAge"
                  options={[
                    { label: '10代', value: '10代' },
                    { label: '20代', value: '20代' },
                    { label: '30代', value: '30代' },
                    { label: '40代', value: '40代' },
                    { label: '50代', value: '50代' },
                    { label: '60代以上', value: '60代以上' },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label
                  htmlfor="desiredQualifications"
                  text="資格に関する希望"
                />
                <TextArea
                  control={control}
                  className="w-full"
                  name="desiredQualifications"
                  trigger={trigger}
                  attention={
                    <>
                      例1）部活動指導員や教員免許を取得もしくは取得予定
                      <br />
                      例2）競技指導資格の取得を将来的に考えている方
                    </>
                  }
                />
              </div>
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label htmlfor="desiredTalent" text="求める人材" />
                <TextArea
                  control={control}
                  className="w-full"
                  name="desiredTalent"
                  trigger={trigger}
                  attention={
                    <>
                      例1）指導経験のある方
                      <br />
                      例2）大会や合宿等の遠征同行できる方
                    </>
                  }
                />
              </div>

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <Label htmlfor="desiredSalary" text="給与・報酬" required />
                <TextArea
                  control={control}
                  className="w-full"
                  name="desiredSalary"
                  trigger={trigger}
                  attention="例）時給○○円 / 日当○○円 / 保有資格により要相談"
                />
              </div>

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex items-center gap-4">
                  <Label htmlfor="desiredNote" text="備考" />
                  <Attention text="※募集者には公開されません" />
                </div>
                <TextArea
                  control={control}
                  className="w-full"
                  name="desiredNote"
                  trigger={trigger}
                  attention="コーディネーターに伝えたいことがあればご記入ください"
                />
              </div>
            </div>

            <div className="flex flex-col pb-5 pc:pb-10 gap-5 pc:gap-10 pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
              <TopPageCaption title="基本情報" />

              {/* -----    START NAME MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Label htmlfor="name" text="担当者名" required />
                  <Attention text="※募集者には公開されません" />
                </div>
                <div className="flex flex-wrap gap-3 pc:gap-4">
                  <Input
                    className="w-full pc:w-[200px]"
                    control={control}
                    name="sei"
                    trigger={trigger}
                    placeholder="姓"
                  />
                  <Input
                    className="w-full pc:w-[200px]"
                    control={control}
                    name="mei"
                    trigger={trigger}
                    placeholder="名"
                  />
                </div>
                <div className="flex flex-wrap gap-3 pc:gap-4">
                  <Input
                    className="w-full pc:w-[200px]"
                    control={control}
                    name="seiKana"
                    trigger={trigger}
                    placeholder="セイ"
                  />
                  <Input
                    className="w-full pc:w-[200px]"
                    control={control}
                    name="meiKana"
                    trigger={trigger}
                    placeholder="メイ"
                  />
                </div>
              </div>
              {/* *****    END NAME MARKUP SECTION   ***** */}

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Label htmlfor="position" text="役職" />
                  <Attention text="※募集者には公開されません" />
                </div>
                <Input
                  className="w-full pc:w-[200px]"
                  control={control}
                  name="position"
                  trigger={trigger}
                />
              </div>

              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Label htmlfor="phoneNumber" text="電話番号" required />
                  <Attention text="※募集者には公開されません" />
                </div>
                <Input
                  className="w-full pc:w-[240px]"
                  control={control}
                  name="phoneNumber"
                  trigger={trigger}
                  placeholder="09012345678"
                  attention={
                    <>
                      つながりやすい連絡先をご入力ください
                      <br className="block pc:hidden" />
                      （ハイフン不要）
                    </>
                  }
                />
              </div>

              {/* -----    START EMAIL MARKUP SECTION   ----- */}
              <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
                <div className="flex flex-wrap items-center gap-4">
                  <Label htmlfor="email" text="メールアドレス" required />
                  <Attention text="※募集者には公開されません" />
                </div>
                <Input
                  className="w-full pc:w-[400px]"
                  control={control}
                  name="email"
                  trigger={trigger}
                  placeholder="example@spocul.jp"
                />
                <Input
                  className="w-full pc:w-[400px]"
                  control={control}
                  name="confirmEmail"
                  trigger={trigger}
                  placeholder="example@spocul.jp"
                  attention="確認のためもう一度入力してください"
                />
              </div>
              {/* *****    END EMAIL MARKUP SECTION   ***** */}
            </div>

            <div className="py-5">
              <Button
                className="px-[60px] py-[16px] mx-auto "
                text="確認画面へ進む"
                shape={ButtonShape.ELLIPSE}
                type="submit"
                disabled={isSubmitDisabled}
                onclick={(e) => e.preventDefault}
              />
            </div>
          </form>
        </FormProvider>
        <PCFooter />

        <Modal isOpen={isCancelModalOpen} onClose={closeCancelModal}>
          <div className="flex flex-col gap-5 text-center">
            <span className="inline-block text-[60px] pc:text-[80px] mx-auto text-core-red">
              <IoIosWarning />
            </span>
            <p className="text-body_sp pc:text-body_pc">
              編集の内容は破棄されます
              <br />
              よろしいですか？
            </p>
            <div className="flex gap-3 pc:gap-5">
              <Button
                className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                color={ButtonColor.CANCEL}
                shape={ButtonShape.ELLIPSE}
                text="キャンセル"
                onclick={closeCancelModal}
              />
              <Button
                className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                color={ButtonColor.WARNING}
                shape={ButtonShape.ELLIPSE}
                text="破棄する"
                onclick={() => router.push('/')}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default ProjectCreatePage
