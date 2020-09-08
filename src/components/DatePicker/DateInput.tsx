import React, { useMemo } from "react";
import styled from "styled-components";
import { SelectedDateData } from "./typeDefs";
import { ReactComponent as CalenderIcon } from "../../assets/calendar.svg";

type DateInputProps = {
  date: SelectedDateData;
  onClick: () => void;
};

const StyledDateInput = styled.div`
  position: relative;
  border-radius: 10px;
  max-width: 300px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.xl};
  transition: border-color 0.15s ease-in-out, box-shadow 0.1s ease-in-out;
  outline: none;

  & input {
    background-color: white;
    color: ${({ theme }) => theme.color.text_secondary};
    border: none;
    height: 35px;
    padding: 7px 50px 7px 15px;
    text-align: center;
    font-size: 1rem;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
  }

  & .calendar-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 37px;
    height: 35px;
    padding: 6.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.background_primary};
    box-shadow: ${({ theme }) => theme.shadow.md};
    transition: background-color 0.1s ease;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};

    & .calendar-icon {
      background-color: ${({ theme }) => theme.color.background_active};

      & svg {
        fill: ${({ theme }) => theme.color.background_secondary};
      }
    }
  }
`;

const defaultDate = new Date();

const DateInput: React.FC<DateInputProps> = ({
  date: { fromDate, toDate },
  onClick,
}) => {
  const formattedDate = useMemo(() => {
    let dateString = `0${defaultDate.getUTCDate()}.0${
      defaultDate.getUTCMonth() + 1
    }.${defaultDate.getFullYear()}`;
    if (fromDate)
      dateString = `${fromDate.day}.${fromDate.month}.${fromDate.year}`;
    if (toDate) {
      dateString = `${dateString} - ${toDate.day}.${toDate.month}.${toDate.year}`;
    }
    return dateString;
  }, [fromDate, toDate]);

  return (
    <StyledDateInput onClick={onClick} tabIndex={1}>
      <input
        type="text"
        value={formattedDate}
        readOnly={true}
        onChange={() => {}}
      />
      <div className="calendar-icon">
        <CalenderIcon
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </StyledDateInput>
  );
};

export default DateInput;
