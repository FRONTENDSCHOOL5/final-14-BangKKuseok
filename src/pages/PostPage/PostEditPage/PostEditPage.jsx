import React, { useEffect, useState } from 'react';
import { SPACES } from '../../../constants/common';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import BasicModal from '../../../components/common/BottomSheet/BasicModal';
import { ModalSpaceList } from '../../../components/PostUpload/PostTextWrite/PostTextWriteStyle';
import { PostEditPageWrapper } from './PostEditPageStyle';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import PostTextEdit from '../../../components/PostEdit/PostTextEdit/PostTextEdit';
import { editPost, getPostDetail } from '../../../api/postApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PostImgUpload from '../../../components/PostUpload/PostImgUpload/PostImgUpload';

export default function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [editData, setEditData] = useState({});
  const [postImg, setPostImg] = useState();
  const [content, setContent] = useState({ space: '', detail: '' });

  //게시글 상세 정보받기
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['postData', postId],
    () => getPostDetail(postId),
    {
      onSuccess: (data) => {
        const { space, detail } = JSON.parse(data.content);
        setPostImg(data.image);
        setContent({ space, detail });
        setEditData({ image: data.image, content: data.content });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const queryClient = useQueryClient();
  //게시글 수정하기
  const EditPostMutation = useMutation(editPost, {
    onSuccess(data) {
      queryClient.invalidateQueries('feedPostData');
      queryClient.invalidateQueries('myPost');
      queryClient.setQueryData(['postData', postId], data);
      navigate(`/post/${postId}`);
    },
    onError(error) {
      console.log(error);
    },
  });

  //공간목록 바텀시트 여닫기
  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  //공간 선택하기
  const handleClickSpace = (e) => {
    setContent({ ...content, space: e.target.innerText });
    setEditData({
      ...editData,
      content: JSON.stringify({ ...content, space: e.target.innerText }),
    });
    setIsShow(false);
  };

  //게시글 수정 버튼 누르기
  const handleClickRightButton = () => {
    EditPostMutation.mutate({
      postId,
      post: { ...editData },
    });
  };

  //data에 변동이 있을 때 버튼 활성화
  useEffect(() => {
    if (editData && postData) {
      if (editData.content === postData.content && editData.image === postData.image) {
        setIsBtnActive(false);
      } else {
        setIsBtnActive(true);
      }
    }
  }, [setIsBtnActive, postData, editData]);

  return (
    <>
      {!isPostLoading && (
        <BasicLayout
          type='imageSelect'
          isNonNav
          title='게시글 수정'
          btnText='수정'
          isBtnActive={isBtnActive}
          onClickLeftButton={() => navigate(-1)}
          onClickRightButton={handleClickRightButton}
        >
          <PostEditPageWrapper>
            <PostImgUpload
              setImg={setPostImg}
              uploadedImg={postImg}
              setIsBtnActive={setIsBtnActive}
              setEditData={setEditData}
              editData={editData}
            />
            <PostTextEdit
              onClick={handleClickModalOpen}
              setContent={setContent}
              content={content}
              setEditData={setEditData}
              editData={editData}
            />
          </PostEditPageWrapper>
          {isShow && (
            <BottomSheet isShow={isShow} onClick={handleClickModalOpen}>
              <BasicModal>
                <ModalSpaceList>
                  <h3>공간을 선택해주세요</h3>
                  <ul>
                    {SPACES.map((space, index) => (
                      <button type='button' key={index} onClick={handleClickSpace}>
                        {space}
                      </button>
                    ))}
                  </ul>
                </ModalSpaceList>
              </BasicModal>
            </BottomSheet>
          )}
        </BasicLayout>
      )}
    </>
  );
}
