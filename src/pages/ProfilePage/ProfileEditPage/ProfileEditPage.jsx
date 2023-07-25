import React, { useState, useEffect } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import SetUserProfileForm from '../../../components/LoginSignUp/SetUserProfile/SetUserProfileForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../api/profileApi';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { TOAST } from '../../../constants/common';

export default function ProfileEditPage() {
  const [isAlreadyIdMsg, setIsAlreadyIdMsg] = useState('');
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
    onError: (error) => {
      setIsAlreadyIdMsg(error.response.data.message);
    },
  });

  const handleClickSaveButton = () => {
    updateProfileMutation.mutate({ user: { ...newProfile } });
    toast('✅ 수정이 완료되었습니다.', TOAST);
  };

  useEffect(() => {
    setIsAlreadyIdMsg('');
  }, [newProfile.accountname]);

  return (
    <BasicLayout
      type='profileEdit'
      title='프로필 수정'
      btnText='저장'
      isBtnActive={isButtonActive}
      isNonNav={true}
      onClickRightButton={handleClickSaveButton}
    >
      <SetUserProfileForm
        myData={myData}
        setIsButtonActive={setIsButtonActive}
        setData={setNewProfile}
        message={isAlreadyIdMsg}
      />
    </BasicLayout>
  );
}
