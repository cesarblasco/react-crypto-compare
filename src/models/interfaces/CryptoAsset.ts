export interface ICryptoAsset {
  [key: string]: any;
  id: string;
  changePercent24hr: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  // non api attributes (generated on the client side)
  isChecked: boolean;
  color: string;
}
