import React from 'react';
import ReactDOM from 'react-dom';
import { ButtonBox, ConfirmBackdrop, ConfirmWrapper } from './ConfirmStyle';
import useConfirm from '../../../hooks/useConfirm';

export default function Confirm({ onClick }) {
  const { confirmData, closeConfirm } = useConfirm();

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

  // Portal을 사용한 Confirm 컴포넌트
  return ReactDOM.createPortal(
    confirmData.isShow && (
      <ConfirmBackdrop>
        <ConfirmWrapper>
          <span>
            {confirmData.object
              ? `${confirmObject[confirmData.object]}을 ${confirmMsg[confirmData.type]}할까요?`
              : '로그아웃하시겠어요?'}
          </span>
          <ButtonBox>
            <button onClick={closeConfirm}>취소</button>
            <button onClick={onClick}>{confirmMsg[confirmData.type] || '확인'}</button>
          </ButtonBox>
        </ConfirmWrapper>
      </ConfirmBackdrop>
    ),
    document.getElementById('confirm-root'),
  );
}
