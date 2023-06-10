import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const StyledProductCard = styled.article`
  width: 164px;
  height: 204px;
  box-shadow: 0px 2px 30px rgba(67, 67, 67, 0.12);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 12px;

  img {
    width: 164px;
    aspect-ratio: 164 / 140;
    object-fit: cover;
  }

  .txtBox {
    padding: 1.4rem;

    h3 {
      color: ${({ theme }) => theme.colors.black};
      font-size: ${({ theme }) => theme.fontSize.sm};
      margin-bottom: 0.7rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    p {
      color: ${({ theme }) => theme.colors.mainCoral};
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: 600;
    }
  }

  .keyword {
    position: absolute;
    inset: 8px 8px auto auto;
    padding: 0.7rem 0.8rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    border-radius: 20px;

    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export default function ProductCard({ pdName, pdImg, price, keyword, ...rest }) {
  return (
    <StyledProductCard {...rest}>
      <img src={pdImg} alt={pdName} />
      <div className='txtBox'>
        <h3>{pdName}</h3>
        <p>{price}원</p>
      </div>
      <p className='keyword'>{keyword}</p>
    </StyledProductCard>
  );
}
