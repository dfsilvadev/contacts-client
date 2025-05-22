import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-date-range";

const DatePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => {
        setState([
          {
            startDate: item.selection.startDate ?? new Date(),
            endDate: item.selection.endDate ?? new Date(),
            key: item.selection.key ?? "selection",
          },
        ]);
        // eslint-disable-next-line no-console
        console.log("Date range changed:", item.selection);
      }}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={ptBR}
      weekdayDisplayFormat="eeeee"
      maxDate={new Date()}
      color="#FF9F9F"
    />
  );
};

export default DatePicker;
