import React from 'react';
import { ButtonBox, ConfirmBackdrop, ConfirmWrapper } from './ConfirmStyle';

export default function Confirm({ children, type, setShowConfirm }) {
  const confirmMsg = {
    delete: '삭제',
    logout: '로그아웃',
  };

  const handleClickConfirm = () => {
    console.log('Confirmed');
    setShowConfirm(false);
  };

  const handleClickCancel = () => {
    console.log('Canceled');
    setShowConfirm(false);
  };

  return (
    <ConfirmBackdrop>
      <ConfirmWrapper>
        {children}
        <ButtonBox>
          <button onClick={handleClickConfirm}>취소</button>
          <button onClick={handleClickCancel}>{confirmMsg[type] || '확인'}</button>
        </ButtonBox>
      </ConfirmWrapper>
    </ConfirmBackdrop>
  );
}
