import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import { comments, postDetail, profile } from '../../../mock/mockData';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import PostCard from '../../../components/common/Card/PostCard/PostCard';
import CommentItem from '../../../components/PostDetail/CommentItem/CommentItem';
import RoundedBottomInput from '../../../components/common/Input/RoundedBottomInput/RoundedBottomInput';
import Confirm from '../../../components/common/Confirm/Confirm';
import { CommentList, PostPageWrapper } from './PostPageStyle';

export default function PostPage() {
  //api 연동 시 props로 데이터 받아서 뿌리기
  // myProfile - 프로필  정보  불러오기 api
  const location = useLocation();

  const data = location.state.data;
  const commentsData = comments;
  const myProfile = profile;

  const [isShow, setIsShow] = useState(false);
  const [modalType, setModalType] = useState('userPost');
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: 'report', object: 'comment' });
  const navigate = useNavigate();

  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  const handleClickLeftButton = () => {
    navigate(-1);
  };

  const handleClickRightButton = () => {
    if (myProfile._id === data.author._id) {
      setModalType('myPost');
    } else {
      setModalType('userPost');
    }
    setIsShow(true);
  };

  //listItem누를때 실행 함수 (confrim창이 뜨거나 edit페이지로 넘어감)
  const handleClickListItem = (e) => {
    if (modalType === 'userComment') {
      setConfirmType({ type: 'report', object: 'comment' });
      setIsShowConfirm(true);
    } else if (modalType === 'myComment') {
      setConfirmType({ type: 'delete', object: 'comment' });
      setIsShowConfirm(true);
    } else if (modalType === 'userPost') {
      setConfirmType({ type: 'report', object: 'post' });
      setIsShowConfirm(true);
    } else {
      //삭제일 경우
      if (e.currentTarget.innerText === '삭제') {
        setConfirmType({ type: 'delete', object: 'post' });
        setIsShowConfirm(true);
      } else {
        //수정일 경우
        navigate('/post/:postId/edit');
      }
    }
  };

  const handleClickConfirm = (e) => {
    console.log(e.currentTarget.innerText);
    //에 따라서 api연동 후 함수작성하기

    setIsShowConfirm(false);
    setIsShow(false);
  };

  return (
    <BasicLayout
      type='post'
      isNonNav
      title={data.username}
      subtitle={data.accountname}
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
