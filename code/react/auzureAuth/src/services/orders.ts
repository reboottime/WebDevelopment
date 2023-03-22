import { ApiClient, RequestConf } from '@/utils/httpClient';

export type { OrderData, OrderRecord };

export default class OrdersApi extends ApiClient {
  static readonly API_PREFIX = 'orders';

  createOrder(data: OrderData) {
    return this.post<OrderRecord>({
      apiPath: OrdersApi.API_PREFIX,
      data,
    });
  }

  getOrders(query?: RequestConf['query']) {
    return this.get<OrderRecord[]>({
      query,
      apiPath: OrdersApi.API_PREFIX,
    });
  }

  updateOrder({ id: orderId, ...update }: OrderRecord) {
    return this.patch<OrderRecord>({
      apiPath: `${OrdersApi.API_PREFIX}/${orderId}`,
      data: update,
    });
  }
}

type OrderData = Record<string, unknown>;
type OrderRecord = OrderData & { id: string };
