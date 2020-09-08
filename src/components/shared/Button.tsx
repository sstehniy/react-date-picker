import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

type CustomButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
};

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & CustomButtonProps;

const StyledButton = styled.button<CustomButtonProps>`
  height: 100%;
  max-height: 35px;
  padding: 3px 10px;
  margin: 0 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: ${({ theme }) => theme.shadow.button};
  cursor: pointer;
  color: ${({ theme }) => theme.color.text_primary};
  transition: filter 0.1s ease;
  &:hover {
    filter: brightness(0.9);
  }

  &.onClick {
    animation: clickAnimation 0.15s forwards ease-in-out;
  }

  ${({ primary }) => {
    return (
      primary &&
      css`
        background-color: ${({ theme }) => theme.color.btn_primary};
      `
    );
  }}

  ${({ danger }) => {
    return (
      danger &&
      css`
        background-color: ${({ theme }) => theme.color.btn_danger};
      `
    );
  }}

${({ secondary }) => {
    return (
      secondary &&
      css`
        background-color: ${({ theme }) => theme.color.text_secondary};
      `
    );
  }}

  @keyframes clickAnimation {
    0% {
      transform: scale(1);
      box-shadow: ${({ theme }) => theme.shadow.button};
    }
    50% {
      transform: scale(0.96);
      box-shadow: ${({ theme }) => theme.shadow.sm};
    }
    100% {
      transform: scale(1);
      box-shadow: ${({ theme }) => theme.shadow.button};
    }
  }
`;

const Button = ({ ...props }: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const handleClick = () => {
      btnRef.current?.classList.remove("onClick");
      setImmediate(() => {
        btnRef.current?.classList.add("onClick");
      });
    };
    btnRef.current.addEventListener("click", handleClick);
    return () => {
      btnRef.current?.removeEventListener("click", handleClick);
    };
  }, [btnRef]);

  return <StyledButton {...props} ref={btnRef} />;
};

export default Button;
