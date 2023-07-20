import React from 'react';
import { RoundedInputWrapper } from './RoundedInputStyle';

// id: input의 아이디
// placeHoldler : input에 적용할 placeholder
export default function RoundedInput({ id, placeholder, value, onChange }) {
  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <RoundedInputWrapper>
      <label htmlFor={id} className='a11y'>
        {id}
      </label>
      <input
        type='text'
        id={id}
        value={value}
        onSubmit={handleSubmit}
        onChange={onChange}
        autoComplete='off'
        placeholder={placeholder}
      />
    </RoundedInputWrapper>
  );
}
