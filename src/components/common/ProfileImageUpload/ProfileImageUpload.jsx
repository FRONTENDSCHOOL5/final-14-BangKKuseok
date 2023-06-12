import React, { useRef, useState } from 'react';
import DefaultProfImg from '../../../assets/images/profile-large.png';
import ProfUploadImg from '../../../assets/images/prof-upload.png';
import { ProfileImageUploadWrapper, UploadBtn } from './ProfileImageUploadStyle';

export default function ProfileImageUpload() {
  //프로필 이미지 저장 변수
  const [profImg, setProfImg] = useState(DefaultProfImg);
  const imgRef = useRef();

  // 이미지 업로드 시 profImg 변경해서 이미지 미리보기 함수
  const getProfImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfImg(reader.result);
    };
  };

  return (
    <ProfileImageUploadWrapper>
      <img src={profImg} alt='프로필 이미지' />
      <UploadBtn>
        <input
          type='file'
          id='profUpload'
          className='a11y'
          accept='image/*'
          onChange={getProfImg}
          ref={imgRef}
        ></input>
        <label htmlFor='profUpload'>
          <img src={ProfUploadImg} alt='이미지 업로드 버튼' />
        </label>
      </UploadBtn>
    </ProfileImageUploadWrapper>
  );
}
