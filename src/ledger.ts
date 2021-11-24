import { URLSearchParams } from 'url';
import { Account } from "./account";
import { Cluster } from "./cluster";
import Cursor from "./cursor";
import { Transaction } from "./schema";
import { TransactionQuery } from './query';
import { WrappedResponse } from './response';

export class Ledger {
  name: string;
  cluster: Cluster;

  constructor(cluster : Cluster, name : string) {
    this.name = name;
    this.cluster = cluster;
  }

  async getAccounts() : Promise<Cursor<Account>> {
    const res = await this.cluster.conn.get(`/${this.name}/accounts`);
    return res.data;
  }

  async getAccount(address: string): Promise<WrappedResponse<Account>> {
    const res = await this.cluster.conn.get(`/${this.name}/accounts/${address}`);
    return res.data;
  }

  async getTransactions(query?: TransactionQuery): Promise<Cursor<Transaction>> {
    const res = await this.cluster.conn.get(`/${this.name}/transactions?${query}${new URLSearchParams(<Record<any, any>>query).toString()}`);
    return res.data;
  }

  async setTransactionMeta(txid: string, meta: object): Promise<WrappedResponse<null>>{
    const res = await this.cluster.conn.post(`/${this.name}/transactions/${txid}/metadata`, meta);
    return res.data;
  }

  async setAccountMeta(address: string, meta: object): Promise<WrappedResponse<null>> {
    const res = await this.cluster.conn.post(`/${this.name}/accounts/${address}/metadata`, meta);
    return res.data;
  }

  async execute(script: string, vars: object, reference?: string) : Promise<Promise<WrappedResponse<null>>> {
    const res = await this.cluster.conn.post(`/${this.name}/script`, {
      plain: script,
      vars,
      reference,
    });

    return res.data;
  }
}

export default Ledger;