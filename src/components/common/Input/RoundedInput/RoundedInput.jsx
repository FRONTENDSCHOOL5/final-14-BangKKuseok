import React from 'react';
import { RoundedInputWrapper } from './RoundedInputStyle';

// id: input의 아이디
// placeHoldler : input에 적용할 placeholder
export default function RoundedInput({ id, placeholder, value, onChange, onKeyDown }) {
  return (
    <RoundedInputWrapper>
      <label htmlFor={id} className='a11y'>
        {id}
      </label>
      <input
        type='text'
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        // autocomplete='off'
        placeholder={placeholder}
      />
    </RoundedInputWrapper>
  );
}
