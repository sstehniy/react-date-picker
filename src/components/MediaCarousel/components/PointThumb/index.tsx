import React from "react";
import styled from "styled-components";

type PointThumbProps = {
  isActive: boolean;
  onClick: () => void;
};

const StyledPointThumb = styled.div<Pick<PointThumbProps, "isActive">>``;

const PhotoThumb = ({ isActive, onClick }: PointThumbProps) => {
  return <StyledPointThumb onClick={onClick} isActive={isActive} />;
};

export default PhotoThumb;
