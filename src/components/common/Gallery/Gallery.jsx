import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GalleryWrapper = styled.div`
  max-width: 542px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 174px);
  gap: 10px;
`;
const GalleryBox = styled.div`
  width: 174px;
  height: 174px;
  overflow: hidden;
`;
const GalleryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Gallery({ data }) {
  return (
    <GalleryWrapper>
      {data.map((item) => (
        <GalleryBox key={item.id}>
          <Link to={`/post/${item.id}`}>
            <GalleryImg src={item.imgUrl} alt={`${item.author}님의 공간 이미지`} />
          </Link>
        </GalleryBox>
      ))}
    </GalleryWrapper>
  );
}
