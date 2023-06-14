import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostCard from '../../common/Card/PostCard/PostCard';
import Gallery from '../../common/Gallery/Gallery';
import { filterPosts } from '../../../utils/filterPosts';

const PostListWrapper = styled.section`
  padding: 0 16px;
`;

const PostCardList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  li article {
    width: 100%;
    margin: 0 auto;
  }
`;

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
