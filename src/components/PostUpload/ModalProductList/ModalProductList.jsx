import React from 'react';
import ModalProductItem from '../ModalProductItem/ModalProductItem';
import Button from '../../common/Button/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ModalProductListWrapper } from './ModalProductListStyle';

export default function ModalProductList({
  setTagStep,
  setIsBubbleShow,
  pinLoc,
  bubbleLoc,
  setSelectedProducts,
  canSelectProducts,
}) {
  const navigate = useNavigate();
  const handleClickProductUploadButton = () => {
    navigate('/product/upload');
  };

  return (
    <ModalProductListWrapper>
      {canSelectProducts.length > 0 ? (
        <>
          {canSelectProducts.map((item) => (
            <ModalProductItem
              data={item}
              key={item.id}
              setTagStep={setTagStep}
              setIsBubbleShow={setIsBubbleShow}
              pinLoc={pinLoc}
              bubbleLoc={bubbleLoc}
              setSelectedProducts={setSelectedProducts}
            />
          ))}
          <Button size='md' onClick={handleClickProductUploadButton}>
            상품 등록
          </Button>
        </>
      ) : (
        <>
          <h2>회원님이 판매 중인 상품이 없습니다.</h2>
          <Button size='md' onClick={handleClickProductUploadButton}>
            상품 등록
          </Button>
        </>
      )}
    </ModalProductListWrapper>
  );
}
