'use client'

const RedPin = ({ className = '' }) => {
  return (
    <span className={`inline-block w-[10px] h-[10px] rounded-full bg-core-red ${className}`}></span>
  );
};

export default RedPin;