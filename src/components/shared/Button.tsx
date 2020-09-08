import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

type CustomButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  small?: boolean;
  normal?: boolean;
  large?: boolean;
};

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & CustomButtonProps;

const StyledButton = styled.button<CustomButtonProps>`
  margin: 0 5px;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text_primary};
  transition: background-color 0.15s ease, box-shadow 0.15s ease;

  ${({ small }) => {
    return (
      small &&
      css`
        padding: 5px 7px;
        font-size: 0.64rem;
        font-weight: 500;
        border-radius: 0.35em;
        letter-spacing: 1px;
        box-shadow: ${({ theme }) => theme.shadow.button_sm};

        &:hover {
          box-shadow: ${({ theme }) => theme.shadow.button_hover};
        }
      `
    );
  }};

  ${({ normal }) => {
    return (
      normal &&
      css`
        padding: 6px 8px;
        font-size: 0.75rem;
        font-weight: 700;
        border-radius: 0.35em;
        letter-spacing: 1px;
        box-shadow: ${({ theme }) => theme.shadow.button_md};

        &:hover {
          box-shadow: ${({ theme }) => theme.shadow.button_hover};
        }
      `
    );
  }};

  ${({ large }) => {
    return (
      large &&
      css`
        padding: 7px 10px;
        font-size: 0.8rem;
        font-weight: 700;
        border-radius: 0.35em;
        letter-spacing: 1.5px;
        box-shadow: ${({ theme }) => theme.shadow.button_lg};

        &:hover {
          box-shadow: ${({ theme }) => theme.shadow.button_hover};
        }
      `
    );
  }};

  ${({ primary }) => {
    return (
      primary &&
      css`
        background-color: ${({ theme }) => theme.color.btn_primary};

        &:hover {
          background-color: ${({ theme }) => theme.color.btn_primary_hover};
        }
      `
    );
  }}

  ${({ danger }) => {
    return (
      danger &&
      css`
        background-color: ${({ theme }) => theme.color.btn_danger};

        &:hover {
          background-color: ${({ theme }) => theme.color.btn_danger_hover};
        }
      `
    );
  }}

${({ secondary }) => {
    return (
      secondary &&
      css`
        background-color: ${({ theme }) => theme.color.btn_secondary};

        &:hover {
          background-color: ${({ theme }) => theme.color.btn_secondary_hover};
        }
      `
    );
  }}
`;

const Button = ({ ...props }: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
