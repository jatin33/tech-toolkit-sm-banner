import React from 'react';
import type { PlacedIcon } from './tabletTemplates';

interface GridCellProps {
  row: number;
  col: number;
  x: number;
  y: number;
  size: number;
  placedIcon?: PlacedIcon;
  isHighlighted: boolean;
  onDrop: (row: number, col: number, dragData: any) => void;
  onDragOver: (row: number, col: number) => void;
  onDragLeave: () => void;
  onIconRemove?: (row: number, col: number) => void;
}

function GridCell({ 
  row, 
  col, 
  x, 
  y, 
  size, 
  placedIcon, 
  isHighlighted, 
  onDrop, 
  onDragOver,
  onDragLeave,
}: GridCellProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(row, col);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeave();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      onDrop(row, col, dragData);
    } catch (error) {
      console.error('Failed to parse drag data:', error);
    }
  };

  const handleIconDragStart = (e: React.DragEvent) => {
    if (!placedIcon) return;
    
    const dragData = {
      id: placedIcon.techIconId,
      name: placedIcon.techIconName,
      url: placedIcon.techIconUrl,
      isFromGrid: true,
      sourceRow: row,
      sourceCol: col,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
  };

  return (
    <div
      className={`
        absolute border-2 border-dashed rounded-lg transition-all duration-200
        ${isHighlighted 
          ? 'border-primary-500 bg-primary-500/20' 
          : placedIcon 
            ? 'border-transparent' 
            : 'border-gray-400/30 hover:border-primary-400/50'
        }
      `}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {placedIcon && (
        <div 
          className="w-full h-full flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-md border border-white/20 cursor-grab hover:bg-white/20 transition-all"
          draggable
          onDragStart={handleIconDragStart}
        >
          <div className="flex items-center justify-center mb-1" style={{ width: '60%', height: '60%' }}>
            <img 
              src={placedIcon.techIconUrl} 
              alt={placedIcon.techIconName}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
          <span className="text-white text-xs text-center leading-tight px-1 font-medium pointer-events-none">
            {placedIcon.techIconName}
          </span>
        </div>
      )}
    </div>
  );
}

export default GridCell;
