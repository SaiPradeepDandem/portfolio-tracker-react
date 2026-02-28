export interface Position {
  id: number;
  ticker: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  exchange: string;
  currency: string;
}