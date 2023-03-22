/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AccountInfo,
  IPublicClientApplication,
  InteractionRequiredAuthError,
} from '@azure/msal-browser';

import HttpClient from './httpClient';
import { RequestConf } from './typings';

export default class ApiClient extends HttpClient {
  constructor(msal: IPublicClientApplication, account: AccountInfo) {
    super(ApiClient.appAPiBaseUri);

    this.account = account;
    this.instance = msal;
  }

  private accessToken = '';
  private readonly account?: AccountInfo;
  private readonly instance?: IPublicClientApplication;
  private readonly scopes = ['YOUR LIST OF SCOPE'];

  static readonly appAPiBaseUri = '<YOUR API BASE URI>';

  private async acquireToken(): Promise<string> {
    try {
      const accessTokenResponse = await this.instance!.acquireTokenSilent({
        account: this.account,
        scopes: this.scopes,
      });

      return accessTokenResponse.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const accessTokenResponse = await this.instance!.acquireTokenPopup({
          scopes: this.scopes,
        });

        return accessTokenResponse.accessToken;
      }

      return '';
    }

    return '';
  }

  async request<T>(conf: RequestConf): Promise<T | undefined> {
    if (!this.accessToken) {
      this.accessToken = await this.acquireToken();
    }

    const accessToken = this.accessToken;

    return super.request({
      ...conf,
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });
  }
}
