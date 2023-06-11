import React from 'react';
import styled, { css } from 'styled-components';
import Heart from './Heart';
import CommentImg from '../../../assets/icons/icon-message-small.svg';

const StyledPostCard = styled.article`
  position: relative;
  width: 358px;
  max-width: calc(100% - 32px);
  padding-bottom: 14px;

  /* ---게시글 이미지--- */
  //defult
  .postImg {
    position: absolute;
    aspect-ratio: 1;
    object-fit: cover;
    box-shadow: 4px 3px 25px rgba(5, 5, 5, 0.12);
    border-radius: 10px;
  }

  //detail
  .detailImg {
    position: relative;
  }

  /* ---게시글 정보(장소,좋아요,댓글 수)--- */
  //defult
  .postInfo {
    width: 100%;
    aspect-ratio: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray400};

    .onPhoto {
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(15px);
      border-radius: 10px;
      overflow: hidden;
    }

    .space {
      border-radius: 20px;
      padding: 0.8rem 1rem;
      font-size: ${({ theme }) => theme.fontSize.sm};
    }

    ul {
      padding: 0.6rem 1rem;
      display: flex;
      font-size: ${({ theme }) => theme.fontSize.xs};
      li {
        line-height: 2rem;
        &:first-child {
          margin-right: 0.8rem;
        }
        img {
          width: unset;
          margin-right: 0.4rem;
        }
      }
    }
  }

  //detail
  .detailInfo {
    aspect-ratio: unset;
    padding: 16px 0 0;
    flex-direction: row-reverse;
    align-items: center;

    .space {
      padding: 0.7rem 1.2rem;
      font-size: ${({ theme }) => theme.fontSize.xm};
      border: 1.4px solid ${({ theme }) => theme.colors.gray400};
    }
    ul {
      padding: 0;
      font-size: ${({ theme }) => theme.fontSize.sm};
      li img {
        width: 2.4rem;
      }
    }
  }

  /* ---게시글 내용--- */
  & > p {
    margin: 1.4rem 0 0.6rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    line-height: 160%;

    &.ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  /* ---날짜--- */
  time {
    color: ${({ theme }) => theme.colors.gray200};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export default function PostCard({
  postId,
  postImg,
  postContent,
  space,
  heartCount,
  commentCount,
  createdAt,
  detail,
  ...rest
}) {
  return (
    <StyledPostCard {...rest}>
      {/* 게시글 이미지 */}
      <img
        className={detail ? 'postImg detailImg' : 'postImg'}
        src={postImg}
        alt={postId || '게시글 이미지'}
      />
      {/* 게시글 정보 */}
      <div className={detail ? 'detailInfo postInfo' : 'postInfo'}>
        <p className={detail ? 'space' : 'onPhoto space'}> {space} </p>
        <ul className={detail ? '' : 'onPhoto'}>
          <li>
            <Heart />
            {heartCount}
          </li>
          <li>
            <img src={CommentImg} alt='댓글' />
            {commentCount}
          </li>
        </ul>
      </div>
      {/* 게시글 내용 */}
      <p className={!detail && 'ellipsis'}>{postContent} </p>
      {/* 날짜 */}
      {detail && <time>{createdAt}</time>}
    </StyledPostCard>
  );
}


/*
  실제 사용방법
  - <PostCard data={...api에서 받아온 데이터} /> 식으로 데이터 객체를 spread 연산자 사용해서 넘기기
  - PostCard 컴포넌트 안에서 구조분해 할당 및 content를 postContent와 space로 나누기
  - postImg의 경우 따로 불러와 src와 alt값 지정하기
 */