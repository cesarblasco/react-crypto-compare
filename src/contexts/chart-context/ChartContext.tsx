import React, { createContext, useReducer } from "react";
import { IContextProps } from "../ContextProps";
import { ChartTypes } from "../../models/enums/ChartTypes.enum";
import { ActionTypes } from "./action-creators/ActionTypes.enum";

export const ChartContext = createContext({} as IContextProps);

const { StackedBar } = ChartTypes;

interface IChartContext {
    currentChart: string,
    currentComparisonTitle: string,
    currentComparisonKey: string,
    percentageOfCurrentComparisonTotalKey: string,
    totalOfSelectedKey: string,
}

const initialState: IChartContext = {
    currentChart: StackedBar,
    currentComparisonTitle: "Price",
    currentComparisonKey: "priceUsd",
    percentageOfCurrentComparisonTotalKey: "percentageOfTotal",
    totalOfSelectedKey: "totalPrice",
}

const ChartActionsReducer = (
    state: any,
    action: any
  ): any => {
    const payload = action.payload;
    switch(action.type){
        case ActionTypes.ON_CHANGE_CHART: {
            return {
                ...state,
                currentChart: payload.chartTabId
            }
        }

        case ActionTypes.ON_CHANGE_COMPARISON_PILL: {
            return {
                ...state,
                currentComparisonTitle: payload.selectedPill.title,
                currentComparisonKey: payload.selectedPill.keyFromAsset,
                percentageOfCurrentComparisonTotalKey: payload.selectedPill.percentageOfCurrentComparisonTotalKey,
                totalOfSelectedKey: payload.selectedPill.totalOfSelectedKey,
            }
        }

        default: {
            return state;
        }
    }
}


const ChartContextProvider = ({children}: {children: any}) => {
    const [state, dispatch] = useReducer(ChartActionsReducer, initialState);
    return (
        <ChartContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartContext.Provider>
    )
};

export default ChartContextProvider;