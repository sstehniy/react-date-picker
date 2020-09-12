import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
];

const defaultOptions: DefaultOptions = {
  autoPlay: true,
  autoPlayInterval: 3000,
  infiniteScroll: false,
  showSwitch: true,
  showThumbs: true,
  thumbStyle: "point",
  defaultPhotoIndex: 0,
  defaultAnimationDuration: 0.3,
};

const StyledCarouselWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const CarouselBody = styled.div`
  position: relative;
`;

const CarouselFooter = styled.div<Pick<MediaCarouselProps, "options">>`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

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
  }, [carouselRef, footerRef, showThumbs]);

  useEffect(() => {
    if (!carouselRef.current) return;
    setXOffset(
      -currentIndex * carouselRef.current.getBoundingClientRect().width
    );
  }, [currentIndex, carouselRef]);

  const stopAutoPlayTemp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current && autoPlay) {
      clearInterval(intervalRef.current);
      setPlay(false);
      timeoutRef.current = setTimeout(() => {
        setPlay(true);
      }, 5000);
    }
  };

  const handleThumbClick = (index: number) => {
    stopAutoPlayTemp();
    setCurrentIndex(index);
  };

  const scrollLeft = useCallback(() => {
    if (currentIndex === 0) {
      setCurrentIndex(photos.length - 1);
      setAnimationDuration(defaultAnimationDuration * (photos.length / 5) * 2);
    } else {
      setAnimationDuration(defaultAnimationDuration);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, defaultAnimationDuration, photos.length]);

  const handleSwitchClickLeft = () => {
    stopAutoPlayTemp();
    scrollLeft();
  };

  const scrollRight = useCallback(() => {
    if (currentIndex === photos.length - 1) {
      setCurrentIndex(0);
      setAnimationDuration(defaultAnimationDuration * (photos.length / 5) * 2);
    } else {
      setAnimationDuration(defaultAnimationDuration);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, defaultAnimationDuration, photos.length]);

  const handleSwitchClickRight = () => {
    stopAutoPlayTemp();
    scrollRight();
  };

  const handleInfiniteScrollLeft = () => {};

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
    <StyledCarouselWrapper ref={carouselRef}>
      {!!(xOffset !== null && bodyHeight) && (
        <CarouselBody style={{ height: bodyHeight }}>
          {showSwitch && (
            <>
              <LeftButton onClick={handleSwitchClickLeft} />
              <RightButton onClick={handleSwitchClickRight} />
            </>
          )}

          <div
            style={{
              height: "100%",
              display: "flex",
              transform: `translateX(${xOffset}px)`,
              transition: `transform ${animationDuration}s ease`,
            }}
          >
            {photos.map((p, i) => (
              <CarouselPhoto key={i} photo={p} />
            ))}
          </div>
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
