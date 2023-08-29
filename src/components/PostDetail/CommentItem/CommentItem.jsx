import React from 'react';
import { getTimeGap } from '../../../utils/getTime';
import moreIcon from '../../../assets/icons/icon-more-small.svg';
import { CommentInfoBox, StyledCommentItem } from './CommentItemStyle';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../atoms/myProfile';
import useModal from '../../../hooks/useModal';

export default function CommentItem({ data, setCommentId }) {
  const { author, createdAt, content } = data;
  const myProfile = useRecoilValue(myProfileDataAtom);

  const { openModal } = useModal('');

  //댓글 더보기를 눌렀을때 _id 구분 (내 댓글 - 삭제 / 남 댓글 - 신고)
  const handleClickMoreButton = () => {
    setCommentId(data.id);
    if (myProfile._id === author._id) {
      openModal('myComment');
    } else {
      openModal('userComment');
    }
  };

  return (
    <StyledCommentItem>
      <CommentInfoBox moreIcon={moreIcon}>
        <Link to={`/profile/${author.accountname}`}>
          <img src={author.image} alt={`${author.username}의 프로필 이미지`} />
          <h5>{author.username}</h5>
        </Link>
        <time dateTime={createdAt}>• {getTimeGap(createdAt)}</time>
        <button type='button' onClick={handleClickMoreButton} aria-label='댓글 더보기 버튼' />
      </CommentInfoBox>
      <p>{content}</p>
    </StyledCommentItem>
  );
}
