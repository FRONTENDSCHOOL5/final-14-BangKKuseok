import React, { useState } from 'react';
import Heart from '../Heart/Heart';
import commentIcon from '../../../../assets/icons/icon-message-small.svg';
import { HeartCommentList, PostCardWrapper, PostDetail, PostInfoBox, Space } from './PostCardStyle';
import { convertDateFormat } from '../../../../utils/getTime';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteLike, postLike } from '../../../../api/likeApi';
import { getMyProfile, getProfile } from '../../../../api/profileApi';

export default function PostCard({ data, moreInfo = false }) {
  const { id, content, image, hearted, heartCount, comments, createdAt } = data;
  const { space, detail } = JSON.parse(content);
  const navigate = useNavigate();

  const [isHearted, setIsHearted] = useState(hearted);
  const [nowHeartCount, setNowHeartCount] = useState(heartCount);
  const { accountname: accountnameByParams } = useParams();

  // 프로필 정보 받기
  const { data: profileData, isLoading: isProfileLoading } = useQuery(
    ['profile', accountnameByParams],
    () => (accountnameByParams ? getProfile(accountnameByParams) : getMyProfile()),
  );

  const queryClient = useQueryClient();
  //좋아요
  const postLikeMutation = useMutation(postLike, {
    onSuccess() {
      queryClient.invalidateQueries('feedPostData');
      queryClient.invalidateQueries(['myPost', profileData]);
    },
    onError(error) {
      console.log(error);
    },
  });

  //좋아요 취소
  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess() {
      queryClient.invalidateQueries('feedPostData');
      queryClient.invalidateQueries(['myPost', profileData]);
    },
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
