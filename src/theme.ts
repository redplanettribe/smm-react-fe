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
        textColor: {
            inactive: string;
            active: string;
            normal: string;
            light: string;
        };
        fontSizes: {
            h1: string;
            h2: string;
            h3: string;
            text1: string;
            body: string;
            small: string;
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
    textColor: {
        inactive: '#6c757d',
        active: '#212529',
        normal: '#495057',
        light: '#ced4da',
    },
    fontSizes: {
        h1: '3rem',
        h2: '1.75rem',
        h3: '1.5rem',
        text1: '1.25rem',
        body: '1rem',
        small: '0.875rem',
    },
    fonts: {
        main: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    spacing: (factor: number) => `${factor * 8}px`, // 8px grid system
    // Include other theme properties like breakpoints for responsiveness
};