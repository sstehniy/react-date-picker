import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/next.svg";
import { DateData } from "./typeDefs";
import Context from "./context";

export enum MonthChanhgeType {
  FORWARD,
  BACK,
}

type DateCalenderProps = {
  date: DateData;
  discardSelectedDate: () => void;
  selectDate: (day: number, month: number, year: number) => void;
  toggleDatePicker: () => void;
};

const CalendarWrapper = styled.div`
  position: absolute;
  height: 400px;
  transform: translateY(-65%);
  left: calc(100% - 90px);
  width: 350px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.background_secondary};
  box-shadow: ${({ theme }) => theme.shadow.xxl};
  overflow: hidden;
`;

const { Provider } = Context;

const DateCalendar = ({
  date,
  selectDate,
  discardSelectedDate,
  toggleDatePicker,
}: DateCalenderProps) => {
  const defaultMonthYear = {
    month: date.fromDate?.month || new Date().getUTCMonth() + 1 + "",
    year: date.fromDate?.year || new Date().getUTCFullYear() + "",
  };
  const [currentMonthYear, setCurrentMonthYear] = useState<{
    month: string;
    year: string;
  }>(defaultMonthYear);

  const changeCurrentMonth = (type: MonthChanhgeType) => {
    let newDate;
    switch (type) {
      case MonthChanhgeType.BACK: {
        newDate = new Date(+currentMonthYear.year, +currentMonthYear.month - 1);
        break;
      }
      case MonthChanhgeType.FORWARD: {
        newDate = new Date(+currentMonthYear.year, +currentMonthYear.month + 1);
        break;
      }
    }
    setCurrentMonthYear({
      month: newDate.getUTCMonth() + "",
      year: newDate.getUTCFullYear() + "",
    });
  };

  return (
    <Provider
      value={{
        date,
        toggleDatePicker,
        discardSelectedDate,
        selectDate,
        currentMonthYear,
        changeCurrentMonth,
      }}
    >
      <CalendarWrapper>
        <CalendarHead />
        <CalendarBody />
        <CalendarFooter />
      </CalendarWrapper>
    </Provider>
  );
};

/* ------------------------------------- */
const StyledCalendarHead = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7%;
  box-shadow: ${({ theme }) => theme.shadow.lg};

  & > svg {
    height: 25px;
    width: auto;
    fill: ${({ theme }) => theme.color.background_alternative};
    cursor: pointer;
    transition: fill 0.15s ease-in-out, transform 0.15s ease-in;

    &:hover {
      fill: ${({ theme }) => theme.color.text_secondary};
    }

    &#first {
      transform: rotate(180deg);
    }

    &#first:hover {
      transform: translateX(-5px) rotate(180deg);
    }

    &#last:hover {
      transform: translateX(5px);
    }
  }

  & > p {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color.text_secondary};
  }
`;

const CalendarHead = () => {
  const {
    currentMonthYear: { month, year },
    changeCurrentMonth,
  } = useContext(Context);

  const monthYearToDisplay = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthNumber = +month;
    return `${months[monthNumber - 1]}, ${year}`;
  }, [month, year]);

  return (
    <StyledCalendarHead>
      <Arrow id="first" />
      <p>{monthYearToDisplay}</p>
      <Arrow id="last" />
    </StyledCalendarHead>
  );
};

/* ------------------------------------- */
const StyledCalendarBody = styled.div``;

const CalendarBody = () => {
  return <StyledCalendarBody></StyledCalendarBody>;
};

/* ------------------------------------- */
const StyledCalendarFooter = styled.div`
  position: absolute;
  bottom: 0;
  transform: rotate(180deg);
  height: 45px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const CalendarFooter = () => {
  return <StyledCalendarFooter></StyledCalendarFooter>;
};

export default DateCalendar;
