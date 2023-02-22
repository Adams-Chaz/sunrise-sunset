import { Actions, Statuses } from "../constants";
import { IActionResponse } from "../models/models";
import { createReducerFactory } from "../utils";

const initialState: IActionResponse<any> = {
    status: Statuses.DEFAULT,
    type: '',
    data: undefined,
};

/**
 * Set store state;
 * @param state 
 * @param action 
 * @returns 
 */
export const reduceLatitudeLongitude = (
    state = initialState,
    action: IActionResponse<any>
) => createReducerFactory(state, action)(Actions.LAT_LONG_IP_FETCH);