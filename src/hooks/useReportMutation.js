import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { TOAST } from '../constants/common';

export default function useReportMutation(queryFn) {
  const reportMutation = useMutation(queryFn, {
    onSuccess() {
      toast('🚨 신고가 완료되었습니다. 신속하게 처리하겠습니다.', TOAST);
    },
    onError(error) {
      console.log(error);
    },
  });

  return reportMutation;
}
