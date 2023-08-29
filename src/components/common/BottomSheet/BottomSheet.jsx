import React from 'react';
import ReactDOM from 'react-dom';
import { BottomSheetDim, BottomSheetWrapper, ModalBox, ModalHandle } from './BottomSheetStyle';
import useModal from '../../../hooks/useModal';

export default function BottomSheet({ children }) {
  const { modalData, isVisible, closeModal } = useModal('');

  if (!isVisible) {
    return null;
  }

  // Portal을 사용한 BottomSheet 컴포넌트
  return ReactDOM.createPortal(
    <>
      <BottomSheetWrapper>
        <ModalBox isShow={modalData.isShow}>
          {children}
          <ModalHandle onClick={closeModal} aria-label='모달 닫기' />
        </ModalBox>
        <BottomSheetDim isShow={modalData.isShow} onClick={closeModal} />
      </BottomSheetWrapper>
    </>,
    document.getElementById('modal-root'),
  );
}
