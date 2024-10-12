interface ProgressProps {
    value: number; // The current progress value (out of 100)
  }
  
  export function Progress({ value }: ProgressProps) {
    return (
      <div className="relative w-full h-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-full bg-indigo-600 rounded"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  