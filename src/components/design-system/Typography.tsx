import { DefaultTheme } from 'styled-components';

export const getFontStyles = (fontKey: keyof DefaultTheme['fonts']) => (theme: DefaultTheme) => `
  font-size: ${theme.fonts[fontKey].size};
  font-weight: ${theme.fonts[fontKey].weight};
  line-height: ${theme.fonts[fontKey].lineHeight};
`;