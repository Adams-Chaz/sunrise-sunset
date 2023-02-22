import { Actions, Statuses } from "../constants";
import { IActionResponse, IResources } from "../models/models";
import { createReducerFactory } from "../utils";

const initialState: IActionResponse<IResources> = {
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
export const reduceResources = (
    state = initialState,
    action: IActionResponse<IResources>
) => createReducerFactory(state, action)(Actions.RESOURCES_FETCH);