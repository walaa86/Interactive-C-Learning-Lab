import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 18, className }) => {
  // By adding a `key` that changes with the `name`, we ensure React replaces the
  // DOM element entirely instead of trying to update it. This is crucial for
  // avoiding conflicts with external libraries like Lucide that manipulate the DOM directly.
  return <i key={name} data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
};

export default Icon;
