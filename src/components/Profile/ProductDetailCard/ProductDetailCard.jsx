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
import { useQuery } from 'react-query';
import { getProductDetail } from '../../../api/productApi';
import Spinner from '../../common/Spinner/Spinner';

export default function ProductDetailCard({ isMyProfile, productId, onClick }) {
  // 상품 상세정보 가져오기
  const { data: productDetail, isLoading: isProductDetailLoading } = useQuery(
    ['productDetail', productId],
    () => getProductDetail(productId),
    {
      enabled: !!productId,
    },
  );

  // 로딩중 일 때
  if (isProductDetailLoading) {
    return <Spinner />;
  }

  const { itemName, price, link, itemImage } = productDetail;
  const { name, keyword } = JSON.parse(itemName);

  const handleClickOpenSite = () => {
    window.open(`${link}`, '_blank', 'noopener, noreferrer');
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
