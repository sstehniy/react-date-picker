import React, { useState, useRef } from "react";
import styled from "styled-components";
// placeholder photos
import space_1 from "../../assets/images/space_1.jpg";
import space_2 from "../../assets/images/space_2.jpg";
import space_3 from "../../assets/images/space_3.jpg";
import space_4 from "../../assets/images/space_4.jpg";
import space_5 from "../../assets/images/space_5.jpg";

type MediaCarouselProps = {
  photos?: string[];
  options?: {
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showThumbs?: boolean;
    thumbStyle?: "photo" | "point";
    defaultPhotoIndex?: number;
  };
  onChange?: (currPhotoIndex: number) => void;
};

type DefaultOptions = {
  autoPlay: boolean;
  autoPlayInterval: number;
  showThumbs: boolean;
  thumbStyle: "photo" | "point";
  defaultPhotoIndex: number;
};

const defaultPhotos = [space_1, space_2, space_3, space_4, space_5];

const defaultOptions: DefaultOptions = {
  autoPlay: false,
  autoPlayInterval: 3000,
  showThumbs: true,
  thumbStyle: "photo",
  defaultPhotoIndex: 0,
};

const StyledCarouselWrapper = styled.div``;

const MediaCarousel = ({
  photos = defaultPhotos,
  options,
  onChange = (currPhotoIndex: number) => {},
}: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    options?.defaultPhotoIndex || defaultOptions.defaultPhotoIndex
  );
  const [autoPlay, setPlayScroll] = useState(
    options?.defaultPhotoIndex || defaultOptions.defaultPhotoIndex
  );
  const [interval, setInterval] = useState(
    options?.autoPlay
      ? options?.autoPlayInterval || defaultOptions.autoPlayInterval
      : null
  );
  const [showThumbs, setShowThumbs] = useState(
    options?.showThumbs || defaultOptions.showThumbs
  );
  const [thumbStyle, setThumbStyle] = useState(
    options?.showThumbs
      ? options?.thumbStyle || defaultOptions.thumbStyle
      : null
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const { current: allPhotos } = useRef(photos);

  return <StyledCarouselWrapper ref={carouselRef}></StyledCarouselWrapper>;
};

export default MediaCarousel;
