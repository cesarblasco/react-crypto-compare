import { ICryptoAsset } from "./CryptoAsset";

export interface ISelectedAssets {
  assets: ICryptoAsset[];
  information: {
    totalPrice: number;
    totalMarketShare: string;
  };
}
