import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type Alert = {
    status: 'error' | 'success';
    title: string;
    isError: boolean;
    desc?: string;
};

export type AlertState = {
    alertStatus: Alert;
};

const initialState: AlertState = {
    alertStatus: { status: 'error', title: '', isError: false, desc: '' },
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlertStatus: (state, action: PayloadAction<Alert>) => {
            state.alertStatus = action.payload;
        },
    },
});

export const { setAlertStatus } = alertSlice.actions;

export const alertStatusSelector = (state: ApplicationState) => state.alert.alertStatus;

export default alertSlice.reducer;
