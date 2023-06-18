import React, { useState, useCallback } from 'react';
import PostImgUpload from '../../../components/PostUpload/PostImgUpload/PostImgUpload';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate } from 'react-router-dom';
import PostProductTag from '../../../components/PostUpload/PostProductTag/PostProductTag';
import PostTextWrite from '../../../components/PostUpload/PostTextWrite/PostTextWrite';

export default function PostUploadPage() {
  const [step, setStep] = useState('사진 선택');
  const [btnText, setBtnText] = useState('다음');
  const [isBtnActive, setIsBtnActive] = useState(false);
  const navigate = useNavigate();

  const [content, setContent] = useState({});
  const [postImg, setPostImg] = useState(null);

  //이전 step으로 돌아가는 함수
  const handleClickBackBtn = useCallback(() => {
    if (step === '사진 선택') {
      navigate(-1);
    } else if (step === '상품태그 추가') {
      setStep('사진 선택');
      setIsBtnActive(true);
    } else if (step === '게시글 작성') {
      setStep('상품태그 추가');
    }
  }, [step, navigate]);

  //다음 step으로 넘어가는 함수
  const handleClickNextBtn = () => {
    if (step === '사진 선택') {
      setStep('상품태그 추가');
      setIsBtnActive(false);
    } else if (step === '상품태그 추가') {
      setStep('게시글 작성');
      setIsBtnActive(false);
      setBtnText('등록');
    } else if (step === '게시글 작성') {
      navigate('/:postId');
      console.log(content);
      //여기 content랑 postImg를 api post보내기
    }
  };

  const StepLayout = {
    '사진 선택': (
      <PostImgUpload postImg={postImg} setPostImg={setPostImg} setIsBtnActive={setIsBtnActive} />
    ),
    '상품태그 추가': <PostProductTag postImg={postImg} setIsBtnActive={setIsBtnActive} />,
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
      onClickBackBtn={handleClickBackBtn}
      onClickNextBtn={handleClickNextBtn}
    >
      <>
        {step === '사진 선택' && StepLayout[step]}
        {step === '상품태그 추가' && StepLayout[step]}
        {step === '게시글 작성' && StepLayout[step]}
      </>
    </BasicLayout>
  );
}
