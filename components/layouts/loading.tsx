'use client'

import React from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
  className?: string;
}

export default function Loading({ className }: Props) {
  return (
    <div
      className={`absolute top-0 left-0 z-[999] w-full h-full flex items-center justify-center bg-white bg-opacity-50 ${className}`}
    >
      <ClipLoader color='#AFAFAF' />
    </div>
  );
}
