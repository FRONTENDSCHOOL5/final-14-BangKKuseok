import React from 'react';
import arrowImg from '../../../../assets/icons/icon-arrow-top.svg';
import {
  BottomInputWrapper,
  RoundedInputBox,
  SubmitBtn,
  ImageBtnBox,
} from './RoundedBottomInputStyle';
import BtnImg from '../../../../assets/images/img-btn.png';

// 사용 예 : <RoundedBottomInput id='comment' placeholder='댓글을 남겨보세요'/>
export default function RoundedBottomInput({
  id,
  placeholder,
  onChange,
  onSubmit,
  value,
  onClick,
  isChat = false,
}) {
  return (
    <BottomInputWrapper>
      {isChat && (
        <ImageBtnBox onClick={onClick}>
          <img src={BtnImg} alt='이미지 업로드 버튼' />
        </ImageBtnBox>
      )}
      <RoundedInputBox onSubmit={onSubmit}>
        <label htmlFor={id} className='a11y'>
          {id}
        </label>
        <input
          type='text'
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
        />
        <SubmitBtn type='submit'>
          <img src={arrowImg} alt='텍스트 업로드' />
        </SubmitBtn>
      </RoundedInputBox>
    </BottomInputWrapper>
  );
}
