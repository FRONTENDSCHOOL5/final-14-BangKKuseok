import React from 'react';
import basicProfileImage from '../../../assets/images/profile.png';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more-small.svg';
import {
  UserSimpleInfoWrapper,
  UserInfoBox,
  UserNameBox,
  UserName,
  AccountName,
} from './UserSimpleStyle';
import Button from '../Button/Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserSimpleInfo({ profile, isLink = false, type, onClick }) {
  const [isfollow, setIsFollow] = useState(false);
  const handleClickFollow = () => {
    setIsFollow(!isfollow);
  };

  return (
    <UserSimpleInfoWrapper>
      <UserInfoBox isLink={isLink}>
        {isLink ? (
          <Link to={profile.accountname}>
            <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
            <UserNameBox>
              <UserName>{profile.username}</UserName>
              <AccountName>@ {profile.accountname}</AccountName>
            </UserNameBox>
          </Link>
        ) : (
          <>
            <img src={profile.image || basicProfileImage} alt='유저 프로필 이미지' />
            <UserNameBox>
              <UserName>{profile.username}</UserName>
              <AccountName>@ {profile.accountname}</AccountName>
            </UserNameBox>
          </>
        )}
      </UserInfoBox>
      {type === 'more' ? (
        <button type='button' onClick={onClick}>
          <MoreIcon />
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
