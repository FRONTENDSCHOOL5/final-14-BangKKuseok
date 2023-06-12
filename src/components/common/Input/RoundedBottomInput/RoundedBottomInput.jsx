import React from 'react';
import arrowImg from '../../../assets/icons/icon-arrow-top.svg';
import { BottomInputWrapper, RoundedInputBox, SubmitBtn } from './RoundedBottomInputStyle';

// id: input의 아이디
// placeHoldler : input에 적용할 placeholder
// 사용 예 : <RoundedBottomInput id='comment' placeholder='댓글을 남겨보세요'/>
export default function RoundedBottomInput({ id, placeholder, onChange, onSubmit }) {
  return (
    <BottomInputWrapper>
      <RoundedInputBox onSubmit={onSubmit}>
        <label htmlFor={id} className='a11y'>
          {id}
        </label>
        <input type='text' id={id} onChange={onChange} placeholder={placeholder} />
        <SubmitBtn type='submit'>
          <img src={arrowImg} alt='텍스트 업로드'/>
        </SubmitBtn>
      </RoundedInputBox>
    </BottomInputWrapper>
  );
}
