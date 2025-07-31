interface TabletPlaceholderProps {
  width: number;
  height: number;
  screenBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

function TabletPlaceholder({ width, height, screenBounds }: TabletPlaceholderProps) {
  return (
    <svg width={width} height={height} className="w-full h-full">
      {/* Tablet background */}
      <rect
        x="200"
        y="50"
        width="1136"
        height="924"
        rx="60"
        fill="#2D2D32"
        stroke="#55555A"
        strokeWidth="4"
      />
      
      {/* Screen area */}
      <rect
        x={screenBounds.x}
        y={screenBounds.y}
        width={screenBounds.width}
        height={screenBounds.height}
        rx="20"
        fill="#1A1A1D"
        stroke="#007AFF"
        strokeWidth="2"
        strokeDasharray="8,4"
      />
      
      {/* Screen label */}
      <text
        x={screenBounds.x + screenBounds.width / 2}
        y={screenBounds.y + screenBounds.height / 2}
        textAnchor="middle"
        fill="#AAAAAA"
        fontSize="24"
        fontFamily="Inter, sans-serif"
      >
        Drop Zone
      </text>
      
      {/* Coordinates debug info */}
      <text
        x="20"
        y="30"
        fill="#AAAAAA"
        fontSize="16"
        fontFamily="Inter, sans-serif"
      >
        Screen: {screenBounds.x}, {screenBounds.y}, {screenBounds.width}×{screenBounds.height}
      </text>
    </svg>
  );
}

export default TabletPlaceholder;
