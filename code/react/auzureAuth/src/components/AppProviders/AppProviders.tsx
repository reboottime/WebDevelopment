import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import { Providers } from '@microsoft/mgt-react';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { MSAL_CONFIG } from './msalConfig';
import queryClient from './queryClient';

export default function AppProviders({ children }: Props) {
  return (
    <MsalProvider instance={msal}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MsalProvider>
  );
}

const msal = new PublicClientApplication(MSAL_CONFIG);

Providers.globalProvider = new Msal2Provider({ publicClientApplication: msal });

type Props = {
  children: React.ReactElement;
};
