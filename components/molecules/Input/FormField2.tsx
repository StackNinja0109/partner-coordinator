'use client'

import {
  Attention,
  AttentionType,
  Counter,
  CounterType,
} from "@/components/atoms";
import React from "react";

export interface FormFieldProps2 {
  className?: string;
  label?: string;
  error: string | undefined;
  counter?: number;
  currentNumber?: number;
  children: React.ReactNode;
}

export const FormField2 = ({
  className = '',
  label,
  error,
  counter,
  currentNumber = 0,
  children,
}: FormFieldProps2) => {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      {children}
      <div className="flex flex-row justify-between">
        {error ? (
          <Attention status={AttentionType.ERROR} text={error} />
        ) : label ? (
          <Attention text={label} />
        ) : (
          <div></div>
        )}
        {counter ? (
          <Counter
            currentNumber={currentNumber}
            totalNumber={counter}
            status={error ? CounterType.ERROR : CounterType.DEFAULT}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
