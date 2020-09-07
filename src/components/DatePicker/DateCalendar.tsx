import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/next.svg";
import { DateData } from "./typeDefs";
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  width: 330px;
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
    const monthNumber = +month;
    return `${months[monthNumber - 1]}, ${year}`;
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
  height: 305px;
  padding: 10px 15px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const BodyHead = styled.div`
  height: 35px;
  padding: 0 7px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  & > span:not(:first-child) {
    margin-left: 13px;
  }

  & > span:last-child {
    margin-left: 20px;
  }
`;

const BodyMain = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  font-size: 1.1rem;
`;

const CalendarBody = () => {
  const { currentMonthYear, selectDate, date } = useContext(Context);
  const monthNumber = +currentMonthYear.month - 1;
  const yearNumber = +currentMonthYear.year;

  const currentCalender = useMemo(() => {
    let days: { date: number; day: number; disabled?: boolean }[] = [];
    let day = 1;
    while (new Date(yearNumber, monthNumber, day).getMonth() === monthNumber) {
      const nextDay = new Date(yearNumber, monthNumber, day);
      days = [...days, { date: nextDay.getDate(), day: nextDay.getDay() }];
      day++;
    }
    let inc_start = 0;
    for (let i = days[0].day; i > 1; i--) {
      const extraDate = new Date(yearNumber, monthNumber, inc_start);
      days = [
        { date: extraDate.getDate(), day: extraDate.getDay(), disabled: true },
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
        { date: extraDate.getDate(), day: extraDate.getDay(), disabled: true },
      ];
      inc_end++;
    }
    return days;
  }, [monthNumber, yearNumber]);

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
              selectDate(dateData.date, monthNumber, yearNumber);
            }}
            active={
              date.fromDate?.day ? +date.fromDate.day === dateData.date : false
            }
            subActive={
              date.fromDate && date.toDate
                ? !!(
                    monthNumber <= +date.toDate.month &&
                    monthNumber >= +date.fromDate.month &&
                    yearNumber <= +date.toDate.year &&
                    yearNumber >= +date.fromDate.year
                  )
                : false
            }
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
};

type StyledProps = Pick<DateComponentProps, "active" | "subActive"> & {
  disabled?: boolean;
};

const StyledDateComponent = styled.span<StyledProps>`
  cursor: pointer;
  color: ${({ theme, active, subActive, disabled }) => {
    if (active) return theme.color.background_active;
    if (subActive) return theme.color.text_secondary;
    if (disabled) return theme.color.background_alternative;
  }};
`;

const DateComponent = ({
  date,
  onClick,
  active,
  subActive,
}: DateComponentProps) => {
  return (
    <StyledDateComponent
      active
      subActive
      disabled={date.disabled}
      onClick={onClick}
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
  padding: 7px 7px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CalendarFooter = () => {
  const { date } = useContext(Context);

  return (
    <StyledCalendarFooter>
      {date.toDate && <Button secondary>Reset</Button>}
      <Button danger>Cancel</Button>
      <Button primary>Confirm</Button>
    </StyledCalendarFooter>
  );
};

export default DateCalendar;
