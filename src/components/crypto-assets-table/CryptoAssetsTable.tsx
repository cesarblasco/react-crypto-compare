import React, { useContext } from "react";
import Table from "../ui/table/Table";
import Pagination from "../../components/ui/pagination/Pagination";
import { transformNumberToReadableFormat } from "../../utilities/utilities";
import { ITableColumn } from "../../models/interfaces/TableColumn";
import { ICryptoAsset } from "../../models/interfaces/CryptoAsset";
import { AppContext } from "../../contexts/AppContext";
import { onSortActionCreator, 
        onAssetCheckActionCreator, 
        onPageChangeActionCreator,
       } from "../../contexts/action-creators/ActionCreators";

interface ICryptoAssetsTable {
  cryptoAssets: ICryptoAsset[];
}

const CryptoAssetsTable: React.FC<ICryptoAssetsTable> = ({
  cryptoAssets
}) => {
  const { state, dispatch } = useContext(AppContext);

  const tableColumns: ITableColumn[] = [
    {
      title: "Name",
      key: "asset",
      sortBy: "name",
      isVisible: true,
      tooltip: "Name of the asset",
      width: 20,
      isSortable: true,
      render: (asset: ICryptoAsset) => 
        <>
           <input
            onChange={(event) => dispatch(onAssetCheckActionCreator({checked: event.target.checked, asset}))}
            className="mr-2 w-20-px"
            checked={asset.isChecked}
            type="checkbox"
          />
          {asset.name} ({asset.symbol})
        </>
    },
    {
      title: "Price",
      key: "priceUsd",
      isVisible: true,
      tooltip: "Current price of the asset",
      isSortable: true,
      render: (priceUsd: number) => <>${Number(priceUsd).toFixed(2)}</>
    },
    {
      title: "Supply",
      key: "supply",
      isVisible: true,
      tooltip: "Available supply for trading",
      isSortable: true,
      render: (supply: number) => <>{transformNumberToReadableFormat(supply)}</>
    },
    {
      title: "Market Cap",
      key: "marketCapUsd",
      isVisible: true,
      tooltip: "Price * Supply",
      isSortable: true,
      render: (marketCapUsd: number) => <>{transformNumberToReadableFormat(marketCapUsd)}</>
    },
    {
      title: "Volume (24 hr)",
      key: "volumeUsd24Hr",
      isVisible: true,
      tooltip: "Quantity of trading volume over the last 24 hours",
      isSortable: true,
      render: (volumeUsd24Hr: number) => <>{transformNumberToReadableFormat(volumeUsd24Hr)}</>
    },
    {
      title: "Rank",
      key: "rank",
      isVisible: true,
      tooltip: "The higher the marketcap the higher the rank",
      isSortable: true,
      render: (rank: number) => <>{rank}</>
    },
  ];

  return (
    <div className="md:text-base text-xs">
      <Table dataSource={cryptoAssets} 
              columns={tableColumns} 
              onSort={(sortedColumnHeader: ITableColumn) => dispatch(onSortActionCreator({sortedColumnHeader}))} />

      <Pagination dataSource={state.responseAssets}
                  onPageChange={(newPageData) => dispatch(onPageChangeActionCreator({newPageData}))}
      />
    </div>
  );
};

export default CryptoAssetsTable;