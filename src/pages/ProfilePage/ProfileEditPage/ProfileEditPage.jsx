import React, { useState, useEffect } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import SetUserProfileForm from '../../../components/LoginSignUp/SetUserProfile/SetUserProfileForm';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../api/profileApi';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { TOAST } from '../../../constants/common';
import { useRecoilState } from 'recoil';
import { myProfileDataAtom } from '../../../atoms/myProfile';

export default function ProfileEditPage() {
  const [isAlreadyIdMsg, setIsAlreadyIdMsg] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });
  const [myData, setMyData] = useRecoilState(myProfileDataAtom);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      localStorage.setItem('myProfileData', JSON.stringify(data.user));
      setMyData(data.user);
      navigate('/profile');
    },
    onMutate: () => {
      // 이전 데이터를 캐시에서 제거
      queryClient.removeQueries('profile');
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
        message={isAlreadyIdMsg}
      />
    </BasicLayout>
  );
}
