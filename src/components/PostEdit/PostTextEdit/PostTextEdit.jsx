import React, { useCallback } from 'react';
import { SelectSpaceBtn } from '../../PostUpload/PostTextWrite/PostTextWriteStyle';
import { PostTextEditWrapper } from './PostTextEditStyle';

export default function PostTextEdit({ onClick, setContent, content, setEditData, editData }) {

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
