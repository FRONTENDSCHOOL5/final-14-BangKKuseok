import React, { useEffect, useState } from 'react';
import topBtn from '../../../../assets/images/top-btn.png';
import debounce from '../../../../utils/debounce';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledTopButton = styled.button`
  position: fixed;
  transition: all 0.2s;
  bottom: ${(p) => (p.isShow ? '78px' : '10px')};
  cursor: pointer;
  right: 20px;
  @media all and (min-width: 721px) {
    right: calc(50% - 340px);
  }
`;

export default function TopButton({ reference }) {
  const [isShow, setIsShow] = useState(false);

  const handleDetectScrollY = debounce(() => {
    if (reference.current.scrollTop > 0) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, 100);

  useEffect(() => {
    const referenceValue = reference.current;
    if (referenceValue) {
      referenceValue.addEventListener('scroll', handleDetectScrollY);
      return () => {
        referenceValue.removeEventListener('scroll', handleDetectScrollY);
      };
    }
  });

  const handleClickTopButton = () => {
    reference.current.scrollTo(0, 0);
  };

  return (
    <StyledTopButton type='button' onClick={handleClickTopButton} isShow={isShow}>
      <img src={topBtn} alt='상단 이동 버튼' />
    </StyledTopButton>
  );
}
