import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../assets/next.svg";

type SwitchButtonProps = {
  onClick: () => void;
};

const StyledSwitchButton = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 10%;
  min-width: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  cursor: pointer;

  & > svg {
    width: 60%;
    max-width: 70px;
    height: auto;
    fill: white;
    fill: rgba(255, 255, 255, 0.2);
    transition: fill 0.2s ease;
  }

  &:hover svg {
    fill: rgba(255, 255, 255, 0.5);
  }
`;

const SwitchButtonLeft = styled(StyledSwitchButton)`
  left: 0;

  & > svg {
    transform: rotate(180deg);
  }
`;

const SwitchButtonRight = styled(StyledSwitchButton)`
  right: 0;
`;

export const LeftButton = ({ onClick }: SwitchButtonProps) => {
  return (
    <SwitchButtonLeft onClick={onClick}>
      <ArrowIcon />
    </SwitchButtonLeft>
  );
};

export const RightButton = ({ onClick }: SwitchButtonProps) => {
  return (
    <SwitchButtonRight onClick={onClick}>
      <ArrowIcon />
    </SwitchButtonRight>
  );
};
