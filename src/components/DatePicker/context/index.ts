import { createContext } from "react";
import { SelectedDateData } from "../typeDefs";
import { MonthChanhgeType } from "../DateCalendar/index";

type ContextType = {
  date: SelectedDateData;
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
