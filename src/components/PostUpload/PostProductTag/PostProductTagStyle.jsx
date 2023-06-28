import styled, { keyframes } from 'styled-components';

const PostProductTagWrapper = styled.div`
  margin: 0 auto;
  max-width: 342px;
  width: calc(100% - 48px);
  & > p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray300};
    margin-top: 40px;
  }
`;

const ImgBox = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  & > img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;

const TagBox = styled.ul`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  & > img {
    position: absolute;
    width: 20px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(62, 62, 62, 0.3);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: 1;
  }
`;

const bouncing = keyframes`
0% {
  transform: translate(-50%, -50%) scale(1);
  opacity: 0.3;
}
20%{
  transform: translate(-50%, -50%) scale(1);
}
95% {
  transform: translate(-50%, -50%) scale(2.3);
  opacity: 0.4;
}
100% {
  transform: translate(-50%, -50%) scale(2.3);
  opacity: 0.4;
}
`;

const BouncingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: white;
  animation: ${bouncing} 1s linear alternate infinite;
  left: 50%;
  top: 50%;
`;
export { PostProductTagWrapper, ImgBox, TagBox, BouncingCircle };
