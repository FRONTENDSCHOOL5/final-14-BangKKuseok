import React from 'react';
import ProductCard from '../../common/Card/ProductCard/ProductCard';
import { ProductCardList, ProductListWrapper } from './ProductListStyle';
import useSwipe from '../../../hooks/useSwipe';

export default function ProductList({ products, onClick }) {
  const [isDrag, scrollRef, handleDragStart, handleDragMove, handleDragEnd] = useSwipe();

  return (
    <ProductListWrapper>
      <>
        <h2>판매 중인 상품</h2>
        <ProductCardList
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {products?.map((item) => (
            <li key={item.id}>
              <ProductCard
                data={item}
                onClick={() => {
                  if (!isDrag) onClick(item.id);
                }}
              />
            </li>
          ))}
        </ProductCardList>
      </>
    </ProductListWrapper>
  );
}
