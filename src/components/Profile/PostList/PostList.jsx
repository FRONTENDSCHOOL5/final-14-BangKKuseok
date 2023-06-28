import React from 'react';
import PostCard from '../../common/Card/PostCard/PostCard';
import Gallery from '../../common/Gallery/Gallery';
import UserSimpleInfo from '../../common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import { PostCardList, PostListWrapper } from './PostListStyle';
import { filterUserPosts } from '../../../utils/filterPosts';
import { useLocation } from 'react-router-dom';

export default function PostList({ selectedTab, posts, moreInfo, onClick }) {
  const filteredPosts = posts.filter((item) => item.image);
  const { pathname } = useLocation();

  const layout = {
    list: (
      <PostCardList>
        {filteredPosts.map((item) => (
          <li key={item.id}>
            <UserSimpleInfo
              profile={item.author}
              type={'more'}
              onClick={() => onClick(item)}
              isLink={pathname === '/feed'}
            />
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
