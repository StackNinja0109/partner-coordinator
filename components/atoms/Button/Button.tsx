'use client'

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";

export const PersonIcon = ({
  fill,
  iconStyle,
}: {
  fill: string;
  iconStyle: string;
}) => {
  return (
    <svg
      className={iconStyle + " " + fill}
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C10.1 0 11 0.9 11 2C11 3.1 10.1 4 9 4C7.9 4 7 3.1 7 2C7 0.9 7.9 0 9 0ZM17 7H12V19C12 19.55 11.55 20 11 20C10.45 20 10 19.55 10 19V14H8V19C8 19.55 7.55 20 7 20C6.45 20 6 19.55 6 19V7H1C0.45 7 0 6.55 0 6C0 5.45 0.45 5 1 5H17C17.55 5 18 5.45 18 6C18 6.55 17.55 7 17 7Z" />
    </svg>
  );
};

export enum ButtonSize {
  PC,
  SP,
}

export enum ButtonColor {
  DEFAULT,
  SUB,
  CANCEL,
  WARNING,
}

export enum ButtonType {
  DEFAULT,
  SECONDARY,
}

export enum ButtonShape {
  RECTANGLE,
  ELLIPSE,
}

export enum ButtonIcon {
  OFF,
  FRONT,
  BACK,
}

export enum ButtonArrow {
  OFF,
  LEFT,
  RIGHT,
}

export interface ButtonProps {
  size?: ButtonSize;
  color?: ButtonColor;
  buttonType?: ButtonType;
  type?: "button" | "submit" | "reset" | undefined;
  shape?: ButtonShape;
  disabled?: boolean;
  icon?: ButtonIcon;
  arrow?: ButtonArrow;
  text: any;
  onclick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconComponent?: React.ReactNode;
  style?: CSSProperties | undefined;
  className?: string;
}

export const getBackgroundColor = (color: ButtonColor, type: ButtonType) => {
  let backgroundColor = "";
  let fillIcon = "";
  if (type === ButtonType.DEFAULT) {
    backgroundColor = " text-gray-white ";
    fillIcon = " fill-gray-white ";
    switch (color) {
      case ButtonColor.DEFAULT:
        backgroundColor += " bg-core-sky ";
        break;
      case ButtonColor.SUB:
        backgroundColor += " bg-core-blue ";
        break;
      case ButtonColor.CANCEL:
        backgroundColor += " bg-gray-gray_dark ";
        break;
      case ButtonColor.WARNING:
        backgroundColor += " bg-core-red ";
        break;
    }
  }
  if (type === ButtonType.SECONDARY) {
    backgroundColor = " bg-gray-white border-[1px] ";
    switch (color) {
      case ButtonColor.DEFAULT:
        backgroundColor += " text-core-sky border-core-sky ";
        fillIcon = " fill-core-sky ";
        break;
      case ButtonColor.SUB:
        backgroundColor += " text-core-blue border-core-blue ";
        fillIcon = " fill-core-blue ";
        break;
      case ButtonColor.CANCEL:
        backgroundColor += " text-gray-gray_dark border-gray-gray_dark ";
        fillIcon = " fill-gray-gray_dark ";
        break;
      case ButtonColor.WARNING:
        backgroundColor += " text-core-red border-core-red ";
        fillIcon = " fill-core-red ";
        break;
    }
  }

  return { backgroundColor, fillIcon };
};

const getShapeStyle = (shape: ButtonShape) => {
  let shapeStyle = "";
  switch (shape) {
    case ButtonShape.RECTANGLE:
      shapeStyle = "rounded-[4px]";
      break;
    case ButtonShape.ELLIPSE:
      shapeStyle = "rounded-[100px]";
      break;
  }
  return shapeStyle;
};

const getArrowPaddingStyle = (arrow: ButtonArrow, size: ButtonSize) => {
  let arrowPaddingStyle = "";
  if (size === ButtonSize.PC) {
    switch (arrow) {
      case ButtonArrow.LEFT:
        arrowPaddingStyle = " pl-2 ";
        break;
      case ButtonArrow.RIGHT:
        arrowPaddingStyle = " pr-2 right-0 ";
        break;
    }
  }
  if (size === ButtonSize.SP) {
    switch (arrow) {
      case ButtonArrow.LEFT:
        arrowPaddingStyle = " pl-1 ";
        break;
      case ButtonArrow.RIGHT:
        arrowPaddingStyle = " pr-1 right-0 ";
        break;
    }
  }
  return arrowPaddingStyle;
};

export const getIconStyle = (icon: ButtonIcon, size: ButtonSize) => {
  let iconStyle = "";
  if (size === ButtonSize.PC) {
    iconStyle = "w-[18px] h-5 ";
    switch (icon) {
      case ButtonIcon.FRONT:
        iconStyle += "mr-1";
        break;
      case ButtonIcon.BACK:
        iconStyle += "ml-1";
        break;
    }
  }
  if (size === ButtonSize.SP) {
    iconStyle = "w-[15px] h-[16.7px] ";
    switch (icon) {
      case ButtonIcon.FRONT:
        iconStyle += "mr-1";
        break;
      case ButtonIcon.BACK:
        iconStyle += "ml-1";
        break;
    }
  }
  return iconStyle;
};

const Button: React.FC<ButtonProps> = ({
  size = ButtonSize.PC,
  color = ButtonColor.DEFAULT,
  type = 'button',
  buttonType = ButtonType.DEFAULT,
  shape = ButtonShape.RECTANGLE,
  disabled = false,
  icon = ButtonIcon.OFF,
  arrow = ButtonArrow.OFF,
  text,
  onclick,
  iconComponent,
  style,
  className = "",
}: ButtonProps) => {
  const { backgroundColor, fillIcon } = getBackgroundColor(color, buttonType);
  const shapeStyle = getShapeStyle(shape);
  const opacity = disabled ? " opacity-40 " : " ";
  const arrowPaddingStyle = getArrowPaddingStyle(arrow, size);

  return (
    <button
      className={
        // w-[150px]
        "flex flex-row items-center relative whitespace-nowrap pc:text-body_pc text-body_sp " +
        backgroundColor +
        shapeStyle +
        opacity +
        className
      }
      type={type}
      onClick={(e) => onclick(e)}
      disabled={disabled}
      style={style}
    >
      {arrow == ButtonArrow.LEFT && (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={"absolute pc:w-4 pc:h-4 sp:w-3 sp:h-3 " + arrowPaddingStyle}
        />
      )}
      <div className="flex items-center m-auto">
        {icon == ButtonIcon.FRONT && iconComponent}
        {text}
        {icon == ButtonIcon.BACK && iconComponent}
      </div>
      {arrow == ButtonArrow.RIGHT && (
        <FontAwesomeIcon
          icon={faChevronRight}
          className={"absolute pc:w-4 pc:h-4 sp:w-3 sp:h-3 " + arrowPaddingStyle}
        />
      )}
    </button>
  );
};

export default Button;
