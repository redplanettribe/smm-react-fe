import { combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'
import notifications from './notifications/notificationSice'
import theme from './theme/themeSlice'
import project from './projects/projectSlice'
import modal from './modal/modalSlice'

const rootReducer = combineReducers({
    user,
    notifications,
    theme,
    project,
    modal,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer