// src/theme.ts
// src/theme.d.ts
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            success: string;
            danger: string;
            background: string;
            text: string;
        };
        fonts: {
            main: string;
        };
        spacing: (factor: number) => string;
    }
}

export const theme = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        background: '#f8f9fa',
        text: '#212529',
    },
    fonts: {
        main: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    spacing: (factor: number) => `${factor * 8}px`, // 8px grid system
    // Include other theme properties like breakpoints for responsiveness
};