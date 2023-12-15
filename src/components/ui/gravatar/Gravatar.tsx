import React from 'react';
import md5 from 'md5';

interface GravatarProps {
    email: string;
    size?: number;
    className?: string;
}

const Gravatar: React.FC<GravatarProps> = ({email, size = 200, className = ''}) => {
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=${size}`;

    return (
        <img onClick={() => window.open("https://gravatar.com", '_blank')}
             src={gravatarUrl}
             alt="gravatar.com"
             className={`gravatar ${className}`}
             style={{borderRadius: '50%', width: size, height: size, cursor: "pointer"}}
        />
    );
};

export default Gravatar;