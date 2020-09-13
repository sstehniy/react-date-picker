import React from "react";
import styled from "styled-components";
import { Photo } from "../types";

type CarouselPhotoProps = {
  photo: Photo;
  index: number;
};

const StyledCarouselPhoto = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const CarouselPhoto = ({ photo: { src, alt }, index }: CarouselPhotoProps) => {
  return (
    <StyledCarouselPhoto id={index + ""}>
      <img src={src} alt={`${alt}_thumbnail`} loading="lazy" />
    </StyledCarouselPhoto>
  );
};

export default CarouselPhoto;
