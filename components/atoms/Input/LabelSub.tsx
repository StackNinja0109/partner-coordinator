'use client'

interface LabelSubProps {
  htmlFor?: string;
  text: string;
}


const LabelSub: React.FC<LabelSubProps> = ({ htmlFor = '', text }) => {
  return (
    <label className="block text-body_sp" htmlFor={htmlFor}>{text}</label>
  );
}

export default LabelSub;