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
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUnFollow, postFollow } from '../../../api/followApi';

export default function ProfileCard({ profile, isMyProfile }) {
  const { accountname: accountnameByParams } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // 팔로우 API
  const postFollowMutation = useMutation(postFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      console.error('팔로우 실패');
    },
  });

  // 언팔로우 API
  const deleteUnFollowMutation = useMutation(deleteUnFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      console.error('언팔로우 실패');
    },
  });

  const handleClickFollow = () => {
    // 팔로우, 언팔로우 API 요청
    profile.isfollow
      ? deleteUnFollowMutation.mutate(accountnameByParams)
      : postFollowMutation.mutate(accountnameByParams);
  };

  return (
    <ProfileCardWrapper>
      <FollowFollowingBox>
        <Link
          to={`/profile/${accountnameByParams ?? profile.accountname}/followers`}
          state={{ accountname: profile.accountname }}
        >
          <TextBox>
            <strong>
              <span>{profile.followerCount}</span>
            </strong>
            <span>followers</span>
          </TextBox>
        </Link>
        <ProfileImgBox>
          <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
        </ProfileImgBox>
        <Link
          to={`/profile/${accountnameByParams ?? profile.accountname}/followings`}
          state={{ accountname: profile.accountname }}
        >
          <TextBox>
            <strong>
              <span>{profile.followingCount}</span>
            </strong>
            <span>followings</span>
          </TextBox>
        </Link>
      </FollowFollowingBox>
      <UserInfoBox>
        <UserName>{profile.username}</UserName>
        <AccountName>@ {profile.accountname}</AccountName>
        <Intro>{profile.intro}</Intro>
      </UserInfoBox>
      <UserActionBox>
        {!isMyProfile ? (
          <>
            <Link to={`/chat/${accountnameByParams}`} title='상대방과 채팅하기'></Link>
            {profile.isfollow ? (
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
            <Button
              size='md'
              variant='line'
              onClick={() => navigate('/profile/edit', { state: profile })}
            >
              프로필 수정
            </Button>
            <Button size='md' onClick={() => navigate('/product/upload')}>
              상품 등록
            </Button>
          </>
        )}
      </UserActionBox>
    </ProfileCardWrapper>
  );
}
