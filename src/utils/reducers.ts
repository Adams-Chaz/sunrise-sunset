import produce, { Draft } from "immer";
import { Statuses } from "../constants";
import { IActionResponse } from "../models/models";

const initialState: IActionResponse<any> = {
    status: Statuses.DEFAULT,
    type: '',
    data: undefined,
};
/**
 * Create a common factory to perform the generic Reducer functions;
 * @param state 
 * @param action 
 * @returns 
 */
export const createReducerFactory = <T>(
    state = initialState,
    action: IActionResponse<T>
) => (actionType: string) => {
    if (action?.type === actionType) {
        switch (action?.status) {
            case Statuses.PENDING: {
                state = produce<IActionResponse<T>>(state, (draft) => {
                    draft.type = action.type;
                    draft.status = action.status;
                    draft.data = undefined;
                    return draft;
                });
                break;
            }
            case Statuses.ERROR: {
                state = produce<IActionResponse<T>>(state, (draft) => {
                    draft.type = action.type;
                    draft.status = action.status;
                    draft.data = undefined;
                    return draft;
                });
                break;
            }
            default: {
                state = produce<IActionResponse<T>>(state, (draft) => {
                    draft.type = action.type;
                    draft.status = action.status;
                    draft.data = action?.data as Draft<T>;
                    return draft;
                });
                break;
            }
        }
    }

    return state;
};