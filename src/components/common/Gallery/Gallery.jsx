import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GalleryWrapper = styled.div`
  max-width: 542px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 174px);
  grid-template-rows: repeat(${(count) => count}, 1fr);
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

export default function Gallery({ imgUrl, postId }) {
  const count = imgUrl.length;

  return (
    <GalleryWrapper count={count}>
      {imgUrl.map((url, index) => (
        <GalleryBox key={index}>
          <Link to={`/post/${postId}`}>
            <GalleryImg src={url} alt='no-img' />
          </Link>
        </GalleryBox>
      ))}
    </GalleryWrapper>
  );
}
