import { InputHTMLAttributes, forwardRef, useId } from "react";

interface TextFieldProps {
  label?: string;
}

export const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps & InputHTMLAttributes<HTMLInputElement>
>(function TextField({ id = undefined, label = undefined, ...props }, ref) {
  const generatedId = useId();
  const targetId = id ?? generatedId;

  return (
    <div className="">
      {label && (
        <label className="mb-2 block text-subtitle" htmlFor={targetId}>
          {label}
        </label>
      )}

      <div className="w-full rounded-xl bg-slate-100 px-2 pb-3 pt-2 shadow-[inset_0_-0.25rem_0_#00000022]">
        <input
          {...props}
          ref={ref}
          className="h-[3.25rem] w-full rounded-lg bg-white px-4 text-center shadow-[inset_0_0.25rem_0_#00000022] focus:outline-none"
          id={targetId}
        />
      </div>
    </div>
  );
});
