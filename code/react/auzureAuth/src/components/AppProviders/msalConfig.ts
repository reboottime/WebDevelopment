import { Configuration } from '@azure/msal-browser';

export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: '<YOUR CLIENT ID>',
    authority: '<YOUR AUTHORITY>',
    redirectUri: process.env.NODE_ENV === 'production'
      ? '<Redirect URI AFTER BEING Authenticated>'
      : 'http://localhost:3000',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['https://<YOUR API DOMAIN>/User.Read']
};
