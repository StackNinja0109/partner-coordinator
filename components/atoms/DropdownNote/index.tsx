import { DropDownProps, Dropdown, Input } from 'antd'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './index.module.scss'

type DropdownNoteProps = DropDownProps & {
  value: string
  onChange?: (value: string) => void
}

export const DropdownNote = ({
  value,
  onChange,
  ...props
}: DropdownNoteProps) => {
  return (
    <Dropdown
      rootClassName="z-[100]"
      menu={{
        className: `px-10 text-center !rounded !w-[300px] !bg-light-yellow_light ${styles.dropdown_note}`,
        items: [
          {
            key: 0,
            className: '!p-0',
            label: (
              <span className="mr-2 flex justify-end">
                <AiOutlineClose className="text-xl text-gray-gray_dark" />
              </span>
            ),
          },
          {
            key: 1,
            className: '!p-0 text-left',
            label: (
              <span
                className={`mt-5 inline-block cursor-default ${styles.dropdown_note_content}`}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Input.TextArea
                  value={value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="!min-h-[250px] !border-transparent !bg-transparent p-0 !shadow-none"
                />
              </span>
            ),
          },
        ],
      }}
      placement="bottomRight"
      trigger={['click']}
      {...props}
    />
  )
}
