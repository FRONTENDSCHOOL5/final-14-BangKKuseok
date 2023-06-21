import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import PostCard from '../../../components/common/Card/PostCard/PostCard';
import CommentItem from '../../../components/PostDetail/CommentItem/CommentItem';
import RoundedBottomInput from '../../../components/common/Input/RoundedBottomInput/RoundedBottomInput';
import Confirm from '../../../components/common/Confirm/Confirm';
import { CommentList, PostPageWrapper } from './PostPageStyle';
import { useMutation, useQuery } from 'react-query';
import { deletePost, getComments, getPostDetail, reportPost } from '../../../api/postApi';
import { getMyProfile } from '../../../api/profileApi';
import { useRecoilState } from 'recoil';
import { isUploadBeforeAtom } from '../../../atoms/post';
import Spinner from '../../../components/common/Spinner/Spinner';

export default function PostPage() {
  const { postId } = useParams();
  const [data, setData] = useState();
  const [myProfile, setMyProfile] = useState();
  const [isUploadBefore, setIsUploadBefore] = useRecoilState(isUploadBeforeAtom);

  //게시글 상세 정보받기
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['postData', postId],
    () => getPostDetail(postId),
    {
      onSuccess: (data) => {
        setData(data.post);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //댓글 리스트 정보받기
  const { data: commentsData, isLoading: isCommentsLoading } = useQuery(
    ['commentsData', postId],
    () => getComments(postId),
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //내 프로필 정보받기
  const { data: myProfileData, isLoading: isMyProfileLoading } = useQuery(
    'myProfileData',
    () => getMyProfile(),
    {
      onSuccess: (data) => {
        setMyProfile(data.user);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //게시글 삭제하기
  const deletePostMutation = useMutation(deletePost, {
    onSuccess(data) {
      navigate(-1);
    },
    onError(error) {
      console.log(error);
    },
  });

  //게시글 신고하기
  const reportPostMutation = useMutation(reportPost, {
    onSuccess(data) {
      alert(`해당 게시글을 신고했습니다.`);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [isShow, setIsShow] = useState(false);
  const [modalType, setModalType] = useState('userPost');
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: 'report', object: 'comment' });
  const navigate = useNavigate();

  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  //뒤로 가기 (이전페이지가 upload일 경우 전전페이지로 이동)
  const handleClickLeftButton = () => {
    if (isUploadBefore) {
      navigate(-2);
      setIsUploadBefore(false);
    } else {
      navigate(-1);
    }
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
        navigate(`/post/${postId}/edit`);
      }
    }
  };

  //게시글,댓글 삭제,신고하기
  const handleClickConfirm = () => {
    //게시글을
    if (confirmType.object === 'post') {
      //삭제하기
      if (confirmType.type === 'delete') {
        deletePostMutation.mutate(postId);
      } else {
        //신고하기
        reportPostMutation.mutate(postId);
      }
      //댓글을
    } else {
      //삭제하기
      if (confirmType.type === 'delete') {
        // deletePostMutation.mutate(postId);
      } else {
        //신고하기
        // reportPostMutation.mutate(postId);
      }
    }

    setIsShowConfirm(false);
    setIsShow(false);
  };

  //로딩 이미지
  if (isPostLoading && isCommentsLoading && isMyProfileLoading) {
    return <Spinner />;
  }
  return (
    <>
      {!isPostLoading && !isCommentsLoading && !isMyProfileLoading && (
        <BasicLayout
          type='post'
          isNonNav
          title={postData.post.author.username}
          onClickLeftButton={handleClickLeftButton}
          onClickRightButton={handleClickRightButton}
        >
          <PostPageWrapper>
            <PostCard data={postData.post} moreInfo />
            <CommentList>
              <h4 className='a11y'>댓글 목록</h4>
              {commentsData.comments.map((comment) => (
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
      )}
    </>
  );
}
