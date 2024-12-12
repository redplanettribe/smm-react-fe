import { combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'
import notifications from './notifications/notificationSice'

const rootReducer = combineReducers({
    user,
    notifications,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer