import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp } from "phosphor-react";
import { type ComponentRef, forwardRef, type ReactNode } from "react";
import { type ChangeHandler } from "react-hook-form";

type SelectComponentProps = {
  readonly placeholder?: string;
  readonly name?: string;
  readonly onChange?: ChangeHandler;
  readonly label?: string;
  readonly loading: boolean;
  readonly children: ReactNode;
} & Select.SelectProps;

type SelectElement = ComponentRef<typeof Select.Trigger>;

const SelectInput = forwardRef<SelectElement, SelectComponentProps>(
  (
    {
      placeholder = "Selecione uma categoria",
      name,
      onChange,
      label,
      loading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label className="block w-full">
        {label && (
          <span className="block text-sm font-normal text-slate-50">
            {label}
          </span>
        )}
        <Select.Root
          {...props}
          onValueChange={(value) =>
            onChange && onChange({ target: { name, value } })
          }
        >
          <Select.Trigger
            ref={ref}
            className="flex h-12 w-full items-center justify-between rounded border border-gray-800 bg-gray-950 px-3 text-sm text-slate-50 shadow-sm focus:ring-2 focus:ring-violet-600 focus:outline-none data-[placeholder]:text-slate-400"
            aria-label="Categorias"
          >
            <Select.Value
              placeholder={!loading ? placeholder : "Carregando..."}
            />
            <Select.Icon>
              <CaretDown weight="bold" className="text-violet-600" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="z-50 overflow-hidden rounded bg-gray-700 shadow-lg">
              <Select.ScrollUpButton className="flex h-6 items-center justify-center">
                <CaretUp weight="bold" />
              </Select.ScrollUpButton>

              <Select.Viewport className="p-2">
                <Select.Group>
                  {label && (
                    <Select.Label className="px-4 py-1 text-xs text-slate-500">
                      {label}
                    </Select.Label>
                  )}

                  {children}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton className="flex h-6 items-center justify-center text-violet-700">
                <CaretDown weight="bold" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </label>
    );
  }
);

export default SelectInput;
