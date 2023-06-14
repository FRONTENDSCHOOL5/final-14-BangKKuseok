import React from 'react';
import styled from 'styled-components';
import basicProfileImage from '../../../assets/images/profile-large.png';
import Button from '../../common/Button/Button/Button';

const ProfileCardWrapper = styled.section`
  width: 100%;
  padding-bottom: 18px;
  background-image: linear-gradient(
    ${({ theme }) => theme.colors.subCoral} 72px,
    ${({ theme }) => theme.colors.white} 72px
  );
`;

const FollowFollowingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 281px;
  margin: 0 auto;
  padding-top: 3px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding-top: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;

  strong {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const ProfileImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};

  img {
    object-fit: cover;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
`;

const UserName = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: 6px;
`;

const AccountName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-bottom: 12px;
`;

const Intro = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const UserActionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
`;

export default function ProfileCard({ profile }) {
  return (
    <ProfileCardWrapper>
      <FollowFollowingBox>
        <TextBox>
          <strong>
            <span>{profile.followerCount}</span>
          </strong>
          <span>followers</span>
        </TextBox>
        <ProfileImgBox>
          <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
        </ProfileImgBox>
        <TextBox>
          <strong>
            <span>{profile.followingCount}</span>
          </strong>
          <span>followings</span>
        </TextBox>
      </FollowFollowingBox>
      <UserInfoBox>
        <UserName>{profile.username}</UserName>
        <AccountName>@ {profile.accountname}</AccountName>
        <Intro>{profile.intro}</Intro>
      </UserInfoBox>
      <UserActionBox>
        {/* TODO: 내 계정의 프로필인지 타계정 프로필인지에 따라 아래의 동작 버튼이 달라진다. */}
        <Button size='md' variant='line'>
          프로필 수정
        </Button>
        <Button size='md'>상품 등록</Button>
      </UserActionBox>
    </ProfileCardWrapper>
  );
}
