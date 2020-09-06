import { createContext } from "react";
import { DateData } from "../typeDefs";
import { MonthChanhgeType } from "../DateCalendar";

type ContextType = {
  date: DateData;
  toggleDatePicker: () => void;
  selectDate: (day: number, month: number, year: number) => void;
  discardSelectedDate: () => void;
  currentMonthYear: {
    month: string;
    year: string;
  };
  changeCurrentMonth: (type: MonthChanhgeType) => void;
};

export default createContext({} as ContextType);
