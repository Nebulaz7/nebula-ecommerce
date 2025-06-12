import React from "react";

interface SvgProps {
  width?: string;
  height?: string;
  className?: string;
}

const SecurityIcon: React.FC<SvgProps> = ({
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
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C14.8,12.4 14.4,13 13.5,13H10.5C9.6,13 9.2,12.4 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V10.8H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
  </svg>
);

export default SecurityIcon;
