import React, { useEffect, useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import SetUserProfileForm from '../../../components/LoginSignUp/SetUserProfile/SetUserProfileForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../api/profileApi';
import { useMutation } from 'react-query';

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

  const updateProfileMutation = useMutation((formData) => updateProfile(formData), {
    onSuccess: () => {
      navigate('/profile');
    },
    onError: () => {
      console.error('프로필 수정 실패');
    },
  });

  const handleClickSaveButton = () => {
    updateProfileMutation.mutate({
      user: {
        username: newProfile.username,
        accountname: newProfile.accountname,
        intro: newProfile.intro,
        image: newProfile.image,
      },
    });
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
