import React, { useEffect } from 'react';
import Heart from '../Heart/Heart';
import commentIcon from '../../../../assets/icons/icon-message-small.svg';
import { HeartCommentList, PostCardWrapper, PostDetail, PostInfoBox, Space } from './PostCardStyle';
import { convertDateFormat } from '../../../../utils/getTime';

export default function PostCard({ data, moreInfo }) {
  const { id, content, image, hearted, heartCount, commentCount, createdAt } = data;
  const { space, detail } = JSON.parse(content);

  return (
    <PostCardWrapper moreInfo={moreInfo}>
      <img src={image} alt={id || '게시글 이미지'} />

      <PostInfoBox moreInfo={moreInfo}>
        <Space moreInfo={moreInfo}> {space} </Space>
        <HeartCommentList moreInfo={moreInfo}>
          <li>
            <Heart hearted={hearted} />
            {heartCount}
          </li>
          <li>
            <img src={commentIcon} alt='댓글' />
            {commentCount}
          </li>
        </HeartCommentList>
      </PostInfoBox>
      
      <PostDetail moreInfo={moreInfo}>{detail}</PostDetail>
      {moreInfo && <time>{convertDateFormat(createdAt)}</time>}
    </PostCardWrapper>
  );
}

//  feed와 profile페이지에 있는 경우 map으로 돌릴 때 link to  /post/:id