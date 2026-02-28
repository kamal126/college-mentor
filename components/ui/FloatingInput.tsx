import clsx from "clsx";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export default function FloatingInput({ label, className, ...props }: FloatingInputProps) {
  return (
    <div className="relative w-full mt-5">
      <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 text-md transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-800 dark:peer-focus:text-blue-400 pointer-events-none">
        {label}
      </label>
      <input
        {...props}
        placeholder=" "
        className={clsx(
          "peer w-full rounded-lg border p-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all shadow-sm capitalize",
          className
        )}
      />
      
    </div>
  );
}