import styled from 'styled-components';

export const ConfirmBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ConfirmWrapper = styled.article`
  width: 252px;
  height: 110px;
  z-index: 61;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  text-align: center;

  span {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSize.base};
    margin: 23px 0 22px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  height: calc(100% - 61px);
  border-top: 0.5px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 0 0 10px 10px;

  button {
    width: 100%;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  button:nth-child(2) {
    color: ${({ theme }) => theme.colors.mainCoral};
    border-left: 0.5px solid ${({ theme }) => theme.colors.gray100};
  }
`;
