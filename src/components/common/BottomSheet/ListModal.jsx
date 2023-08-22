import React from 'react';
import styled from 'styled-components';
import useModal from '../../../hooks/useModal';

const BottomSheetListWrapper = styled.ul`
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  height: 46px;
  padding: 14px 26px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
`;

const TYPES = {
  profile: ['설정 및 개인정보', '로그아웃'],
  myPost: ['삭제', '수정'],
  userPost: ['신고하기'],
  chat: ['채팅방 나가기'],
  myComment: ['삭제'],
  userComment: ['신고하기'],
};

export default function ListModal({ onClick }) {
  const { modalData } = useModal('');

  return (
    <BottomSheetListWrapper>
      {TYPES[modalData.modalType].map((item, index) => (
        <ListItem key={index} onClick={onClick}>
          <button type='button'>{item}</button>
        </ListItem>
      ))}
    </BottomSheetListWrapper>
  );
}
