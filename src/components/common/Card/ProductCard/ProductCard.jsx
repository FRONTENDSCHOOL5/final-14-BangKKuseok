import React from 'react';
import { Keyword, ProductCardWrapper, ProductInfoBox } from './ProductCardStyle';

export default function ProductCard({ data, onClick }) {
  const {itemName, price, itemImage } = data;
  const { name, keyword } = JSON.parse(itemName);
  return (
    <ProductCardWrapper onClick={onClick}>
      <img src={itemImage} alt={name} />
      <ProductInfoBox>
        <h3>{name}</h3>
        <p>{price.toLocaleString()}원</p>
      </ProductInfoBox>
      <Keyword>{keyword}</Keyword>
    </ProductCardWrapper>
  );
}
