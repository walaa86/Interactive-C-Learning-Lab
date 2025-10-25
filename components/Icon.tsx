import React, { useMemo } from 'react';

// Declare the structure of the global `lucide` object for TypeScript.
declare global {
  interface Window {
    lucide?: {
      icons: {
        // Structure: [tagName, attributes, children]
        // Children: [[tagName, attributes], ...]
        [key: string]: [string, { [key: string]: any }, Array<[string, { [key: string]: any }]>]
      }
    };
  }
}


interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

/**
 * Creates an SVG string from a lucide icon node.
 * This is a more performant and React-friendly way to use lucide icons
 * from a UMD script, as it avoids the global `createIcons()` DOM scan.
 */
const createIconSvgString = (name: string, size: number, className?: string): string => {
  // Ensure we are on the client-side where `window` is available
  if (typeof window === 'undefined' || !window.lucide?.icons) {
    return '';
  }

  const iconNode = window.lucide.icons[name];
  if (!iconNode) {
    console.warn(`[Icon] Lucide icon "${name}" not found.`);
    return '';
  }

  const [tag, defaultAttrs, children] = iconNode;

  // Combine attributes, letting props override defaults.
  // The className from props is added to any existing classes.
  const attrs = {
    ...defaultAttrs,
    width: size,
    height: size,
    class: [defaultAttrs.class, className].filter(Boolean).join(' '),
  };

  const attrsString = Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  
  // Create self-closing tags for SVG elements like <path />
  const childrenString = children
    .map(([childTag, childAttrs]) => {
      const childAttrsString = Object.entries(childAttrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${childTag} ${childAttrsString}/>`;
    })
    .join('');

  return `<${tag} ${attrsString}>${childrenString}</${tag}>`;
};

const Icon: React.FC<IconProps> = ({ name, size = 18, className }) => {
  const svgHtml = useMemo(() => {
    return { __html: createIconSvgString(name, size, className) };
  }, [name, size, className]);

  // Use a span as a wrapper for the SVG.
  // `dangerouslySetInnerHTML` is safe here because we are constructing the SVG
  // from trusted data (the lucide library) and not from user input.
  return <span dangerouslySetInnerHTML={svgHtml} />;
};

export default Icon;