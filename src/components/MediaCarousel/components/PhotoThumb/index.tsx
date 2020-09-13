import React from "react";
import styled, { css } from "styled-components";
import { Photo } from "../../types";

type PhotoThumbProps = {
  isActive: boolean;
  photo: Photo;
  onClick: () => void;
};

const StyledPhotoThumb = styled.div<Pick<PhotoThumbProps, "isActive">>`
  width: 70px;
  height: 45px;
  border: 2px solid black;
  margin: 0 10px;
  filter: opacity(0.7);
  transition: filter 0.3s ease;
  cursor: pointer;

  ${({ isActive }) => {
    return (
      isActive &&
      css`
        filter: opacity(1);
      `
    );
  }}

  &:hover {
    filter: ${({ isActive }) => (isActive ? "opacity(1)" : "opacity(0.8)")};
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoThumb = ({
  isActive,
  photo: { src, alt },
  onClick,
}: PhotoThumbProps) => {
  return (
    <StyledPhotoThumb onClick={onClick} isActive={isActive}>
      <img src={src} alt={`${alt}_thumbnail`} />
    </StyledPhotoThumb>
  );
};

export default PhotoThumb;
