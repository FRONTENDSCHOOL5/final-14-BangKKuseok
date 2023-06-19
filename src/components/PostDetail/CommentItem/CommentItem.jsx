import React from 'react';
import { getTimeGap } from '../../../utils/getTime';
import moreIcon from '../../../assets/icons/icon-more-small.svg';
import { CommentInfoBox, StyledCommentItem } from './CommentItemStyle';

export default function CommentItem({ data, myProfile, setModalType, setIsShow }) {
  const { author, createdAt, content } = data;


  return (
    <StyledCommentItem>
      <CommentInfoBox moreIcon={moreIcon}>
        <img src={author.image} alt={`${author.username}의 프로필 이미지`} />
        <h5>{author.username}</h5>
        <time dateTime={createdAt}>• {getTimeGap(createdAt)}</time>
        <button type='button' onClick={handleClickMoreButton} />
      </CommentInfoBox>
      <p>{content}</p>
    </StyledCommentItem>
  );
}
