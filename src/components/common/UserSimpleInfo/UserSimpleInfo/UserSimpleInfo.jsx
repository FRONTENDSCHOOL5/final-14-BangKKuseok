import React from 'react';
import basicProfileImage from '../../../../assets/images/profile.png';
import { ReactComponent as MoreIcon } from '../../../../assets/icons/icon-more-small.svg';
import deleteIcon from '../../../../assets/icons/icon-delete2.svg';
import {
  UserSimpleInfoWrapper,
  UserInfoBox,
  UserNameBox,
  UserName,
  AccountName,
} from './UserSimpleStyle';
import Button from '../../Button/Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserSimpleInfo({
  profile,
  isLink = false,
  isMyProfile,
  type,
  onClick,
  inputValue,
}) {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  return (
    <UserSimpleInfoWrapper>
      <UserInfoBox isLink={isLink}>
        {isLink ? (
          <Link to={'/profile/' + profile.accountname}>
            {!error ? (
              <img src={profile.image} alt='유저 프로필 이미지' onError={handleImageError} />
            ) : (
              <img src={basicProfileImage} alt='기본 프로필 이미지' />
            )}
            <UserNameBox>
              <UserName>
                {inputValue ? (
                  <>
                    {profile.username.split(inputValue).map((part, index) =>
                      index === 0 ? (
                        part
                      ) : (
                        <React.Fragment key={index}>
                          <span className='highlight'>{inputValue}</span>
                          {part}
                        </React.Fragment>
                      ),
                    )}
                  </>
                ) : (
                  profile.username
                )}
              </UserName>
              <AccountName>
                {type === 'follow' ? profile.intro : `@ ${profile.accountname}`}
              </AccountName>
            </UserNameBox>
          </Link>
        ) : (
          <>
            {!error ? (
              <img src={profile.image} alt='유저 프로필 이미지' onError={handleImageError} />
            ) : (
              <img src={basicProfileImage} alt='기본 프로필 이미지' />
            )}
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
        !isMyProfile && (
          <>
            {profile.isfollow ? (
              <Button variant='white' size='xs' onClick={() => onClick(profile.accountname)}>
                언팔로우
              </Button>
            ) : (
              <Button size='xs' onClick={() => onClick(profile.accountname)}>
                팔로우
              </Button>
            )}
          </>
        )
      ) : type === 'history' ? (
        <button type='button' onClick={onClick}>
          <img src={deleteIcon} alt='검색기록 삭제 버튼' />
        </button>
      ) : null}
    </UserSimpleInfoWrapper>
  );
}
