import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

const IconThreeDotsHorizontal: React.FC<IconProps> = ({ color = '#6D6F78', size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 9C5.25 8.17157 4.57843 7.5 3.75 7.5C2.92157 7.5 2.25 8.17157 2.25 9C2.25 9.82843 2.92157 10.5 3.75 10.5C4.57843 10.5 5.25 9.82843 5.25 9ZM10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5C9.82843 10.5 10.5 9.82843 10.5 9ZM14.25 7.5C15.0784 7.5 15.75 8.17157 15.75 9C15.75 9.82843 15.0784 10.5 14.25 10.5C13.4216 10.5 12.75 9.82843 12.75 9C12.75 8.17157 13.4216 7.5 14.25 7.5Z"
      fill={color}
    />
  </svg>
);

export default IconThreeDotsHorizontal;
