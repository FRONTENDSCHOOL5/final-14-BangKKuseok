import React from 'react';
import PostCard from '../../common/Card/PostCard/PostCard';
import Gallery from '../../common/Gallery/Gallery';
import { PostCardList, PostListWrapper } from './PostListStyle';
import { filterPosts } from '../../../utils/filterPosts';

export default function PostList({ selectedTab, posts, moreInfo }) {
  const layout = {
    list: (
      <PostCardList>
        {posts.map((item) => (
          <li key={item._id}>
            <PostCard data={item} moreInfo={moreInfo} />
          </li>
        ))}
      </PostCardList>
    ),
    grid: <Gallery data={filterPosts(posts)} />,
  };

  return (
    <>
      <PostListWrapper>{layout[selectedTab]}</PostListWrapper>
    </>
  );
}
