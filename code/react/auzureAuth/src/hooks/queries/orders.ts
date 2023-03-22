import { useMsal } from '@azure/msal-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import OrdersApi from '@/services/orders';
import { RequestConf } from '@/utils/httpClient';

export const useOrdersApi = () => {
  const {
    instance,
    accounts: [account],
  } = useMsal();
  const [api, setApi] = useState(new OrdersApi(instance, account));

  useEffect(() => {
    setApi(new OrdersApi(instance, account));
  }, [account, instance]);

  return api;
};

export const useCerateOrder = () => {
  const api = useOrdersApi();

  return useMutation(api.createOrder);
};

export const useGetOrders = (query?: RequestConf['query']) => {
  const api = useOrdersApi();

  return useQuery({
    queryFn: () => api.getOrders(query),
    queryKey: ['orders', query],
  });
};

export const useUpdateOrder = () => {
  const api = useOrdersApi();

  return useMutation(api.updateOrder);
};
