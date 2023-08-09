import React from 'react';
import deleteIcon from '../../../assets/icons/icon-delete.svg';
import { ProductBubbleBox, ProductBubbleWrapper, ProductInfoBox } from './ProductBubbleStyle';

export default function ProductBubble({
  data,
  setTagStep,
  setIsMouseMove,
  isBubbleShow = true,
  setPinLoc,
  selectedProducts,
  setSelectedProducts,
  setCanSelectProducts,
}) {
  const { itemImage, itemName, price, bubbleLoc } = data;
  const { name } = JSON.parse(itemName);

  //해당항목 삭제
  const handleDeleteItem = (e) => {
    e.stopPropagation();
    setSelectedProducts((items) => items.filter((item) => item.id !== data.id));
    setCanSelectProducts((prevData) => [data, ...prevData]);
    if (selectedProducts.length === 1) {
      setIsMouseMove(false);
      setPinLoc({ x: 50, y: 50 });
      setTagStep('클릭 유도');
    }
  };

  return (
    <>
      {isBubbleShow && (
        <ProductBubbleWrapper bubbleLoc={bubbleLoc}>
          <ProductBubbleBox bubbleLoc={bubbleLoc}>
            <img src={itemImage} alt={name} />
            <ProductInfoBox>
              <h3>{name}</h3>
              <p>{price.toLocaleString()}원</p>
            </ProductInfoBox>
            <button type='button' onMouseUp={handleDeleteItem}>
              <img src={deleteIcon} alt='삭제 버튼' />
            </button>
          </ProductBubbleBox>
        </ProductBubbleWrapper>
      )}
    </>
  );
}
