interface Cursor<TData> {
  page_size: number,
  has_more: boolean,
  total: number,
  remainingResults: string,
  data: TData[];
}

export default Cursor;