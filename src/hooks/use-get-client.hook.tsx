import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { ClientService } from '../services/client.service';

export const useGetClient = (id?: string) => {
  const getClientQuery = useQuery(
    [QUERY_KEYS.GET_CLIENT_BY_ID, id],
    () => ClientService.get(id!),
    { enabled: !!id, cacheTime: 0 }
  );

  return {
    ...getClientQuery,
  };
};
