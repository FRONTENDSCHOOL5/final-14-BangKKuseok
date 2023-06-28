import styled, { css } from 'styled-components';
import eyeIcon from '../../../assets/icons/icon-eye.svg';
import eyeOffIcon from '../../../assets/icons/icon-eye-off.svg';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 322px;
  margin: 16px auto;
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
  margin-bottom: 10px;
  ${({ labelText }) =>
    labelText === '사용자 이름' || labelText === '계정 ID'
      ? css`
          &::after {
            content: ' *';
            color: ${({ theme }) => theme.colors.subCoral};
            font-size: 0.8rem;
            position: relative;
            top: -3px;
          }
        `
      : ''}
`;

export const InputBox = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  padding-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  outline: none;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }

  ${({ warningMsg }) =>
    warningMsg
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

export const EyeButton = styled.button`
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

export const InputShowWarning = styled.strong`
  margin: 6px 0;
  display: block;

  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.mainCoral};
  &::before {
    content: '*';
  }
`;
