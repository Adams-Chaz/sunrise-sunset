import { appReducers, configureStore } from "../reducers";

export const store = configureStore(appReducers);