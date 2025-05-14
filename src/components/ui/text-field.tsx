import {
  forwardRef,
  useCallback,
  type FormEvent,
  type ForwardRefRenderFunction,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { applyPhoneMask } from "@/utils/mask";

type InputType = InputHTMLAttributes<HTMLInputElement>;

interface TextFieldProps extends InputType {
  readonly icon?: ReactNode;
  readonly label?: string;
  readonly mask?: "phone";
}

const TextField: ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (
  { icon, label, mask, ...props },
  ref
) => {
  const handleKeyUp = useCallback(
    (evt: FormEvent<HTMLInputElement>) => {
      switch (mask) {
        case "phone":
          applyPhoneMask(evt);
          break;
        default:
          break;
      }
    },
    [mask]
  );
  return (
    <label className="block w-full min-w-50 text-slate-50">
      {label && <span className="block text-sm font-normal">{label}</span>}
      <div className="flex h-12 items-center gap-2 rounded-sm border border-gray-800 bg-gray-950 px-3 text-sm shadow-sm focus-within:border-violet-800 focus-within:ring-1 focus-within:ring-violet-800 focus-within:outline-none">
        {icon && <div className="text-xl text-slate-400">{icon}</div>}

        <input
          className="block h-full w-full bg-transparent py-2 placeholder-slate-400 outline-none disabled:cursor-not-allowed disabled:rounded-sm disabled:border disabled:border-gray-800 disabled:bg-gray-950 disabled:text-slate-900 disabled:placeholder-slate-700 disabled:shadow-none"
          ref={ref}
          onKeyUp={handleKeyUp}
          {...props}
        />
      </div>
    </label>
  );
};

export default forwardRef(TextField);
