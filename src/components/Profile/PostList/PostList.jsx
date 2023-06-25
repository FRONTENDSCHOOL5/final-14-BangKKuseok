import React from 'react';
import PostCard from '../../common/Card/PostCard/PostCard';
import Gallery from '../../common/Gallery/Gallery';
import UserSimpleInfo from '../../common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import { PostCardList, PostListWrapper } from './PostListStyle';
import { filterUserPosts } from '../../../utils/filterPosts';

export default function PostList({ selectedTab, posts, moreInfo, onClick }) {
  const layout = {
    list: (
      <PostCardList>
        {posts.map((item) => (
          <li key={item.id}>
            <UserSimpleInfo profile={item.author} type={'more'} onClick={() => onClick(item)} />
            <PostCard data={item} commentCount={item.comments.length} moreInfo={moreInfo} />
          </li>
        ))}
      </PostCardList>
    ),
    grid: <Gallery data={filterUserPosts(posts)} />,
  };

  return (
    <>
      <PostListWrapper>{layout[selectedTab]}</PostListWrapper>
    </>
  );
}
