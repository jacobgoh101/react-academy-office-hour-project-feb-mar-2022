import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { ClientService } from '../services/client.service';
import { Client } from '../types/client.types';

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const updateClientQuery = useMutation(
    QUERY_KEYS.UPDATE_CLIENT,
    (payload: Pick<Client, 'id' | 'email' | 'name' | 'companyDetails'>) =>
      ClientService.update(payload),
    {
      onSuccess(_, { id }) {
        queryClient.invalidateQueries([QUERY_KEYS.GET_CLIENT_BY_ID, id]);
      },
    }
  );

  return updateClientQuery;
};
