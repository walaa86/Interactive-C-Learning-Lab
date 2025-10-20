
import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 18, className }) => {
  return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
};

export default Icon;
