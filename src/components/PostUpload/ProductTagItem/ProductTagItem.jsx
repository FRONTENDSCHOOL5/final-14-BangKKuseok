import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import ProductBubble from '../ProductBubble/ProductBubble';

const TagItem = styled.li`
  position: relative;
  transform: translate(-50%, -50%);
  left: ${({ pinLoc }) => pinLoc.x + '%'};
  top: ${({ pinLoc }) => pinLoc.y + '%'};
  width: 20px;
  height: 20px;

  & > img {
    width: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(62, 62, 62, 0.3);
    z-index: 0;
    cursor: pointer;
  }
`;

export default function ProductTagItem({
  data,
  setTagStep,
  setIsMouseMove,
  setPinLoc,
  selectedProducts,
  setSelectedProducts,
  canSelectProducts,
  setCanSelectProducts,
  type,
  onClickProductBubble,
  step,
}) {
  const [isBubbleShow, setIsBubbleShow] = useState(false);

  useEffect(() => {
    if (type !== 'postDetail') {
      setIsBubbleShow(true);
    }
  }, []);

  const handleClickProductTag = () => {
    if (type === 'postDetail') {
      setIsBubbleShow(!isBubbleShow);
    }
  };

  return (
    <TagItem pinLoc={data.pinLoc}>
      <ProductBubble
        data={data}
        setTagStep={setTagStep}
        isBubbleShow={isBubbleShow}
        setIsMouseMove={setIsMouseMove}
        setPinLoc={setPinLoc}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        canSelectProducts={canSelectProducts}
        setCanSelectProducts={setCanSelectProducts}
        type={type}
        onClick={onClickProductBubble}
        step={step}
      />
      <img src={addTagBtn} alt='상품 말풍선 태그 버튼' onClick={handleClickProductTag} />
    </TagItem>
  );
}
