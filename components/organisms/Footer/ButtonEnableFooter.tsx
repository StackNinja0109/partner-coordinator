'use client'

import Button, {
  ButtonArrow,
  ButtonColor,
  ButtonIcon,
  ButtonShape,
  ButtonSize,
} from "@/components/atoms/Button/Button";
import React from "react";

const LeftSideBar = () => {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.29593 14C8.0566 14 7.82431 13.8771 7.69057 13.6458L0.362904 1.09544C0.16581 0.755653 0.271396 0.307427 0.602232 0.105002C0.940107 -0.104652 1.36949 0.0110196 1.56658 0.350804L8.90129 12.9084C9.09838 13.2481 8.99279 13.6964 8.66196 13.8988C8.54933 13.9711 8.42263 14 8.30297 14H8.29593Z"
        fill="#307DC1"
      />
    </svg>
  );
};

const RightSideBar = () => {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.700929 13.9928C0.581265 13.9928 0.454555 13.9566 0.34193 13.8916C0.0110937 13.6893 -0.101529 13.2413 0.102604 12.9017L7.43027 0.350623C7.6344 0.0110139 8.06378 -0.104598 8.39462 0.104948C8.72546 0.307268 8.83808 0.755263 8.63395 1.09487L1.29924 13.6459C1.1655 13.8699 0.933211 14 0.693883 14L0.700929 13.9928Z"
        fill="#307DC1"
      />
    </svg>
  );
};

const MobileIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66671 4.66675H7.33337V6.00008H8.66671V4.66675ZM8.00004 7.33341C7.63337 7.33341 7.33337 7.63341 7.33337 8.00008L7.33337 10.6667C7.33337 11.0334 7.63337 11.3334 8.00004 11.3334C8.36671 11.3334 8.66671 11.0334 8.66671 10.6667V8.00008C8.66671 7.63341 8.36671 7.33341 8.00004 7.33341ZM11.3334 0.673415L4.66671 0.666748C3.93337 0.666748 3.33337 1.26675 3.33337 2.00008L3.33337 14.0001C3.33337 14.7334 3.93337 15.3334 4.66671 15.3334H11.3334C12.0667 15.3334 12.6667 14.7334 12.6667 14.0001V2.00008C12.6667 1.26675 12.0667 0.673415 11.3334 0.673415ZM11.3334 12.6667H4.66671L4.66671 3.33341L11.3334 3.33341V12.6667Z"
        fill="#307DC1"
      />
    </svg>
  );
};

export const ButtonEnableFooter = () => {
  return (
    <div
      style={{ background: "rgba(255, 255, 255, 0.9)" }}
      className=" w-[360px] flex flex-col gap-[18px] py-5 items-center border-t border-gray-gray text-core-blue"
    >
      <div className="flex flex-row items-start gap-1 text-mini_b">
        <LeftSideBar />
        <div>ご応募お待ちしています！</div>
        <RightSideBar />
      </div>
      <Button
        size={ButtonSize.SP}
        color={ButtonColor.SUB}
        shape={ButtonShape.ELLIPSE}
        icon={ButtonIcon.OFF}
        arrow={ButtonArrow.OFF}
        disabled={false}
        text="応募する"
        onclick={() => {
          console.log("button clicked");
        }}
        className="px-[47px] py-[7px]"
      />
      <div className="flex flex-row items-start gap-1 text-mini">
        <MobileIcon />
        <div>応募ボタンを押すとどうなるの？</div>
      </div>
    </div>
  );
};
