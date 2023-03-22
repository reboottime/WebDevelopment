import { ApiClient } from '@/utils/httpClient';

export default class UsersApi extends ApiClient {
  getCurrentUser() {
    return this.get({
      apiPath: 'users/current'
    });
  }
}
