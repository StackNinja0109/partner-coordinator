'use client'

import BackButton from '@/components/atoms/Button/BackButton';
import Button, { ButtonColor, ButtonShape, ButtonType } from "@/components/atoms/Button/Button";
import { Attention, Label, TopPageCaption } from "@/components/atoms";
import { useProjectConfirmProvider } from "../providers/useProjectConfirmProvider"
import Loading from '@/components/layouts/loading';
import Schedule from "@/components/molecules/Table/Schedule";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequiredLabel } from '@/components/atoms';
import Link from 'next/link';

const trStyle = [
  'border-b border-gray-gray',
  'flex flex-col gap-1 pc:flex-row',
].join(' ')

const firstTdStyle = [
  'px-[10px] pt-5 pc:py-5',
  'text-h5 pc:text-h4',
  'w-[200px]',
].join(' ');

const secondTdStyle = [
  'px-[10px] pb-5 pc:py-5',
  'text-timestamp pc:text-body_sp',
  'shrink-1',
].join(' ');

const ProjectConfirmPage = () => {
  const {
    project,
    onSubmit,
    openCancelModal,
    isLoading,
  } = useProjectConfirmProvider()

  const { organizationName, workplace, workingHours, activityDescription, desiredSalary,
    gender, name, position, phoneNumber, email, eventName,
    desiredGender, desiredAge, desiredQualifications, desiredTalent, desiredNote } = project;

  return (
    <div className="relative flex flex-col w-full gap-8 p-5 text-center pc:gap-10 pc:p-10 bg-gray-gray_lighter">
      {isLoading && <Loading />}
      <BackButton className="absolute top-5 pc:top-10 left-5 pc:left-10" onClick={openCancelModal} />
      <h1 className="text-h2 pc:text-h1">募集依頼詳細</h1>
      <div className="flex flex-col pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
        <TopPageCaption
          title="学校・チーム情報"
          subTitle="※学校・チーム名はスカウトした候補者のみに提示されます"
        />
        <div className='pt-2 pc:pt-5 px-5 pc:px-10'>
          <div className="flex flex-col gap-1 px-[10px] pc:py-5">
            <h2 className="text-h4 pc:text-h2">{organizationName}&nbsp;&nbsp;/&nbsp;&nbsp;{eventName}&nbsp;&nbsp;{project.gender}</h2>
            <p className="text-h5 pc:text-h3">募集人数：{project.recruitment}名</p>
          </div>
          <table className="w-full border-t border-gray-gray">
            <tbody>
              <tr className={trStyle}>
                <td className={firstTdStyle}>募集依頼先</td>
                <td className={secondTdStyle}>{organizationName}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>主な勤務地</td>
                <td className={secondTdStyle}>{workplace.prefecture}{workplace.city}{workplace.address1}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>勤務時間</td>
                <td className={secondTdStyle}>
                  <Schedule className="w-full" schedule={workingHours} size="scale" />
                  <div className="mt-[10px]">
                    {workingHours.note}
                  </div>
                </td>
              </tr>
              <tr className={`${trStyle} border-none`}>
                <td className={firstTdStyle}>活動の紹介</td>
                <td className={secondTdStyle}>
                  {activityDescription.split('\n').map((item, index) => (
                    <div key={index} className="mt-1">
                      {item}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
        <TopPageCaption
          title="希望条件"
          subTitle="がついている項目は募集者に公開されません"
          isLockIcon
        />
        <div className='px-5 pc:px-10'>
          <table className="w-full border-gray-gray">
            <tbody>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex gap-1 items-center'>
                    <span>性別</span>
                    <FontAwesomeIcon className='text-mini' icon={faLock} />
                  </div>
                </td>
                <td className={secondTdStyle}>{gender}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex gap-1 items-center'>
                    <span>年齢</span>
                    <FontAwesomeIcon className='text-mini' icon={faLock} />
                  </div>
                </td>
                <td className={secondTdStyle}>{desiredAge.join('、')}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex items-center gap-4 justify-start pc:justify-between'>
                    <span>資格に関する希望</span>
                    <RequiredLabel required={false} />
                  </div>
                </td>
                <td className={secondTdStyle}>{desiredQualifications}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex items-center gap-4 justify-start pc:justify-between'>
                    <span>求める人材</span>
                    <RequiredLabel required={false} />
                  </div>
                </td>
                <td className={secondTdStyle}>{desiredTalent}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex items-center gap-4 justify-start pc:justify-between'>
                    <span>給与・報酬</span>
                    <RequiredLabel required={false} />
                  </div>
                </td>
                <td className={secondTdStyle}>{desiredSalary}</td>
              </tr>
              <tr className={`${trStyle} border-none`}>
                <td className={firstTdStyle}>
                  <div className="flex items-center gap-4 justify-start pc:justify-between">
                    <div className='flex gap-1 items-center'>
                      <span>備考</span>
                      <FontAwesomeIcon className='text-mini' icon={faLock} />
                    </div>
                    <RequiredLabel required={false} />
                  </div>
                </td>
                <td className={secondTdStyle}>{desiredNote}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col pc:max-w-[880px] w-full text-left mx-auto bg-gray-white rounded-[10px] border border-gray-gray">
        <TopPageCaption
          title="基本情報"
          subTitle="がついている項目は募集者に公開されません"
          isLockIcon
        />
        <div className='px-5 pc:px-10'>
          <table className="w-full border-gray-gray">
            <tbody>
              <tr className={`${trStyle}`}>
                <td className={firstTdStyle}>
                  <div className='flex gap-1 items-center'>
                    <span>担当者名</span>
                    <FontAwesomeIcon className='text-mini' icon={faLock} />
                  </div>
                </td>
                <td className={secondTdStyle}>
                  <p>{name.sei}　{name.mei}</p>
                  <p>{name.seiKana}　{name.meiKana}</p>
                </td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className='flex items-center gap-4 justify-start pc:justify-between'>
                    <div className='flex gap-1 items-center'>
                      <span>役職</span>
                      <FontAwesomeIcon className='text-mini' icon={faLock} />
                    </div>
                    <RequiredLabel required={false} />
                  </div>
                </td>
                <td className={secondTdStyle}>{position}</td>
              </tr>
              <tr className={trStyle}>
                <td className={firstTdStyle}>
                  <div className="flex gap-1 items-center">
                    <span>電話番号</span>
                    <FontAwesomeIcon className='text-mini' icon={faLock} />
                  </div>
                </td>
                <td className={secondTdStyle}>{phoneNumber}</td>
              </tr>
              <tr className={`${trStyle} border-none`}>
                <td className={firstTdStyle}>
                  <div className="flex gap-1 items-center">
                    <span>メールアドレス</span>
                    <FontAwesomeIcon className='text-mini' icon={faLock} />
                  </div>
                </td>
                <td className={secondTdStyle}>{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pc:max-w-[880px] w-full text-left mx-auto justify-center">
        <div className='flex flex-col pc:flex-row gap-3 pc:gap-10 w-full justify-center items-center'>
          <Button
            text={
              <div className="flex flex-row gap-[2px] items-center">
                <div>PDFダウンロード</div>
              </div>
            }
            color={ButtonColor.SUB}
            buttonType={ButtonType.SECONDARY}
            onclick={() => { }}
            className="pc:px-[47px] sp:w-[222px] py-[6px] "
          />
          <Button
            text={
              <div className="flex flex-row gap-[2px] items-center">
                <div>編集する</div>
              </div>
            }
            color={ButtonColor.SUB}
            buttonType={ButtonType.SECONDARY}
            onclick={() => { }}
            className="pc:px-[47px] sp:w-[222px] py-[6px] "
          />
        </div>
        <div className="flex flex-col items-center pt-10 gap-[6px]">
            <p>内容をご確認のうえ送信してください</p>
            <div className='flex flex-col pc:flex-row items-center justify-center gap-[6px]'>
              <p>{"募集依頼を送信すると, "}</p>
              <Link href="" className='text-core-blue border-b border-core-blue'>
                個人情報の取り扱い
              </Link>
              <p>{" について同意したものとみなされます。"}</p>
            </div>
        </div>
        <div className="pt-10 pb-5">
          <Button
            className="px-[60px] py-[16px] mx-auto "
            text="募集依頼を送信する"
            shape={ButtonShape.ELLIPSE}
            type="submit"
            onclick={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectConfirmPage