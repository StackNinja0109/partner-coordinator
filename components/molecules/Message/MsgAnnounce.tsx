'use client'

import { AlreadyReadLabel } from "@/components/parts/Message/AlreadyReadLabel";
import { TimeStamp } from "@/components/parts/Message/TimeStamp";
import { BsCheckCircle } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

interface MsgAnnounceProps {
  projectId: string;
  className?: string;
  schedule: {
    [key: string]: string[];
  };
  time: string;
  readStatus: boolean;
}

const MsgAnnounce: React.FC<MsgAnnounceProps> = ({
  projectId,
  className = "",
  time,
  readStatus,
}) => {
  return (
    <div className={`${className} inline-flex gap-1 items-end`}>
      <div className="relative pl-2">
        <span className="absolute top-0 left-0">
          <svg
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0C1.99997 2.00049 8.66668 3.33333 11 3C8.50001 5.5 8.00001 9 8.00001 9C2.5 8 0 0 0 0Z"
              fill="#FDF8E9"
            />
          </svg>
        </span>
        <div
          className={`${className} w-[298px] bg-light-yellow_light inline-block p-[14px] rounded-[10px]`}
        >
          <div className="flex justify-center items-end gap-[5.5px] text-core-red text-small">
            <BsCheckCircle size={15} />
            <span>応募が完了しました！</span>
          </div>
          <div className="my-2 border-dashed pt-[10px] pb-2 px-[11.5px] border-y text-gray-black border-gray-black">
            <div className="text-center">
              <Image src="/images/icons/ball.svg" width={40} height={40} className="mx-auto" alt="" />
            </div>
            <h2 className="text-center text-body_sp mt-[10px]">
              ○○県甲府市エリア 中学校
              <br />
              サッカー / 男子
            </h2>
            <p className="mt-2 text-mini">【チームからの勤務希望】</p>
            {/* <Schedule className="mt-1" schedule={schedule} size="mini" /> */}
          </div>
          <p className="mb-2 text-center text-gray-black text-body_sp">
            詳細を確認して回答してください
          </p>
          <div className="text-center">
            <Link
              href={`projects/${projectId}`}
              className="inline-block mx-auto text-gray-white text-body_sp px-[26px] py-[7px] bg-core-blue rounded-full"
            >
              募集詳細をみる
            </Link>
          </div>
        </div>
      </div>
      <div>
        {readStatus && <AlreadyReadLabel />}
        <TimeStamp label={time} />
      </div>
    </div>
  );
};

export default MsgAnnounce;
