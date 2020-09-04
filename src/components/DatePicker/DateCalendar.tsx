import React from "react";
import styled from "styled-components";
import { DateData } from "./typeDefs";

type DateCalenderProps = {
  date: DateData;
};

const CalendarWrapper = styled.div``;

const DateCalendar: React.FC<DateCalenderProps> = () => {
  return (
    <CalendarWrapper>
      <CalendarHead />
      <CalendarBody />
      <CalendarFooter />
    </CalendarWrapper>
  );
};

/* ------------------------------------- */
const StyledCalendarHead = styled.div``;

const CalendarHead = () => {
  return <StyledCalendarHead></StyledCalendarHead>;
};

/* ------------------------------------- */
const StyledCalendarBody = styled.div``;

const CalendarBody = () => {
  return <StyledCalendarBody></StyledCalendarBody>;
};

/* ------------------------------------- */
const StyledCalendarFooter = styled.div``;

const CalendarFooter = () => {
  return <StyledCalendarFooter></StyledCalendarFooter>;
};

export default DateCalendar;
