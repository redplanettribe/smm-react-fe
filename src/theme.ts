import 'styled-components';
import { MyTheme } from 'styled-components';

declare module 'styled-components' {
    interface Font {
        size: string;
        lineHeight: string;
    }
    export interface MyTheme {
        colors: {
            primary: string;
            primary_80: string;
            primary_60: string;
            primary_40: string;
            primary_20: string;
            primary_10: string;
            secondary: string;
            text: string;
            textSecondary: string;
            white: string;
            divider: string;
            warning: string;
            backgroundSecondary: string;
            support: string;
            active: string;
            warningSecondary: string;
            backgroundDark: string;
            textSecondaryDark: string;
            black: string;
            dividerDark: string;
        };
        textColors: {
            primary: string;
            secondary: string;
        };
        fonts: {
            sb_18: Font,
            sb: Font,
            m_22: Font,
            m_18: Font,
            m_16: Font,
            m_14: Font,
            m_12: Font,
            r_22: Font,
            r_16: Font,
            r_14: Font,
            r_12: Font,
            r: Font,
        }
        fontSizes: {
            h1: string;
            h2: string;
            h3: string;
            text1: string;
            body: string;
            small: string;
        };
        toastColors: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        fontFamily: {
            main: string;
        };
        spacing: (factor: number) => string;
    }
}

const colors = {
    primary: '#FFFD00',
    primary_80: '#FFFD33',
    primary_60: '#FFFE66',
    primary_40: '#FFFE99',
    primary_20: '#FFFFCC',
    primary_10: '#FFFFE5',
    secondary: '#F7F7F7',
    text: '#000103',
    textSecondary: '#6D6F78',
    white: '#FFFFFF',
    divider: '#F2F2F2',
    warning: '#FE6E66',
    backgroundSecondary: '#FDFDFD',
    support: '#ED4956',
    active: '#3ACB70',
    warningSecondary: '#FD5E5A',
    backgroundDark: '#1E1E2D',
    textSecondaryDark: '#A6AFB4',
    black: '#161622',
    dividerDark: '#252633',
};

const fonts = {
    sb_18: { size: '18px', lineHeight: '38px' },
    sb: { size: '14px', lineHeight: '20px' },
    m_22: { size: '22px', lineHeight: 'Auto' },
    m_18: { size: '18px', lineHeight: '26px' },
    m_16: { size: '16px', lineHeight: '24px' },
    m_14: { size: '14px', lineHeight: '20px' },
    m_12: { size: '12px', lineHeight: 'Auto' },
    r_22: { size: '22px', lineHeight: 'Auto' },
    r_16: { size: '16px', lineHeight: '20px' },
    r_14: { size: '14px', lineHeight: '20px' },
    r_12: { size: '12px', lineHeight: 'Auto' },
    r: { size: '16px', lineHeight: '18px' },
};

const fontFamily = {
    main: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
};

const toastColors = {
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
};

export const LightTheme: MyTheme = {
    colors: colors,
    textColors: {
        primary: colors.text,
        secondary: colors.textSecondary,
    },
    fontSizes: {
        h1: '3rem',
        h2: '1.75rem',
        h3: '1.5rem',
        text1: '1.25rem',
        body: '1rem',
        small: '0.875rem',
    },
    fonts,
    toastColors,
    fontFamily,
    spacing: (factor: number) => `${factor * 8}px`, // 8px grid system
    // Include other theme properties like breakpoints for responsiveness
};



export const DarkTheme: MyTheme = {
    colors: colors,
    textColors: {
        primary: colors.white,
        secondary: colors.textSecondaryDark,
    },
    fontSizes: {
        h1: '3rem',
        h2: '1.75rem',
        h3: '1.5rem',
        text1: '1.25rem',
        body: '1rem',
        small: '0.875rem',
    },
    fonts,
    toastColors,
    fontFamily,
    spacing: (factor: number) => `${factor * 8}px`, // 8px grid system
    // Include other theme properties like breakpoints for responsiveness
};