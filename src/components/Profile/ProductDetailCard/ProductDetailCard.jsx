import React from 'react';
import Button from '../../common/Button/Button/Button';
import {
  ProductActionWrapper,
  ProductDetailCardWrapper,
  ProductImageWrapper,
  ProductInfoWrapper,
  ProductKeyword,
  ProductName,
  ProductPrice,
} from './ProductDetailCardStyle';

export default function ProductDetailCard({ selectedProduct }) {
  const { itemName, price, link, itemImage } = selectedProduct[0];
  const { name, keyword } = JSON.parse(itemName);

  const handleClickOpenSite = () => {
    window.open(`https://${link}`, '_blank', 'noopener, noreferrer');
  };

  return (
    <ProductDetailCardWrapper>
      <ProductImageWrapper>
        <img src={itemImage} alt={`${itemName} 이미지`} />
      </ProductImageWrapper>
      <ProductInfoWrapper>
        <ProductName>{name}</ProductName>
        <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
        <ProductKeyword>{keyword}</ProductKeyword>
      </ProductInfoWrapper>
      <ProductActionWrapper>
        {/* TODO: API 연동 후 현재 사용자 토큰과 페이지 param이 같지 않다면 웹 사이트에서 보기 버튼만 화면에 렌더링 */}
        <Button size='lg' onClick={handleClickOpenSite}>
          웹사이트에서 보기
        </Button>
        <Button size='lg' variant='line'>
          삭제
        </Button>
        <Button size='lg'>수정</Button>
      </ProductActionWrapper>
    </ProductDetailCardWrapper>
  );
}
