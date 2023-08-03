import React, { useState, useCallback, useEffect } from 'react';
import PostImgUpload from '../../../components/PostUpload/PostImgUpload/PostImgUpload';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate } from 'react-router-dom';
import PostProductTag from '../../../components/PostUpload/PostProductTag/PostProductTag';
import PostTextWrite from '../../../components/PostUpload/PostTextWrite/PostTextWrite';
import { useMutation } from 'react-query';
import { uploadPost } from '../../../api/postApi';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  bubbleLocAtom,
  isUploadorEditBeforeAtom,
  mouseLocAtom,
  selectedProductsAtom,
} from '../../../atoms/post';

export default function PostUploadPage() {
  const [step, setStep] = useState('사진 선택');
  const [btnText, setBtnText] = useState('다음');
  const [isBtnActive, setIsBtnActive] = useState(false);
  const navigate = useNavigate();
  const setIsUploadorEditBefore = useSetRecoilState(isUploadorEditBeforeAtom);

  const [content, setContent] = useState({});
  const [postImg, setPostImg] = useState(null);
  const [postId, setPostId] = useState(null);
  const resetSelectedItems = useResetRecoilState(selectedProductsAtom);
  const resetMouseLoc = useResetRecoilState(mouseLocAtom);
  const resetBubbleLoc = useResetRecoilState(bubbleLocAtom);

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
    } else if (step === '게시글 작성') {
      setStep('상품태그 추가');
      setIsBtnActive(true);
      setBtnText('다음');
    }
  }, [step, navigate]);

  //다음 step으로 넘어가는 함수
  const handleClickRightButton = () => {
    if (step === '사진 선택') {
      setStep('상품태그 추가');
    } else if (step === '상품태그 추가') {
      setStep('게시글 작성');
      setIsBtnActive(false);
      setBtnText('등록');
    } else if (step === '게시글 작성') {
      resetSelectedItems();
      resetMouseLoc();
      resetBubbleLoc();
      setIsUploadorEditBefore(true);
      uploadPostMutation.mutate({
        post: { content: JSON.stringify(content), image: postImg },
      });
    }
  };

  const StepLayout = {
    '사진 선택': (
      <PostImgUpload setImg={setPostImg} setIsBtnActive={setIsBtnActive} uploadedImg={postImg} />
    ),
    '상품태그 추가': <PostProductTag postImg={postImg} />,
    '게시글 작성': (
      <PostTextWrite postImg={postImg} setIsBtnActive={setIsBtnActive} setContent={setContent} />
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
        {step === '상품태그 추가' && StepLayout[step]}
        {step === '게시글 작성' && StepLayout[step]}
      </>
    </BasicLayout>
  );
}
