import React from 'react';
import ProductCard from '../../common/Card/ProductCard/ProductCard';
import { ProductCardList, ProductListWrapper } from './ProductListStyle';

export default function ProductList({ products, onClick }) {
  return (
    <ProductListWrapper>
      {products.length > 0 && (
        <>
          <h2>판매 중인 상품</h2>
          <ProductCardList>
            {products.map((item) => (
              <li key={item.id}>
                <ProductCard data={item} onClick={() => onClick(item.id)} />
              </li>
            ))}
          </ProductCardList>
        </>
      )}
    </ProductListWrapper>
  );
}
