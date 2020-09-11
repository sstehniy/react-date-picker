import React from "react";
import styled from "styled-components";
import { Photo } from "../types";

type CarouselPhotoProps = {
  photo: Photo;
};

const StyledCarouselPhoto = styled.div``;

const CarouselPhoto = ({ photo: { src, alt } }: CarouselPhotoProps) => {
  return (
    <StyledCarouselPhoto>
      <img src={src} alt={`${alt}_thumbnail`} />
    </StyledCarouselPhoto>
  );
};

export default CarouselPhoto;
