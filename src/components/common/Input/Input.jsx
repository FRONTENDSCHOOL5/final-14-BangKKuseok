import React, { useState } from 'react';
import {
  InputWrapper,
  InputLabel,
  InputBox,
  StyledInput,
  EyeButton,
  InputShowWarning,
} from './InputStyle';

// id: input의 아이디
// labelText : label에 들어갈 문구
// inputType : input의 타입
// placeHoldler : input에 적용할 placeholder
export default function Input({
  id,
  labelText,
  inputType,
  placeHolder,
  value,
  onChange,
  onBlur,
  warningMsg,
  isInValid,
}) {
  const [isEye, setIsEye] = useState(false);
  const [type, setType] = useState(inputType);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClickEye = () => {
    if (type === 'password') {
      setType('text');
      setIsEye(true);
    } else {
      setType('password');
      setIsEye(false);
    }
  };

  return (
    <InputWrapper onFocus={handleFocus} onBlur={handleBlur} isFocused={isFocused}>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <InputBox>
        <StyledInput
          type={type}
          id={id}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onFocus={onChange}
          onBlur={onBlur}
          isInValid={isInValid}
          warningMsg={warningMsg}
        />
        {inputType === 'password' && <EyeButton onClick={handleClickEye} isEye={isEye}></EyeButton>}
      </InputBox>

      {value && warningMsg && id === 'email' && <InputShowWarning>{warningMsg}</InputShowWarning>}

      {value && warningMsg && id === 'password' && (
        <InputShowWarning>{warningMsg}</InputShowWarning>
      )}

      {isInValid && warningMsg && id === 'emailSignup' && (
        <InputShowWarning>{warningMsg}</InputShowWarning>
      )}
      {isInValid && warningMsg && id === 'passwordSignup' && (
        <InputShowWarning>{warningMsg}</InputShowWarning>
      )}

      {isInValid && warningMsg && id === 'name' && (
        <InputShowWarning>{warningMsg}</InputShowWarning>
      )}

      {isInValid && warningMsg && id === 'id' && <InputShowWarning>{warningMsg}</InputShowWarning>}
    </InputWrapper>
  );
}
