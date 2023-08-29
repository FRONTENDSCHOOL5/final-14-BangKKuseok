import React, { useState } from 'react';
import Heart from '../Heart/Heart';
import commentIcon from '../../../../assets/icons/icon-message-small.svg';
import { HeartCommentList, PostCardWrapper, PostDetail, PostInfoBox, Space } from './PostCardStyle';
import { convertDateFormat } from '../../../../utils/getTime';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteLike, postLike } from '../../../../api/likeApi';
import { getMyProfile, getProfile } from '../../../../api/profileApi';
import { URL } from '../../../../api/axiosInstance';
import basicImage from '../../../../assets/images/profile.png';
import { ImgBox, TagBox } from '../../../PostUpload/PostProductTag/PostProductTagStyle';
import ProductTagItem from '../../../PostUpload/ProductTagItem/ProductTagItem';
import { useSetRecoilState } from 'recoil';
import { isClickProductTagBeforeAtom } from '../../../../atoms/post';

export default function PostCard({ data, commentCount, moreInfo = false }) {
  const { id, content, hearted, heartCount, createdAt } = data;
  const { space, detail } = content.includes('space')
    ? JSON.parse(content)
    : { space: undefined, detail: undefined };
  const { selectedProducts } = content.includes('selectedProducts')
    ? JSON.parse(content)
    : { selectedProducts: undefined };
  const navigate = useNavigate();
  const setIsClickProductTagBefore = useSetRecoilState(isClickProductTagBeforeAtom);

  // URL이 붙어있는 경우 그냥쓰기 없으면은 붙이기
  //,이 있는 경우 - 첫번째 데이터만
  const filteringImage = data.image.includes(',') ? data.image.split(',')[0] : data.image;
  const image = filteringImage.includes(URL) ? filteringImage : URL.concat(filteringImage);

  const [error, setError] = useState(false);
  const handleImageError = () => {
    setError(true);
  };

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

  const handleClickProductBubble = () => {
    setIsClickProductTagBefore(true);
    navigate(`/profile/${profileData.accountname}`);
  };

  return (
    <PostCardWrapper moreInfo={moreInfo}>
      <ImgBox>
        {!error && data.image ? (
          <img
            src={image}
            alt={space ? `${space} 이미지` : `${accountnameByParams} 이미지`}
            onError={handleImageError}
          />
        ) : (
          <img src={basicImage} alt='기본 이미지' />
        )}
        {selectedProducts && moreInfo && (
          <TagBox>
            {selectedProducts.map((item) => (
              <ProductTagItem
                key={item.id}
                data={item}
                type='postDetail'
                onClickProductBubble={handleClickProductBubble}
              />
            ))}
          </TagBox>
        )}
      </ImgBox>
      <PostInfoBox moreInfo={moreInfo} noSpace={!space}>
        {space && <Space moreInfo={moreInfo}> {space} </Space>}
        <HeartCommentList moreInfo={moreInfo}>
          <li>
            <Heart isHearted={isHearted} onClick={handleClickHeartButton} />
            {nowHeartCount}
          </li>
          <li onClick={moreInfo ? null : () => navigate(`/post/${id}`)}>
            <img src={commentIcon} alt='댓글' />
            {commentCount}
          </li>
        </HeartCommentList>
      </PostInfoBox>

      <PostDetail moreInfo={moreInfo}> {detail ? detail : content}</PostDetail>
      {moreInfo && <time dateTime={createdAt}>{convertDateFormat(createdAt)}</time>}
    </PostCardWrapper>
  );
}
