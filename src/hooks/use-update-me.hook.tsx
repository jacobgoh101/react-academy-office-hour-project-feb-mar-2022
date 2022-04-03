import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { MeService } from '../services/user.service';

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  const updateMyCompanyQuery = useMutation(MeService.updateMyCompany, {
    onSuccess() {
      queryClient.invalidateQueries(QUERY_KEYS.GET_ME);
    },
  });

  return {
    updateMyCompanyQuery,
    updateMyCompany: updateMyCompanyQuery.mutateAsync,
  };
};
