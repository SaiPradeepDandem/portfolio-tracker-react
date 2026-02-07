export interface Position {
  id: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  exchange: string;
  currency: string;
}