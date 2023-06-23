import React, { useCallback } from 'react';
import { SelectSpaceBtn } from '../../PostUpload/PostTextWrite/PostTextWriteStyle';
import { PostTextEditWrapper } from './PostTextEditStyle';

export default function PostTextEdit({ onClick, setContent, content, setEditData, editData }) {
  //인풋의 변화감지해서 해당밸류넣기
  const handleChangeDetail = useCallback(
    (e) => {
      setContent({ ...content, detail: e.target.value });
      setEditData({
        ...editData,
        content: JSON.stringify({ ...content, detail: e.target.value }),
      });
    },
    [content, editData, setContent, setEditData],
  );

  return (
    <PostTextEditWrapper>
      <SelectSpaceBtn type='button' onClick={onClick} space={content.space}>
        {content.space}
      </SelectSpaceBtn>
      <textarea
        name='content'
        cols='40'
        rows='10'
        maxlenth='300'
        value={content.detail}
        onChange={handleChangeDetail}
      ></textarea>
    </PostTextEditWrapper>
  );
}
