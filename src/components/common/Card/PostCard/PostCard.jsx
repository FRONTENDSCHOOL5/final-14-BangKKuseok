import React, { useState } from 'react';
import Heart from '../Heart/Heart';
import commentIcon from '../../../../assets/icons/icon-message-small.svg';
import { HeartCommentList, PostCardWrapper, PostDetail, PostInfoBox, Space } from './PostCardStyle';
import { convertDateFormat } from '../../../../utils/getTime';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { deleteLike, postLike } from '../../../../api/likeApi';

export default function PostCard({ data, moreInfo = false }) {
  const { id, content, image, hearted, heartCount, comments, createdAt } = data;
  const { space, detail } = JSON.parse(content);
  const navigate = useNavigate();

  const [isHearted, setIsHearted] = useState(hearted);
  const [nowHeartCount, setNowHeartCount] = useState(heartCount);

  //좋아요
  const postLikeMutation = useMutation(postLike, {
    onError(error) {
      console.log(error);
    },
  });

  //좋아요 취소
  const deleteLikeMutation = useMutation(deleteLike, {
    onError(error) {
      console.log(error);
    },
  });

  //하트버튼 누르기
  const handleClickHeartButton = () => {
    //하트가 눌러진 상태라면 좋아요 취소
    if (isHearted) {
      deleteLikeMutation.mutate(id);
      setIsHearted(false);
      setNowHeartCount((count) => (count -= 1));
    } else {
      //아니면 좋아요
      postLikeMutation.mutate(id);
      setIsHearted(true);
      setNowHeartCount((count) => (count += 1));
    }
  };

  return (
    <PostCardWrapper moreInfo={moreInfo}>
      <img src={image} alt={`${space} 이미지`} />
      <PostInfoBox moreInfo={moreInfo}>
        <Space moreInfo={moreInfo}> {space} </Space>
        <HeartCommentList moreInfo={moreInfo}>
          <li>
            <Heart isHearted={isHearted} onClick={handleClickHeartButton} />
            {nowHeartCount}
          </li>
          <li onClick={moreInfo ? null : () => navigate(`/post/${id}`)}>
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
