import React, {
  useState,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/next.svg";
import { SelectedDateData, DateScalars, DateData } from "../typeDefs";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Context from "../context";
import DateComponent from "./DateComponent";
import Button from "../../shared/Button";

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
  selectDate: (
    day: number,
    month: number,
    year: number,
    isFixed?: boolean
  ) => void;
  toggleDatePicker: () => void;
};

const CalendarWrapper = styled.div`
  @media screen and (max-width: 420px) {
    position: fixed;
    width: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translate(0, 0) !important;
    border-radius: 5px;
    &.onMount {
      animation: popIn 0.2s forwards ease;

      @keyframes popIn {
        from {
          transform: scale(0.5);
          opacity: 0.8;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    &.onUnmount {
      animation: popOut 0.2s forwards ease;

      @keyframes popOut {
        from {
          transform: scale(0.9);
          opacity: 1;
        }
        to {
          transform: scale(0.2);
          opacity: 0;
        }
      }
    }
  }

  position: absolute;
  width: 300px;
  top: 50%;
  left: -6%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.background_secondary};
  box-shadow: ${({ theme }) => theme.shadow.xxl};
  overflow: hidden;
  transform: scale(0.5);
  opacity: 0;

  &.onMount {
    animation: popIn 0.2s forwards ease;

    @keyframes popIn {
      from {
        transform: translateY(-50%) scale(0.5);
        opacity: 0.8;
      }
      to {
        transform: translateY(-50%) scale(1);
        opacity: 1;
      }
    }
  }

  &.onUnmount {
    animation: popOut 0.2s forwards ease;

    @keyframes popOut {
      from {
        transform: translateY(-50%) scale(0.9);
        opacity: 1;
      }
      to {
        transform: translateY(-50%) scale(0.2);
        opacity: 0;
      }
    }
  }
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

  const calendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, (e: MouseEvent) => {
    toggleDatePicker();
  });

  useEffect(() => {
    if (!calendarRef.current) return;
    const node = calendarRef.current;

    node.classList.add("onMount");
  }, [calendarRef]);

  const handleToogleDatePicker = useCallback(() => {
    if (calendarRef.current) {
      const node = calendarRef.current;
      node.classList.add("onUnmount");
      setTimeout(() => {
        toggleDatePicker();
      }, 200);
    }
  }, [toggleDatePicker]);

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
        toggleDatePicker: handleToogleDatePicker,
        discardSelectedDate,
        selectDate,
        currentMonthYear,
        changeCurrentMonth,
      }}
    >
      <CalendarWrapper ref={calendarRef}>
        <CalendarHead />
        <CalendarBody />
        <CalendarFooter />
      </CalendarWrapper>
    </Provider>
  );
};

/* ------------------------------------- */
const StyledCalendarHead = styled.div`
  @media screen and (max-width: 420px) {
    height: 55px;
    padding: 0 20px;

    & > svg {
      height: 25px !important;
      width: 25px !important;
    }

    & > p {
      font-size: 1.5rem !important;
    }
  }

  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  user-select: none;
  background-color: ${({ theme }) => theme.color.background_secondary};
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
  @media screen and (max-width: 420px) {
    height: 400px;
  }
  height: 330px;
  padding: 10px 15px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const BodyHead = styled.div`
  @media screen and (max-width: 420px) {
    height: 30px;
    padding: 0 10px;
  }
  height: 25px;
  padding: 0 8px 0 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const BodyMain = styled.div`
  @media screen and (max-width: 420px) {
    flex: 1;
  }
  display: grid;
  height: auto;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  justify-items: center;
  font-size: 1.2rem;
`;

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

    if (from.year === to.year && year === from.year) {
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

  const fixedDateMatch = (
    toCompare: DateData,
    compareWith: DateScalars | undefined
  ) => {
    if (!compareWith) return false;
    const { date: day, month, year } = toCompare;
    const { day: day_2, month: month_2, year: year_2 } = compareWith;
    return (
      day === +day_2 &&
      month === +month_2 - 1 &&
      year === +year_2 &&
      compareWith.isFixed
    );
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
              selectDate(dateData.date, monthNumber + 1, yearNumber, true);
            }}
            onHover={() => {
              selectDate(dateData.date, monthNumber + 1, yearNumber);
            }}
            active={checkDateIsActive(dateData)}
            subActive={checkDateIsSubactive(dateData)}
            showSpan={!!(selectedDate.fromDate && selectedDate.toDate)}
            isFirst={dateMatch(dateData, selectedDate.fromDate)}
            isLast={dateMatch(dateData, selectedDate.toDate)}
            isFixed={
              fixedDateMatch(dateData, selectedDate.toDate) ||
              fixedDateMatch(dateData, selectedDate.fromDate)
            }
          />
        ))}
      </BodyMain>
    </StyledCalendarBody>
  );
};

/* ------------------------------------- */
const StyledCalendarFooter = styled.div`
  @media screen and (max-width: 420px) {
    height: 60px;

    & > button {
      padding: 10px 20px !important;
      font-size: 0.8rem;
    }
  }

  position: absolute;
  bottom: 0;
  height: 45px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.md_invert};
  background-color: ${({ theme }) => theme.color.background_secondary};
  padding: 0 7px;
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
        <Button secondary small onClick={handleReset}>
          Reset
        </Button>
      )}
      <Button danger normal onClick={handleCancel}>
        Cancel
      </Button>
      <Button primary normal onClick={handleConfirm}>
        Confirm
      </Button>
    </StyledCalendarFooter>
  );
};

export default DateCalendar;
