import React, { useEffect, useState } from 'react';
import leftIcon from '../../../assets/icons/icon-carousel-left.svg';
import rightIcon from '../../../assets/icons/icon-carousel-right.svg';
import {
  CarouselWrapper,
  ContentBox,
  ControlBox,
  ImageBox,
  Indicator,
  PostDate,
} from './CarouselStyle';

export default function Carousel({ data }) {
  const [current, setCurrent] = useState(0);
  const [movePercentage, setMovePercentage] = useState(`-${current}00%`);

  const moveSlide = (i) => {
    let nextIdx = current + i;

    if (nextIdx < 0) {
      nextIdx = data.length - 1;
    } else if (nextIdx >= data.length) {
      nextIdx = 0;
    }

    setCurrent(nextIdx);
  };

  useEffect(() => {
    setMovePercentage(`-${current}00%`);
  }, [current]);

  useEffect(() => {
    const timer = setTimeout(() => {
      moveSlide(1);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <CarouselWrapper>
      <ImageBox movePercentage={movePercentage}>
        {data.map((item) => (
          <li key={item.id}>
            <img
              src={item.image}
              alt={`${item.author.username}님의  ${JSON.parse(item.content).space}이미지`}
            />
            <ContentBox>
              <label>
                {item.author.username}님의 {JSON.parse(item.content).space}
              </label>
              <PostDate>{item.createdAt.slice(0, 10)}</PostDate>
              <Indicator>
                <span>{`${current + 1} / ${data.length}`}</span>
              </Indicator>
            </ContentBox>
          </li>
        ))}
      </ImageBox>
      <ControlBox>
        <button type='button' aria-label='이전 슬라이드 이동 버튼' onClick={() => moveSlide(-1)}>
          <img src={leftIcon} alt='' />
        </button>
        <button type='button' aria-label='다음 슬라이드 이동 버튼' onClick={() => moveSlide(1)}>
          <img src={rightIcon} alt='' />
        </button>
      </ControlBox>
    </CarouselWrapper>
  );
}
