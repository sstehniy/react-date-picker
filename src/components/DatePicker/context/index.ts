import { createContext } from "react";
import { DateData } from "../typeDefs";

type ContextType = {
  date: DateData;
  toggleDatePicker: () => void;
  selectDate: (day: number, month: number, year: number) => void;
  discardSelectedDate: () => void;
};

export default createContext<Partial<ContextType>>({});
