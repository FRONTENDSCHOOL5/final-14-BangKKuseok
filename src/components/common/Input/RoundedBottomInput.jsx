import React from 'react';
import styled from 'styled-components';
import { RoundedInputWrapper } from './RoundedInput';
import arrowImg from '../../../assets/icons/icon-arrow-top.svg';

const BottomInputWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 1.6rem 1.4rem;
  box-shadow: 0px -1px 20px rgba(67, 67, 67, 0.1);
  border-radius: 20px 20px 0px 0px;
`;

const RoundedInputBox = styled(RoundedInputWrapper)`
  position: relative;
  width: 100%;
  input {
    width: calc(100% - 4.8rem);
  }
`;

const SubmitBtn = styled.button`
  position: absolute;
  padding: 1.2rem 1.4rem;
  inset: 0 0 auto auto;
`;

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
