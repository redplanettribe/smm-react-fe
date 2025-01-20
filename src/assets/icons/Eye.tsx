import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

const IconEye: React.FC<IconProps> = ({ color = '#6D6F78', size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8477 7.38982C16.7174 8.30488 16.7174 9.69512 15.8477 10.6102C14.3809 12.1535 11.8616 14.25 9 14.25C6.13836 14.25 3.61912 12.1535 2.15228 10.6102C1.28257 9.69512 1.28257 8.30488 2.15228 7.38982C3.61912 5.8465 6.13836 3.75 9 3.75C11.8616 3.75 14.3809 5.8465 15.8477 7.38982Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

export default IconEye;