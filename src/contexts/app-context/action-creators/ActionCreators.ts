import { ActionTypes } from "./ActionTypes.enum";
import { ICryptoAsset } from "../../../models/interfaces/CryptoAsset"
import { ITableColumn } from "../../../models/interfaces/TableColumn";

interface ActionWithoutPayloadType {
    type: string
}

export const requestStartActionCreator = (): ActionWithoutPayloadType => {
    return {
        type: ActionTypes.ON_REQUEST_START
    }   
}


interface OnAssetResponseSuccessActionType {
    type: string,
    payload: {
        responseAssets: any[],
        currentPageAssets: any[]
    }
}

export const onAssetsResponseSuccessActionCreator = ({responseAssets, currentPageAssets}: {responseAssets: ICryptoAsset[], currentPageAssets: ICryptoAsset[]}):
    OnAssetResponseSuccessActionType => {
    return {
        type: ActionTypes.ON_ASSETS_RESPONSE_SUCCESS,
        payload: {
            responseAssets,
            currentPageAssets
        }
    }   
}

interface onSearchActionType {
    type: string,
    payload: {
        searchTerm: string,
    }
}

export const onSearchActionCreator = ({searchTerm}: {searchTerm: string}): onSearchActionType => {
    return {
        type: ActionTypes.ON_SEARCH,
        payload: {
            searchTerm
        }
    }
}


interface onChangeFetchLimitActionType {
    type: string,
    payload: {
        value: string,
    }
}

export const onChangeFetchLimitActionCreator = ({value}: {value: string}): onChangeFetchLimitActionType => {
    return {
        type: ActionTypes.ON_CHANGE_FETCH_LIMIT,
        payload: {
            value
        }
    }
}


export const onResetSelectionActionCreator = (): ActionWithoutPayloadType => {
    return {
        type: ActionTypes.ON_RESET_SELECTION,
    }
}

interface OnSortActionType {
    type: string,
    payload: {
        sortedColumnHeader: ITableColumn,
    }
}

export const onSortActionCreator = ({sortedColumnHeader}: {sortedColumnHeader: ITableColumn}): OnSortActionType => {
    return {
        type: ActionTypes.ON_SORT,
        payload: {
            sortedColumnHeader
        }
    }
}


interface OnAssetCheckActionType {
    type: string,
    payload: {
        checked: boolean,
        asset: ICryptoAsset
    }
}

export const onAssetCheckActionCreator = ({checked, asset}: {checked: boolean, asset: ICryptoAsset}): OnAssetCheckActionType => {
    return {
        type: ActionTypes.ON_ASSET_CHECK,
        payload: {
            checked,
            asset
        }
    }
}

interface newPageData {
    currentPage: number,
    perPage: number, 
    newPageData: ICryptoAsset[]
}

interface OnPageChangeActionType {
    type: string,
    payload: {
        newPageData: newPageData
    }
}

export const onPageChangeActionCreator = ({newPageData}: {newPageData: newPageData}): OnPageChangeActionType => {
    return {
        type: ActionTypes.ON_PAGE_CHANGE,
        payload: {
            newPageData
        }
    }
}

interface OnCloseAssetPanelActionType {
    type: string,
    payload: {
        panelTitle: string
    }
}

export const onCloseAssetPanelActionCreator = ({panelTitle}: {panelTitle: string}): OnCloseAssetPanelActionType => {
    return {
        type: ActionTypes.ON_CLOSE_ASSET_PANEL,
        payload: {
            panelTitle
        }
    }
}

