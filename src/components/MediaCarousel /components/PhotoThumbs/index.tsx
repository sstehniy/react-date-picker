import React from "react";
import styled from "styled-components";

type PhotoThumbProps = {
  isActive: boolean;
  photo: {
    src: string;
    alt: string;
  };
  onClick: () => void;
};

const StyledPhotoThumb = styled.div<Pick<PhotoThumbProps, "isActive">>``;

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
