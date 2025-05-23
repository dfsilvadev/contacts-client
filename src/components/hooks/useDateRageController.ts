import { useState } from "react";

export type DateRangeInput = {
  startDate?: Date;
  endDate?: Date;
  key: string;
};

const useDateRageController = () => {
  const [dateFilter, setDateFilter] = useState<DateRangeInput[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSetState = (startDateValue: Date, endDateValue: Date) => {
    setDateFilter([
      {
        startDate: startDateValue,
        endDate: endDateValue,
        key: "selection",
      },
    ]);
  };

  return {
    handleSetState,
    dateFilter,
  };
};

export default useDateRageController;
