import React, { createContext, useReducer } from "react";
import { ISelectedAssets } from "../../models/interfaces/SelectedAssets";
import { ICryptoAsset } from "../../models/interfaces/CryptoAsset";
import { ITableColumn } from "../../models/interfaces/TableColumn";
import { SortingTypes } from "../../models/enums/SortingTypes.enum";
import { generateRandomHexColor, transformNumberToReadableFormat } from "../../utilities/utilities";
import { ActionTypes } from "./action-creators/ActionTypes.enum";
import { IContextProps } from "../ContextProps";

const selectedAssetsInitialState: ISelectedAssets = {
    assets: [],
    lastModification: null,
    information: {
      totalPrice: 0,
      totalMarketShare: "0",
      totalVolume24hr: "0",
      totalSupply: "0",
    },
  };

const initialState = {
    responseAssets: [],
    currentPageAssets: [],
    selectedAssets: selectedAssetsInitialState,
    isLoading: true,
    currentSearch: "",
    currentFetchLimit: 100
};

export const AppContext = createContext({} as IContextProps);

const sortAssets = (sortedColumnHeader: ITableColumn, currentState: any) => {
  let sortedAssets = [...currentState.responseAssets];
  const keyToSortBy = sortedColumnHeader.sortBy ? sortedColumnHeader.sortBy : sortedColumnHeader.key;
  sortedAssets.sort((a: ICryptoAsset, b: ICryptoAsset) => {
    let attr1 = a[keyToSortBy];
    let attr2 = b[keyToSortBy];

    const parsedAttr1 = parseFloat(attr1);
    const parsedAttr2 = parseFloat(attr2);

    if (attr1 && attr2) {
      if (parsedAttr1.toString() === "NaN" || parsedAttr2.toString() === "NaN") {
        attr1 = attr1.toLowerCase();
        attr2 = attr2.toLowerCase();
      } else {
        attr1 = parsedAttr1;
        attr2 = parsedAttr2;
      }
    }
    if (attr1 === null) {
      return 1;
    } else if (attr2 === null) {
      return -1;
    } else if (attr1 === attr2) {
      return 0;
    }
    return sortedColumnHeader.currentSort === SortingTypes.Ascending
      ? attr1 < attr2
        ? 1
        : -1
      : attr1 < attr2
      ? -1
      : 1;
  });
  return sortedAssets;
}

const createNewTotalByAttribute = (
  assets: ICryptoAsset[],
  attribute: string
) => {
  return assets.reduce((acc: number, currentAsset: ICryptoAsset) => {
    acc = acc + parseFloat(currentAsset[attribute]);
    return acc;
  }, 0);
};

const addOrRemoveAssetFromSelectedAssets = (
  state: any,
  isChecked: boolean,
  asset: ICryptoAsset
) => {
  let action = "";
  asset.isChecked = isChecked;
  let modifiedSelectedAssets = [...state.selectedAssets.assets];
  if (isChecked) {
    modifiedSelectedAssets.push(asset);
    action = "added";
  } else {
    modifiedSelectedAssets = modifiedSelectedAssets.filter(
      (assetToFilter) => assetToFilter.id !== asset.id
    );
    action = "removed";
  }
  return {
    modifiedSelectedAssets,
    lastModification: {
      action,
      asset,
    },
  };
};

const handleAssetCheck = (state: any, isChecked: boolean, asset: ICryptoAsset) => {
  const newAssetsCollection = addOrRemoveAssetFromSelectedAssets(
    state,
    isChecked,
    asset
  );
  let newSelectedAssets = newAssetsCollection.modifiedSelectedAssets;

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
      ...state.selectedAssets,
      assets: newSelectedAssets,
      lastModification: newAssetsCollection.lastModification,
      information: {
        ...state.selectedAssets.information,
        totalPrice: newTotalPrice,
        totalSupply: transformNumberToReadableFormat(newTotalSupply),
        totalVolume24hr: transformNumberToReadableFormat(newTotalVolume24hr),
        totalMarketShare: transformNumberToReadableFormat(
          newTotalMarketShare
        ),
      },
    };

    return newSelectedAssetsState
  } else {
    return selectedAssetsInitialState
  }
};

 const handleClosePanel = (state: any, panelTitle: string) => {
    const closedAsset: any = state.responseAssets.find(
      (assetToFind: any) => assetToFind.symbol === panelTitle
    );
    const closedAssetIndex: number = state.responseAssets.findIndex(
      (assetToFind: any) => assetToFind.symbol === panelTitle
    );
    const newSelectedAssetsState = handleAssetCheck(state, false, closedAsset);
    const updatedCryptoAssets: any = [...state.responseAssets];
    updatedCryptoAssets[closedAssetIndex].isChecked = false;
    return {
      newSelectedAssetsState,
      updatedCryptoAssets
    }
  };

const AppActionsReducer = (
    state: any,
    action: any
  ): any => {
    const payload = action.payload;
  
    switch (action.type) {

      case ActionTypes.ON_REQUEST_START: {
        return {
          ...state,
          isLoading: true
        }
      }
      
      case ActionTypes.ON_ASSETS_RESPONSE_SUCCESS: {
        payload.responseAssets.forEach((cryptoAsset: ICryptoAsset) => {
          cryptoAsset.isChecked = false;
        });
    
        if (state.selectedAssets && state.selectedAssets.assets) {
          state.selectedAssets.assets.forEach((asset: ICryptoAsset) => {
            const selectedAssetIndexInCryptoAssets = payload.responseData.findIndex(
              (assetToFind: any) => assetToFind.id === asset.id
            );
            if (selectedAssetIndexInCryptoAssets !== -1) {
              payload.responseAssets[selectedAssetIndexInCryptoAssets].isChecked = true;
            }
          });
        }

        return {
            ...state,
            responseAssets: payload.responseAssets,
            currentPageAssets: payload.currentPageAssets,
            isLoading: false
        }
      }

      case ActionTypes.ON_SEARCH: {
        return {
          ...state,
          currentSearch: payload.searchTerm
        }
      }

      case ActionTypes.ON_SELECTED_ASSETS: {
        return {
            ...state,
            selectedAssets: payload
        }
      }

      case ActionTypes.ON_SORT: {
        const sortedAssets = sortAssets(payload.sortedColumnHeader, state)
        return {
          ...state,
          responseAssets: sortedAssets,
          currentPageAssets: sortedAssets.slice(0, 10)
        }
      }

      case ActionTypes.ON_PAGE_CHANGE: {
        const { newPageData, currentPage } = payload.newPageData;
        return {
          ...state,
          currentPageAssets: newPageData,
          currentPage
        }
      }

      case ActionTypes.ON_CHANGE_FETCH_LIMIT: {
        return {
          ...initialState,
          currentFetchLimit: payload.value
        }
      }

      case ActionTypes.ON_RESET_SELECTION: {
        const uncheckedCryptoAssets = [...state.responseAssets];
        uncheckedCryptoAssets.forEach((asset: ICryptoAsset) => {
          asset.isChecked = false;
        });

        return {
          ...state,
          responseAssets: uncheckedCryptoAssets,
          selectedAssets: selectedAssetsInitialState
        }
      }

      case ActionTypes.ON_ASSET_CHECK: {
        const { checked, asset } = payload;
        const newSelectedAssetsState = handleAssetCheck(state, checked, asset);

        return { 
          ...state,
          selectedAssets: newSelectedAssetsState
        }
      }

      case ActionTypes.ON_CLOSE_ASSET_PANEL: {
        const closePanelState = handleClosePanel(state, payload.panelTitle);
        
        return {
          ...state, 
          selectedAssets: closePanelState.newSelectedAssetsState,
          responseAssets: closePanelState.updatedCryptoAssets
        }
      }

      default: 
        return state;
    }
}

const AppContextProvider = ({children}: {children: any}) => {
    const [state, dispatch] = useReducer(AppActionsReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;