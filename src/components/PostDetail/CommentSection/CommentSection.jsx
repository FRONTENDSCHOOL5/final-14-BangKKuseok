import React, { useCallback, useState } from 'react';
import CommentItem from '../CommentItem/CommentItem';
import styled from 'styled-components';
import RoundedBottomInput from '../../common/Input/RoundedBottomInput/RoundedBottomInput';
import { useMutation, useQueryClient } from 'react-query';
import { uploadComment } from '../../../api/commentApi';

export const CommentList = styled.ul`
  padding: 16px 16px 84px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
`;

export default function CommentSection({ data, postId, setCommentId }) {
  //댓글 작성하기
  const queryClient = useQueryClient();
  const uploadCommentMutation = useMutation(uploadComment, {
    onSuccess() {
      queryClient.invalidateQueries(['commentsData', postId]);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [comment, setComment] = useState({ content: '' });

  //인풋의 변화감지해서 해당밸류넣기
  const handleChangeComment = useCallback(
    (e) => {
      setComment({ content: e.target.value });
    },
    [setComment],
  );

  //댓글 등록하기
  const handleSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (comment.content !== '') {
        uploadCommentMutation.mutate({ postId, comment: { ...comment } });
        setComment({ content: '' });
      }
    },
    [comment, postId, uploadCommentMutation],
  );

  return (
    <section>
      <CommentList>
        <h4 className='a11y'>댓글 목록</h4>
        {data.map((comment) => (
          <CommentItem key={comment.id} data={comment} setCommentId={setCommentId} />
        ))}
      </CommentList>
      <RoundedBottomInput
        id='comment'
        placeholder='댓글을 남겨보세요'
        value={comment.content}
        onChange={handleChangeComment}
        onSubmit={handleSubmitComment}
      />
    </section>
  );
}
