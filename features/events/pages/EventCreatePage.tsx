'use client'

import BackButton from '@/components/atoms/Button/BackButton';
import { Attention, Label, TopPageCaption } from "@/components/atoms";
import { FormProvider } from 'react-hook-form';
import RadioButtonGroup from "@/components/molecules/Input/RadioButtonGroup";
import Input from "@/components/molecules/Input/Input";
import SelectBox from "@/components/atoms/Input/SelectBox";
import LabelSub from "@/components/atoms/Input/LabelSub";
import CheckBox, { CheckBoxColor } from "@/components/atoms/Button/CheckBox";
import Button, { ButtonColor, ButtonShape, ButtonType } from "@/components/atoms/Button/Button";
import TextArea from "@/components/molecules/Input/TextArea";
import Modal from "@/components/molecules/Modal/Modal";
import { Combobox } from "@headlessui/react";
import { MdSearch } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import { v4 } from "uuid";
import { DateFrame } from '@/components/organisms/DateFrame';
import { prefectureOptions } from '../shared/constants';

import Link from "next/link";
import { useEventCreateProvider } from '../providers/useEventCreateProvider';
import Loading from '@/components/layouts/loading';
import { PCFooter } from '@/components/organisms';

export default function ProjectEventCreatePage() {
  const {
    methods,
    onSubmit,
    isLoading,
    router,
    workingDateAndTimes,
    isSchoolSearchModalOpen,
    openSchoolSearchModal,
    closeSchoolSearchModal,
    handleFinishButton,
    handleSchoolChange,
    schoolNames,
    selectedSchoolNames,
    filteredSchools,
    selected,
    setSelected,
    query,
    setQuery,
    isTimeForEachDay,
    handleAddWorkingDateAndTime,
    handleIsTimeForEachDay,
    handleUpdateWorkingDateAndTime,
    handleRemoveWorkingDateAndTime,
    getWorkFromZipcode,
    getAddressFromZipcode,
    isSubmitDisabled,
    isCancelModalOpen,
    openCancelModal,
    closeCancelModal,
  } = useEventCreateProvider();

  const { control, handleSubmit, trigger, formState: { dirtyFields } } = methods;

  return (
    <div className="relative flex flex-col w-full p-5 pb-0 text-center pc:p-10 pc:pb-0 bg-gray-gray_lighter">
      {isLoading && <Loading />}
      <BackButton className="absolute top-5 pc:top-10 left-5 pc:left-10" onClick={openCancelModal} />
      <h1 className="text-h2 pc:text-h1 mb-8 pc:mb-10">募集依頼内容入力</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pc:gap-10">
          <div className="flex flex-col pb-5 pc:pb-10 gap-5 pc:gap-10 pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
            <TopPageCaption
              title="イベント情報"
            />

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="title" text="タイトル" required />
              <Input
                control={control}
                className="w-full"
                name="title"
                trigger={trigger}
                type="text"
                attention="例）シティマラソンの運営スタッフ"
              />
            </div>

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="organizer" text="主催団体" required />
              <Input
                control={control}
                className="w-full"
                name="organizer"
                trigger={trigger}
                type="text"
                attention="例）市民マラソン大会実行委員会"
              />
            </div>

            {/* APPLIED SCHOOLS MARKUP */}
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label text="募集を申請する学校" required />
              {schoolNames.sort().join('、')}
              <Button
                text="学校を選択"
                color={ButtonColor.SUB}
                buttonType={ButtonType.SECONDARY}
                onclick={openSchoolSearchModal}
                className=" w-[200px] py-[6px] "
              />
              <Modal isOpen={isSchoolSearchModalOpen} onClose={closeSchoolSearchModal}>
                <h1 className="relative text-center text-h2 pc:ext-h1">
                  学校検索
                  <div className="absolute right-0 h-full sp:top-[4px] pc:top-0">
                    <Button
                      onclick={handleFinishButton}
                      text={"完 了"}
                      className=" pc:py-[6px] pc:px-[22px] pc:text-body_pc sp:text-body_sp sp:px-[5px] sp:py-[3px]"
                    />
                  </div>
                </h1>
                <div className="mt-5 pc:mt-[30px]">
                  {(
                    <div className="relative mt-5 pc:mt-[30px] min-w-[450px]">
                      <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <div className="relative w-full overflow-hidden text-left cursor-default bg-gray-white">
                            <Combobox.Input
                              className="w-full py-2 pr-10 outline-none pl-11 text-gray-black text-h5 border-y border-gray-gray bg-gray-gray_lighter"
                              placeholder="検索"
                              onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 flex items-center left-5">
                              <MdSearch
                                className="w-5 h-5 text-gray-gray_dark"
                              />
                            </Combobox.Button>
                          </div>
                          <Combobox.Options static className="w-full overflow-auto pc:text-body_pc text-body_sp bg-gray-white max-h-[330px] border-b border-gray-gray">
                            {filteredSchools.length === 0 ? (
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
                                  onClick={(event) => handleSchoolChange(school.name)}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <CheckBox
                                        name={school.name}
                                        text={school.name}
                                        backgroundColor={CheckBoxColor.GrayLight}
                                        className={`truncate py-[5.5px] border-b bg-gray-white text-left border-gray-gray ${selected ? 'font-medium' : ''
                                          } ${active ? 'font-medium' : ''
                                          }`}
                                        onChange={() => { }}
                                        value={selectedSchoolNames.includes(school.name) ? school.name : ""}
                                      />
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
            </div>    {/* APPLIED SCHOOLS MARKUP */}

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="numberOfApplicants" text="募集人数" required />
              <div className="flex items-center gap-3 mt-4">
                <Input
                  control={control}
                  className="w-[100px] text-center"
                  name="numberOfApplicants"
                  trigger={trigger}
                  type="number"
                />
                <span>名</span>
              </div>
            </div>

            {/* -----    START WORKPLACE MARKUP SECTION   ----- */}
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex flex-col gap-1 pc:gap-2">
                <Label text="主な勤務地" required />
                <Attention text="※勤務地が複数ある場合は, 主要な場所を入力してください" />
              </div>
              <div className="flex flex-col gap-1 pc:gap-2">
                <LabelSub htmlFor='workZipCode' text="郵便番号" />
                <div className="flex items-start gap-4">
                  <Input
                    control={control}
                    className="w-[90px] pc:w-[120px]"
                    name="workZipCode"
                    trigger={trigger}
                    attention={<>郵便番号検索ができない場合は<Link href="https://www.notion.so/fd9c4a7ee83d427faa30b95b2ef3ecdc?pvs=4" target='_blank' className="underline text-core-blue">こちら</Link></>}
                  />
                  <Button
                    className="px-3 pc:px-5 py-[6px]"
                    text="郵便番号検索"
                    disabled={!dirtyFields.workZipCode}
                    onclick={() => getWorkFromZipcode()}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 pc:gap-2">
                <LabelSub htmlFor="workplace" text="住所" />
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

            {/* -----    START WORKDATEANDTIME MARKUP SECTION   ----- */}
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label text="勤務日時" required />
              <div className="flex items-start pc:flex-row pc:gap-5 sp:gap-3 sp:flex-col">
                <Button
                  text={
                    <div className="flex flex-row gap-[2px] items-center">
                      <BsPlus className="h-[24px] w-[24px]" />
                      <div>日付を追加</div>
                    </div>
                  }
                  color={ButtonColor.SUB}
                  buttonType={ButtonType.SECONDARY}
                  onclick={handleAddWorkingDateAndTime}
                  className="pc:px-[47px] sp:w-[222px] py-[6px] "
                />
                <CheckBox
                  text="日ごとに時間を設定する"
                  name="日ごとに時間を設定する"
                  onChange={handleIsTimeForEachDay}
                  backgroundColor={CheckBoxColor.GrayLight}
                  className=" w-[240px] bg-transparent"
                  value={isTimeForEachDay}
                />
              </div>
              {workingDateAndTimes.length > 0
                && workingDateAndTimes.map((workingDateAndTime, index) => (
                  <DateFrame key={v4()}
                    workingDateAndTime={workingDateAndTime}
                    index={index}
                    isSetTime={isTimeForEachDay === '日ごとに時間を設定する'}
                    handleUpdateWorkingDateAndTime={handleUpdateWorkingDateAndTime}
                    handleRemoveWorkingDateAndTime={handleRemoveWorkingDateAndTime}
                  />
                ))
              }
              <div className="flex flex-col items-start pc:gap-2 sp:gap-7">
              </div>
              <div>
                <div className="flex flex-wrap gap-5 pc:gap-6">
                  <label htmlFor="officeHoursNote" className="text-h5 pc:text-h4">補足</label>
                  <TextArea
                    control={control}
                    className="flex-grow"
                    name="officeHoursNote"
                    trigger={trigger}
                    attention={"勤務時間等について, 補足事項があればご記入ください"}
                  />
                </div>
              </div>
            </div>
            {/* *****    END WORKDATEANDTIME MARKUP SECTION   ***** */}

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="jobDescription" text="業務の内容" required />
              <TextArea
                control={control}
                className="w-full"
                name="jobDescription"
                trigger={trigger}
                attention={<>例）受付・交通誘導など</>}
              />
            </div>
          </div>

          <div className="flex flex-col pb-5 pc:pb-10 gap-5 pc:gap-10 pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
            <TopPageCaption title="希望条件" />
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex items-center gap-4">
                <Label htmlfor="gender" text="性別" required />
                <Attention text="※募集者には公開されません" />
              </div>
              <RadioButtonGroup
                name="gender"
                options={[
                  { label: '男 性', value: '男性' },
                  { label: '女 性', value: '女性' },
                  { label: 'どちらでも', value: 'どちらでも' },
                ]}
              />
            </div>
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="people" text="求める人材" />
              <TextArea
                control={control}
                className="w-full"
                name="people"
                trigger={trigger}
                attention={<>例1）指導経験のある方<br />例2）大会や合宿等の遠征同行できる方</>}
              />
            </div>
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <Label htmlfor="salary" text="給与・報酬" required />
              <TextArea
                control={control}
                className="w-full"
                name="salary"
                trigger={trigger}
                attention="例）時給○○円 / 日当○○円 / 保有資格により要相談"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex items-center gap-4">
                <Label htmlfor="note" text="備考" />
                <Attention text="※募集者には公開されません" />
              </div>
              <TextArea
                control={control}
                className="w-full"
                name="note"
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
              </div>
              <Input
                control={control}
                className="w-full pc:w-[200px]"
                name="position"
                trigger={trigger}
                type="text"
              />
            </div>

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex flex-col gap-1 pc:gap-2">
                <Label text="住所" required />
              </div>
              <div className="flex flex-col gap-1 pc:gap-2">
                <LabelSub htmlFor='addressZipCode' text="郵便番号" />
                <div className="flex items-start gap-4">
                  <Input
                    control={control}
                    className="w-[90px] pc:w-[120px]"
                    name="addressZipCode"
                    trigger={trigger}
                  />
                  <Button
                    className="px-3 pc:px-5 py-[6px]"
                    text="郵便番号検索"
                    disabled={!dirtyFields.addressZipCode}
                    onclick={() => getAddressFromZipcode()}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 pc:gap-2">
                <LabelSub htmlFor="addressPrefectures" text="都道府県" />
                <SelectBox
                  control={control}
                  className="w-[200px]"
                  name="addressPrefectures"
                  options={prefectureOptions}
                />
              </div>

              <div className="flex flex-col gap-1 pc:gap-2">

                <div className="text-body_sp">市区町村</div>
                <Input
                  control={control}
                  name="addressCity"
                  trigger={trigger}
                  className=" pc:w-[400px] sp:w-[222px]"
                />
              </div>

              <div className="flex flex-col gap-1 pc:gap-2">
                <div className="text-body_sp">番地</div>
                <Input
                  control={control}
                  name="addressAddress1"
                  trigger={trigger}
                  className=" pc:w-[400px] sp:w-[222px]"
                />
              </div>

              <div className="flex flex-col gap-1 pc:gap-2">
                <div className="text-body_sp">建物名・部屋番号</div>
                <Input
                  control={control}
                  name="addressAddress2"
                  trigger={trigger}
                  className="pc:w-full sp:w-[222px]"
                />
              </div>

            </div>

            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex flex-wrap items-center gap-4">
                <Label htmlfor="phoneNumber" text="電話番号" required />
              </div>
              <Input
                className="w-full pc:w-[240px]"
                control={control}
                name="phoneNumber"
                trigger={trigger}
                placeholder="09012345678"
                attention={<>つながりやすい連絡先をご入力ください<br className="block pc:hidden" />（ハイフン不要）</>}
              />
            </div>

            {/* -----    START EMAIL MARKUP SECTION   ----- */}
            <div className="flex flex-col gap-3 px-5 pc:gap-4 pc:px-10">
              <div className="flex flex-wrap items-center gap-4">
                <Label htmlfor="email" text="メールアドレス" required />
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
          <span className="inline-block text-[60px] pc:text-[80px] mx-auto text-core-red"><IoIosWarning /></span>
          <p className="text-body_sp pc:text-body_pc">
            編集の内容は破棄されます<br />
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
              onclick={() => router.push("/events")}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

