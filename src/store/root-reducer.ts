import { combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'
import notifications from './notifications/notificationSice'
import theme from './theme/themeSlice'

const rootReducer = combineReducers({
    user,
    notifications,
    theme,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer