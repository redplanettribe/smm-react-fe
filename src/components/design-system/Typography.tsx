import styled, { } from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';


interface TypographyProps {
    size?: string;
    weight?: string;
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
}

const createHeading = (
    level: 'h1' | 'h2' | 'h3' | 'p',
    fontSizeKey: keyof DefaultTheme['fontSizes']
) => styled[level]<TypographyProps>`
  font-size: ${(props) => props.size || props.theme.fontSizes[fontSizeKey]};
  font-weight: ${(props) => props.weight || 'bold'};
  margin: 0;
  color: ${(props) => props.color || props.theme.colors.text};
  text-align: ${(props) => props.align || 'left'};
`;

export const H1 = createHeading('h1', 'h1');
export const H2 = createHeading('h2', 'h2');
export const H3 = createHeading('h3', 'h3');
export const Text3 = createHeading('p', 'text1');