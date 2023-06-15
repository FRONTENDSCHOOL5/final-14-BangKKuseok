import React from 'react';
import basicProfileImage from '../../../assets/images/profile.png';
import Button from '../../common/Button/Button/Button';
import {
  AccountName,
  FollowFollowingBox,
  Intro,
  ProfileCardWrapper,
  ProfileImgBox,
  TextBox,
  UserActionBox,
  UserInfoBox,
  UserName,
} from './ProfileCardStyle';

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
