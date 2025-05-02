import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TimePicker } from 'antd';
import locale from "antd/es/date-picker/locale/ja_JP";

export interface TimePickerComponentProps {
  handleChangeTime: (time: string) => void
  value: string
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({ handleChangeTime, value }) => {
  const format = 'HH:mm';
  const [time, setTime] = useState(value);
  // useEffect(() => (
  //   handleChangeTime(time)
  // ), [])

  const onChange = (time: dayjs.Dayjs | null, timeString: string) => {
    if (time) {
      setTime(timeString)
      handleChangeTime(timeString)
    }
  };

  const onSelect = (time: dayjs.Dayjs | null) => {
    if (time) {
      setTime(time.format('HH:mm'))
      handleChangeTime(time.format('HH:mm'))
    }
  }

  return (
    <TimePicker value={dayjs(value, format)}
      onChange={onChange}
      onSelect={onSelect}
      allowClear={false}
      suffixIcon={null}
      format={format}
      locale={{
        ...locale,
        lang: {
          ...locale.lang,
          now: "現在",
          ok: "提出",
        }
      }}
      style={{
        height: "auto",
        width: "auto",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "25px",
        margin: "0px",
        padding: "6px",
        textAlign: "center",
      }}
    />
  )
}

export default TimePickerComponent;