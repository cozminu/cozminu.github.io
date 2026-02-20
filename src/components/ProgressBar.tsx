interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div
        className="h-1 w-full max-w-[200px] mx-auto bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
