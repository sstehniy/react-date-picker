import React from "react";
import styled, { css } from "styled-components";

type PointThumbProps = {
  isActive: boolean;
  onClick: () => void;
};

const StyledPointThumb = styled.div<Pick<PointThumbProps, "isActive">>`
  height: 10px;
  width: 15%;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: rgba(0, 0, 0, 0.9);
    `}
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.6)"};
  }
`;

const PhotoThumb = ({ isActive, onClick }: PointThumbProps) => {
  return <StyledPointThumb onClick={onClick} isActive={isActive} />;
};

export default PhotoThumb;
