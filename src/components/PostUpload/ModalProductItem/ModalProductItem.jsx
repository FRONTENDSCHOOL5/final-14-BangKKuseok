import React from 'react';
import Button from '../../common/Button/Button/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bubbleLocAtom, mouseLocAtom, selectedProductsAtom } from '../../../atoms/post';
import { ModalProductItemWrapper, ProductInfoBox } from './ModalProductItemStyle';

export default function ModalProductItem({ data, setIsShow, setTagStep, setIsBubbleShow }) {
  const { itemName, price, itemImage } = data;
  const { name } = JSON.parse(itemName);

  const setSelectedItems = useSetRecoilState(selectedProductsAtom);
  const mouseLoc = useRecoilValue(mouseLocAtom);
  const bubbleLoc = useRecoilValue(bubbleLocAtom);

  // 상품선택하면
  const handleClickProduct = () => {
    //선택된 상품 데이터 1개 저장
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      { ...data, mouseLoc, bubbleLoc },
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
