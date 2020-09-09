import React, { useRef, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { DateData } from "../typeDefs";
import Context from "../context";

type DateComponentProps = {
  date: DateData;
  onClick: () => void;
  onHover: () => void;
  active: boolean;
  subActive: boolean;
  showSpan: boolean;
  isFirst: boolean;
  isLast: boolean;
  isFixed?: boolean;
};

type StyledProps = Pick<
  DateComponentProps,
  "active" | "subActive" | "isFirst" | "isLast" | "isFixed" | "showSpan"
> & {
  disabled?: boolean;
};

const StyledDateComponent = styled.span<StyledProps>`
  @media screen and (max-width: 420px) {
    font-size: 1.1rem;
  }
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
  color: ${({ theme, active, subActive, disabled, isFixed }) => {
    if (disabled) return theme.color.background_primary;
    if (active && isFixed) return theme.color.background_secondary;
    if (subActive) return theme.color.text_secondary;
  }};
  ${({ active, disabled, subActive, isFixed }) =>
    !!(active && !disabled && !subActive && !isFixed) &&
    css`
      &:hover:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -1px;
        bottom: -3px;
        left: -2px;
        right: -2px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.color.background_secondary};
        border: 2px solid ${({ theme: { color } }) => color.btn_primary};
        box-shadow: ${({ theme: { shadow } }) => shadow.button_sm};
      }
    `}

  ${({ active, isFixed }) =>
    !!(active && !isFixed) &&
    css`
      @media screen and (max-width: 420px) {
        &:before {
          content: "";
          position: absolute;
          z-index: -1;
          top: -3px !important;
          bottom: -4px !important;
          left: -4px !important;
          right: -4px !important;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.color.background_secondary};
          border: 2px solid ${({ theme: { color } }) => color.btn_primary};
          box-shadow: ${({ theme: { shadow } }) => shadow.button_sm};
        }
      }
      &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -1px;
        bottom: -3px;
        left: -2px;
        right: -2px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.color.background_secondary};
        border: 2px solid ${({ theme: { color } }) => color.btn_primary};
        box-shadow: ${({ theme: { shadow } }) => shadow.button_sm};
      }
    `}

  ${({ active, isFixed }) =>
    !!(active && isFixed) &&
    css`
      @media screen and (max-width: 420px) {
        &:before {
          content: "";
          position: absolute;
          z-index: -1;
          top: -3px !important;
          bottom: -4px !important;
          left: -4px !important;
          right: -4px !important;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.color.background_secondary};
          border: 2px solid ${({ theme: { color } }) => color.btn_primary};
          box-shadow: ${({ theme: { shadow } }) => shadow.button_sm};
        }
      }
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
      @media screen and (max-width: 420px) {
        &:after {
          content: "";
          position: absolute;
          z-index: -2;
          top: 50% !important;
          transform: translateY(-50%);
          width: 13.2vw !important;
          height: 23px;
          background-color: ${({ theme: { color } }) => color.select_secondary};
          opacity: 0.5;
        }
      }
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
      @media screen and (max-width: 420px) {
        &:after {
          content: "";
          position: absolute;
          z-index: -2;
          top: 50% !important;
          transform: translateY(-50%);
          width: 6.65vw !important;
          height: 23px;
          background-color: ${({ theme: { color } }) => color.select_secondary};
          opacity: 0.5;
        }
      }
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
      @media screen and (max-width: 420px) {
        &:after {
          content: "";
          position: absolute;
          z-index: -2;
          top: 50% !important;
          transform: translateY(-50%);
          width: 6.65vw !important;
          height: 23px;
          background-color: ${({ theme: { color } }) => color.select_secondary};
          opacity: 0.5;
        }
      }
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
  onHover,
  active,
  subActive,
  showSpan,
  isFirst,
  isLast,
  isFixed,
}: DateComponentProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { date: selectedDate, discardSelectedDate } = useContext(Context);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const handleHover = () => {
      if (date.disabled && !selectedDate.toDate?.isFixed) {
        discardSelectedDate();
        return;
      }
      if (
        (selectedDate.fromDate && //
          (date.year < +selectedDate.fromDate.year || //
            (date.year === +selectedDate.fromDate.year &&
              ((date.month === +selectedDate.fromDate.month - 1 &&
                date.date < +selectedDate.fromDate.day) ||
                date.month < +selectedDate.fromDate.month - 1)))) ||
        date.disabled ||
        (selectedDate.toDate && selectedDate.toDate.isFixed) ||
        !selectedDate.fromDate
      ) {
        return;
      }

      onHover();
    };

    node.addEventListener("mouseover", handleHover);

    return () => {
      node.removeEventListener("mouseover", handleHover);
    };
  }, [
    date.date,
    date.day,
    date.disabled,
    date.month,
    date.year,
    discardSelectedDate,
    onHover,
    ref,
    selectedDate.fromDate,
    selectedDate.toDate,
  ]);

  return (
    <StyledDateComponent
      active={active}
      subActive={subActive}
      disabled={date.disabled}
      onClick={!date.disabled ? onClick : () => {}}
      showSpan={showSpan}
      isFirst={isFirst}
      isLast={isLast}
      isFixed={isFixed}
      ref={ref}
    >
      {date.date}
    </StyledDateComponent>
  );
};

export default DateComponent;
