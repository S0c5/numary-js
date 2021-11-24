interface TransactionQuery {
  account?: string
  after?: string;
  reference?: string;
  limit?: number;
}

export {
  TransactionQuery,
}