import React, { useCallback, useEffect, useRef, useState } from 'react';
import { URL } from '../../../api/axiosInstance';
import { SPACES } from '../../../constants/common';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import BasicModal from '../../../components/common/BottomSheet/BasicModal';
import {
  ModalSpaceList,
  SelectSpaceBtn,
} from '../../../components/PostUpload/PostTextWrite/PostTextWriteStyle';
import { PostEditPageWrapper } from './PostEditPageStyle';
import BasicLayout from '../../../layout/BasicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import PostImgEdit from '../../../components/PostEdit/PostImgEdit/PostImgEdit';
import PostTextEdit from '../../../components/PostEdit/PostTextEdit/PostTextEdit';
import { editPost, getPostDetail } from '../../../api/postApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { uploadImg } from '../../../api/imgApi';

export default function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [prevData, setPrevData] = useState();
  const [editData, setEditData] = useState({
    content: '',
    image: '',
  });
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
        setPrevData({ image: data.image, content: JSON.stringify({ space, detail }) });
        setEditData({ image: data.image, content: JSON.stringify({ space, detail }) });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //이미지 업로드하기
  const uploadImgMutation = useMutation(uploadImg, {
    onSuccess(data) {
      const imgUrl = URL + data.filename;
      setPostImg(imgUrl);
      setEditData({ ...editData, image: imgUrl });
    },
    onError(error) {
      console.log(error);
    },
  });

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

  //이미지 바꿨을 때 이미지 업로드 및 수정
  const handleEditPostImg = (e) => {
    const imgData = new FormData();
    imgData.append('image', e.target.files[0]);
    uploadImgMutation.mutate(imgData);
    setIsBtnActive(true);
  };

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

  //뒤로가기 버튼 누르기
  const handleClickLeftButton = () => {
    navigate(-1);
  };

  //게시글 수정 버튼 누르기
  const handleClickRightButton = () => {
    EditPostMutation.mutate({
      postId,
      post: { ...editData },
    });
  };

  //editData 동기적 작업
  useEffect(() => {
    setEditData((data) => data);
  }, [editData]);

  //data에 변동이 있을 때 버튼 활성화
  useEffect(() => {
    if (editData && prevData) {
      if (editData !== prevData) {
        setIsBtnActive(true);
      } else {
        setIsBtnActive(false);
      }
    }
  }, [setIsBtnActive, prevData, editData, content]);

  return (
    <>
      {!isPostLoading && prevData && (
        <BasicLayout
          type='imageSelect'
          isNonNav
          title='게시글 수정'
          btnText='수정'
          isBtnActive={isBtnActive}
          onClickLeftButton={handleClickLeftButton}
          onClickRightButton={handleClickRightButton}
        >
          <PostEditPageWrapper>
            <PostImgEdit postImg={postImg} onChange={handleEditPostImg} />
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
