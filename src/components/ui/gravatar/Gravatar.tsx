import React from 'react';
import md5 from 'md5';

interface GravatarProps {
    email: string;
    size?: number;
    className?: string;
    borderRadius?: string;
    onClick?: () => void;
}

const Gravatar: React.FC<GravatarProps> = ({email, size = 200, className = '', borderRadius = '50%', onClick}) => {
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=${size}`;

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            window.open("https://gravatar.com", '_blank');
        }
    };

    return (
        <img
            onClick={handleClick}
            src={gravatarUrl}
            alt="gravatar.com"
            className={`gravatar ${className}`}
            style={{borderRadius, width: size, height: size, cursor: "pointer"}}
        />
    );
};

export default Gravatar;
