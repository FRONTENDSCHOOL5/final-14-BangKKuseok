import styled, { css, keyframes } from 'styled-components';

const editWrapper = css`
  ${({ type }) =>
    type === 'edit' &&
    css`
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 80px);
    `}
`;

const PostProductTagWrapper = styled.div`
  margin: 0 auto;
  width: calc(100% - 48px);
  & > p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray300};
    margin-top: 40px;
  }
  ${editWrapper}
`;

const ImgBox = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1;
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
  cursor: ${(p) => p.isPointer && 'pointer'};
`;

const GuideTagButton = styled.div.attrs(({ addTagBtn, pinLoc }) => ({
  style: {
    background: `url(${addTagBtn}) no-repeat ${pinLoc.x}% ${pinLoc.y}% / 20px`,
  },
}))`
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 3px rgba(62, 62, 62, 0.3);
  z-index: 1;
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
}
`;

const BouncingCircle = styled.div.attrs(({ pinLoc }) => ({
  style: {
    left: pinLoc.x + '%',
    top: pinLoc.y + '%',
  },
}))`
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: white;
  animation: ${bouncing} 1s linear alternate infinite;
`;

export { PostProductTagWrapper, ImgBox, TagBox, BouncingCircle, GuideTagButton };
