import React, { useState } from "react";
import styled from "styled-components";
import { getFormattedDate } from "../../util/getFormattedDate";
import { DateData } from "./typeDefs";
import DateContext from "./context";
import DateInput from "./DateInput";
import DateCalendar from "./DateCalendar";

const DatePickerWrapper = styled.div`
  position: relative;
`;

const defaultDate = new Date();

const { Provider } = DateContext;

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selecetedDate, setSelectedDate] = useState<DateData>({
    fromDate: {
      day: getFormattedDate(defaultDate.getDay()),
      month: getFormattedDate(defaultDate.getMonth() + 1),
      year: defaultDate.getFullYear().toString(),
    },
  });

  const toggleDatePicker = () => {
    setShowCalendar(!showCalendar);
  };

  const discardSelectedDate = () => {
    setSelectedDate({
      fromDate: {
        day: getFormattedDate(defaultDate.getDay()),
        month: getFormattedDate(defaultDate.getMonth() + 1),
        year: getFormattedDate(defaultDate.getFullYear()),
      },
    });
  };

  const selectDate = (day: number, month: number, year: number) => {
    if (
      (selecetedDate.fromDate && selecetedDate.toDate) ||
      (selecetedDate.fromDate && +selecetedDate.fromDate.month > month) ||
      (!selecetedDate.fromDate && !selecetedDate.toDate)
    ) {
      setSelectedDate({
        fromDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
        },
      });
    }
    if (
      selecetedDate.fromDate &&
      year >= +selecetedDate.fromDate.year &&
      month >= +selecetedDate.fromDate.month &&
      day > +selecetedDate.fromDate.day
    ) {
      setSelectedDate({
        ...selecetedDate,
        toDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
        },
      });
    }
  };

  return (
    <Provider
      value={{
        date: selecetedDate,
        toggleDatePicker,
        discardSelectedDate,
        selectDate,
      }}
    >
      <DatePickerWrapper>
        <DateInput date={selecetedDate} onClick={toggleDatePicker} />
        <DateCalendar date={selecetedDate} />
      </DatePickerWrapper>
    </Provider>
  );
};

export default DatePicker;
