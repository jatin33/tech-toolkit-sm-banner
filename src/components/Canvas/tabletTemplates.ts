export interface TabletTemplate {
  id: string;
  name: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  screenBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  gridConfig: {
    rows: number;
    cols: number;
    padding: number;
    iconSize: number;
  };
  maxIcons: number;
  rotation?: number; // degrees, negative = counterclockwise
}

export interface PlacedIcon {
  id: string;
  techIconId: number;
  techIconName: string;
  techIconUrl: string;
  gridPosition: {
    row: number;
    col: number;
  };
  timestamp: number;
}

// Template for the provided tablet image
export const TABLET_TEMPLATES: Record<string, TabletTemplate> = {
  'default-tablet': {
    id: 'default-tablet',
    name: 'Standard Tablet',
    imageUrl: 'https://res.cloudinary.com/dvcl31tyv/image/upload/v1753773061/ChatGPT_Image_Jul_16_2025_12_45_30_PM_cjk3lz.png',
    imageDimensions: {
      width: 1536,
      height: 1024
    },
    screenBounds: {
      // Adjusted coordinates for tablet screen area
      // These are relative to the original image size (1536x1024)
      x: 196,      // Left edge of screen (moved right)
      y: 220,      // Top edge of screen (moved down)
      width: 280,  // Screen width (narrower)
      height: 412  // Screen height (shorter)
    },
    gridConfig: {
      rows: 4,        // 4 rows
      cols: 2,        // 2 columns = 8 total icons
      padding: 20,    // Space between icons
      iconSize: 80    // Size of each icon
    },
    maxIcons: 8,
    rotation: 1   // 10 degrees counterclockwise
  }
};

export const DEFAULT_TEMPLATE = TABLET_TEMPLATES['default-tablet'];
