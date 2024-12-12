import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";


type NotificationType = 'error' | 'warning' | 'info' | 'success';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    visible: boolean;
}

export interface NotificationsState {
    notifications: Notification[];
}

const initialState: NotificationsState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            state.notifications.push(action.payload);
        },
        removeNotification(state, action) {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
})

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

const duration = 5000;

export const showNotification = (message: string, type: NotificationType): AppThunk => async (dispatch) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch(addNotification({ id, message, type, visible: true }));
    setTimeout(() => {
        dispatch(removeNotification(id));
    }, duration);
}