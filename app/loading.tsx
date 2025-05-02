import React from 'react';

interface Props {
  className?: string;
}

export default function Loading({ className }: Props) {
  return (
    <div
      className={`fixed w-full h-screen flex items-center justify-center bg-white bg-opacity-50 ${className}`}
    >
      <div
        className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
