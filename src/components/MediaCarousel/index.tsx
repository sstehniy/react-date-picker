import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Photo } from "./types";
import PhotoThumb from "./components/PhotoThumb";
import PointThumb from "./components/PointThumb";
import { SwitchButtonLeft, SwitchButtonRight } from "./components/SwitchButton";
import CarouselPhoto from "./components/CarouselPhoto";
// placeholder photos
import space_1 from "../../assets/images/space_1.jpg";
import space_2 from "../../assets/images/space_2.jpg";
import space_3 from "../../assets/images/space_3.jpg";
import space_4 from "../../assets/images/space_4.jpg";
import space_5 from "../../assets/images/space_5.jpg";

type MediaCarouselProps = {
  photos?: Photo[];
  options: {
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

const defaultPhotos = [
  { src: space_1, alt: "space-1" },
  { src: space_2, alt: "space-2" },
  { src: space_3, alt: "space-3" },
  { src: space_4, alt: "space-4" },
  { src: space_5, alt: "space-5" },
];

const defaultOptions: DefaultOptions = {
  autoPlay: false,
  autoPlayInterval: 3000,
  showThumbs: true,
  thumbStyle: "photo",
  defaultPhotoIndex: 0,
};

const StyledCarouselWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const CarouselBody = styled.div`
  position: relative;
`;

const MediaCarousel = ({
  photos: carouselPhotos = defaultPhotos,
  options: {
    autoPlay = defaultOptions.autoPlay,
    autoPlayInterval = defaultOptions.autoPlayInterval,
    showThumbs: withThumbs = defaultOptions.showThumbs,
    thumbStyle = defaultOptions.thumbStyle,
    defaultPhotoIndex = defaultOptions.defaultPhotoIndex,
  },
  onChange = (currPhotoIndex: number) => {},
}: MediaCarouselProps) => {
  const [photos, setPhotos] = useState(carouselPhotos);
  const [currentIndex, setCurrentIndex] = useState(defaultPhotoIndex);
  const [play, setPlay] = useState(autoPlay);
  const [interval, setInterval] = useState(autoPlayInterval);
  const [showThumbs, setShowThumbs] = useState(withThumbs);
  const [thumbType, setThumbType] = useState(thumbStyle);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleThumbClick = (index: number) => {};

  const handleSwitchClickLeft = () => {};

  const handleSwitchClickRight = () => {};

  return (
    <StyledCarouselWrapper ref={carouselRef}>
      <CarouselBody>
        <SwitchButtonLeft onClick={handleSwitchClickLeft} />
        <SwitchButtonRight onClick={handleSwitchClickRight} />
        {photos.map((p, i) => (
          <CarouselPhoto key={i} photo={p} />
        ))}
      </CarouselBody>
    </StyledCarouselWrapper>
  );
};

export default MediaCarousel;
