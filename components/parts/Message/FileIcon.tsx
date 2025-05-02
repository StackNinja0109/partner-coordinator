import { AiOutlineFile } from "react-icons/ai";
import Image from "next/image";

interface FileIconProps {
  extension: string,
}

const FileIcon: React.FC<FileIconProps> = ({ extension }) => {
  let ext = extension.toUpperCase();
  switch (ext) {
    case 'PDF':
      return (
        <Image src="/images/icons/pdf.svg" width={16} height={20} alt="" />
      );
    case 'XLS':
      return (
        <Image src="/images/icons/xlsx.svg" width={16} height={20} alt="" />
      );
    case 'XLSX':
      return (
        <Image src="/images/icons/xlsx.svg" width={16} height={20} alt="" />
      );
    case 'DOC':
      return (
        <Image src="/images/icons/docx.svg" width={16} height={20} alt="" />
      );
    case 'DOCX':
      return (
        <Image src="/images/icons/docx.svg" width={16} height={20} alt="" />
      );
    case 'PPT':
      return (
        <Image src="/images/icons/pptx.svg" width={16} height={20} alt="" />
      );
    case 'PPTX':
      return (
        <Image src="/images/icons/pptx.svg" width={16} height={20} alt="" />
      );
    case 'PNG':
      return (
        <Image src="/images/icons/png.svg" width={16} height={20} alt="" />
      );
    case 'JPG':
      return (
        <Image src="/images/icons/jpg.svg" width={16} height={20} alt="" />
      );
    default:
      return (
        <AiOutlineFile size={20} className="text-gray-gray" />
      );
  }
};

export default FileIcon;