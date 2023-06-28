import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(174px, 1fr));
  gap: 10px;
`;
const GalleryBox = styled.div`
  aspect-ratio: 174 / 174;
  overflow: hidden;
  border-radius: 8px;
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
          <Link to={`/post/${item.id}`} state={{ data: item }}>
            <GalleryImg src={item.imgUrl} alt={`${item.accountname}님의 공간 이미지`} />
          </Link>
        </GalleryBox>
      ))}
    </GalleryWrapper>
  );
}
