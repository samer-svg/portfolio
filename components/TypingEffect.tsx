import { useState, useEffect } from "react";

const roles = [
  "Frontend Developer",
  "UI Enthusiast",
  "React Specialist",
];

export function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
      {`${roles[index].substring(0, subIndex)} `}
      <span className="border-r-2 border-blue-400 animate-pulse" />
    </span>
  );
} 