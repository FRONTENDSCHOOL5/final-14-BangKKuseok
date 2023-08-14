import React from 'react';
import Button from '../../common/Button/Button/Button';
import { ModalProductItemWrapper, ProductInfoBox } from './ModalProductItemStyle';

export default function ModalProductItem({
  data,
  setIsShow,
  setTagStep,
  setIsBubbleShow,
  pinLoc,
  bubbleLoc,
  setSelectedProducts,
}) {
  const { itemName, price, itemImage } = data;
  const { name } = JSON.parse(itemName);

  // 상품선택하면
  const handleClickProduct = () => {
    //선택된 상품 데이터 1개 저장
    setSelectedProducts((prevSelectedItems) => [
      ...prevSelectedItems,
      { ...data, pinLoc, bubbleLoc },
    ]);

    //바텀시트 닫고 버블 보이도록
    setIsShow(false);
    setIsBubbleShow(true);
    setTagStep('태그와 버블');
  };

  return (
    <ModalProductItemWrapper>
      <div>
        <img src={itemImage} alt={name} />
        <ProductInfoBox>
          <h3>{name}</h3>
          <p>{price.toLocaleString()}원</p>
        </ProductInfoBox>
      </div>
      <Button size='xs' variant='line' onClick={handleClickProduct}>
        선택
      </Button>
    </ModalProductItemWrapper>
  );
}
