import React, { useEffect, useState } from "react";
import SearchBar from "./components/ui/search-bar/SearchBar";
import ChartContainer from "./components/charts/chart-container/ChartContainer";
import CryptoAssetsTable from "./components/crypto-assets-table/CryptoAssetsTable";
import Pagination from "./components/ui/pagination/Pagination";
import Spinner from "./components/ui/spinner/Spinner";
import Toasty from "./components/ui/toasty/Toasty";
import NoDataAvailable from "./components/ui/no-data-available/NoDataAvailable";
import {
  generateRandomHexColor,
  transformNumberToReadableFormat,
} from "./utilities/utilities";
import { ITableHeader } from "./models/interfaces/TableHeader";
import { fetchCryptoCurrencies } from "./services/CryptocurrenciesService";
import { ICryptoAsset } from "./models/interfaces/CryptoAsset";
import { ISelectedAssets } from "./models/interfaces/SelectedAssets";
import { SortingTypes } from "./models/enums/SortingTypes.enum";

const App: React.FC<any> = () => {
  const assetsInitialState = {
    responseAssets: [],
    currentPageAssets: [],
  };

  const [assets, setAssets] = useState(assetsInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentFetchLimit, setCurrentFetchLimit] = useState(100);

  const selectedAssetsInitialState: ISelectedAssets = {
    assets: [],
    information: {
      totalPrice: 0,
      totalMarketShare: "0",
      totalVolume24hr: "0",
      totalSupply: "0",
    },
  };

  const [selectedAssets, setSelectedAssets] = useState(
    selectedAssetsInitialState
  );

  const updateCryptocurriencies = async (
    searchTerm: string,
    newFetchLimit?: number
  ) => {
    setIsLoading(true);

    const responseData = await fetchCryptoCurrencies(
      searchTerm,
      currentFetchLimit,
      newFetchLimit
    );
    responseData.forEach((cryptoAsset: ICryptoAsset) => {
      cryptoAsset.isChecked = false;
    });

    if (selectedAssets && selectedAssets.assets.length) {
      selectedAssets.assets.forEach((asset: ICryptoAsset) => {
        const selectedAssetIndexInCryptoAssets = responseData.findIndex(
          (assetToFind: any) => assetToFind.id === asset.id
        );
        if (selectedAssetIndexInCryptoAssets !== -1) {
          responseData[selectedAssetIndexInCryptoAssets].isChecked = true;
        }
      });
    }

    setAssets({
      responseAssets: responseData,
      currentPageAssets: responseData.slice(0, 10),
    });
    setIsLoading(false);

    if (newFetchLimit) {
      setCurrentFetchLimit(newFetchLimit);
    }

    if (searchTerm) {
      setCurrentSearch(searchTerm);
    }
  };

  useEffect(() => {
    updateCryptocurriencies(currentSearch);
  }, []);

  const addOrRemoveAssetFromSelectedAssets = (
    isChecked: boolean,
    asset: ICryptoAsset
  ) => {
    asset.isChecked = isChecked;
    let modifiedSelectedAssets = [...selectedAssets.assets];
    if (isChecked) {
      modifiedSelectedAssets.push(asset);
    } else {
      modifiedSelectedAssets = modifiedSelectedAssets.filter(
        (assetToFilter) => assetToFilter.id !== asset.id
      );
    }
    return modifiedSelectedAssets;
  };

  const createNewTotalByAttribute = (
    assets: ICryptoAsset[],
    attribute: string
  ) => {
    return assets.reduce((acc: number, currentAsset: ICryptoAsset) => {
      acc = acc + parseFloat(currentAsset[attribute]);
      return acc;
    }, 0);
  };

  const handleAssetCheck = (event: any, asset: ICryptoAsset) => {
    let newSelectedAssets = addOrRemoveAssetFromSelectedAssets(
      event.target.checked,
      asset
    );

    if (newSelectedAssets && newSelectedAssets.length) {
      const newTotalPrice = createNewTotalByAttribute(
        newSelectedAssets,
        "priceUsd"
      );

      const newTotalMarketShare = createNewTotalByAttribute(
        newSelectedAssets,
        "marketCapUsd"
      );

      const newTotalSupply = createNewTotalByAttribute(
        newSelectedAssets,
        "supply"
      );

      const newTotalVolume24hr = createNewTotalByAttribute(
        newSelectedAssets,
        "volumeUsd24Hr"
      );

      newSelectedAssets = newSelectedAssets.map((asset: any) => {
        return {
          ...asset,
          color: asset.color ? asset.color : generateRandomHexColor(),
          percentageOfTotal: (asset.priceUsd * 100) / newTotalPrice,
          supplyPercentageOfTotal: (asset.supply * 100) / newTotalSupply,
          volume24hrPercentageOfTotal:
            (asset.volumeUsd24Hr * 100) / newTotalVolume24hr,
          marketSharePercentageOfTotal:
            (asset.marketCapUsd * 100) / newTotalMarketShare,
        };
      });

      const newSelectedAssetsState = {
        ...selectedAssets,
        assets: newSelectedAssets,
        information: {
          ...selectedAssets.information,
          totalPrice: newTotalPrice,
          totalSupply: transformNumberToReadableFormat(newTotalSupply),
          totalVolume24hr: transformNumberToReadableFormat(newTotalVolume24hr),
          totalMarketShare: transformNumberToReadableFormat(
            newTotalMarketShare
          ),
        },
      };

      setSelectedAssets(newSelectedAssetsState);
    } else {
      setSelectedAssets(selectedAssetsInitialState);
    }
  };

  const handlePageChange = (newPageData: any) => {
    const { newPageAssets } = newPageData;
    setAssets({ ...assets, currentPageAssets: newPageAssets });
  };

  const handleSearch = (searchTerm: string) => {
    updateCryptocurriencies(searchTerm);
  };

  const handleChangeFetchLimit = (event: any) => {
    updateCryptocurriencies(currentSearch, event.target.value);
  };

  const handleClosePanel = (panelTitle: string) => {
    const uncheckEventMock = { target: { checked: false } };
    const closedAsset: any = assets.responseAssets.find(
      (assetToFind: any) => assetToFind.symbol === panelTitle
    );
    const closedAssetIndex: number = assets.responseAssets.findIndex(
      (assetToFind: any) => assetToFind.symbol === panelTitle
    );
    handleAssetCheck(uncheckEventMock, closedAsset);
    const updatedCryptoAssets: any = [...assets.responseAssets];
    updatedCryptoAssets[closedAssetIndex].isChecked = false;
    setAssets({ ...assets, responseAssets: updatedCryptoAssets });
  };

  const handleResetSelection = () => {
    const uncheckedCryptoAssets = [...assets.responseAssets];
    uncheckedCryptoAssets.forEach((asset: ICryptoAsset) => {
      asset.isChecked = false;
    });
    setAssets({ ...assets, responseAssets: uncheckedCryptoAssets });
    setSelectedAssets(selectedAssetsInitialState);
  };

  const handleAssetSort = (sortedHeader: ITableHeader) => {
    let sortedAssets = [...assets.responseAssets];
    sortedAssets.sort((a: any, b: any) => {
      let attr1 = a[sortedHeader.sortBy];
      let attr2 = b[sortedHeader.sortBy];

      if (attr1 && attr2) {
        if (sortedHeader.sortBy === "name") {
          attr1 = attr1.toLowerCase();
          attr2 = attr2.toLowerCase();
        } else {
          attr1 = parseFloat(attr1);
          attr2 = parseFloat(attr2);
        }
      }
      if (attr1 === null) {
        return 1;
      } else if (attr2 === null) {
        return -1;
      } else if (attr1 === attr2) {
        return 0;
      }
      return sortedHeader.currentSort === SortingTypes.Ascending
        ? attr1 < attr2
          ? 1
          : -1
        : attr1 < attr2
        ? -1
        : 1;
    });

    setAssets({
      ...assets,
      responseAssets: sortedAssets,
      currentPageAssets: sortedAssets.slice(0, 10),
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center w-11/12 xl:w-9/12 mx-auto">
        <h1 className="text-center mt-10 text-5xl w-full">Crypto compare</h1>

        {selectedAssets && selectedAssets.assets.length ? (
          <>
            <Toasty
              title={`${
                selectedAssets.assets[selectedAssets.assets.length - 1].name
              } added`}
              message="Add more assets or <a class='text-yellow-400 font-bold underline' href='#'>go to top</a> to begin comparing"
              duration={4000}
              key={selectedAssets.assets.length % 2 === 0 ? 1 : 2}
            />

            <ChartContainer
              selectedAssets={selectedAssets}
              onResetSelection={handleResetSelection}
              onClosePanel={handleClosePanel}
            />
          </>
        ) : null}

        <div className="md:w-4/5 w-full">
          <div className="md:flex mt-8 w-full justify-between">
            <div className="font-semibold mb-2 md:mb-0">
              {assets.responseAssets.length} cryptocurrencies
              {selectedAssets.assets && selectedAssets.assets.length ? (
                <span> ({selectedAssets.assets.length} checked)</span>
              ) : null}
            </div>
            <div className="flex-end mb-2 md:mb-0">
              <SearchBar onSearch={handleSearch} placeholder="Search..." />
            </div>
          </div>

          <label htmlFor="fetchLimit">API Fetch limit: </label>
          <select
            id="fetchLimit"
            value={currentFetchLimit}
            onChange={handleChangeFetchLimit}
            className="select outline-none focus:border-blue-500"
          >
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>

          {assets.responseAssets &&
          assets.responseAssets.length &&
          !isLoading ? (
            <>
              <CryptoAssetsTable
                onAssetCheck={handleAssetCheck}
                cryptoAssets={assets.currentPageAssets}
                onSort={handleAssetSort}
              />

              <Pagination
                dataSource={assets.responseAssets}
                onPageChange={handlePageChange}
              />
            </>
          ) : null}

          {isLoading ? (
            <div className="mt-32">
              <Spinner />
            </div>
          ) : (
            !assets.responseAssets.length && (
              <div className="mt-10 mb-10">
                <NoDataAvailable />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default App;
