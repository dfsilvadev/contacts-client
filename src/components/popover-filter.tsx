import useAppSelector from "@/hooks/useAppSelector";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { Check, FunnelSimple, X } from "phosphor-react";

import { Button, Select as SelectField } from ".";

import { DatePicker } from ".";

import { selectCategoriesDetails } from "@/features/contacts/selectors/contactSelectors";

const PopoverFilter = () => {
  const categories = useAppSelector(selectCategoriesDetails);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="icon">
          <FunnelSimple weight="bold" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="animate-soft rounded-sm bg-gray-900 p-6 shadow-2xl"
          sideOffset={5}
        >
          <form className="flex flex-col gap-4 py-2">
            <SelectField loading={categories.length <= 0}>
              {categories.map((item) => (
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
            </SelectField>

            <DatePicker />

            <Button type="submit" size="sm">
              Filtrar
            </Button>
          </form>

          <Popover.Close
            className="absolute top-3 right-3 inline-flex items-center justify-center text-slate-400"
            aria-label="Close"
          >
            <X />
          </Popover.Close>
          <Popover.Arrow className="fill-gray-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverFilter;
