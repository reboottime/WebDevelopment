import { EventType, InteractionStatus } from '@azure/msal-browser';
import { Login } from '@microsoft/mgt-react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from '@azure/msal-react';
import React, { useEffect, useState } from 'react';

import { loginRequest } from './components/AppProviders';

import { useUsersApi } from './hooks/queries/users';

export default function App() {
  const usersApi = useUsersApi();

  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();
  const [isAuthorized, setAuthorized] = useState<boolean | null>(null);

  const handleLoginButtonClick = () => {
    // status set when interaction is complete
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest);
    }
  };

  useEffect(() => {
    const callbackId = instance.addEventCallback(
      async (message: { eventType: string }) => {
        if (message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
          try {
            const me = await usersApi.getCurrentUser();
            setAuthorized(!!me);
          } catch {
            setAuthorized(false);
          }
        }
      }
    );

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance, usersApi]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  } else if (isAuthorized === false) {
    return <p>Forbidden</p>;
  }

  return (
    <>
      <AuthenticatedTemplate>
        {/* Will show user's metadata here */}
        <Login />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleLoginButtonClick}>Log in</button>
      </UnauthenticatedTemplate>
    </>
  );
}
