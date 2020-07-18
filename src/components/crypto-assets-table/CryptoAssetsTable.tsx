import React from "react";
import Table from "../ui/table/Table";
import { transformNumberToReadableFormat } from "../../utilities/utilities";
import { ITableHeader } from "../../models/interfaces/TableHeader";

interface ICryptoAssetsTable {
  cryptoAssets: any[];
  onAssetCheck: (evt: any, asset: any) => void;
  onSort: (sortedHeader: ITableHeader) => void;
}

const CryptoAssetsTable: React.FC<ICryptoAssetsTable> = ({
  cryptoAssets,
  onAssetCheck,
  onSort,
}) => {
  const tableHeaders: ITableHeader[] = [
    {
      title: "Name",
      sortBy: "name",
      isVisible: true,
      tooltip: "Name of the asset",
      width: 20,
    },
    {
      title: "Price",
      sortBy: "priceUsd",
      isVisible: true,
      tooltip: "Current price of the asset",
    },
    {
      title: "Supply",
      sortBy: "supply",
      isVisible: true,
      tooltip: "Available supply for trading",
    },
    {
      title: "Market Cap",
      sortBy: "marketCapUsd",
      isVisible: true,
      tooltip: "Price * Supply",
    },
    {
      title: "Volume (24 hr)",
      sortBy: "volumeUsd24Hr",
      isVisible: true,
      tooltip: "Quantity of trading volume over the last 24 hours",
    },
    {
      title: "Rank",
      sortBy: "rank",
      isVisible: true,
      tooltip: "The higher the marketcap the higher the rank",
    },
  ];

  return (
    <div className="md:text-base text-xs">
      <Table headers={tableHeaders} onSort={onSort}>
        {cryptoAssets.map((asset: any) => {
          return (
            <tr
              key={asset.id}
              className="border-solid border-gray-300 border-b-2"
            >
              <td className="py-4 pr-4">
                <input
                  onChange={(evt) => onAssetCheck(evt, asset)}
                  className="mr-2 w-20-px"
                  checked={asset.isChecked}
                  type="checkbox"
                />
                {asset.name} ({asset.symbol})
              </td>
              <td className="py-4 pr-4">
                ${Number(asset.priceUsd).toFixed(2)}
              </td>
              <td className="py-4 pr-4">
                ${transformNumberToReadableFormat(asset.supply)}
              </td>
              <td className="py-4 pr-4">
                ${transformNumberToReadableFormat(asset.marketCapUsd)}
              </td>
              <td className="py-4 pr-4">
                ${transformNumberToReadableFormat(asset.volumeUsd24Hr)}
              </td>
              <td className="py-4 pr-4">{asset.rank}</td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
};

export default CryptoAssetsTable;
