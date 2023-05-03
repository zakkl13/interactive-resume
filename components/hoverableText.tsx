// components/HoverableText.tsx
import React, { useState } from "react";

interface HoverableTextProps {
  text: string;
  context: string;
}

const HoverableText: React.FC<HoverableTextProps> = ({ text, context }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative cursor-help border-b border-dotted border-current inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {isHovered && (
        <div className="absolute bg-white border border-gray-300 p-2 rounded shadow text-sm z-10 w-48 font-normal">
          {context}
        </div>
      )}
    </span>
  );
};

export default HoverableText;
