import React, { useEffect, useState } from 'react';
import Input from '../../common/Input/Input';
import { ImgUploadBox, ProfileForm } from './SetUserProfileFormStyle';
import ProfileImgUpload from '../../common/ProfileImageUpload/ProfileImageUpload';

export default function SetUserProfileForm({ setIsButtonActive, userData = '' }) {
  const [nameValue, setNameValue] = useState(userData.username ?? '');
  const [idValue, setIdValue] = useState(userData.accountname ?? '');
  const [introValue, setIntroValue] = useState(userData.intro ?? '');

  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');

  const [isNameInValid, setIsNameInValid] = useState(true);
  const [isIdInValid, setIsIdInValid] = useState(true);
  const [isInValid, setIsInValid] = useState(true);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameValue(value);
    setNameError('');
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setIdValue(value);
    setIdError('');
  };

  const handleIntroChange = (e) => {
    const value = e.target.value;
    setIntroValue(value);
  };

  const handleValidateName = () => {
    if (!/^[a-zA-Z0-9가-힣]*$/.test(nameValue) || nameValue.length < 2 || nameValue.length > 10) {
      setNameError('2~10글자 이내 한글, 영문자, 숫자만 가능합니다.');
      setIsNameInValid(true);
    } else {
      setNameError('');
      setIsNameInValid(false);
    }
  };

  const handleValidateId = () => {
    if (!/^[a-zA-Z0-9_.]*$/.test(idValue)) {
      setIdError('영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.');
      setIsIdInValid(true);
    } else {
      setIdError('');
      setIsIdInValid(false);
    }
    const lowercaseValue = idValue.toLowerCase();
    setIdValue(lowercaseValue);
  };

  /**
   * 이름과 id의 유효성이 변경될 때마다 전체 유효성 상태가 변경되며
   * 전체 데이터 유효성 상태에 따라 버튼의 active 상태가 변경된다.
   */
  useEffect(() => {
    setIsInValid(isNameInValid || isIdInValid);

    if (isInValid) {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [isNameInValid, isIdInValid, isInValid, setIsButtonActive]);

  return (
    <ProfileForm>
      <ImgUploadBox>
        <ProfileImgUpload userImg={userData.image} />
      </ImgUploadBox>

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
        value={idValue}
        warningMsg={idError}
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
    </ProfileForm>
  );
}
