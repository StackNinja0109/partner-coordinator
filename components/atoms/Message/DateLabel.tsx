'use client'

interface DateLabelProps {
  className?: string,
  label: string
}

const DateLabel: React.FC<DateLabelProps> = ({ className = '', label }) => {
  return (
    <div className={`inline-block text-timestamp text-gray-black px-[9px] py-[6px] border border-gray-gray rounded-[20px] bg-gray-white text-center ${className}`}>
      <span>{label}</span>
    </div>
  );
};

export default DateLabel;