import { createSelector } from "reselect";
import { Statuses } from "../constants";
import { Models } from "../models";
import { IActionResponse } from "../models/models";
import { IStore } from "../models/store";

type StateSelector<S extends IStore> = (state: S) => IActionResponse<any>

export interface ICreateSelector<S extends IStore> {
    state: (state: S) => Models.IActionResponse<any> | any;
    status: string;
    data: any;
    isComplete: boolean;
    isDefault: boolean;
    isPending: boolean;
    hasFailed: boolean;
}

export const createAppSelector = <S extends IStore>(key: keyof S) => (state: any): ICreateSelector<S> => {
    const selectState = (storeState: S) => storeState?.[key] as IActionResponse<any>;
    const selectStatus = createStatusSelector(selectState)(state);

    return {
        state: selectState, 
        status: selectStatus, 
        data: createDataSelector(selectState)(state),
        isComplete: createIsCompleteSelector(selectStatus),
        hasFailed: createDidFailSelector(selectStatus), 
        isDefault: createIsDefaultSelector(selectStatus),
        isPending: createIsPendingSelector(selectStatus),
    }
};

/**
 * Generic Select : Retrieve the Status from store state;
 * @param stateSelector 
 * @returns 
 */
const createStatusSelector = <S extends IStore>(stateSelector: StateSelector<S>) => createSelector(
    stateSelector,
    (state): string => state?.status as string
);

/**
 * Generic Select : Retrieve the Data from store state;
 * @param stateSelector 
 * @returns 
 */
const createDataSelector = <S extends IStore>(stateSelector: StateSelector<S>) => createSelector(
    stateSelector,
    (state): any => state?.data
);

/**
 * Generic Select : Retrieve the Status prop from the action storee, compare it to the COMPLETED status.
 * @param status 
 * @returns 
 */
const createIsCompleteSelector = (status: string): boolean => status === Statuses.COMPLETE;

/**
 * Generic Select : Retrieve the Status prop from the action storee, compare it to the DEFAULT status.
 * @param status 
 * @returns 
 */
const createIsDefaultSelector = (status: string): boolean => status === Statuses.DEFAULT;

/**
 * Generic Select : Retrieve the Status prop from the action storee, compare it to the PENDING status.
 * @param status 
 * @returns 
 */
const createIsPendingSelector = (status: string): boolean => status === Statuses.PENDING;

/**
 * Generic Select : Retrieve the Status prop from the action storee, compare it to the ERROR status.
 * @param status 
 * @returns 
 */
const createDidFailSelector = (status: string): boolean => status === Statuses.ERROR;