// components/HoverableText.tsx
import React, { createRef, useEffect, useState } from "react";

interface HoverableTextProps {
  text: string;
  context: string;
}

const HoverableText: React.FC<HoverableTextProps> = ({ text, context }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverboxRef = createRef<HTMLDivElement>();
  const [positionOffsets, setPositionOffsets] = useState({ top: 0, left: 0 });

  const handleOverflow = () => {
    if (!hoverboxRef.current) return;
  
    const bounding = hoverboxRef.current.getBoundingClientRect();
    let topOffset = 0;
    let leftOffset = 0;
  
    if (bounding.top < 0) {
      // Top is out of viewport
      topOffset = -bounding.top;
    }
  
    if (bounding.left < 0) {
      // Left side is out of viewoprt
      leftOffset = -bounding.left;
    }
  
    if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
      // Bottom is out of viewport
      topOffset = (window.innerHeight || document.documentElement.clientHeight) - bounding.bottom;
    }
  
    if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
      // Right is out of viewport
      leftOffset = (window.innerWidth || document.documentElement.clientWidth) - bounding.right;
    }
  
    setPositionOffsets({ top: topOffset, left: leftOffset });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    handleOverflow();
  };

  return (
    <span
      className="relative cursor-help border-b border-dotted border-current inline-block"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <div
        ref={hoverboxRef}
        className="absolute bg-white dark:bg-black border border-gray-300 p-2 rounded shadow text-sm z-10 w-48 font-normal"
        style={{
            opacity: isHovered ? 1 : 0,
            transform: `translate(${positionOffsets.left}px, ${positionOffsets.top}px)`,
            transition: 'opacity 0.3s',
        }}
      >
        {context}
      </div>
    </span>
  );
};

export default HoverableText;
