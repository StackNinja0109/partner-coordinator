'use client'

interface CounterProps {
  className?: string;
  label: string;
  count: number | string;
}

const Counter: React.FC<CounterProps> = ({ className = '', label, count }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="mr-3 text-timestamp">{label}</span>
      <span className="text-h4">{count}</span>
    </div>
  );
};

export default Counter;