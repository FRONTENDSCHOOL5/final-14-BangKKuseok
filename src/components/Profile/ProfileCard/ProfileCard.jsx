import React, { useState } from 'react';
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
import { useParams, Link } from 'react-router-dom';

export default function ProfileCard({ profile }) {
  const { accountname: accountnameByParams } = useParams();
  const [isFollow, setIsFollow] = useState(false);

  const handleClickFollow = () => {
    setIsFollow((prev) => !prev);
  };

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
        {accountnameByParams ? (
          <>
            <Link to={`/chat/${accountnameByParams}`} title='상대방과 채팅하기'></Link>
            {isFollow ? (
              <Button size='md' variant='white' onClick={handleClickFollow}>
                언팔로우
              </Button>
            ) : (
              <Button size='md' onClick={handleClickFollow}>
                팔로우
              </Button>
            )}
            <Link to={``} title='프로필 공유하기'></Link>
          </>
        ) : (
          <>
            <Button size='md' variant='line'>
              프로필 수정
            </Button>
            <Button size='md'>상품 등록</Button>
          </>
        )}
      </UserActionBox>
    </ProfileCardWrapper>
  );
}
