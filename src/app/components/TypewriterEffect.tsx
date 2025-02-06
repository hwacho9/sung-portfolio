"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
}

export default function TypewriterEffect({
  text,
  speed = 50,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
