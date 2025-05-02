'use client'

import React from "react";

export enum AttentionType {
  DEFAULT,
  DISABLED,
  ERROR,
}

export interface AttentionProps {
  status?: AttentionType;
  text?: string;
}

export const Attention = ({
  status = AttentionType.DEFAULT,
  text = "テキスト",
}: AttentionProps) => {
  let textStyle = "";
  switch (status) {
    case AttentionType.DEFAULT:
      textStyle = "text-gray-black";
      break;
    case AttentionType.DISABLED:
      textStyle = "text-gray-black opacity-40";
      break;
    case AttentionType.ERROR:
      textStyle = "text-core-red";
      break;
  }

  return <div className={"pc:text-timestamp text-mini " + textStyle}>{text}</div>;
};
