import React, { useState, useCallback, useEffect } from 'react';
import PostImgUpload from '../../../components/PostUpload/PostImgUpload/PostImgUpload';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate } from 'react-router-dom';
import PostProductTag from '../../../components/PostUpload/PostProductTag/PostProductTag';
import PostTextWrite from '../../../components/PostUpload/PostTextWrite/PostTextWrite';
import { useMutation } from 'react-query';
import { uploadPost } from '../../../api/postApi';
import { uploadImg } from '../../../api/imgApi';
import { URL } from '../../../api/axiosInstance';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  bubbleLocAtom,
  isUploadBeforeAtom,
  mouseLocAtom,
  selectedProductsAtom,
} from '../../../atoms/post';

export default function PostUploadPage() {
  const [step, setStep] = useState('사진 선택');
  const [btnText, setBtnText] = useState('다음');
  const [isBtnActive, setIsBtnActive] = useState(false);
  const navigate = useNavigate();
  const setIsUploadBefore = useSetRecoilState(isUploadBeforeAtom);

  const [content, setContent] = useState({});
  const [postImg, setPostImg] = useState(null);
  const [postedImg, setPostedImg] = useState(null);
  const [postId, setPostId] = useState(null);
  const resetSelectedItems = useResetRecoilState(selectedProductsAtom);
  const resetMouseLoc = useResetRecoilState(mouseLocAtom);
  const resetBubbleLoc = useResetRecoilState(bubbleLocAtom);

  //이미지 업로드 함수
  const uploadImgMutation = useMutation(uploadImg, {
    onSuccess(data) {
      if (data.message) {
        alert(data.message);
        setStep('사진 선택');
      }
      setPostedImg(URL + data.filename);
    },
    onError(error) {
      console.log(error);
    },
  });

  //포스트 업로드 함수
  const uploadPostMutation = useMutation(uploadPost, {
    onSuccess(data) {
      setPostId(data.post.id);
    },
    onError(error) {
      console.log(error);
    },
  });

  //게시글 상세페이지로 이동하기
  useEffect(() => {
    if (postId) {
      navigate(`/post/${postId}`);
    }
  }, [navigate, postId]);

  //이전 step으로 돌아가는 함수
  const handleClickLeftButton = useCallback(() => {
    if (step === '사진 선택') {
      navigate(-1);
    } else if (step === '상품태그 추가') {
      setStep('사진 선택');
      setIsBtnActive(true);
    } else if (step === '게시글 작성') {
      setStep('상품태그 추가');
      setBtnText('다음');
    }
  }, [step, navigate]);

  //다음 step으로 넘어가는 함수
  const handleClickRightButton = () => {
    if (step === '사진 선택') {
      const imgData = new FormData();
      imgData.append('image', postImg);
      uploadImgMutation.mutate(imgData);

      setStep('상품태그 추가');
      setIsBtnActive(false);
    } else if (step === '상품태그 추가') {
      setStep('게시글 작성');
      setIsBtnActive(false);
      setBtnText('등록');
    } else if (step === '게시글 작성') {
      resetSelectedItems();
      resetMouseLoc();
      resetBubbleLoc();
      setIsUploadBefore(true);
      uploadPostMutation.mutate({
        post: { content: JSON.stringify(content), image: postedImg },
      });
    }
  };

  const StepLayout = {
    '사진 선택': (
      <PostImgUpload setImg={setPostImg} setIsBtnActive={setIsBtnActive} postedImg={postedImg} />
    ),
    '상품태그 추가': <PostProductTag postedImg={postedImg} setIsBtnActive={setIsBtnActive} />,
    '게시글 작성': (
      <PostTextWrite
        postedImg={postedImg}
        setIsBtnActive={setIsBtnActive}
        setContent={setContent}
      />
    ),
  };

  return (
    <BasicLayout
      type='imageSelect'
      isNonNav
      title={step}
      btnText={btnText}
      isBtnActive={isBtnActive}
      onClickLeftButton={handleClickLeftButton}
      onClickRightButton={handleClickRightButton}
    >
      <>
        {step === '사진 선택' && StepLayout[step]}
        {step === '상품태그 추가' && postedImg && StepLayout[step]}
        {step === '게시글 작성' && postedImg && StepLayout[step]}
      </>
    </BasicLayout>
  );
}
