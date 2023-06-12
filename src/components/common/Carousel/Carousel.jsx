import React from 'react';
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
  const moveSlide = () => {};

  return (
    <CarouselWrapper>
      <ImageBox>
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
              <Indicator>1 / 5</Indicator>
            </ContentBox>
          </li>
        ))}
      </ImageBox>
      <ControlBox>
        <button type='button' aria-label='이전 슬라이드 이동 버튼' onClick={() => moveSlide()}>
          <img src={leftIcon} alt='' />
        </button>
        <button type='button' aria-label='다음 슬라이드 이동 버튼' onClick={() => moveSlide()}>
          <img src={rightIcon} alt='' />
        </button>
      </ControlBox>
    </CarouselWrapper>
  );
}
