import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Photo } from "../types";

type CarouselPhotoProps = {
  photo: Photo;
  index: number;
};

const StyledCarouselPhoto = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 150px;
  flex-shrink: 0;
  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const PhotoDescriptionWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  padding: 20px;
  background-color: rgb(0, 0, 0, 0.5);
`;

const DescriptionText = styled.p`
  color: rgba(200, 200, 200, 0.8);
`;

const DescriptionFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
`;

const DescriptionLink = styled(Link)`
  height: 20px;
  padding: 5px 15px;
  border: 2px solid rgba(200, 200, 200, 0.5);
  color: rgba(200, 200, 200, 0.5);
`;

const DescriptionAnchor = styled.a`
  height: 20px;
  padding: 5px 15px;
  border: 2px solid rgba(200, 200, 200, 0.5);
  color: rgba(200, 200, 200, 0.5);
`;

const CarouselPhoto = ({
  photo: { src, alt, links, text },
  index,
}: CarouselPhotoProps) => {
  return (
    <StyledCarouselPhoto id={index + ""}>
      <img src={src} alt={`${alt}_thumbnail`} loading="lazy" />
      {text && (
        <PhotoDescriptionWrapper>
          <DescriptionText>{text}</DescriptionText>
          {links && (
            <DescriptionFooter>
              {links.map((l, i) =>
                l.type === "link" ? (
                  <DescriptionAnchor href={l.path} key={i}>
                    {l.label}
                  </DescriptionAnchor>
                ) : (
                  <DescriptionLink to={l.path} key={i}>
                    {l.label}
                  </DescriptionLink>
                )
              )}
            </DescriptionFooter>
          )}
        </PhotoDescriptionWrapper>
      )}
    </StyledCarouselPhoto>
  );
};

export default CarouselPhoto;
