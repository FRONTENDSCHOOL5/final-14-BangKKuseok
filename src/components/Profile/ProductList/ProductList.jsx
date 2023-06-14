import React from 'react';
import ProductCard from '../../common/Card/ProductCard/ProductCard';
import { ProductCardList, ProductListWrapper } from './ProductListStyle';

export default function ProductList({ products }) {
  return (
    <ProductListWrapper>
      {products.length > 1 && (
        <>
          <h2>판매 중인 상품</h2>
          <ProductCardList>
            {products.map((item) => (
              <li key={item.id}>
                <ProductCard data={item} />
              </li>
            ))}
          </ProductCardList>
        </>
      )}
    </ProductListWrapper>
  );
}
