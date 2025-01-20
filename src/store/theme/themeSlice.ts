import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

interface ThemeState {
    isDarkTheme: boolean;
}

const initialState: ThemeState = {
    isDarkTheme: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setDarkTheme(state, action: PayloadAction<boolean>) {
            state.isDarkTheme = action.payload;
        },
    },
});

export const { toggleTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Selectors
export const selectIsDarkTheme = (state: RootState) => state.theme.isDarkTheme;