import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

import UsersApi from '@/services/users';

export const useUsersApi = () => {
  const {
    instance,
    accounts: [account],
  } = useMsal();
  // Here is where we give api the instance and account
  // Another option is to get the instance from AppProvider, yet not straightforward
  const [api, setApi] = useState(new UsersApi(instance, account));

  useEffect(() => {
    setApi(new UsersApi(instance, account));
  }, [account, instance]);

  return api;
};
