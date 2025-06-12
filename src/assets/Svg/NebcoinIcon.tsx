import React from "react";

interface SvgProps {
  width?: string;
  height?: string;
  className?: string;
}

const NebcoinIcon: React.FC<SvgProps> = ({
  width = "24",
  height = "24",
  className = "",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zm-7 3.5L12 14l3.5-2.5L12 18.5 8.5 11.5z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export default NebcoinIcon;
