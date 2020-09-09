import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFormattedDate } from "../../util/getFormattedDate";
import { SelectedDateData, DateScalars } from "./typeDefs";
import DateInput from "./DateInput";
import DateCalendar from "./DateCalendar/index";

type DatePickerProps = {
  getDate: (date: SelectedDateData) => void;
};

const DatePickerWrapper = styled.div`
  position: relative;
`;

const defaultDate = new Date();

const DatePicker = ({ getDate }: DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState<SelectedDateData>({
    fromDate: {
      day: getFormattedDate(defaultDate.getUTCDate()),
      month: getFormattedDate(defaultDate.getUTCMonth() + 1),
      year: defaultDate.getFullYear().toString(),
      isFixed: true,
    },
    toDate: {
      day: getFormattedDate(defaultDate.getUTCDate() + 12),
      month: getFormattedDate(defaultDate.getUTCMonth() + 1),
      year: defaultDate.getFullYear().toString(),
      isFixed: true,
    },
  });

  useEffect(() => {
    getDate(selectedDate);
  }, [getDate, selectedDate]);

  const toggleDatePicker = () => {
    setShowCalendar(!showCalendar);
  };

  const discardSelectedDate = () => {
    setSelectedDate({
      fromDate: {
        day: getFormattedDate(defaultDate.getUTCDate()),
        month: getFormattedDate(defaultDate.getUTCMonth() + 1),
        year: getFormattedDate(defaultDate.getFullYear()),
        isFixed: true,
      },
    });
  };

  const selectDate = (
    day: number,
    month: number,
    year: number,
    isFixed?: boolean
  ) => {
    if (
      selectedDate.fromDate &&
      +selectedDate.fromDate.day === day &&
      +selectedDate.fromDate.month === month &&
      +selectedDate.fromDate.year === year
    ) {
      setSelectedDate({});
    }

    if (
      selectedDate.fromDate &&
      !selectedDate.toDate &&
      ((year === +selectedDate.fromDate.year &&
        month === +selectedDate.fromDate.month &&
        day < +selectedDate.fromDate.day) ||
        (year === +selectedDate.fromDate.year &&
          month < +selectedDate.fromDate.month) ||
        year < +selectedDate.fromDate.year)
    ) {
      setSelectedDate({
        fromDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
          isFixed: true,
        },
      });
      return;
    }

    if (
      selectedDate.toDate &&
      selectedDate.toDate.isFixed &&
      isFixed &&
      day === +selectedDate.toDate.day &&
      month === +selectedDate.toDate.month &&
      year === +selectedDate.toDate.year
    ) {
      setSelectedDate({
        fromDate: { ...(selectedDate.fromDate as DateScalars), isFixed: true },
      });
      return;
    }

    /**
     * if from date is selected and selected to-date is sooner then selected from date
     */
    if (
      selectedDate.fromDate &&
      ((year === +selectedDate.fromDate.year &&
        month > +selectedDate.fromDate.month) ||
        (month === +selectedDate.fromDate.month &&
          day > +selectedDate.fromDate.day) ||
        year > +selectedDate.fromDate.year)
    ) {
      setSelectedDate({
        ...selectedDate,
        toDate: {
          day: getFormattedDate(day),
          month: getFormattedDate(month),
          year: year.toString(),
          isFixed,
        },
      });
      return;
    }

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
          isFixed: true,
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
