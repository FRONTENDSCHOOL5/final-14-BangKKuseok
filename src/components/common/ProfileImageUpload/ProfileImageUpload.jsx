import React, { useRef, useState } from 'react';
import defaultProfImg from '../../../assets/images/profile.png';
import profUploadImg from '../../../assets/images/prof-upload.png';
import { ProfileImageUploadWrapper, UploadBox } from './ProfileImageUploadStyle';
import { useMutation } from 'react-query';
import { uploadImg } from '../../../api/imgApi';
import { URL } from '../../../api/axiosInstance';
import imageCompression from 'browser-image-compression';
const regex = new RegExp(/(.png|.jpg|.jpeg|.gif|.tif|.heic|bmp)/);

export default function ProfileImageUpload({ userImg, setNewProfileImage }) {
  //프로필 이미지 저장 변수
  const [profImg, setProfImg] = useState(userImg ?? defaultProfImg);
  const imgRef = useRef();

  //이미지 업로드 mutation
  const uploadImgMutation = useMutation(uploadImg, {
    onSuccess(data) {
      console.log(data);
      setProfImg(URL + data.filename);
      setNewProfileImage(URL + data.filename);
    },
    onError(error) {
      console.log(error);
    },
  });

  // 이미지 업로드 시 profImg 변경해서 이미지 미리보기 함수
  const getProfImg = async () => {
    const file = imgRef.current.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 110,
    };
    const fileTypeOptions = { ...options, fileType: 'image/jpeg' };

    try {
      const compressedBlob = await imageCompression(
        file,
        regex.test(file) ? options : fileTypeOptions,
      );
      const compressedFile = new File(
        [compressedBlob],
        regex.test(file) ? compressedBlob.name : compressedBlob.name.split('.')[0] + '.jpeg',
        {
          type: compressedBlob.type,
        },
      );
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const imgData = new FormData();
        imgData.append('image', compressedFile);
        uploadImgMutation.mutate(imgData);
      };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileImageUploadWrapper>
      <img src={profImg} alt='프로필 이미지' />
      <UploadBox>
        <input
          type='file'
          id='profUpload'
          className='a11y'
          accept='image/*'
          onChange={getProfImg}
          ref={imgRef}
        ></input>
        <label htmlFor='profUpload'>
          <img src={profUploadImg} alt='업로드 버튼 이미지' />
        </label>
      </UploadBox>
    </ProfileImageUploadWrapper>
  );
}
