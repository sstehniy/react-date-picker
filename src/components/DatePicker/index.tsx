import React, { useState } from "react";
import styled from "styled-components";
import { getFormattedDate } from "../../util/getFormattedDate";
import { DateData } from "./typeDefs";
import DateInput from "./DateInput";
import DateCalendar from "./DateCalendar";

const DatePickerWrapper = styled.div`
  position: relative;
`;

const defaultDate = new Date();

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState<DateData>({
    fromDate: {
      day: getFormattedDate(defaultDate.getUTCDate()),
      month: getFormattedDate(defaultDate.getUTCMonth() + 1),
      year: defaultDate.getUTCFullYear().toString(),
    },
  });

  const toggleDatePicker = () => {
    setShowCalendar(!showCalendar);
  };

  const discardSelectedDate = () => {
    setSelectedDate({
      fromDate: {
        day: getFormattedDate(defaultDate.getUTCDate()),
        month: getFormattedDate(defaultDate.getUTCMonth() + 1),
        year: getFormattedDate(defaultDate.getUTCFullYear()),
      },
    });
  };

  const selectDate = (day: number, month: number, year: number) => {
    /**
     * - if both form/to dates are chosen
     * - if the chosen date is earlier then selected from date
     * - if no dates are already selected
     */
    if (
      (selectedDate.fromDate && selectedDate.toDate) ||
      (selectedDate.fromDate &&
        +selectedDate.fromDate.month > month &&
        +selectedDate.fromDate.year >= year) ||
      (!selectedDate.fromDate && !selectedDate.toDate)
    ) {
      setSelectedDate({
        fromDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
        },
      });
    }
    /**
     * if from date is selected and selected to date is sooner then selected from date
     */
    if (
      selectedDate.fromDate &&
      year >= +selectedDate.fromDate.year &&
      month >= +selectedDate.fromDate.month &&
      day > +selectedDate.fromDate.day
    ) {
      setSelectedDate({
        ...selectedDate,
        toDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
        },
      });
    }
  };

  return (
    <DatePickerWrapper>
      <DateInput date={selectedDate} onClick={toggleDatePicker} />
      {showCalendar && (
        <DateCalendar
          date={selectedDate}
          selectDate={selectDate}
          discardSelectedDate={discardSelectedDate}
          toggleDatePicker={toggleDatePicker}
        />
      )}
    </DatePickerWrapper>
  );
};

export default DatePicker;
