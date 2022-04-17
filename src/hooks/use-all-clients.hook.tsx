import { memoize } from 'lodash';
import { Client } from '../types/client.types';
import { useListClients } from './use-list-clients.hook';

const cGetUserIdByClientId = memoize(
  (clientId: string, clients?: Client[]) =>
    clients?.find((c) => c.id === clientId)?.user_id
);

export const useClientOptions = () => {
  const listClientsQuery = useListClients({ limit: 10000 });
  const { data } = listClientsQuery;

  const options = data?.data.clients;

  const getUserIdByClientId = (clientId: string) =>
    cGetUserIdByClientId(clientId, options);

  return { ...listClientsQuery, options, getUserIdByClientId };
};
