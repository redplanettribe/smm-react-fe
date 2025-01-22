import 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    interface Font {
        size: string;
        lineHeight: string;
        weight: string;
    }
    export interface DefaultTheme {
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
        bgColors: {
            primary: string;
            secondary: string;
        };
        dividerColor: string;
        fonts: {
            sb_24: Font,
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
        toastColors: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        fontFamily: {
            main: string;
        };
        type: 'light' | 'dark';
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
    textSecondaryDark: '#A6AFB4',
    divider: '#F2F2F2',
    warning: '#FE6E66',
    support: '#ED4956',
    active: '#3ACB70',
    warningSecondary: '#FD5E5A',
    white: '#FFFFFF',
    backgroundSecondary: '#F7F7F7',
    black: '#161622',
    backgroundDark: '#1E1E2D',
    dividerDark: '#252633',
};

export const fonts = {
    sb_24: { size: '24px', lineHeight: '36px', weight: '600' },
    sb_18: { size: '18px', lineHeight: '38px', weight: '600' },
    sb: { size: '14px', lineHeight: '20px', weight: '600' },
    m_22: { size: '22px', lineHeight: 'Auto', weight: '500' },
    m_18: { size: '18px', lineHeight: '26px', weight: '500' },
    m_16: { size: '16px', lineHeight: '24px', weight: '500' },
    m_14: { size: '14px', lineHeight: '20px', weight: '500' },
    m_12: { size: '12px', lineHeight: 'Auto', weight: '500' },
    r_22: { size: '22px', lineHeight: 'Auto', weight: '400' },
    r_16: { size: '16px', lineHeight: '20px', weight: '400' },
    r_14: { size: '14px', lineHeight: '20px', weight: '400' },
    r_12: { size: '12px', lineHeight: 'Auto', weight: '400' },
    r: { size: '16px', lineHeight: '18px', weight: '600' },
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

export const LightTheme: DefaultTheme = {
    colors: colors,
    textColors: {
        primary: colors.text,
        secondary: colors.textSecondary,
    },
    bgColors: {
        primary: colors.white,
        secondary: colors.backgroundSecondary,
    },
    dividerColor: colors.divider,
    fonts,
    toastColors,
    fontFamily,
    type: 'light',
};



export const DarkTheme: DefaultTheme = {
    colors: colors,
    textColors: {
        primary: colors.white,
        secondary: colors.textSecondaryDark,
    },
    bgColors: {
        primary: colors.black,
        secondary: colors.backgroundDark,
    },
    dividerColor: colors.dividerDark,
    fonts,
    toastColors,
    fontFamily,
    type: 'dark',
};