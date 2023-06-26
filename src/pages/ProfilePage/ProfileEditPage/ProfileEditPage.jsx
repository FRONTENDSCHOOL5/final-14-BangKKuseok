import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import SetUserProfileForm from '../../../components/LoginSignUp/SetUserProfile/SetUserProfileForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../api/profileApi';
import { useMutation, useQueryClient } from 'react-query';

export default function ProfileEditPage() {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const myData = location.state;

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      navigate('/profile');
    },
    onMutate: () => {
      // 이전 데이터를 캐시에서 제거
      queryClient.removeQueries('myProfile');
    },
    onError: () => {
      console.error('프로필 수정 실패');
    },
  });

  const handleClickSaveButton = () => {
    updateProfileMutation.mutate({ user: { ...newProfile } });
  };

  return (
    <BasicLayout
      type='profileEdit'
      btnText='저장'
      isBtnActive={isButtonActive}
      isNonNav={true}
      onClickLeftButton={() => navigate(-1)}
      onClickRightButton={handleClickSaveButton}
    >
      <SetUserProfileForm
        myData={myData}
        setIsButtonActive={setIsButtonActive}
        setData={setNewProfile}
      />
    </BasicLayout>
  );
}
