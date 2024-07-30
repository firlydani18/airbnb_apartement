declare module 'midtrans-node-client' {
  export class Snap {
    constructor(config: { isProduction: boolean, serverKey: string, clientKey: string });
    createTransaction(param: any): Promise<any>;
    transaction: {
      status(id: string): Promise<any>;
    };
  }
}
