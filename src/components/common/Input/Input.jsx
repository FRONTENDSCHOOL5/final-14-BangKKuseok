import React, { useState } from 'react';
import styled from 'styled-components';
import eyeIcon from '../../../assets/icons/icon-eye.svg';
import eyeOffIcon from '../../../assets/icons/icon-eye-off.svg';

const InputWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 322px;
  height: 48px;
`;

const InputLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
`;

const InputBox = styled.input`
  margin: 0;
  padding: 0;

  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translate(50%, 50%);

  border: none;
  outline: none;

  border-bottom: 1px solid
    ${({ isInValid }) =>
      isInValid ? ({ theme }) => theme.colors.subCoral : ({ theme }) => theme.colors.gray100};

  width: 100%;
  height: 30px;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray100};
  }
`;
const EyeIcon = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 18px;
  height: 18px;

  margin-right: 3px;

  cursor: pointer;
`;

const InputShowWarning = styled.strong`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.mainCoral};
  &::before {
    content: '*';
  }

  display: block;
  margin-top: 3px;
`;

// id: input의 아이디
// labelText : label에 들어갈 문구
// inputType : input의 타입
// placeHoldler : input에 적용할 placeholder
export default function Input({ id, labelText, inputType, placeHolder, onChange }) {
  // 유효하지 않으면 빨간색 밑줄, 경고 메시지 뜨도록
  const [isInValid, setIsInValid] = useState(false);
  // 경고메시지의 내용을 담고있음
  const [warningMsg, setWarningMsg] = useState('');

  // 눈 감은 사진 or 눈 뜬 사진
  const [isEye, setIsEye] = useState(false);
  // 눈 감은 사진이면 type: password, 눈 뜬 사진이면 type: text
  const [type, setType] = useState(inputType);

  // 비밀번호를 입력할 때 눈 사진을 클릭하면 동작하는 함수
  const handleClickEye = () => {
    // input의 type을 password에서 text로
    // 한번 더 클릭하면 text에서 password
    if (type === 'password') {
      setType('text');
      setIsEye(true);
    } else {
      setType('password');
      setIsEye(false);
    }
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlFor={id}>{labelText}</InputLabel>
        <InputBox
          type={type}
          id={id}
          placeholder={placeHolder}
          onChange={onChange}
          isInValid={isInValid}
        />
        {inputType === 'password' && (
          <EyeIcon src={isEye ? eyeIcon : eyeOffIcon} alt='eye-image' onClick={handleClickEye} />
        )}
      </InputWrapper>
      {isInValid ? <InputShowWarning>{warningMsg}</InputShowWarning> : null}
    </>
  );
}
