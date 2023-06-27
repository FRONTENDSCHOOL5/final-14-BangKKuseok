import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../layout/BasicLayout';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import Confirm from '../../../components/common/Confirm/Confirm';
import OtherSimpleInfo from '../../../components/common/UserSimpleInfo/OtherSimpleInfo/OtherSimpleInfo';
import { profile } from '../../../mock/mockData';

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
  const [isShow, setIsShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: '', object: '' });

  const navigate = useNavigate();

  // 모달 열기
  const handleClickRightButton = () => {
    setModalType('myComment');
    setIsShow(true);
  };

  // 모달 열고 닫기
  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  const handleClickListItem = (chatId) => {
    setConfirmType({ type: 'delete', object: 'chat' });
    setIsShowConfirm(true);
  };

  return (
    <>
      <BasicLayout
        type={'post'}
        onClickLeftButton={() => navigate(-1)}
        onClickRightButton={handleClickRightButton}
      >
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

        {/* 모달 열기 */}
        {isShow && (
          <BottomSheet isShow={isShow} onClick={handleClickModalOpen}>
            <ListModal type={modalType} onClick={handleClickListItem}></ListModal>
          </BottomSheet>
        )}

        {/* confirm창 열기 */}
        {isShowConfirm && (
          <Confirm
            type={confirmType.type}
            object={confirmType.object}
            setIsShowConfirm={setIsShowConfirm}
          />
        )}
      </BasicLayout>
    </>
  );
}
