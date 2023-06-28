import React from 'react';
import { UploadForm } from '../../PostUpload/PostImgUpload/PostImgUploadStyle';
import imageUploadBtn from '../../../assets/images/image-upload.png';
import { PostImgEditWrapper } from './PostImgEditStyle';

export default function PostImgEdit({ postImg, onChange }) {
  return (
    <PostImgEditWrapper>
      <img src={postImg} alt='게시글 이미지' />
      <UploadForm>
        <input
          type='file'
          id='postImgUpload'
          className='a11y'
          accept='image/*'
          onChange={onChange}
        ></input>
        <label htmlFor='postImgUpload'>
          <img src={imageUploadBtn} alt='업로드 버튼 이미지' />
        </label>
      </UploadForm>
    </PostImgEditWrapper>
  );
}
