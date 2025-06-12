import React from "react";

interface SvgProps {
  width?: string;
  height?: string;
  className?: string;
}

const RocketIcon: React.FC<SvgProps> = ({
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
    <path d="M12 1l8 10h-6v12h-4V11H4l8-10zm0 4l-4 5h2v8h4v-8h2l-4-5z" />
    <path d="M4 20h16v2H4v-2z" />
  </svg>
);

export default RocketIcon;
