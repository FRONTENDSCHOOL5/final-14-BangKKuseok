import { useState } from 'react';
import { MAX_PRICE, REG, WARNING_MSG } from '../constants/validate';

export default function useInputs(intialData, id) {
  const [value, setValue] = useState(intialData);
  const [valueError, setValueError] = useState('');

  const onChange = (e) => {
    if (id === 'price' && e.target.value > MAX_PRICE) {
      setValue(e.target.value);
      setValueError('최대 입력 가능 금액은 999,999,999원 입니다.');
    } else {
      setValue(e.target.value);
      setValueError('');
    }
  };

  const onBlur = (e) => {
    // input에 값이 있고, valid일 때 실행
    if (e.target.value && REG[id].test(e.target.value)) {
      if (id === 'price' && parseInt(e.target.value) <= 0) {
        setValueError('0보다 큰 숫자만 입력 가능합니다.');
      } else if (id === 'price' && e.target.value > MAX_PRICE) {
        setValue(MAX_PRICE);
        setValueError('');
      } else {
        setValueError('');
      }
    } else if (!e.target.value) {
      // input에 값이 없을 때 실행
      setValueError('필수 입력사항을 입력해주세요.');
    } else {
      // input에 값이 있지만, invalid일 때 실행
      setValueError(WARNING_MSG[id]);
    }
  };

  return [value, valueError, onChange, onBlur];
}
