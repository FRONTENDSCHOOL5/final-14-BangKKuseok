import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../common/Card/ProductCard/ProductCard';

const ProductListWrapper = styled.section`
  h2 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
  margin-top: 21px;
  padding-left: 16px;
`;

const ProductCardList = styled.ul`
  padding: 15px 0 36px 0;
  display: flex;
  overflow: hidden;
`;

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
