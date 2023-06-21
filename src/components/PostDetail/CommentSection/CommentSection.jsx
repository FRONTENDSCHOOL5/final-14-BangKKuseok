import React, { useCallback, useState } from 'react';
import CommentItem from '../CommentItem/CommentItem';
import styled from 'styled-components';
import RoundedBottomInput from '../../common/Input/RoundedBottomInput/RoundedBottomInput';
import { useMutation, useQueryClient } from 'react-query';
import { uploadComment } from '../../../api/commentApi';

const CommentSectionWrapper = styled.section``;

export const CommentList = styled.ul`
  padding: 16px 16px 84px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
`;

export default function CommentSection({
  data,
  myProfile,
  setIsShow,
  setModalType,
  postId,
  setCommentId,
}) {

  return (
    <CommentSectionWrapper>
      <CommentList>
        <h4 className='a11y'>댓글 목록</h4>
        {data.map((comment) => (
          <CommentItem
            key={comment.id}
            data={comment}
            myProfile={myProfile}
            setModalType={setModalType}
            setIsShow={setIsShow}
            setCommentId={setCommentId}
          />
        ))}
      </CommentList>
      <RoundedBottomInput
        id='comment'
        placeholder='댓글을 남겨보세요'
        value={comment.content}
        onChange={handleChangeComment}
        onSubmit={handleSubmitComment}
      />
    </CommentSectionWrapper>
  );
}
