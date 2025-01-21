import React from 'react';
import styled from 'styled-components';
import DefaultUserPng from '../../../assets/images/default-user.png';

interface UserIconProps {
    imageUrl?: string;
    size?: number;
    alt?: string;
}

const StyledUserIcon = styled.img<Pick<UserIconProps, 'size'>>`
  width: ${({ size }) => size || 48}px;
  height: ${({ size }) => size || 48}px;
  object-fit: cover;
  border-radius: 50%;
`;

const UserIcon: React.FC<UserIconProps> = ({
    imageUrl,
    size = 24,
    alt = 'User Icon',
}) => {
    // Fallback icon if no valid URL is provided
    const finalSrc = imageUrl && imageUrl.length > 0 ? imageUrl : DefaultUserPng;
    return <StyledUserIcon src={finalSrc} size={size} alt={alt} />;
};

export default UserIcon;