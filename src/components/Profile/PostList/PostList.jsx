import React from 'react';
import PostCard from '../../common/Card/PostCard/PostCard';
import Gallery from '../../common/Gallery/Gallery';
import UserSimpleInfo from '../../common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import { PostCardList, PostListWrapper } from './PostListStyle';
import { filterPosts } from '../../../utils/filterPosts';
import { profile } from '../../../mock/mockData';

export default function PostList({ selectedTab, posts, moreInfo, onClick }) {
  const layout = {
    list: (
      <PostCardList>
        {posts.map((item) => (
          <li key={item._id}>
            <UserSimpleInfo profile={profile} type={'more'} onClick={onClick} />
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
