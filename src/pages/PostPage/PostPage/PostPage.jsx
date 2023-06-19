import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import { comments, postDetail, profile } from '../../../mock/mockData';
import { useNavigate } from 'react-router-dom';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import PostCard from '../../../components/common/Card/PostCard/PostCard';
import CommentItem from '../../../components/PostDetail/CommentItem/CommentItem';
import RoundedBottomInput from '../../../components/common/Input/RoundedBottomInput/RoundedBottomInput';
import Confirm from '../../../components/common/Confirm/Confirm';
import { CommentList, PostPageWrapper } from './PostPageStyle';

export default function PostPage() {

  return (
    <BasicLayout
      type='post'
      isNonNav
      title={data.author.username}
      onClickLeftButton={handleClickLeftButton}
      onClickRightButton={handleClickRightButton}
    >
      <PostPageWrapper>
        <PostCard data={data} moreInfo />
        <CommentList>
          <h4 className='a11y'>댓글 목록</h4>
          {commentsData.map((comment) => (
            <CommentItem
              key={comment.id}
              data={comment}
              myProfile={myProfile}
              setModalType={setModalType}
              setIsShow={setIsShow}
            />
          ))}
        </CommentList>
        <RoundedBottomInput id='comment' placeholder='댓글을 남겨보세요' />
      </PostPageWrapper>
      {isShow && (
        <BottomSheet isShow={isShow} onClick={handleClickModalOpen}>
          <ListModal type={modalType} onClick={handleClickListItem}></ListModal>
        </BottomSheet>
      )}
      {isShowConfirm && (
        <Confirm
          type={confirmType.type}
          object={confirmType.object}
          setIsShowConfirm={setIsShowConfirm}
          onClick={handleClickConfirm}
        />
      )}
    </BasicLayout>
  );
}
