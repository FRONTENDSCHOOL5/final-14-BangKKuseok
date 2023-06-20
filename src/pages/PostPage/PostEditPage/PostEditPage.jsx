import React, { useCallback, useEffect, useRef, useState } from 'react';
import { URL } from '../../../api/axiosInstance';
import { SPACES } from '../../../constants/spaces';
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
