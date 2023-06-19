import React, { useState, useEffect } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button/Button';
import ProfileImgUpload from '../../common/ProfileImageUpload/ProfileImageUpload';
import {
  UserProfileWrapper,
  UserProfileHeader,
  ProfileMainTitle,
  ProfileSubTitle,
  ImgUploadBox,
  UserProfileBottom,
  IsAlreadyUser,
} from './SetUserProfileStyle';

const SetUserProfile = ({ onClickBackLink, onClickNextLink }) => {
  const [nameValue, setNameValue] = useState('');
  const [IdValue, setIdValue] = useState('');
  const [introValue, setIntroValue] = useState('');

  const [nameError, setNameError] = useState('');
  const [IdError, setIdError] = useState('');

  const [isNameInValid, setIsNameInValid] = useState(false);
  const [isIdInValid, setIsIdInValid] = useState(false);

  const [isInValid, setIsInValid] = useState(false);

  const handleGotoSignUpPage = () => {
    onClickBackLink();
  };

  const handleNameChange = (e) => {
    setNameError('');
    setIsInValid(false);
    const value = e.target.value;
    setNameValue(value);
  };

  const handleIdChange = (e) => {
    setIdError('');
    setIsInValid(false);
    const value = e.target.value;
    setIdValue(value);
  };

  const handleIntroChange = (e) => {
    const value = e.target.value;
    setIntroValue(value);
  };

  useEffect(() => {
    setNameError('');
    setIsInValid(false);
    if (!/^[a-zA-Z0-9가-힣]*$/.test(nameValue) || nameValue.length < 2 || nameValue.length > 10) {
      setIsNameInValid(true);
    } else {
      setIsNameInValid(false);
    }
  }, [nameValue]);

  const handleValidateName = () => {
    if (isNameInValid) {
      // 정규표현식 && 길이 문제
      if (!/^[a-zA-Z0-9가-힣]*$/.test(nameValue) || nameValue.length < 2 || nameValue.length > 10) {
        setNameError('2~10글자 이내 한글, 영문자, 숫자만 가능합니다.');
        setIsNameInValid(true);
      }
    } else {
      setNameError('');
      setIsNameInValid(false);
    }
  };

  const handleValidateId = () => {
    if (!/^[a-zA-Z0-9_.]*$/.test(IdValue)) {
      setIdError('영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
      setIsIdInValid(true);
    } else {
      setIdError('');
      setIsIdInValid(false);
    }
    const lowercaseValue = IdValue.toLowerCase();
    setIdValue(lowercaseValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidateName();
    handleValidateId();

    setIsInValid(isNameInValid || isIdInValid);

    console.log(isNameInValid, isIdInValid);

    if (!isNameInValid && !isIdInValid) {
      onClickNextLink();
    }
  };

  return (
    <UserProfileWrapper>
      <UserProfileHeader>
        <ProfileMainTitle>프로필 설정</ProfileMainTitle>
        <ProfileSubTitle>나중에 얼마든지 변경할 수 있습니다.</ProfileSubTitle>
        <ImgUploadBox>
          <ProfileImgUpload />
        </ImgUploadBox>
      </UserProfileHeader>

      <Input
        id='name'
        inputType='text'
        labelText='사용자 이름'
        placeHolder='2~10자 이내여야 합니다.'
        value={nameValue}
        warningMsg={nameError}
        onChange={handleNameChange}
        onBlur={handleValidateName}
        isInValid={isNameInValid}
      />

      <Input
        id='id'
        inputType='text'
        labelText='계정 ID'
        placeHolder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
        value={IdValue}
        warningMsg={IdError}
        onChange={handleIdChange}
        onBlur={handleValidateId}
        isInValid={isIdInValid}
      />
      <Input
        id='intro'
        inputType='text'
        labelText='소개'
        placeHolder='자신과 판매할 상품에 대해 소개해 주세요!'
        value={introValue}
        onChange={handleIntroChange}
      />

      <UserProfileBottom>
        <Button
          type='submit'
          size='lg'
          onClick={handleSubmit}
          disabled={nameValue === '' || IdValue === '' || isInValid}
        >
          방꾸석 들어가기
        </Button>
        <IsAlreadyUser onClick={handleGotoSignUpPage}>이전으로 돌아가기</IsAlreadyUser>
      </UserProfileBottom>
    </UserProfileWrapper>
  );
};

export default SetUserProfile;
