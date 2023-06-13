import React, { useEffect, useState } from 'react';
import leftIcon from '../../../assets/icons/icon-carousel-left.svg';
import rightIcon from '../../../assets/icons/icon-carousel-right.svg';
import {
  CarouselWrapper,
  ContentBox,
  ControlBox,
  ImageBox,
  ImageItem,
  Indicator,
  PostDate,
} from './CarouselStyle';

export default function Carousel({ data }) {
  const [current, setCurrent] = useState(0);
  const [movePercentage, setMovePercentage] = useState(`-${current}00%`);
  const [isPopup, setIsPopup] = useState(false);

  const handleClickMoveSlideButton = (i) => {
    let nextIdx = current + i;

    if (nextIdx < 0) {
      nextIdx = data.length - 1;
    } else if (nextIdx >= data.length) {
      nextIdx = 0;
    }

    setCurrent(nextIdx);
  };

  const handleMouseOverCarousel = () => {
    setIsPopup(true);
  };

  const handleMouseOutCarousel = () => {
    setIsPopup(false);
  };

  useEffect(() => {
    setMovePercentage(`-${current}00%`);
  }, [current]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClickMoveSlideButton(1);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <CarouselWrapper onMouseOver={handleMouseOverCarousel} onMouseOut={handleMouseOutCarousel}>
      <ImageBox movePercentage={movePercentage}>
        {data.map((item) => (
          <ImageItem key={item.id} url={item.image}>
            <ContentBox>
              <label>
                {item.author.username}님의 {JSON.parse(item.content).space}
              </label>
              <PostDate>{item.createdAt.slice(0, 10)}</PostDate>
            </ContentBox>
          </ImageItem>
        ))}
      </ImageBox>
      <Indicator>
        <span>{`${current + 1} / ${data.length}`}</span>
      </Indicator>
      <ControlBox isPopup={isPopup}>
        <button
          type='button'
          aria-label='이전 슬라이드 이동 버튼'
          onClick={() => handleClickMoveSlideButton(-1)}
        >
          <img src={leftIcon} alt='' />
        </button>
        <button
          type='button'
          aria-label='다음 슬라이드 이동 버튼'
          onClick={() => handleClickMoveSlideButton(1)}
        >
          <img src={rightIcon} alt='' />
        </button>
      </ControlBox>
    </CarouselWrapper>
  );
}
