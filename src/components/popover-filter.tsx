import useAppSelector from "@/hooks/useAppSelector";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, FunnelSimple, X } from "phosphor-react";
import { useState, type FormEvent } from "react";

import { Button, DatePicker, Select as SelectField } from ".";

import { selectCategoriesDetails } from "@/features/contacts/selectors/contactSelectors";

import useAppDispatch from "@/hooks/useAppDispatch";

import { handleCategories } from "@/libs/utils/common/constant/handleCategories";

import { filterContacts } from "@/features/contacts/slices/contactSlices";
import type { RangeKeyDict } from "react-date-range";

interface DateRangeInput {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}
const PopoverFilter = () => {
  const [dateFilter, setDateFilter] = useState<DateRangeInput[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [categoryId, setCategoryId] = useState<string>("");
  const categories = useAppSelector(selectCategoriesDetails);

  const dispatch = useAppDispatch();

  const handleSetState = (
    startDateValue: Date | undefined,
    endDateValue: Date | undefined
  ) => {
    setDateFilter([
      {
        startDate: startDateValue,
        endDate: endDateValue,
        key: "selection",
      },
    ]);
  };

  const maxDateRange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;

    if (!startDate || !endDate) return;

    const maxEndDate = addDays(startDate, 7);
    const isDateRangeExceeding = differenceInDays(endDate, startDate) > 7;
    const newEndDate = isDateRangeExceeding ? maxEndDate : endDate;

    handleSetState(startDate, newEndDate);

    if (isDateRangeExceeding) {
      handleSetState(startDate, startDate);
      // eslint-disable-next-line no-console
      console.log(
        "alert",
        "O intervalo máximo  é de 07 dias. Por favor, tente novamente."
      );
    }
  };

  const handleChangeCategoryId = (categoryId: string | null) => {
    if (!categoryId) return false;
    setCategoryId(categoryId);
    return true;
  };

  const formatDateRangeForBackend = (range: DateRangeInput[]) => {
    const [selection] = range;

    if (!selection?.startDate || !selection?.endDate) {
      throw new Error(
        "As datas de início e fim devem ser preenchidas corretamente."
      );
    }

    return {
      startDate: new Date(selection.startDate).toISOString().split("T")[0],
      endDate: new Date(selection.endDate).toISOString().split("T")[0],
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: Parameters<typeof filterContacts>[0] = {
      page: 1,
      limit: 10,
      categoryId,
    };

    const [selection] = dateFilter;

    const hasDateRange = selection?.startDate && selection?.endDate;

    if (hasDateRange) {
      try {
        const { startDate, endDate } = formatDateRangeForBackend(dateFilter);
        payload.createdAtStart = startDate;
        payload.createdAtEnd = endDate;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Erro ao formatar datas para filtro:", error);
        return;
      }
    }

    dispatch(filterContacts(payload));
  };

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
          <form className="flex flex-col gap-4 py-2" onSubmit={handleSubmit}>
            <SelectField
              loading={categories.length <= 0}
              onChange={async ({ target: { value } }) =>
                handleChangeCategoryId(value)
              }
              value={categoryId ?? ""}
              name="filter categoryId"
            >
              {categories.map((item) => (
                <Select.Item
                  key={item.id}
                  value={item.id}
                  className="relative flex cursor-pointer items-center justify-between rounded border-transparent px-4 py-2 pr-8 text-sm text-slate-400 data-[highlighted]:bg-transparent data-[highlighted]:text-slate-200"
                >
                  <Select.ItemText>
                    {handleCategories[item.name]}
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute right-6">
                    <Check weight="bold" className="text-violet-600" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </SelectField>

            <DatePicker
              editableDateInputs={true}
              onChange={maxDateRange}
              moveRangeOnFirstSelection={false}
              ranges={dateFilter}
              locale={ptBR}
              weekdayDisplayFormat="eeeee"
              maxDate={new Date()}
            />

            <Button type="submit" size="sm" disabled={!categoryId}>
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
