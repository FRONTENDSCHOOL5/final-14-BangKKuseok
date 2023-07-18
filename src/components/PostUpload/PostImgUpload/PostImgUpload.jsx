import React, { useCallback, useRef, useState } from 'react';
import imageUploadBtn from '../../../assets/images/image-upload.png';
import { PostImgUploadWrapper, UploadForm } from './PostImgUploadStyle';
import { useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadImg } from '../../../api/imgApi';
import { URL } from '../../../api/axiosInstance';
import imageCompression from 'browser-image-compression';
const regex = new RegExp(/(.png|.jpg|.jpeg|.gif|.tif|.heic|bmp)/);

//게시글 업로드 및 상품 이미지 업로드
export default function PostImgUpload({
  type = 'post',
  setImg,
  uploadedImg,
  setIsBtnActive,
  setEditData,
  editData,
}) {
  const imgRef = useRef();
  const [previewImg, setPreviewImg] = useState(uploadedImg ?? null);
  const locationPath = useLocation().pathname;

  //이미지 업로드 mutation
  const uploadImgMutation = useMutation(uploadImg, {
    onSuccess(data) {
      console.log(data);
      setImg(URL + data.filename);
      if (locationPath.includes('/post')) {
        if (locationPath.includes('/edit'))
          setEditData({ ...editData, image: URL + data.filename });
        setIsBtnActive(true);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  // 이미지 업로드 시 이미지 최적화 및 미리보기 함수
  const handleUploadImg = async () => {
    const file = imgRef.current.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1000,
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
        setPreviewImg(reader.result);
      };
    } catch (e) {
      console.log(e);
    }
  };

  //초기에 박스 클릭해도 업로드 가능
  const handleMakeFormClick = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.click();
  }, []);

  return (
    <PostImgUploadWrapper type={type}>
      {previewImg ? (
        <img src={previewImg} alt='미리보기 이미지' />
      ) : uploadedImg ? (
        <img src={uploadedImg} alt={`${type} 이미지`} />
      ) : (
        <p onClick={handleMakeFormClick}>
          {type === 'post' ? '회원님의 공간을 공유해주세요' : '판매할 상품이미지를 등록해주세요'}
        </p>
      )}
      <UploadForm>
        <input
          type='file'
          id={`${type}ImgUpload`}
          className='a11y'
          accept='image/*'
          onChange={handleUploadImg}
          ref={imgRef}
        ></input>
        <label htmlFor={`${type}ImgUpload`}>
          <img src={imageUploadBtn} alt='업로드 버튼 이미지' />
        </label>
      </UploadForm>
    </PostImgUploadWrapper>
  );
}
