import React from 'react';
import basicProfileImage from '../../../assets/images/profile.png';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more.svg';
import { Link } from 'react-router-dom';
import {
  UserSimpleInfoWrapper,
  UserInfoBox,
  UserNameBox,
  UserName,
  AccountName,
} from './UserSimpleStyle';
import Button from '../Button/Button/Button';
import { useState } from 'react';

export default function UserSimpleInfo({ profile, type }) {
  const [isfollow, setIsFollow] = useState(false);
  const handleClickFollow = () => {
    setIsFollow(!isfollow);
  };

  return (
    <UserSimpleInfoWrapper>
      <UserInfoBox>
        <Link>
          <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
          <UserNameBox>
            <UserName>{profile.username}</UserName>
            <AccountName>@ {profile.accountname}</AccountName>
          </UserNameBox>
        </Link>
      </UserInfoBox>
      {type === 'more' ? (
        <button>
          <MoreIcon
            fill={({ theme }) => theme.colors.black}
            stroke={({ theme }) => theme.colors.black}
          />
        </button>
      ) : type === 'follow' ? (
        <>
          {isfollow ? (
            <Button size='xs' onClick={handleClickFollow}>
              팔로우
            </Button>
          ) : (
            <Button variant='white' size='xs' onClick={handleClickFollow}>
              취소
            </Button>
          )}
        </>
      ) : null}
    </UserSimpleInfoWrapper>
  );
}
