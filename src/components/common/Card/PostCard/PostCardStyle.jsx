import styled, { css } from 'styled-components';

const PostCardWrapper = styled.article`
  position: relative;
  width: 358px;
  max-width: calc(100% - 32px);
  padding-bottom: 14px;
  cursor: ${(props) => props.moreInfo ? 'default' : 'pointer'};

  /* ---게시글 이미지--- */
  img {
    position: relative;
    aspect-ratio: 1;
    object-fit: cover;
    box-shadow: 4px 3px 25px rgba(5, 5, 5, 0.12);
    border-radius: 10px;
  }

  /* ---날짜--- */
  time {
    color: ${({ theme }) => theme.colors.gray200};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

/* ---게시글 내용--- */
const PostDetail = styled.p`
  margin: 1.4rem 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 160%;

  ${(props) =>
    props.moreInfo ? null : css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
`;

/* ---게시글 정보--- */
const MoreInfolayout = css`
  ${(props) =>
    props.moreInfo && css`
      position: relative;
      inset: unset;
      aspect-ratio: unset;
      padding: 16px 0 0;
      flex-direction: row-reverse;
      align-items: center;
    `}
`;

const PostInfoBox = styled.div`
  position: absolute;
  inset: 0 0;
  z-index: 2;
  width: 100%;
  aspect-ratio: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray400};
  ${MoreInfolayout}
`;

const onPhotoStyle = css`
  ${(props) =>
    props.moreInfo ? null : css`
      background: ${({ theme }) => theme.colors.white50};
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(15px);
      overflow: hidden;
    `}
`;

const Space = styled.span`
  padding: 0.8rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  border-radius: 20px;

  ${(props) => 
    props.moreInfo && css`
      padding: 0.7rem 1.2rem;
      font-size: ${({ theme }) => theme.fontSize.xm};
      border: 1.4px solid ${({ theme }) => theme.colors.gray400};
    `}
    ${onPhotoStyle}
`;

const HeartCommentList = styled.ul`
  display: flex;
  align-items: center;
  padding:  ${(props) => props.moreInfo ? '0' : '0.6rem 1rem'};
  font-size: ${(props) => props.moreInfo ? ({ theme }) => theme.fontSize.sm : ({ theme }) => theme.fontSize.xs};
  line-height: 2rem;
  border-radius: 10px;

  li:first-child {
    margin-right: 0.8rem;
  }
  img, svg {
    width: ${(props) => props.moreInfo ? '2.4rem' : 'unset'};
    height: ${(props) => props.moreInfo ? '2.4rem' : 'unset'};
    margin-right: 0.4rem;
  }
  ${onPhotoStyle}
`;

export { PostCardWrapper, PostInfoBox, HeartCommentList, PostDetail, Space };
