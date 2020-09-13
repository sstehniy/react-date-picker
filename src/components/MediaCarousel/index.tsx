import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
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
    infiniteScroll?: boolean;
    showSwitch?: boolean;
    showThumbs?: boolean;
    thumbStyle?: "photo" | "point";
    defaultPhotoIndex?: number;
    defaultAnimationDuration?: number;
  };
  onChange?: (currPhotoIndex: number) => void;
};

type DefaultOptions = {
  autoPlay: boolean;
  autoPlayInterval: number;
  infiniteScroll: boolean;
  showSwitch: boolean;
  showThumbs: boolean;
  thumbStyle: "photo" | "point";
  defaultPhotoIndex: number;
  defaultAnimationDuration: number;
};

const defaultPhotos = [
  { src: space_1, alt: "space-1" },
  { src: space_2, alt: "space-2" },
  { src: space_3, alt: "space-3" },
  { src: space_4, alt: "space-4" },
  { src: space_5, alt: "space-5" },
  { src: space_1, alt: "space-1" },
];

const defaultOptions: DefaultOptions = {
  autoPlay: true,
  autoPlayInterval: 3000,
  infiniteScroll: false,
  showSwitch: true,
  showThumbs: true,
  thumbStyle: "point",
  defaultPhotoIndex: 0,
  defaultAnimationDuration: 0.5,
};

const StyledCarouselWrapper = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
`;

const CarouselBody = styled.div`
  position: relative;
  user-select: none;
  border-radius: 12px;
  overflow: hidden;
`;

const PhotosWrapper = styled.div<{ offset: number; animationDuration: number }>`
  height: 100%;
  display: flex;
  transform: translateX(${({ offset }) => offset}px);
  transition: transform ${({ animationDuration }) => animationDuration}s
    ease-in-out;
`;

const CarouselFooter = styled.div<Pick<MediaCarouselProps, "options">>`
  width: 80%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  padding: 12px 3%;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: ${({ theme: { shadow } }) => shadow.button_md};
`;

const MediaCarousel = ({
  photos: carouselPhotos = defaultPhotos,
  options,
  onChange = (currPhotoIndex: number) => {},
}: MediaCarouselProps) => {
  const {
    autoPlay = defaultOptions.autoPlay,
    autoPlayInterval = defaultOptions.autoPlayInterval,
    infiniteScroll = defaultOptions.infiniteScroll,
    showSwitch = defaultOptions.showSwitch,
    showThumbs = defaultOptions.showThumbs,
    thumbStyle = defaultOptions.thumbStyle,
    defaultPhotoIndex = defaultOptions.defaultPhotoIndex,
    defaultAnimationDuration = defaultOptions.defaultAnimationDuration,
  } = options;
  const [photos, setPhotos] = useState(carouselPhotos);
  const [currentIndex, setCurrentIndex] = useState(defaultPhotoIndex);
  const [play, setPlay] = useState(autoPlay);
  const [thumbType, setThumbType] = useState(thumbStyle);

  const [xOffset, setXOffset] = useState<number | null>(0);
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const [animationDuration, setAnimationDuration] = useState(
    defaultAnimationDuration
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (showThumbs && footerRef.current) {
      setBodyHeight(
        containerRef.current.getBoundingClientRect().height -
          footerRef.current.getBoundingClientRect().height -
          10
      );
    } else {
      setBodyHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, [containerRef, footerRef, showThumbs]);

  useEffect(() => {
    if (!containerRef.current || infiniteScroll) return;
    setXOffset(
      -currentIndex * containerRef.current.getBoundingClientRect().width
    );
  }, [currentIndex, containerRef, infiniteScroll]);

  const stopAutoPlayTemp = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current && play) {
      clearInterval(intervalRef.current);
      setPlay(false);
      timeoutRef.current = setTimeout(() => {
        setPlay(true);
      }, 5000);
    }
  }, [play]);

  const scrollRight = useCallback(() => {
    if (currentIndex === photos.length - 1) {
      setCurrentIndex(0);
      setAnimationDuration(defaultAnimationDuration * (photos.length / 5) * 2);
    } else {
      setAnimationDuration(defaultAnimationDuration);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, defaultAnimationDuration, photos.length]);

  const scrollLeft = useCallback(() => {
    if (currentIndex === 0) {
      setCurrentIndex(photos.length - 1);
      setAnimationDuration(defaultAnimationDuration * (photos.length / 5) * 2);
    } else {
      setAnimationDuration(defaultAnimationDuration);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, defaultAnimationDuration, photos.length]);

  const handleThumbClick = (index: number) => {
    if (play) stopAutoPlayTemp();
    setCurrentIndex(index);
  };

  const handleSwitchClickLeft = () => {
    if (play) stopAutoPlayTemp();
    scrollLeft();
  };

  const handleSwitchClickRight = () => {
    if (play) stopAutoPlayTemp();
    scrollRight();
  };

  const handleInfiniteSwitchClickLeft = () => {
    if (!containerRef.current || !carouselRef.current) return;
    const node = carouselRef.current;
    if (!node.lastChild) return;
    const oldChild = node.lastChild.cloneNode(true);
    if (!oldChild) return;
    node.children[0].classList.toggle("to-right");

    const newNode = node.insertBefore(oldChild, node.firstChild);

    node.removeChild(node.lastChild);
  };

  const handleInfiniteSwitchClickRight = () => {
    if (!containerRef.current || !carouselRef.current) return;
    const node = carouselRef.current;
    if (!node.firstChild) return;
    const oldChild = node.firstChild.cloneNode(true);
    if (!oldChild) return;
    node.appendChild(oldChild);
    node.removeChild(node.firstChild);
  };

  useEffect(() => {
    if (!play) return;

    intervalRef.current = setInterval(() => {
      setTimeout(() => {
        scrollRight();
      }, animationDuration * 100);
    }, autoPlayInterval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [animationDuration, autoPlayInterval, play, scrollRight]);

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
    <StyledCarouselWrapper ref={containerRef}>
      {!!(xOffset !== null && bodyHeight) && (
        <CarouselBody style={{ height: bodyHeight }}>
          {showSwitch && (
            <>
              <LeftButton
                onClick={
                  infiniteScroll
                    ? handleInfiniteSwitchClickLeft
                    : handleSwitchClickLeft
                }
              />
              <RightButton
                onClick={
                  infiniteScroll
                    ? handleInfiniteSwitchClickRight
                    : handleSwitchClickRight
                }
              />
            </>
          )}

          <PhotosWrapper
            offset={xOffset}
            animationDuration={animationDuration}
            ref={carouselRef}
          >
            {photos.map((p, i) => (
              <CarouselPhoto key={i} photo={p} index={i} />
            ))}
          </PhotosWrapper>
        </CarouselBody>
      )}
      {showThumbs && (
        <CarouselFooter options={options} ref={footerRef}>
          {footerElements}
        </CarouselFooter>
      )}
    </StyledCarouselWrapper>
  );
};

export default MediaCarousel;
