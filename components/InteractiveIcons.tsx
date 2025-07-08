import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const icons = [
  {
    href: "https://github.com/samer-svg",
    icon: Github,
    label: "GitHub",
    color: "hover:text-white",
  },
  {
    href: "https://www.linkedin.com/in/samer-al-yaghn-2a6b69234",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
  {
    href: "mailto:sameralyaghn547@gmail.com",
    icon: Mail,
    label: "Email",
    color: "hover:text-pink-600",
  },
];

export function InteractiveIcons({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      {icons.map((social, index) => (
        <Link
          key={social.href + index}
          href={social.href}
          className={`relative group text-gray-400 rounded-full p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 ${social.color}`.replace('hover:bg-white', '')}
          target={social.href.startsWith('http') ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={`Visit my ${social.label} profile`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <social.icon className={`w-7 h-7 ${hovered === index ? "animate-bounce" : ""}`} />
        </Link>
      ))}
    </div>
  );
} 