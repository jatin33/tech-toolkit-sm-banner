/**
 * loads the template image
 * 
 * setup drag and drop in the image part
 * 
 */
import React, { useRef, useEffect } from 'react';
import DropZoneGrid from '../Canvas/DropZoneGrid';
import TabletPlaceholder from '../Canvas/TabletPlaceholder';
import { DEFAULT_TEMPLATE } from '../Canvas/tabletTemplates';
import { useIconHistory } from '../../hooks/useIconHistory';
import type { PlacedIcon } from '../Canvas/tabletTemplates';

interface CanvasProps {
  onIconsChange?: (icons: PlacedIcon[]) => void;
  onHistoryChange?: (canUndo: boolean, canRedo: boolean, undo: () => void, redo: () => void) => void;
}

function Canvas({ onIconsChange, onHistoryChange }: CanvasProps) {
  const {
    placedIcons,
    canUndo,
    canRedo,
    placeIcon,
    replaceIcon,
    moveIcon,
    swapIcons,
    undo,
    redo
  } = useIconHistory();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const template = DEFAULT_TEMPLATE;

  // Notify parent of icon changes
  useEffect(() => {
    onIconsChange?.(placedIcons);
  }, [placedIcons, onIconsChange]);

  // Notify parent of history changes
  useEffect(() => {
    onHistoryChange?.(canUndo, canRedo, undo, redo);
  }, [canUndo, canRedo, undo, redo, onHistoryChange]);

  // Calculate scale to fit image in container
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width - 32; // Account for padding
      const containerHeight = containerRect.height - 32;

      const scaleX = containerWidth / template.imageDimensions.width;
      const scaleY = containerHeight / template.imageDimensions.height;
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond original size

      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [template.imageDimensions]);

  // Initialize scale on mount
  useEffect(() => {
    setScale(0.6); // Start with a reasonable default scale
  }, []);

  const handleIconPlace = (row: number, col: number, dragData: any) => {
    // Handle dragging from within the grid (repositioning)
    if (dragData.isFromGrid) {
      const sourceRow = dragData.sourceRow;
      const sourceCol = dragData.sourceCol;
      
      // If dropped on the same cell, do nothing
      if (sourceRow === row && sourceCol === col) {
        return;
      }

      // Find source icon
      const sourceIcon = placedIcons.find(
        icon => icon.gridPosition.row === sourceRow && icon.gridPosition.col === sourceCol
      );

      if (!sourceIcon) {
        return;
      }

      // Check if target cell is occupied
      const existingTargetIcon = placedIcons.find(
        icon => icon.gridPosition.row === row && icon.gridPosition.col === col
      );

      if (existingTargetIcon) {
        // Swap icons
        swapIcons(
          { row: sourceRow, col: sourceCol, data: sourceIcon },
          { row, col, data: existingTargetIcon }
        );
      } else {
        // Simple move to empty cell
        moveIcon(sourceRow, sourceCol, row, col, sourceIcon);
      }
      return;
    }

    // Handle dragging from sidebar (new placement or replacement)
    const existingIcon = placedIcons.find(
      icon => icon.gridPosition.row === row && icon.gridPosition.col === col
    );

    // If cell is occupied, replace the existing icon
    if (existingIcon) {
      replaceIcon(row, col, dragData, existingIcon);
      return;
    }

    // Check if we've reached the maximum number of icons
    if (placedIcons.length >= template.maxIcons) {
      console.log('Maximum icons reached');
      return;
    }

    // Place new icon
    placeIcon(row, col, dragData);
  };

  const scaledImageDimensions = {
    width: template.imageDimensions.width * scale,
    height: template.imageDimensions.height * scale,
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4 bg-background-primary"
    >
      <div 
        className="relative bg-background-secondary rounded-lg overflow-hidden shadow-large"
        style={{
          width: scaledImageDimensions.width,
          height: scaledImageDimensions.height,
        }}
      >
        {/* Background content - either image or placeholder */}
        {!imageError ? (
          <img
            ref={imageRef}
            src={template.imageUrl}
            alt={template.name}
            className="w-full h-full object-contain"
            style={{
              width: scaledImageDimensions.width,
              height: scaledImageDimensions.height,
            }}
            onLoad={() => {
              console.log('Template image loaded successfully');
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.error('Failed to load template image:', e);
              console.error('Image URL:', template.imageUrl);
              setImageError(true);
            }}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="absolute inset-0">
            <TabletPlaceholder
              width={scaledImageDimensions.width}
              height={scaledImageDimensions.height}
              screenBounds={template.screenBounds}
            />
          </div>
        )}

        {/* Drop zone grid overlay - show when image loaded OR when using placeholder */}
        {(imageLoaded || imageError) && (
          <DropZoneGrid
            template={template}
            placedIcons={placedIcons}
            onIconPlace={handleIconPlace}
            scale={scale}
          />
        )}

        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background-secondary">
            <div className="text-text-secondary">Loading template...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Canvas;
