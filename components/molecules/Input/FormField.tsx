'use client'

import {
  Attention,
  AttentionProps,
  AttentionType,
  Counter,
  CounterProps,
  CounterType,
  Input,
  InputProps,
  InputStatus,
} from "@/components/atoms";
import { Control } from "react-hook-form";

export interface FormFieldProps {
  className?: string;
  control: Control<any>;
  input: InputProps;
  attention?: AttentionProps;
  counter?: CounterProps;
  error?: string;
}

export const FormField = ({
  className = '',
  input,
  attention,
  counter,
  error,
  control,
}: FormFieldProps) => {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <Input
        type={input.type}
        status={
          error
            ? input.status == InputStatus.PASSWORD
              ? InputStatus.PASSWORD_ERROR
              : InputStatus.ERROR
            : input.status
        }
        placeholder={input.placeholder}
        disabled={input.disabled}
        setCurrentNumber={input.setCurrentNumber}
        maxlength={counter?.totalNumber}
        value={input.value}
        control={control}
        name={input.name}
        rounded={input.rounded}
        className={input.className}
      />
      <div className="flex flex-row justify-between">
        {attention ? (
          <Attention
            status={error ? AttentionType.ERROR : attention.status}
            text={error ? error : attention.text}
          />
        ) : (
          <div></div>
        )}
        {counter ? (
          <Counter
            currentNumber={counter.currentNumber}
            totalNumber={counter.totalNumber}
            status={error ? CounterType.ERROR : counter.status}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
