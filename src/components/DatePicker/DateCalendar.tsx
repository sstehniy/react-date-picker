import React, { useState, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as Arrow } from "../../assets/next.svg";
import { SelectedDateData, DateScalars } from "./typeDefs";
import Context from "./context";
import Button from "../shared/Button";

export enum MonthChanhgeType {
  FORWARD,
  BACK,
}

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

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DateCalenderProps = {
  date: SelectedDateData;
  discardSelectedDate: () => void;
  selectDate: (day: number, month: number, year: number) => void;
  toggleDatePicker: () => void;
};

const CalendarWrapper = styled.div`
  position: absolute;
  width: 300px;
  top: 50%;
  transform: translateY(-50%);
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
      month: newDate.getUTCMonth() + 1 + "",
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
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  user-select: none;
  box-shadow: ${({ theme }) => theme.shadow.lg};

  & * {
    flex-shrink: 0;
    flex-grow: 0;
  }

  & > svg {
    height: 20px;
    width: 20px;
    fill: ${({ theme }) => theme.color.background_alternative};
    cursor: pointer;
    transition: fill 0.15s ease-in-out;

    &:hover {
      fill: ${({ theme }) => theme.color.text_secondary};
    }

    &#first {
      transform: rotate(180deg);
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
    const monthNumber = +month;
    return `${months[monthNumber - 1]} ${year}`;
  }, [month, year]);

  return (
    <StyledCalendarHead>
      <Arrow
        id="first"
        onClick={() => {
          changeCurrentMonth(MonthChanhgeType.BACK);
        }}
      />
      <p>{monthYearToDisplay}</p>
      <Arrow
        id="last"
        onClick={() => {
          changeCurrentMonth(MonthChanhgeType.FORWARD);
        }}
      />
    </StyledCalendarHead>
  );
};

/* ------------------------------------- */
const StyledCalendarBody = styled.div`
  height: 330px;
  padding: 10px 15px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const BodyHead = styled.div`
  height: 25px;
  padding: 0 8px 0 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;

  /* & > span:not(:first-child) {
    margin-left: 13px;
  }

  & > span:last-child {
    margin-left: 20px;
  } */
`;

const BodyMain = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  justify-items: center;

  font-size: 1.2rem;
`;

type DateData = {
  date: number;
  day: number;
  month: number;
  year: number;
  disabled: boolean;
};

const CalendarBody = () => {
  const { currentMonthYear, selectDate, date: selectedDate } = useContext(
    Context
  );
  const monthNumber = +currentMonthYear.month - 1;
  const yearNumber = +currentMonthYear.year;

  const currentCalender = useMemo(() => {
    let days: DateData[] = [];
    let day = 1;
    while (new Date(yearNumber, monthNumber, day).getMonth() === monthNumber) {
      const nextDay = new Date(yearNumber, monthNumber, day);
      days = [
        ...days,
        {
          date: nextDay.getDate(),
          month: monthNumber,
          year: yearNumber,
          day: nextDay.getDay(),
          disabled: false,
        },
      ];
      day++;
    }
    let inc_start = 0;
    for (let i = days[0].day; i > 1; i--) {
      const extraDate = new Date(yearNumber, monthNumber, inc_start);
      days = [
        {
          date: extraDate.getDate(),
          month: monthNumber - 1 < 0 ? 11 : monthNumber - 1,
          year: monthNumber - 1 < 0 ? yearNumber - 1 : yearNumber,
          day: extraDate.getDay(),
          disabled: true,
        },
        ...days,
      ];
      inc_start--;
    }
    let inc_end = days[days.length - 1].date + 1;
    for (let i = days[days.length - 1].day; i <= 6 || i === 0; i++) {
      if (days.length === 35) break;
      const extraDate = new Date(yearNumber, monthNumber, inc_end);
      days = [
        ...days,
        {
          date: extraDate.getDate(),
          month: monthNumber + 1 < 11 ? monthNumber + 1 : 0,
          year: monthNumber + 1 > 11 ? yearNumber + 1 : yearNumber,
          day: extraDate.getDay(),
          disabled: true,
        },
      ];
      inc_end++;
    }
    return days;
  }, [yearNumber, monthNumber]);

  const checkDateIsActive = (dateData: DateData): boolean => {
    const { date, month, year, disabled } = dateData;
    if (disabled) return false;
    if (
      selectedDate.fromDate &&
      date === +selectedDate.fromDate.day &&
      month === +selectedDate.fromDate.month - 1 &&
      year === +selectedDate.fromDate.year
    ) {
      return true;
    }
    if (
      selectedDate.toDate &&
      date === +selectedDate.toDate.day &&
      month === +selectedDate.toDate.month - 1 &&
      year === +selectedDate.toDate.year
    ) {
      return true;
    }
    return false;
  };

  const checkDateIsSubactive = (dateData: DateData): boolean => {
    const { date: day, month, year } = dateData;
    if (!(selectedDate.fromDate && selectedDate.toDate)) return false;
    const from = {
      day: +selectedDate.fromDate.day,
      month: +selectedDate.fromDate.month - 1,
      year: +selectedDate.fromDate.year,
    };
    const to = {
      day: +selectedDate.toDate.day,
      month: +selectedDate.toDate.month - 1,
      year: +selectedDate.toDate.year,
    };

    if (from.year === to.year) {
      if (from.month === to.month) {
        if (month === from.month && month === to.month) {
          if (day > from.day && day < to.day) {
            return true;
          }
        }
      }
      if (to.month > from.month) {
        if (month > from.month && month < to.month) {
          return true;
        }
        if (month === from.month) {
          return day > from.day;
        }
        if (month === to.month) {
          return day < to.day;
        }
      }
    } else if (from.year < to.year) {
      if (year > from.year && year < to.year) {
        return true;
      }
      if (year === from.year) {
        if (month === from.month) {
          return day > from.day;
        }
        if (month > from.month) {
          return true;
        }
      }
      if (year === to.year) {
        if (month === to.month) {
          return day < to.day;
        }
        if (month < to.month) {
          return true;
        }
      }
    }
    return false;
  };

  const dateMatch = (
    toCompare: DateData,
    compareWith: DateScalars | undefined
  ): boolean => {
    if (!compareWith) return false;
    const { date: day, month, year } = toCompare;
    const { day: day_2, month: month_2, year: year_2 } = compareWith;
    return day === +day_2 && month === +month_2 - 1 && year === +year_2;
  };

  return (
    <StyledCalendarBody>
      <BodyHead>
        {weekDays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </BodyHead>
      <BodyMain>
        {currentCalender.map((dateData, i) => (
          <DateComponent
            key={i}
            date={dateData}
            onClick={() => {
              selectDate(dateData.date, monthNumber + 1, yearNumber);
            }}
            active={checkDateIsActive(dateData)}
            subActive={checkDateIsSubactive(dateData)}
            showSpan={!!(selectedDate.fromDate && selectedDate.toDate)}
            isFirst={dateMatch(dateData, selectedDate.fromDate)}
            isLast={dateMatch(dateData, selectedDate.toDate)}
          />
        ))}
      </BodyMain>
    </StyledCalendarBody>
  );
};

/* ------------------------------------- */
type DateComponentProps = {
  date: { date: number; day: number; disabled?: boolean };
  onClick: () => void;
  active: boolean;
  subActive: boolean;
  showSpan: boolean;
  isFirst: boolean;
  isLast: boolean;
};

type StyledProps = Pick<
  DateComponentProps,
  "active" | "subActive" | "isFirst" | "isLast" | "showSpan"
> & {
  disabled?: boolean;
};

const StyledDateComponent = styled.span<StyledProps>`
  cursor: pointer;
  position: relative;
  height: 30px;
  width: 30px;
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  user-select: none;
  color: ${({ theme, active, subActive, disabled }) => {
    if (disabled) return theme.color.background_primary;
    if (active) return theme.color.background_secondary;
    if (subActive) return theme.color.text_secondary;
  }};
  ${({ active }) =>
    active &&
    css`
      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -1px;
        bottom: -3px;
        left: -2px;
        right: -2px;
        border-radius: 50%;
        background-color: ${({ theme: { color } }) => color.btn_primary};
        box-shadow: ${({ theme: { shadow } }) => shadow.button_sm};
      }
    `}
  ${({ subActive, disabled }) =>
    !!(subActive && !disabled) &&
    css`
      &:after {
        content: "";
        position: absolute;
        z-index: -2;
        top: 55%;
        transform: translateY(-50%);
        width: 129%;
        height: 23px;
        background-color: ${({ theme: { color } }) => color.select_secondary};
        opacity: 0.5;
      }
    `};

  ${({ isLast, disabled, showSpan }) =>
    !!(isLast && !disabled && showSpan) &&
    css`
      &:after {
        content: "";
        position: absolute;
        z-index: -2;
        top: 55%;
        right: 50%;
        transform: translateY(-50%);
        width: 64%;
        height: 23px;
        background-color: ${({ theme: { color } }) => color.select_secondary};
        opacity: 0.5;
      }
    `}

  ${({ isFirst, disabled, showSpan }) =>
    !!(isFirst && !disabled && showSpan) &&
    css`
      &:after {
        content: "";
        position: absolute;
        z-index: -2;
        top: 55%;
        left: 50%;
        transform: translateY(-50%);
        width: 64%;
        height: 23px;
        background-color: ${({ theme: { color } }) => color.select_secondary};
        opacity: 0.5;
      }
    `}
`;

const DateComponent = ({
  date,
  onClick,
  active,
  subActive,
  showSpan,
  isFirst,
  isLast,
}: DateComponentProps) => {
  return (
    <StyledDateComponent
      active={active}
      subActive={subActive}
      disabled={date.disabled}
      onClick={!date.disabled ? onClick : () => {}}
      showSpan={showSpan}
      isFirst={isFirst}
      isLast={isLast}
    >
      {date.date}
    </StyledDateComponent>
  );
};

/* ------------------------------------- */
const StyledCalendarFooter = styled.div`
  position: absolute;
  bottom: 0;
  height: 45px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.md_invert};
  padding: 10px 7px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CalendarFooter = () => {
  const { date, toggleDatePicker, discardSelectedDate } = useContext(Context);

  const handleReset = () => {
    discardSelectedDate();
  };

  const handleCancel = () => {
    discardSelectedDate();
    toggleDatePicker();
  };

  const handleConfirm = () => {
    toggleDatePicker();
  };

  return (
    <StyledCalendarFooter>
      {date.toDate && (
        <Button secondary onClick={handleReset}>
          Reset
        </Button>
      )}
      <Button danger onClick={handleCancel}>
        Cancel
      </Button>
      <Button primary onClick={handleConfirm}>
        Confirm
      </Button>
    </StyledCalendarFooter>
  );
};

export default DateCalendar;
