import React, { forwardRef } from 'react';
import arrowImg from '../../../../assets/icons/icon-arrow-top.svg';
import {
  BottomInputWrapper,
  RoundedInputBox,
  SubmitBtn,
  ImageBtnBox,
} from './RoundedBottomInputStyle';
import BtnImg from '../../../../assets/images/img-btn.png';

// 사용 예 : <RoundedBottomInput id='comment' placeholder='댓글을 남겨보세요'/>
const RoundedBottomInput = forwardRef(
  ({ id, placeholder, value, onClick, onChange, onSubmit, isChat = false }, forwardedRef) => {
    return (
      <BottomInputWrapper>
        {isChat && (
          <ImageBtnBox onClick={onClick}>
            <input ref={forwardedRef} type='file' id={id} onChange={onChange} hidden={true} />
            <img src={BtnImg} alt='이미지 업로드 버튼' />
          </ImageBtnBox>
        )}

        <RoundedInputBox onSubmit={onSubmit}>
          <label htmlFor={id} className='a11y'>
            {id}
          </label>

          <input type='text' id={id} onChange={onChange} placeholder={placeholder} value={value} />

          <SubmitBtn type='submit'>
            <img src={arrowImg} alt='텍스트 업로드' />
          </SubmitBtn>
        </RoundedInputBox>
      </BottomInputWrapper>
    );
  },
);

export default RoundedBottomInput;
