import React, { useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import PostCard from '../../../components/common/Card/PostCard/PostCard';
import Confirm from '../../../components/common/Confirm/Confirm';
import { PostPageWrapper } from './PostPageStyle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost, getPostDetail, reportPost } from '../../../api/postApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isUploadorEditBeforeAtom } from '../../../atoms/post';
import Spinner from '../../../components/common/Spinner/Spinner';
import { deleteComment, getComments, reportComment } from '../../../api/commentApi';
import CommentSection from '../../../components/PostDetail/CommentSection/CommentSection';
import { TOAST } from '../../../constants/common';
import { myProfileDataAtom } from '../../../atoms/myProfile';
import useReportMutation from '../../../hooks/useReportMutation';

export default function PostPage() {
  const { postId } = useParams();
  const [commentId, setCommentId] = useState();
  const [scrollDown, setScrollDown] = useState(false);
  const [isUploadorEditBefore, setIsUploadorEditBefore] = useRecoilState(isUploadorEditBeforeAtom);
  const [commentCount, setCommentCount] = useState();
  const [isShow, setIsShow] = useState(false);
  const [modalType, setModalType] = useState('userPost');
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: 'report', object: 'comment' });

  const myProfileData = useRecoilValue(myProfileDataAtom);

  const navigate = useNavigate();

  //게시글 상세 정보받기
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['postData', postId],
    () => getPostDetail(postId),
    {
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
      select: (data) => [...data].reverse(),
      onSuccess: (data) => {
        if (data.length > commentCount) {
          setScrollDown(true);
        }
        setCommentCount(data.length);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //댓글 작성했을 때 scroll아래로 이동하기
  useLayoutEffect(() => {
    if (scrollDown) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      setScrollDown(false);
    }
  }, [scrollDown]);

  //게시글 삭제하기
  const deletePostMutation = useMutation(deletePost, {
    onSuccess() {
      navigate(-1);
    },
    onError(error) {
      console.log(error);
    },
  });

  //댓글 삭제하기
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess() {
      toast('✅ 댓글이 삭제되었습니다.', TOAST);
      queryClient.invalidateQueries(['commentsData', postId]);
    },
    onError(error) {
      console.log(error);
    },
  });

  //게시글 신고하기
  const reportPostMutation = useReportMutation(reportPost);

  //댓글 신고하기
  const reportCommentMutation = useReportMutation(reportComment);

  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  //뒤로 가기 (이전페이지가 upload일 경우 전전페이지로 이동)
  const handleClickLeftButton = () => {
    if (isUploadorEditBefore) {
      navigate(-2);
      setIsUploadorEditBefore(false);
    } else {
      navigate(-1);
    }
  };

  //게시글 더보기 버튼 눌렀을 때
  const handleClickRightButton = () => {
    if (myProfileData._id === postData.author._id) {
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
        deleteCommentMutation.mutate({ postId, commentId });
      } else {
        //신고하기
        reportCommentMutation.mutate({ postId, commentId });
      }
    }
    setIsShowConfirm(false);
    setIsShow(false);
  };

  const handleClickTitle = () => {
    navigate(`/profile/${postData.author.accountname}`);
  };

  //로딩 이미지
  if (!commentsData || !postData) {
    return <Spinner />;
  }
  return (
    <>
      {commentsData && postData && (
        <BasicLayout
          type='post'
          isNonNav
          title={postData?.author.username}
          subtitle={`@${postData.author.accountname}`}
          onClickLeftButton={handleClickLeftButton}
          onClickRightButton={handleClickRightButton}
          onClickTitle={handleClickTitle}
        >
          <PostPageWrapper>
            <PostCard data={postData} commentCount={commentCount} moreInfo />
            <CommentSection
              data={commentsData}
              setModalType={setModalType}
              setIsShow={setIsShow}
              postId={postId}
              setCommentId={setCommentId}
            />
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
