import React from 'react';
import {
  SkeletonUserImg,
  SkeletonBox,
  SkeletonUserName,
  SkeletonAccountName,
  SkeletonWrapper,
} from './SkeletonStyle.jsx';

const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonUserImg />
      <SkeletonBox>
        <SkeletonUserName />
        <SkeletonAccountName />
      </SkeletonBox>
    </SkeletonWrapper>
  );
};

export default Skeleton;
