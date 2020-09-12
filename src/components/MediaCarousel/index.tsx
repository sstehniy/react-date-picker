import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Photo } from "./types";
import PhotoThumb from "./components/PhotoThumb";
import PointThumb from "./components/PointThumb";
import { LeftButton, RightButton } from "./components/SwitchButton";
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
  background-color: red;
  overflow: hidden;
`;

const CarouselBody = styled.div`
  position: relative;
  display: flex;
`;

const CarouselFooter = styled.div<Pick<MediaCarouselProps, "options">>``;

const MediaCarousel = ({
  photos: carouselPhotos = defaultPhotos,
  options,
  onChange = (currPhotoIndex: number) => {},
}: MediaCarouselProps) => {
  const {
    autoPlay = defaultOptions.autoPlay,
    autoPlayInterval = defaultOptions.autoPlayInterval,
    showThumbs: withThumbs = defaultOptions.showThumbs,
    thumbStyle = defaultOptions.thumbStyle,
    defaultPhotoIndex = defaultOptions.defaultPhotoIndex,
  } = options;
  const [photos, setPhotos] = useState(carouselPhotos);
  const [currentIndex, setCurrentIndex] = useState(defaultPhotoIndex);
  const [play, setPlay] = useState(autoPlay);
  const [interval, setInterval] = useState(autoPlayInterval);
  const [showThumbs, setShowThumbs] = useState(withThumbs);
  const [thumbType, setThumbType] = useState(thumbStyle);

  const [xOffset, setXOffset] = useState<number | null>(null);
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    if (showThumbs && footerRef.current) {
      setBodyHeight(
        carouselRef.current.getBoundingClientRect().height -
          footerRef.current.getBoundingClientRect().height
      );
    } else {
      setBodyHeight(carouselRef.current.getBoundingClientRect().height);
    }

    if (currentIndex === 0 || currentIndex === photos.length - 1) {
      setPhotos([...photos, ...photos]);
    }

    setXOffset(
      carouselRef.current.getBoundingClientRect().width * currentIndex
    );
  }, [carouselRef, footerRef]);

  const handleThumbClick = (index: number) => {};

  const handleSwitchClickLeft = () => {
    console.log(currentIndex, photos.length);
    if (currentIndex === 0) {
      setCurrentIndex(Math.floor(photos.length / 2) - 1);
      return;
    } else if (currentIndex === 1) {
      setPhotos([...photos, ...photos]);
    } else if (currentIndex === photos.length - 2) {
      setPhotos(photos.splice(0, Math.floor(photos.length / 2)));
      setCurrentIndex(photos.length - 3);
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleSwitchClickRight = () => {
    if (currentIndex === photos.length - 1) {
      setCurrentIndex(Math.floor(photos.length / 2) + 1);
      return;
    } else if (currentIndex === photos.length - 2) {
      setPhotos([...photos, ...photos]);
    } else if (currentIndex === 0) {
      setPhotos(photos.splice(0, Math.floor(photos.length / 2)));
      setCurrentIndex(1);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const footerElements = (() => {
    if (!showThumbs || !thumbStyle) return null;
    switch (thumbStyle) {
      case "photo":
        return (
          <>
            {photos.map((p, i) => (
              <PhotoThumb
                key={i}
                photo={p}
                isActive={i === currentIndex}
                onClick={() => {
                  handleThumbClick(i);
                }}
              />
            ))}
          </>
        );
      case "point":
        return (
          <>
            {photos.map((_, i) => (
              <PointThumb
                key={i}
                isActive={i === currentIndex}
                onClick={() => handleThumbClick(i)}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <StyledCarouselWrapper ref={carouselRef}>
      {!!(xOffset !== null && bodyHeight) && (
        <CarouselBody
          style={{ height: bodyHeight, transform: `translateX(${xOffset})` }}
        >
          <LeftButton onClick={handleSwitchClickLeft} />
          <RightButton onClick={handleSwitchClickRight} />
          {photos.map((p, i) => (
            <CarouselPhoto key={i} photo={p} />
          ))}
        </CarouselBody>
      )}
      {/* {showThumbs && (
        <CarouselFooter options={options} ref={footerRef}>{footerElements}</CarouselFooter>
      )} */}
    </StyledCarouselWrapper>
  );
};

export default MediaCarousel;
