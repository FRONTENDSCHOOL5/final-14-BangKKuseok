import React, { useEffect } from 'react';
import Heart from '../Heart/Heart';
import commentIcon from '../../../../assets/icons/icon-message-small.svg';
import { HeartCommentList, PostCardWrapper, PostDetail, PostInfoBox, Space } from './PostCardStyle';
import { convertDateFormat } from '../../../../utils/getTime';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ data, moreInfo = false }) {
  const { _id, content, image, hearted, heartCount, comments, createdAt } = data;
  const { space, detail } = JSON.parse(content);

  const navigate = useNavigate();

  return (
    <PostCardWrapper moreInfo={moreInfo}>
      <img src={image} alt={`${space} 이미지`} />
      <PostInfoBox moreInfo={moreInfo}>
        <Space moreInfo={moreInfo}> {space} </Space>
        <HeartCommentList moreInfo={moreInfo}>
          <li>
            <Heart hearted={hearted} />
            {heartCount}
          </li>
          <li onClick={moreInfo ? null : () => navigate(`/post/${_id}`)}>
            <img src={commentIcon} alt='댓글' />
            {comments.length}
          </li>
        </HeartCommentList>
      </PostInfoBox>

      <PostDetail moreInfo={moreInfo}>{detail}</PostDetail>
      {moreInfo && <time dateTime={createdAt}>{convertDateFormat(createdAt)}</time>}
    </PostCardWrapper>
  );
}

//  feed와 profile페이지에 있는 경우 map으로 돌릴 때 link to  /post/:id
