import { Actions, Statuses } from "../constants";
import { IActionResponse } from "../models/models";
import { createReducerFactory } from "../utils";

const initialState: IActionResponse<any> = {
    status: Statuses.DEFAULT,
    type: '',
    data: undefined,
};

export const reduceSunriseSunset = (
    state = initialState,
    action: IActionResponse<any>
) => createReducerFactory(state, action)(Actions.RISE_SET_FETCH);