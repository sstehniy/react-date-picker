import React from "react";
import styled from "styled-components";

type SwitchButtonProps = {
  onClick: () => void;
};

const StyledSwitchButton = styled.div``;

const SwitchButton = ({ onClick }: SwitchButtonProps) => {
  return <StyledSwitchButton onClick={onClick} />;
};

export const SwitchButtonLeft = styled(SwitchButton)``;

export const SwitchButtonRight = styled(SwitchButton)``;
