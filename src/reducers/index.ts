import { configureStore as configureReduxStore, EnhancedStore } from "@reduxjs/toolkit";
import { ReducersMapObject } from "redux";
import { Store } from '../models';
import { IStore } from "../models/store";

import * as latitudeLongitude from './latitudeLongitude';
import * as resources from './resources';
import * as sunriseSunset from './sunriseSunset';

let store: EnhancedStore;
export const configureStore = <S extends IStore>(
    reducer: ReducersMapObject<S>
): EnhancedStore<S> => {
    store = configureReduxStore({
        reducer
    });
    return store;
}

export const appReducers: ReducersMapObject<Store.IStore> = {
    latitudeLongitude: latitudeLongitude.reduceLatitudeLongitude,
    sunriseSunset: sunriseSunset.reduceSunriseSunset,
    resources: resources.reduceResources,
}