import React from 'react';
import { ButtonBox, ConfirmBackdrop, ConfirmWrapper } from './ConfirmStyle';

export default function Confirm({ type, object, setIsShowConfirm, onClick }) {
  const confirmMsg = {
    upload: '업로드',
    delete: '삭제',
    report: '신고',
    logout: '로그아웃',
  };
  const confirmObject = {
    chat: '채팅',
    file: '파일',
    product: '상품',
    comment: '댓글',
    post: '게시글',
  };

  const handleClickCancel = () => {
    setIsShowConfirm(false);
  };

  return (
    <ConfirmBackdrop>
      <ConfirmWrapper>
        <span>
          {object
            ? `${confirmObject[object]}을  ${confirmMsg[type]}할까요?`
            : '로그아웃하시겠어요?'}
        </span>
        <ButtonBox>
          <button onClick={handleClickCancel}>취소</button>
          <button onClick={onClick}>{confirmMsg[type] || '확인'}</button>
        </ButtonBox>
      </ConfirmWrapper>
    </ConfirmBackdrop>
  );
}
