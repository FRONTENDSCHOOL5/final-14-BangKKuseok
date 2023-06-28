import React, { useState } from 'react';
import { Keyword, ProductCardWrapper, ProductInfoBox } from './ProductCardStyle';
import basicImage from '../../../../assets/images/profile.png';

export default function ProductCard({ data, onClick }) {
  const { itemName, price, itemImage } = data;
  const { name, keyword } = itemName.includes('keyword')
    ? JSON.parse(itemName)
    : { name: undefined, keyword: undefined };

  const [error, setError] = useState(false);
  const handleImageError = () => {
    setError(true);
  };

  return (
    <ProductCardWrapper onClick={onClick}>
      {!error ? (
        <img src={itemImage} alt={name ? name : itemName} onError={handleImageError} />
      ) : (
        <img src={basicImage} alt='기본 이미지' />
      )}
      <ProductInfoBox>
        <h3>{name ? name : itemName}</h3>
        <p>{price.toLocaleString()}원</p>
      </ProductInfoBox>
      {keyword && <Keyword>{keyword}</Keyword>}
    </ProductCardWrapper>
  );
}
