import React, { useCallback, useRef, useState } from 'react';
import imageUploadBtn from '../../../assets/images/image-upload.png';
import { PostImgUploadWrapper, UploadForm } from './PostImgUploadStyle';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userProductsAtom } from '../../../atoms/post';
import { useQuery } from 'react-query';
import { getMyProfile } from '../../../api/profileApi';
import { getProducts } from '../../../api/productApi';

export default function PostImgUpload({ type = 'post', defaultImg = '', setImg, setIsBtnActive }) {
  const imgRef = useRef();
  const [previewImg, setPreviewImg] = useState(defaultImg ?? null);

  const locationPath = useLocation().pathname;

  const [userItems, setUserItems] = useRecoilState(userProductsAtom);
  const { data: myProfileData, isLoading: isMyProfileLoading } = useQuery(
    'myProfile',
    getMyProfile,
  );
  // 상품 정보 가져오기
  const { data: myProductData, isLoading: isProductLoading } = useQuery(
    ['myProduct', myProfileData],
    () => getProducts(myProfileData.accountname),
    {
      enabled: !!myProfileData,
      onSuccess(data) {
        setUserItems(data);
      },
    },
  );

  // 이미지 업로드 시 postImg 변경해서 이미지 미리보기 함수
  const handleUploadImg = () => {
    const file = imgRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        locationPath.includes('/post') ? setImg(file) : setImg(reader.result);
        setPreviewImg(reader.result);
        setIsBtnActive(true);
      };
    }
  };

  //초기에 박스 클릭해도 업로드가 가능하도록
  const handleMakeFormClick = useCallback(() => {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  }, []);

  return (
    <PostImgUploadWrapper type={type}>
      {previewImg ? (
        <img src={previewImg} alt='게시글 이미지' />
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
