import { format, isToday } from 'date-fns';
import { ja } from 'date-fns/locale';
import React, { forwardRef, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2 } from 'react-icons/bs';
import { GoTriangleDown } from 'react-icons/go';

interface ExampleCustomInputProps {
  value: string;
  isClicked: boolean;
  onClick: () => void;
}

const ExampleCustomInput = forwardRef<HTMLButtonElement, ExampleCustomInputProps>(
  ({ value, isClicked, onClick }, ref) => (
    <>
      {
        <div className='w-[100%] h-[34px] py-[7px] pl-[14px] pr-[10px] flex justify-between gap-[4px] text-gray-gray_dark border border-gray-gray_dark rounded cursor-pointer' onClick={onClick}>
          <div className='flex gap-[2px] self-center items-center'>
            <BsCalendar2 className='font-bold w-[16px] h-[16px]' />
            <p className='text-[14px] text-gray-black'>{format(new Date(value), 'yyyy/MM/dd (E)', { locale: ja })}</p>
          </div>
          <div className='self-center'>
            <GoTriangleDown className='text-gray-black w-[16px] h-[9px]' />
          </div>
        </div>
      }
    </>
  )
);

ExampleCustomInput.displayName = 'ExampleCustomInput';

export interface DatePickerComponentProps {
  handleChangeDate: (date: Date) => void
  isDisabled?: boolean
  value: Date
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ handleChangeDate, isDisabled = false, value }) => {
  const [date, setDate] = useState(value)
  const [isClicked, setIsClicked] = useState(false)

  const handleChange = (date: Date) => {
    setDate(date)
    setIsClicked(true)
    handleChangeDate(date)
  }

  return (
    <DatePicker
      disabled={isDisabled}
      selected={date}
      onChange={handleChange}
      customInput={<ExampleCustomInput value={date.toDateString()} isClicked={isClicked} onClick={() => handleChangeDate} />}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      locale={ja}
    />
  );
};

DatePickerComponent.displayName = 'DatePickerComponent';

export default DatePickerComponent;