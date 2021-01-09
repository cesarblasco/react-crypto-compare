import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { onChangeFetchLimitActionCreator } from "../../contexts/action-creators/ActionCreators";

const ApiFetchLimitSelect = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <>
            <label htmlFor="fetchLimit">API Fetch limit: </label>
            <select
                id="fetchLimit"
                value={state.currentFetchLimit}
                onChange={(event) => dispatch(onChangeFetchLimitActionCreator({value: event.target.value}))}
                className="select outline-none focus:border-blue-500"
            >
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
            </select>
        </>
    )
}

export default ApiFetchLimitSelect;