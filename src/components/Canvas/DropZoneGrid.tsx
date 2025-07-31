import React, { useState } from 'react';
import GridCell from './GridCell';
import type { TabletTemplate, PlacedIcon } from './tabletTemplates';

interface DropZoneGridProps {
  template: TabletTemplate;
  placedIcons: PlacedIcon[];
  onIconPlace: (row: number, col: number, dragData: any) => void;
  scale: number;
}

function DropZoneGrid({ template, placedIcons, onIconPlace, scale }: DropZoneGridProps) {
  const [highlightedCell, setHighlightedCell] = useState<{row: number, col: number} | null>(null);

  const { screenBounds, gridConfig, rotation = 0 } = template;
  const { rows, cols, padding, iconSize } = gridConfig;

  // Calculate scaled dimensions
  const scaledScreenBounds = {
    x: screenBounds.x * scale,
    y: screenBounds.y * scale,
    width: screenBounds.width * scale,
    height: screenBounds.height * scale,
  };

  // Calculate transform origin (center of the screen bounds)
  const transformOrigin = {
    x: scaledScreenBounds.x + (scaledScreenBounds.width / 2),
    y: scaledScreenBounds.y + (scaledScreenBounds.height / 2),
  };

  const scaledIconSize = iconSize * scale;
  const scaledPadding = padding * scale;

  // Calculate available space for grid
  const availableWidth = scaledScreenBounds.width - (scaledPadding * 2);
  const availableHeight = scaledScreenBounds.height - (scaledPadding * 2);

  // Calculate cell spacing
  const cellSpacingX = (availableWidth - (cols * scaledIconSize)) / Math.max(1, cols - 1);
  const cellSpacingY = (availableHeight - (rows * scaledIconSize)) / Math.max(1, rows - 1);

  // Create grid cells
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = scaledScreenBounds.x + scaledPadding + (col * (scaledIconSize + cellSpacingX));
      const y = scaledScreenBounds.y + scaledPadding + (row * (scaledIconSize + cellSpacingY));

      // Find placed icon for this cell
      const placedIcon = placedIcons.find(
        icon => icon.gridPosition.row === row && icon.gridPosition.col === col
      );

      const isHighlighted = highlightedCell?.row === row && highlightedCell?.col === col;

      cells.push(
        <GridCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          x={x}
          y={y}
          size={scaledIconSize}
          placedIcon={placedIcon}
          isHighlighted={isHighlighted}
          onDrop={onIconPlace}
          onDragOver={(row, col) => setHighlightedCell({ row, col })}
          onDragLeave={() => setHighlightedCell(null)}
        />
      );
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full">
        {/* Grid cells */}
        <div 
          className="pointer-events-auto"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
          }}
        >
          {cells}
        </div>
        
        {/* Debug overlay - shows tablet screen boundaries in development */}
        {/* {import.meta.env.DEV && (
          <div
            className="absolute border-2 border-red-500/50 pointer-events-none"
            style={{
              left: scaledScreenBounds.x,
              top: scaledScreenBounds.y,
              width: scaledScreenBounds.width,
              height: scaledScreenBounds.height,
            }}
          />
        )} */}
      </div>
    </div>
  );
}

export default DropZoneGrid;
