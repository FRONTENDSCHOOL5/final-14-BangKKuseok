import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../layout/BasicLayout';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import Confirm from '../../../components/common/Confirm/Confirm';
import OtherSimpleInfo from '../../../components/common/UserSimpleInfo/OtherSimpleInfo/OtherSimpleInfo';
import { profile } from '../../../mock/mockData';
import useModal from '../../../hooks/useModal';

const ChatListWrapper = styled.div`
  padding: 14px 16px;
`;

const ChatList = styled.ul`
  height: auto;
  > :not(:last-child) {
    margin-bottom: 20px;
  }
  li {
    position: relative;
  }
`;

const UnreadDot = styled.div`
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.mainCoral};
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function ChatListPage() {
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: '', object: '' });

  const { openModal, closeModal } = useModal('');

  // 모달 열기
  const handleClickRightButton = () => {
    openModal('myComment');
  };

  const handleClickListItem = (chatId) => {
    setConfirmType({ type: 'delete', object: 'chat' });
    setIsShowConfirm(true);
  };

  const handleClickConfirm = () => {
    setIsShowConfirm(false);
    closeModal();
  };

  return (
    <>
      <BasicLayout type='post' title='채팅' onClickRightButton={handleClickRightButton}>
        {/* mockData의 profile 리스트를 불러온다. */}
        <ChatListWrapper>
          <ChatList>
            {profile.map((profile, index) => (
              <li key={profile._id}>
                <Link
                  to={`/chat/${profile.accountname}`}
                  state={{
                    username: profile.username,
                    image: profile.image,
                    otherChatArr: profile.messages,
                  }}
                >
                  <OtherSimpleInfo
                    profile={profile}
                    message={profile.messages[profile.messages.length - 1]}
                  />
                  {index === 1 && <UnreadDot />}
                </Link>
              </li>
            ))}
          </ChatList>
        </ChatListWrapper>

        {/* -- BottomSheet */}
        <BottomSheet>
          <ListModal onClick={handleClickListItem}></ListModal>
        </BottomSheet>

        {/* -- confirm */}
        {isShowConfirm && (
          <Confirm
            type={confirmType.type}
            object={confirmType.object}
            setIsShowConfirm={setIsShowConfirm}
            onClick={handleClickConfirm}
          />
        )}
      </BasicLayout>
    </>
  );
}
