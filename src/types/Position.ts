export interface Position {
  id: number;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  exchange: string;
  currency: string;
}