'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button, { ButtonColor, ButtonShape, ButtonType } from "@/components/atoms/Button/Button";
import { IoIosWarning } from "react-icons/io";
import { MdCampaign } from "react-icons/md";

import Schedule from "@/components/molecules/Table/Schedule";
import Modal from "@/components/molecules/Modal/Modal";
import { EventProject } from "@/features/events/shared/types";
import Loading from "@/components/layouts/loading";
import { fromTimestampToString, fromTimestampToStringWithDay } from "@/utils/convert";
import { useRecoilState } from "recoil";
import { eventsRepository } from "@/features/events/repositories/eventsRepository";
import { Timestamp } from "firebase/firestore";

const trStyle = 'border-b border-gray-gray';

const firstTdStyle = [
  'px-[10px] py-5',
  'text-small pc:text-h4',
  'w-[100px] min-w-[100px] pc:w-[150px]',
].join(' ');

const secondTdStyle = [
  'px-5 py-5',
  'text-timestamp pc:text-body_sp'
].join(' ');


interface RecruitmentTabProps {
  event: EventProject
  statusTabIndex: {status: string, tabIndex: number}
  setStatusTabIndex: ({status, tabIndex}: {status: string, tabIndex: number}) => void
}

const RecruitmentEventTab: React.FC<RecruitmentTabProps> = ({ event, statusTabIndex, setStatusTabIndex }) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const id = event.id ? event.id : ""

  // -----    START EVENT EDIT SECTION   ----- //
  const handleClickEdit = () => {
    router.push(`/events/prepare/${id}/edit`);
  }
  // *****    END EVENT EDIT SECTION   ***** //

  // -----    START RECRUITMENT START SECTION   ----- //
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleClickStart = async () => {
    openStartModal();
  }

  const openStartModal = () => {
    setIsStartModalOpen(true);
  };

  const closeStartModal = () => {
    setIsStartModalOpen(false);
  };

  const startRecruitment = async () => {
    setIsLoading(true);

    await eventsRepository.inPublicEvent({
      eventId: id,
    })

    setStatusTabIndex({
      status: 'inpublic',
      tabIndex: 1,
    })
    setIsLoading(false)
    closeStartModal()
  }
  // *****    END RECRUITMENT START SECTION   ***** //

  // -----    START PROJECT DELETE SECTION   ----- //
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // -----    START TO PREPARATION SECTION   ----- //
  const handleClickToPrepare = async () => {
    setIsLoading(true);

    await eventsRepository.inPreparationEvent({
      eventId: id,
    })
    setStatusTabIndex({
      status: 'inpreparation',
      tabIndex: 0,
    })

    setIsLoading(false);
    router.push(`/events/${id}`);
  }
  // *****    END TO PREPARATION SECTION   ***** //

  // -----    START RECRUITMENT FINISH SECTION   ----- //
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const openFinishModal = () => {
    setIsFinishModalOpen(true);
  };

  const closeFinishModal = () => {
    setIsFinishModalOpen(false);
  };

  const handleClickFinish = async () => {
    setIsLoading(true);

    await eventsRepository.inFinishProject({
      eventId: id,
    });

    setStatusTabIndex({
      status: 'finished',
      tabIndex: 1,
    })
    setIsLoading(false)
    closeFinishModal()

    router.push(`/events/${id}`);
  }
  // *****    END RECRUITMENT FINISH SECTION   ***** //

  const { workplace, officeHours, officeHoursNote, jobDescription, salary, gender, people, note } = event;

  const isStartDisabled = !workplace || officeHours.length === 0 || gender === '' || jobDescription === '' || salary === ''

  return (
    <div>
      {isLoading && <Loading />}
      <table className="w-full border-t border-gray-gray">
        <tbody>
          <tr className={trStyle}>
            <td className={firstTdStyle}>主な勤務地</td>
            <td className={secondTdStyle}>{workplace.prefecture} {workplace.city} {workplace.address1}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>勤務時間</td>
            <td className={secondTdStyle}>
              {officeHours.map((officeHour, index) => (
                <div key={index} className="mt-1">
                  {fromTimestampToStringWithDay(officeHour.date as Timestamp)}&nbsp;&nbsp;{officeHour.start.hour}:{officeHour.start.min}～{officeHour.end.hour}:{officeHour.end.min}
                </div>
              ))}
              <div className="mt-1">{officeHoursNote}</div>
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>性別</td>
            <td className={secondTdStyle}>{gender}</td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>業務の内容</td>
            <td className={secondTdStyle}>
              {jobDescription.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>給与・報酬</td>
            <td className={secondTdStyle}>
              {salary.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>求める人材</td>
            <td className={secondTdStyle}>
              {people?.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
          <tr className={trStyle}>
            <td className={firstTdStyle}>備考</td>
            <td className={secondTdStyle}>
              {note?.split('\n').map((item, index) => (
                <div key={index} className="mt-1">
                  {item}
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      {statusTabIndex.status === 'inpreparation' && (
        <>
          <p className="mt-10 text-center text-body_sp pc:text-body_pc">
            給与・報酬面など内容を確認のうえ, 募集を開始してください
          </p>
          <div className="flex justify-center gap-5 mt-[30px]">
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              buttonType={ButtonType.SECONDARY}
              text="編集する"
              color={ButtonColor.SUB}
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickEdit}
            />
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              text="募集を開始する"
              disabled={isStartDisabled}
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickStart}
            />
          </div>

          <Modal isOpen={isStartModalOpen} onClose={closeStartModal}>
            <div className="text-center">
              <p className="text-h4 pc:text-h3">募集を開始しました</p>
              <span className="inline-block text-[60px] pc:text-[80px] mt-5 mx-auto text-core-blue"><MdCampaign /></span>
              <p className="mt-5 text-body_sp pc:text-body_pc">
                候補を確認して<br />
                スカウトを送信してください
              </p>
              <div className="flex justify-center mt-5">
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.SUB}
                  shape={ButtonShape.ELLIPSE}
                  text="候補を確認する"
                  onclick={startRecruitment}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
      {statusTabIndex.status === 'inpublic' && (
        <>
          <p className="mt-10 text-center text-body_sp pc:text-body_pc">
            内容を編集する場合は準備中にしてください
          </p>
          <div className="flex justify-center gap-5 mt-[30px]">
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              buttonType={ButtonType.DEFAULT}
              text="準備中にする"
              color={ButtonColor.CANCEL}
              shape={ButtonShape.ELLIPSE}
              onclick={handleClickToPrepare}
            />
            <Button
              className="w-[150px] pc:w-[200px] h-12 pc:h-[56px]"
              text="募集を終了する"
              shape={ButtonShape.ELLIPSE}
              onclick={openFinishModal}
            />
          </div>

          <Modal isOpen={isFinishModalOpen} onClose={closeFinishModal}>
            <div className="text-center">
              <p className="text-h4 pc:text-h3">募集を終了する</p>
              <span className="inline-block text-[60px] pc:text-[80px] mt-5 mx-auto text-core-red"><IoIosWarning /></span>
              <p className="mt-5 text-body_sp pc:text-body_pc">
                この募集を終了します<br />
                よろしいですか？<br />
                ※ 終了した募集を再開することはできません
              </p>
              <div className="flex gap-3 mt-5 pc:gap-5">
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.CANCEL}
                  shape={ButtonShape.ELLIPSE}
                  text="キャンセル"
                  onclick={closeFinishModal}
                />
                <Button
                  className="w-[100px] pc:w-[200px] py-2 pc:py-[17.5px]"
                  color={ButtonColor.WARNING}
                  shape={ButtonShape.ELLIPSE}
                  text="終了する"
                  onclick={handleClickFinish}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default RecruitmentEventTab