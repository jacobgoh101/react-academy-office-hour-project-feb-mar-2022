import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../constants/query.constant';
import { ClientService } from '../services/client.service';
import { Client } from '../types/client.types';

export const useCreateClient = () => {
  const updateClientQuery = useMutation(
    QUERY_KEYS.CREATE_CLIENT,
    (payload: Pick<Client, 'email' | 'name' | 'companyDetails'>) =>
      ClientService.create(payload)
  );

  return updateClientQuery;
};
