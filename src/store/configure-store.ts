import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer, { appSlice } from './app-slice';
import alertReducer, { alertSlice } from './slices/alert-slice';


const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [alertSlice.name]: alertReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(apiSlice.middleware).concat(baseApiSlice.middleware),
    devTools: !isProduction,
});
