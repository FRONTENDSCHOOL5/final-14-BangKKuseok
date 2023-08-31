import styled, { css } from 'styled-components';

export const PostTextWriteWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 48px);

  textarea {
    width: 100%;
    resize: none;
    line-height: 160%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.base};
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;

export const SelectSpaceBtn = styled.button`
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: 0.8rem 1.6rem;
  border-radius: 20px;
  margin: 1.6rem 0 1.4rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray300};
  border: 1.4px solid ${({ theme }) => theme.colors.gray400};
  font-weight: 600;

  ${({ space }) =>
    space !== '공간을 선택해주세요' &&
    css`
      color: ${({ theme }) => theme.colors.mainCoral};
      border: 1.4px solid ${({ theme }) => theme.colors.mainCoral};
    `}
`;

export const ModalSpaceList = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: 0 8px 60px;
  h3 {
    color: ${({ theme }) => theme.colors.gray300};
    font-weight: 500;
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  button {
    color: ${({ theme }) => theme.colors.gray400};
    border: 1.4px solid currentColor;
    border-radius: 20px;
    padding: 0.8rem 1.6rem;

    &:hover {
      color: ${({ theme }) => theme.colors.mainCoral};
    }
  }
`;
