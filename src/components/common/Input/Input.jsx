import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import eyeIcon from '../../../assets/icons/icon-eye.svg';
import eyeOffIcon from '../../../assets/icons/icon-eye-off.svg';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 322px;
  margin: 16px auto;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
  margin-bottom: 10px;
`;

const InputBox = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  outline: none;

  &: focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }

  ${({ warningMsg, value }) =>
    warningMsg && value
      ? css`
          border-bottom: 1px solid ${({ theme }) => theme.colors.subCoral};
        `
      : css`
          border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
        `};
  ${({ warningMsg, isInValid }) =>
    warningMsg && isInValid
      ? css`
          border-bottom: 1px solid ${({ theme }) => theme.colors.subCoral};
        `
      : css`
          border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
        `};

  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray100};
  }
`;
const EyeButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  width: 18px;
  height: 18px;

  margin-right: 4px;

  background: url(${(p) => (p.isEye ? eyeIcon : eyeOffIcon)}) no-repeat center / contain;

  cursor: pointer;
`;

const InputShowWarning = styled.strong`
  margin: 6px 0;
  display: block;

  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.mainCoral};
  &::before {
    content: '*';
  }
`;

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
