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
import { useSetRecoilState } from 'recoil';
import { isUploadorEditBeforeAtom } from '../../../atoms/post';
import PostProductTag from '../../../components/PostUpload/PostProductTag/PostProductTag';
import useModal from '../../../hooks/useModal';
export default function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isBtnActive, setIsBtnActive] = useState(false);
  const setIsUploadorEditBefore = useSetRecoilState(isUploadorEditBeforeAtom);

  const [editData, setEditData] = useState({});
  const [postImg, setPostImg] = useState();
  const [content, setContent] = useState({ space: '', detail: '', selectedProducts: '' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { modalData, openModal, closeModal } = useModal('');

  //게시글 상세 정보받기
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['postData', postId],
    () => getPostDetail(postId),
    {
      onSuccess: (data) => {
        const { space, detail } = JSON.parse(data.content);
        const { selectedProducts } = data.content.includes('selectedProducts')
          ? JSON.parse(data.content)
          : { selectedProducts: undefined };
        setPostImg(data.image);
        setContent({ space, detail, selectedProducts });
        setSelectedProducts(selectedProducts);
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
      setIsUploadorEditBefore(true);
      navigate(`/post/${postId}`);
    },
    onError(error) {
      console.log(error);
    },
  });

  //공간목록 바텀시트 여닫기
  const handleClickModalOpen = () => {
    openModal('editSpace');
  };

  //공간 선택하기
  const handleClickSpace = (e) => {
    setContent({ ...content, space: e.target.innerText });
    setEditData({
      ...editData,
      content: JSON.stringify({ ...content, space: e.target.innerText }),
    });
    closeModal();
  };

  //뒤로가기 버튼 누르기
  const handleClickLeftButton = () => {
    navigate(-1);
  };

  //선택 상품 목록 수정
  useEffect(() => {
    setContent({ ...content, selectedProducts });
    setEditData({
      ...editData,
      content: JSON.stringify({ ...content, selectedProducts }),
    });
  }, [selectedProducts]);

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
          onClickLeftButton={handleClickLeftButton}
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
            <PostProductTag
              postImg={postImg}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              type={'edit'}
            />
            <PostTextEdit
              onClick={handleClickModalOpen}
              setContent={setContent}
              content={content}
              setEditData={setEditData}
              editData={editData}
            />
          </PostEditPageWrapper>

          {/* -- BottomSheet */}
          {modalData.modalType === 'editSpace' && (
            <BottomSheet>
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
