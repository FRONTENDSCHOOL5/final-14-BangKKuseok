import React, { useCallback, useRef, useState } from 'react';
import imageUploadBtn from '../../../assets/images/image-upload.png';
import { PostImgUploadWrapper, UploadForm } from './PostImgUploadStyle';

export default function PostImgUpload({ setPostImg, setIsBtnActive }) {
  const imgRef = useRef();
  const [previewImg, setPreviewImg] = useState(null);

  // 이미지 업로드 시 postImg 변경해서 이미지 미리보기 함수
  const HandleUploadPostImg = () => {
    const file = imgRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostImg(file);
        setPreviewImg(reader.result);
        setIsBtnActive(true);
      };
    }
  };

  //초기에 박스 클릭해도 업로드가 가능하도록
  const HandleMakeFormClick = useCallback(() => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  }, []);

  return (
    <PostImgUploadWrapper>
      {previewImg ? (
        <img src={previewImg} alt='게시글 이미지' />
      ) : (
        <p onClick={HandleMakeFormClick}>회원님의 공간을 공유해주세요</p>
      )}
      <UploadForm>
        <input
          type='file'
          id='postImgUpload'
          className='a11y'
          accept='image/*'
          onChange={HandleUploadPostImg}
          ref={imgRef}
        ></input>
        <label htmlFor='postImgUpload'>
          <img src={imageUploadBtn} alt='업로드 버튼 이미지' />
        </label>
      </UploadForm>
    </PostImgUploadWrapper>
  );
}
