import HoverableText from "@/components/hoverableText";
import React from 'react';

export const parseFormattedText = (input: string): Array<string | React.JSX.Element> => {
    const regex = /{{(hover|bold|link) text='(.*?)'( context='(.*?)')?( out='(.*?)')?}}/g;
    const parts: Array<string | React.JSX.Element> = [];
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(input)) !== null) {
      const [fullMatch, type, text, ,context, ,out] = match;
      const index = match.index;
  
      if (index > lastIndex) {
        parts.push(input.slice(lastIndex, index));
      }
  
      switch (type) {
        case 'hover':
          parts.push(<HoverableText key={text} text={text} context={context} />);
          break;
        case 'bold':
          parts.push(<span className="font-semibold" key={text}>{text}</span>);
          break;
        case 'link':
          parts.push(
            <a key={text} href={out} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          );
          break;
        default:
          break;
      }
  
      lastIndex = index + fullMatch.length;
    }
  
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }
  
    return parts;
};
