import React from 'react';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import styled from 'styled-components';

const StyledProductTag = styled.img`
  position: absolute;
  width: 20px;
  border-radius: 50%;
  box-shadow: 0px 0px 3px rgba(62, 62, 62, 0.3);
  transform: translate(-50%, -50%);
  left: ${({ pinLoc }) => pinLoc.x + '%'};
  top: ${({ pinLoc }) => pinLoc.y + '%'};
  z-index: 0;
`;

export default function ProductTag({ data }) {
  return <StyledProductTag src={addTagBtn} alt='상품 말풍선 태그 버튼' pinLoc={data.pinLoc} />;
}
