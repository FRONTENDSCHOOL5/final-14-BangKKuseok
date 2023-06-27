import React from 'react';
import { Keyword, ProductCardWrapper, ProductInfoBox } from './ProductCardStyle';

export default function ProductCard({ data, onClick }) {
  const { itemName, price, itemImage } = data;
  const { name, keyword } = itemName.includes('keyword')
    ? JSON.parse(itemName)
    : { name: undefined, keyword: undefined };

  return (
    <ProductCardWrapper onClick={onClick}>
      <img src={itemImage} alt={name ? name : itemName} />
      <ProductInfoBox>
        <h3>{name ? name : itemName}</h3>
        <p>{price.toLocaleString()}원</p>
      </ProductInfoBox>
      {keyword && <Keyword>{keyword}</Keyword>}
    </ProductCardWrapper>
  );
}
