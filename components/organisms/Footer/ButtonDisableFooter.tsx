'use client'

import Button, {
  ButtonArrow,
  ButtonColor,
  ButtonIcon,
  ButtonShape,
  ButtonSize,
} from "@/components/atoms/Button/Button";
import React from "react";

export const ButtonDisableFooter = () => {
  return (
    <div
      style={{ background: "rgba(255, 255, 255, 0.9)" }}
      className=" w-[360px] flex flex-col gap-5 py-5 items-center border-t border-gray-gray "
    >
      <Button
        size={ButtonSize.SP}
        color={ButtonColor.CANCEL}
        shape={ButtonShape.ELLIPSE}
        icon={ButtonIcon.OFF}
        arrow={ButtonArrow.OFF}
        disabled={true}
        text="応募済み"
        onclick={() => {
          console.log("button clicked");
        }}
        className="px-[47px] py-[7px]"
      />
      <div className="flex flex-row items-start gap-1 text-mini text-gray-gray_dark">
        --- ご応募ありがとうございます ---
      </div>
    </div>
  );
};
