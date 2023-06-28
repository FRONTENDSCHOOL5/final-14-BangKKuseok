import React, { useState, useEffect } from 'react';
import { BottomSheetDim, BottomSheetWrapper, ModalBox, ModalHandle } from './BottomSheetStyle';

export default function BottomSheet({ isShow, onClick, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let modalTimer;

    if (isShow) {
      setIsVisible(true);
    } else {
      modalTimer = setTimeout(() => setIsVisible(false), 250);
    } // 0.25초뒤에 없어짐

    return () => {
      if (modalTimer !== undefined) {
        clearTimeout(modalTimer);
      }
    };
  }, [isShow]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <BottomSheetWrapper>
        <ModalBox isShow={isShow}>
          {children}
          <ModalHandle onClick={onClick} aria-label='모달 닫기' />
        </ModalBox>
        <BottomSheetDim isShow={isShow} onClick={onClick} />
      </BottomSheetWrapper>
    </>
  );
}
