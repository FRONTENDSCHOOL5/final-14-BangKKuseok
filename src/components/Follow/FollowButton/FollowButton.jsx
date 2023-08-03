import React from 'react';
import Button from '../../common/Button/Button/Button';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUnFollow, postFollow } from '../../../api/followApi';
import { useLocation } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';

export default function FollowButton({ isfollow, accountname }) {
  const urlPath = useLocation().pathname;
  const queryClient = useQueryClient();

  // 팔로우 API
  const postFollowMutation = useMutation(postFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(urlPath.includes('followers') ? 'followers' : 'followings');
    },
    onError: () => {
      console.error('팔로우 실패');
    },
  });

  // 언팔로우 API
  const deleteUnFollowMutation = useMutation(deleteUnFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries(urlPath.includes('followers') ? 'followers' : 'followings');
    },
    onError: () => {
      console.error('언팔로우 실패');
    },
  });

  const handleClickFollow = (accountname) => {
    // 팔로우 API 요청
    postFollowMutation.mutate(accountname);
  };

  const handleClickUnFollow = (accountname) => {
    // 언팔로우 API 요청
    deleteUnFollowMutation.mutate(accountname);
  };

  return (
    <>
      {isfollow ? (
        <Button variant='white' size='xs' onClick={() => handleClickUnFollow(accountname)}>
          {deleteUnFollowMutation.isLoading ? <Spinner type='follow' /> : '언팔로우'}
        </Button>
      ) : (
        <Button size='xs' onClick={() => handleClickFollow(accountname)}>
          {postFollowMutation.isLoading ? <Spinner type='follow' /> : '팔로우'}
        </Button>
      )}
    </>
  );
}
