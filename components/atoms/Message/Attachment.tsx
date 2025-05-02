'use client'

import { ImAttachment } from "react-icons/im";
import { v4 } from 'uuid'

interface AttachmentProps {
  className?: string,
  isLabel: boolean,
  fileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Attachment: React.FC<AttachmentProps> = ({ className = '', isLabel, fileUpload }) => {
  return (
    <div key={v4()} className={className}>
      <label htmlFor="inputFile" className="inline-flex items-end gap-1 cursor-pointer">
        <ImAttachment className="text-core-sky" />
        {isLabel && (
          <span className="text-small text-core-sky">ファイル添付</span>
        )}
      </label>
      <input id="inputFile" type="file" hidden multiple onChange={fileUpload} />
    </div>
  );
};

export default Attachment;