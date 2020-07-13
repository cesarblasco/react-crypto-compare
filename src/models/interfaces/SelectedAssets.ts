import { ICryptoAsset } from "./CryptoAsset";

export interface ISelectedAssets {
  assets: ICryptoAsset[];
  information: {
    [key: string]: any;
    totalPrice: number;
    totalMarketShare: string;
    totalSupply: string;
    totalVolume24hr: string;
  };
}
