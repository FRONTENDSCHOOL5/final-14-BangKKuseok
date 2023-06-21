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

export default function ProductDetailCard({ isMyProfile, selectedProduct, onClick }) {
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
        <Button size='lg' onClick={handleClickOpenSite}>
          웹사이트에서 보기
        </Button>
        {isMyProfile && (
          <>
            <Button size='lg' variant='line' onClick={onClick}>
              삭제
            </Button>
            <Button size='lg' onClick={onClick}>
              수정
            </Button>
          </>
        )}
      </ProductActionWrapper>
    </ProductDetailCardWrapper>
  );
}
