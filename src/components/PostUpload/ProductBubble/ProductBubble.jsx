import React from 'react';
import deleteIcon from '../../../assets/icons/icon-delete.svg';
import { useRecoilState } from 'recoil';
import { selectedProductsAtom } from '../../../atoms/post';
import { ProductBubbleBox, ProductBubbleWrapper, ProductInfoBox } from './ProductBubbleStyle';

export default function ProductBubble({ data, setTagStep, isBubbleShow = true }) {
  const { itemImage, itemName, price, bubbleLoc } = data;
  const { name } = JSON.parse(itemName);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedProductsAtom);

  //해당항목 삭제
  const handleDeleteItem = (e) => {
    e.stopPropagation();
    setSelectedItems((items) => items.filter((item) => item.id !== data.id));
    if (selectedItems.length === 1) {
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
            <button type='button' onClick={handleDeleteItem}>
              <img src={deleteIcon} alt='삭제 버튼' />
            </button>
          </ProductBubbleBox>
        </ProductBubbleWrapper>
      )}
    </>
  );
}
