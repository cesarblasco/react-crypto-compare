import { ActionTypes } from "./ActionTypes.enum";
import { IPill } from "../../../components/ui/pills/Pills";

interface onChangeChartActionType {
    type: string,
    payload: {
        chartTabId: string,
    }
}

export const onChangeChartActionCreator = ({chartTabId}: {chartTabId: string}): onChangeChartActionType => {
    return {
        type: ActionTypes.ON_CHANGE_CHART,
        payload: {
            chartTabId
        }
    }
}

interface onChangeComparisonPillActionType {
    type: string,
    payload: {
        selectedPill: IPill,
    }
}

export const onChangeComparisonPillActionCreator = ({selectedPill}: {selectedPill: IPill}): onChangeComparisonPillActionType => {
    return {
        type: ActionTypes.ON_CHANGE_COMPARISON_PILL,
        payload: {
            selectedPill
        }
    }
}