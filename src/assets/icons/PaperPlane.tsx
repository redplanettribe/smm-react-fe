import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

const IconPaperPlane: React.FC<IconProps> = ({ color, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6063_16213)">
      <path
        d="M15.4546 9.10828L10.6846 13.9983C10.3346 14.3583 9.78459 14.4383 9.34459 14.1983L3.58458 11.0483C2.73458 10.5883 2.8346 9.34828 3.7346 9.01828L20.0446 3.06828C20.9346 2.74828 21.8046 3.60828 21.4846 4.49828L15.6746 20.7583C15.3546 21.6483 14.1546 21.7683 13.6646 20.9683L11.4946 17.4183"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_6063_16213">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default IconPaperPlane;