import React, { useState } from 'react';
import Button from '../../common/Button/Button/Button';
import {
  UserProfileWrapper,
  UserProfileHeader,
  ProfileMainTitle,
  ProfileSubTitle,
  UserProfileBottom,
  IsAlreadyUser,
} from './SetUserProfileStyle';
import SetUserProfileForm from './SetUserProfileForm';

const SetUserProfile = ({ onClickBackLink, onClickNextLink }) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickNextLink();
  };

  return (
    <UserProfileWrapper>
      <UserProfileHeader>
        <ProfileMainTitle>프로필 설정</ProfileMainTitle>
        <ProfileSubTitle>나중에 얼마든지 변경할 수 있습니다.</ProfileSubTitle>
      </UserProfileHeader>

      <SetUserProfileForm setIsButtonActive={setIsButtonActive} />

      <UserProfileBottom>
        <Button type='submit' size='lg' onClick={handleSubmit} disabled={!isButtonActive}>
          방꾸석 들어가기
        </Button>
        <IsAlreadyUser onClick={onClickBackLink}>이전으로 돌아가기</IsAlreadyUser>
      </UserProfileBottom>
    </UserProfileWrapper>
  );
};

export default SetUserProfile;
