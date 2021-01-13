export interface ICryptoAsset {
  [key: string]: any;
  id: string;
  changePercent24hr: string;
  marketCapUsd: string | number;
  maxSupply: string;
  name: string; 
  priceUsd: string | number;
  rank: string | number;
  supply: string | number;
  symbol: string;
  volumeUsd24Hr: number;
  vwap24Hr: string;
  // non api attributes (generated on the client side)
  isChecked: boolean;
  color: string;
}
