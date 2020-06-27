import React, { useEffect, useState } from "react";
import SearchBar from "./components/ui/search-bar/SearchBar";
import GraphicContainer from "./components/charts/graphic-container/GraphicContainer";
import CryptoAssetsTable from "./components/crypto-assets-table/CryptoAssetsTable";
import Pagination from "./components/ui/pagination/Pagination";
import Spinner from "./components/ui/spinner/Spinner";
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
    },
  };

  const [selectedAssets, setSelectedAssets] = useState(
    selectedAssetsInitialState
  );

  const updateCryptocurriencies = (
    searchTerm: string,
    newFetchLimit?: number
  ) => {
    setIsLoading(true);

    fetchCryptoCurrencies(searchTerm, currentFetchLimit, newFetchLimit).then(
      (jsonResponse: any) => {
        const responseData = jsonResponse.data;

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
      }
    );
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

  const handleAssetCheck = (event: any, asset: ICryptoAsset) => {
    let newSelectedAssets = addOrRemoveAssetFromSelectedAssets(
      event.target.checked,
      asset
    );

    let newTotalPrice = 0;
    let newTotalMarketShare = 0;

    if (newSelectedAssets && newSelectedAssets.length) {
      newTotalPrice = newSelectedAssets.reduce(
        (acc: number, currentAsset: any) => {
          acc = acc + parseFloat(currentAsset.priceUsd);
          return acc;
        },
        0
      );

      newTotalMarketShare = newSelectedAssets.reduce(
        (acc: number, currentAsset: ICryptoAsset) => {
          acc = acc + parseFloat(currentAsset.marketCapUsd);
          return acc;
        },
        0
      );

      newSelectedAssets = newSelectedAssets.map((asset: any) => {
        return {
          ...asset,
          color: asset.color ? asset.color : generateRandomHexColor(),
          percentageOfTotal: (asset.priceUsd * 100) / newTotalPrice,
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
      <div className="flex flex-wrap justify-center w-9/12 mx-auto">
        <h1 className="text-center mt-10 text-5xl w-full">Crypto compare</h1>

        {selectedAssets && selectedAssets.assets.length ? (
          <>
            <GraphicContainer
              selectedAssets={selectedAssets}
              onResetSelection={handleResetSelection}
              onClosePanel={handleClosePanel}
            />
          </>
        ) : null}

        <div className="w-4/5">
          <div className="flex mt-8 w-full justify-between">
            <span className="font-semibold">
              {assets.responseAssets.length} cryptocurrencies
              {selectedAssets.assets && selectedAssets.assets.length ? (
                <span> ({selectedAssets.assets.length} checked)</span>
              ) : null}
            </span>
            <SearchBar onSearch={handleSearch} placeholder="Search..." />
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
            <Spinner />
          ) : (
            !assets.responseAssets.length && <NoDataAvailable />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
