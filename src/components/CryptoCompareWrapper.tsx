import React, { useEffect, useContext } from "react";
import SearchBar from "./ui/search-bar/SearchBar";
import ChartContainer from "./charts/chart-container/ChartContainer";
import CryptoAssetsTable from "./crypto-assets-table/CryptoAssetsTable";
import ApiFetchLimitSelect from "./api-fetch-limit-select/ApiFetchLimitSelect";
import Spinner from "./ui/spinner/Spinner";
import Toasty from "./ui/toasty/Toasty";
import NoDataAvailable from "./ui/no-data-available/NoDataAvailable";
import { AppContext } from "../contexts/app-context/AppContext";
import ChartContextProvider, { ChartContext } from "../contexts/chart-context/ChartContext";
import { fetchCryptoCurrencies } from "../services/CryptocurrenciesService";
import { requestStartActionCreator, 
         onAssetsResponseSuccessActionCreator, 
         onSearchActionCreator} from "../contexts/app-context/action-creators/ActionCreators";

const CryptoCompareWrapper = () => {
  const { state, dispatch } = useContext(AppContext);

  const updateCryptocurrencies = async (
    ) => {
        dispatch(requestStartActionCreator());
        const responseData = await fetchCryptoCurrencies(
            state.currentSearch,
            state.currentFetchLimit,
        );
        
     dispatch(onAssetsResponseSuccessActionCreator({responseAssets: responseData, currentPageAssets: responseData.slice(0, 10)}))
    };
  
    useEffect(() => {
        updateCryptocurrencies();
    }, []);

    useEffect(() => {
        updateCryptocurrencies();
    }, [state.currentSearch, state.currentFetchLimit]);

    return (
        <>
            {state && state.responseAssets && !state.isLoading &&
                <>
                <div className="flex flex-wrap justify-center w-11/12 xl:w-9/12 mx-auto">
                <h1 className="text-center mt-10 text-5xl w-full">Crypto compare</h1>
                {state.selectedAssets && state.selectedAssets.assets.length ? (
                    <>
                    <Toasty
                        title={`${state.selectedAssets.lastModification.asset.name} ${
                        state.selectedAssets.lastModification.action === "added"
                            ? "added"
                            : "removed"
                        }`}
                        message="Add more assets or <a class='text-yellow-400 font-bold underline' href='#'>go to top</a> to begin comparing"
                        duration={4000}
                        backgroundColorClass={state.selectedAssets.lastModification.action === "added" ? "bg-green-500" : "bg-red-500"}
                        key={state.selectedAssets.assets.length % 2 === 0 ? 1 : 2}
                    />

                    <ChartContextProvider>
                        <ChartContainer />
                    </ChartContextProvider>
                    </>
                ) : null}

                <div className="md:w-4/5 w-full">
                    <div className="md:flex mt-8 w-full justify-between">
                      <div className="font-semibold mb-2 md:mb-0">
                          {state.responseAssets.length} cryptocurrencies
                          {state.selectedAssets.assets && state.selectedAssets.assets.length ? (
                          <span> ({state.selectedAssets.assets.length} checked)</span>
                          ) : null}
                      </div>
                      <div className="flex-end mb-2 md:mb-0">
                          <SearchBar placeholder="Search..." 
                                     currentSearchTerm={state.currentSearch}
                                     onSearch={(searchTerm: string) => dispatch(onSearchActionCreator({searchTerm}))} />
                      </div>
                    </div>

                    <ApiFetchLimitSelect />

                    {state.responseAssets &&
                    state.responseAssets.length &&
                    !state.isLoading ? (
                    <>
                        <CryptoAssetsTable
                          cryptoAssets={state.currentPageAssets}
                        />
                    </>
                    ) : null}
                  </div>
                </div>
            </>
            } 

            {state && state.isLoading ? (
                <div className="mt-32">
                <Spinner />
                </div>
            ) : (
                state && !state.isLoading && !state.responseAssets.length && (
                <div className="mt-10 mb-10">
                    <NoDataAvailable />
                </div>
                )
            )} 
        </>
    )
}

export default CryptoCompareWrapper;