import React from 'react';
import styled from 'styled-components';

export const RoundedInputWrapper = styled.form`
  padding: 1rem 0 1rem 2.2rem;
  border-radius: 32px;
  background-color: #f2f2f2;
  width: calc(100% - 3.2rem);

  input {
    width: calc(100% - 2.2rem);
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.black};
    line-height: 160%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;

// id: input의 아이디
// placeHoldler : input에 적용할 placeholder
export default function RoundedInput({ id, placeholder, onChange }) {
  return (
    <RoundedInputWrapper>
      <label htmlFor={id} className='a11y'>
        {id}
      </label>
      <input type='text' id={id} onChange={onChange} placeholder={placeholder} />
    </RoundedInputWrapper>
  );
}
