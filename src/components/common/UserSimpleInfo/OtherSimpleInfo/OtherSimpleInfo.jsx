import React from 'react';
import basicProfileImage from '../../../../assets/images/profile.png';
import styled from 'styled-components';

const OtherSimpleInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OtherInfoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const OtherNameBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const OtherName = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin-bottom: 6px;
`;
const ChatSnippet = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChatListSummary = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
  width: 238px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatListDate = styled.div`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: 1rem;
`;

export default function OtherSimpleInfo({ profile, message }) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <>
      <OtherSimpleInfoWrapper>
        <OtherInfoBox>
          <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
          <OtherNameBox>
            <OtherName>{profile.username}</OtherName>
            <ChatSnippet>
              <ChatListSummary>{message}</ChatListSummary>
              <ChatListDate>{`${year}.${month}.${day}`}</ChatListDate>
            </ChatSnippet>
          </OtherNameBox>
        </OtherInfoBox>
      </OtherSimpleInfoWrapper>
    </>
  );
}
