import React, { useCallback, useMemo, useState } from 'react';
import { USER_REG, USER_WARNING_MSG } from '../constants/validate';

export default function useUserForm(initialData) {
  // 이메일, 비밀번호 값을 받아옴
  const [values, setValues] = useState({
    email: initialData.email ?? '',
    password: initialData.password ?? '',
  });

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  // 이메일, 비밀번호 유효성 결과 저장
  const isValidValues = useMemo(
    () => ({
      email: USER_REG.email.test(values.email),
      password: USER_REG.password.test(values.password),
    }),
    [values.email, values.password],
  );

  // 이메일, 비밀번호 입력값 받아오기
  const handleChange = useCallback((e) => {
    const { type: name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrorMessage({ email: '', password: '' });
  }, []);

  const handleSetErrorMessage = useCallback(() => {
    // 입력한 값이 없을 때 || 유효하지 않은 값일 때
    setErrorMessage({
      email:
        (!values.email && USER_WARNING_MSG.email.require) ||
        (!isValidValues.email && USER_WARNING_MSG.email.format),
      password:
        (!values.password && USER_WARNING_MSG.password.require) ||
        (!isValidValues.password && USER_WARNING_MSG.password.format),
    });
  }, [values, isValidValues]);

  return [values, isValidValues, errorMessage, handleSetErrorMessage, handleChange];
}
