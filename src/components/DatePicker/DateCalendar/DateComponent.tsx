import React, { useRef, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { DateData } from "../typeDefs";
import Context from "../context";

type DateComponentProps = {
  date: DateData;
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
  const ref = useRef<HTMLSpanElement>(null);
  const { date: selectedDate } = useContext(Context);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const handleHover = () => {
      if (!selectedDate.fromDate || date.disabled) return;
      console.log("");
      onClick();
    };

    node.addEventListener("mouseover", handleHover);

    return () => {
      node.removeEventListener("mouseover", handleHover);
    };
  }, [onClick, ref]);

  return (
    <StyledDateComponent
      active={active}
      subActive={subActive}
      disabled={date.disabled}
      onClick={!date.disabled ? onClick : () => {}}
      showSpan={showSpan}
      isFirst={isFirst}
      isLast={isLast}
      ref={ref}
      data-day={date.date}
      data-month={date.month}
      data-year={date.year}
      data-disabled={date.disabled}
    >
      {date.date}
    </StyledDateComponent>
  );
};

export default DateComponent;
