import React from "react";
import { styled } from "styled-components";

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  alternative?: boolean;
} & Omit<JSX.IntrinsicElements["button"], "type" | "className">;

const StyledButton = styled.button<
  Pick<ButtonProps, "primary" | "secondary" | "danger" | "alternative">
>``;

const Button = ({ ...props }: ButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
