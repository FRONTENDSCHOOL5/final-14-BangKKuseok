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
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;
