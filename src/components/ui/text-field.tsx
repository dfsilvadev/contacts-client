import {
  forwardRef,
  type ForwardRefRenderFunction,
  type InputHTMLAttributes,
} from "react";

type InputType = InputHTMLAttributes<HTMLInputElement>;

interface TextFieldProps extends InputType {
  readonly label?: string;
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  { label, ...props },
  ref
) => {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-normal text-slate-50">{label}</span>
      )}
      <div className="mt-1 h-12 rounded-sm border border-gray-800 bg-gray-950 text-sm shadow-sm focus-within:border-violet-800 focus-within:ring-1 focus-within:ring-violet-800 focus-within:outline-none">
        <input
          className="block h-full w-full bg-transparent px-3 py-2 placeholder-slate-400 outline-none disabled:cursor-not-allowed disabled:rounded-sm disabled:border disabled:border-gray-800 disabled:bg-gray-950 disabled:text-slate-900 disabled:placeholder-slate-700 disabled:shadow-none"
          ref={ref}
          {...props}
        />
      </div>
    </label>
  );
};

export default forwardRef(TextField);
