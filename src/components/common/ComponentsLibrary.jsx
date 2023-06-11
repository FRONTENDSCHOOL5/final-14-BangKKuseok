import React from 'react';
import ProductCard from './Card/ProductCard';
import styled from 'styled-components';
import PostCard from './Card/PostCard';
import SpaceTabs from './Tabs/SpaceTabs';
import ViewTabs from './Tabs/ViewTabs';

const StyledH2 = styled.h2`
  font-size: 20px;
  margin: 20px 0;
`;

export default function ComponentsLibrary() {
  return (
    <>
      <StyledH2>SpaceTabs</StyledH2>
      <SpaceTabs currentTab={0} />
      <br/>

      <StyledH2>ViewTabs</StyledH2>
      <ViewTabs selected={'grid'} />
      <hr/>

      <StyledH2>ProductCard</StyledH2>
      <ProductCard
        pdImg='https://source.unsplash.com/random/400x164/?lamp'
        pdName='책상 스탠드 안녕하세요안인랄라'
        price='35,000'
        keyword='조명'
      />

      <StyledH2>PostCard - feed</StyledH2>
      <PostCard
        postImg='https://source.unsplash.com/random/600x600/?room'
        postContent='옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 약동하다. 대고, 못할 약동하다. '
        space='주방'
        heartCount={0}
        commentCount={0}
        detail={false}
      />

      <StyledH2>PostCard - detail</StyledH2>
      <PostCard
        postImg='https://source.unsplash.com/random/600x600/?room'
        postContent='옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 약동하다. 대고, 못할 약동하다. '
        space='주방'
        heartCount={0}
        commentCount={0}
        createdAt='2022.04.10'
        detail={true}
      />
    </>
  );
}
