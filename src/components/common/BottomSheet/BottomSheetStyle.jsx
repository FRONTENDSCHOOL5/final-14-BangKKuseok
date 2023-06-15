import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;
const fadeOut = keyframes`
from {
    opacity: 1;
}
to {
    opacity: 0;
}
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(calc(100% - ${({ LEN }) => (LEN < 425 ? LEN : 425)}px));
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(calc(100% - ${({ LEN }) => (LEN < 425 ? LEN : 425)}px));
  }

  to {
    transform: translateY(100%);
  }
`;

export const BottomSheetDim = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.25s ease-out;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  animation: ${fadeIn} 0.25s ease-out forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

export const ModalBox = styled.div`
  width: inherit;
  height: ${({ LEN }) => (LEN < 425 ? LEN : 425)}px;
  border-radius: 1rem 1rem 0 0;

  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
  animation: ${slideUp} 0.25s ease-out forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
      animation-timing-function: ease-in;
    `}
`;

export const HeaderModal = styled.button`
  width: 100%;
  height: 48px;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 50px;
    height: 4px;

    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
