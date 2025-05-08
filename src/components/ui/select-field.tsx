import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "phosphor-react";
import { type ComponentRef, forwardRef } from "react";
import { type ChangeHandler } from "react-hook-form";

type Category = {
  id: string;
  name: string;
};

type SelectComponentProps = {
  placeholder?: string;
  selectLabel?: string;
  name?: string;
  onChange?: ChangeHandler;
  options: Category[];
  errorMessage?: string;
} & Select.SelectProps;

type SelectElement = ComponentRef<typeof Select.Trigger>;

const SelectInput = forwardRef<SelectElement, SelectComponentProps>(
  (
    {
      placeholder = "Selecione uma categoria",
      errorMessage,
      selectLabel,
      options,
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <Select.Root
          {...props}
          onValueChange={(value) =>
            onChange && onChange({ target: { name, value } })
          }
          disabled={options.length < 1}
        >
          <Select.Trigger
            ref={ref}
            className={`flex h-12 w-full items-center justify-between rounded border bg-gray-950 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-violet-600 focus:outline-none data-[placeholder]:text-slate-400 ${
              errorMessage ? "border-red-500" : "border-gray-800"
            }`}
            aria-label="Categorias"
          >
            <Select.Value
              placeholder={options.length > 0 ? placeholder : "Carregando..."}
            />
            <Select.Icon>
              <CaretDown
                weight="bold"
                className={errorMessage ? "text-red-500" : "text-violet-600"}
              />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="z-50 overflow-hidden rounded bg-gray-900 shadow-lg">
              <Select.ScrollUpButton className="flex h-6 items-center justify-center">
                <CaretUp weight="bold" />
              </Select.ScrollUpButton>

              <Select.Viewport className="p-2">
                <Select.Group>
                  {selectLabel && (
                    <Select.Label className="px-4 py-1 text-xs text-slate-500">
                      {selectLabel}
                    </Select.Label>
                  )}

                  {options.map((item) => (
                    <Select.Item
                      key={item.id}
                      value={item.id}
                      className="relative flex cursor-pointer items-center justify-between rounded border-transparent px-4 py-2 pr-8 text-sm text-slate-400 data-[highlighted]:bg-transparent data-[highlighted]:text-slate-200"
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator className="absolute right-6">
                        <Check weight="bold" className="text-violet-600" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton className="flex h-6 items-center justify-center text-violet-700">
                <CaretDown weight="bold" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default SelectInput;
