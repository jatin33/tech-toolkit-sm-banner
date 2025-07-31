import type { PlacedIcon, TabletTemplate } from '../components/Canvas/tabletTemplates';

export interface ExportOptions {
  width: number;
  height: number;
  backgroundColor?: string;
  scale?: number;
}

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  error?: string;
}

/**
 * Export the tablet mockup with placed icons as a high-quality image
 */
export async function exportCanvasToImage(
  placedIcons: PlacedIcon[],
  template: TabletTemplate,
  options: ExportOptions
): Promise<ExportResult> {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return { success: false, error: 'Canvas context not available' };
    }

    // Set high-resolution canvas
    const scale = options.scale || 2;
    canvas.width = options.width * scale;
    canvas.height = options.height * scale;
    
    // Scale context for high-DPI rendering
    ctx.scale(scale, scale);
    
    // Fill background if specified
    if (options.backgroundColor) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, options.width, options.height);
    }

    // Load and render tablet template image
    const tabletImage = await loadImage(template.imageUrl);
    
    // Calculate tablet scaling to fit within export dimensions
    const tabletAspectRatio = template.imageDimensions.width / template.imageDimensions.height;
    const exportAspectRatio = options.width / options.height;
    
    let tabletWidth, tabletHeight, tabletX, tabletY;
    
    if (tabletAspectRatio > exportAspectRatio) {
      // Tablet is wider than export area - fit by width
      tabletWidth = options.width * 0.8; // Leave some margin
      tabletHeight = tabletWidth / tabletAspectRatio;
    } else {
      // Tablet is taller than export area - fit by height
      tabletHeight = options.height * 0.8; // Leave some margin
      tabletWidth = tabletHeight * tabletAspectRatio;
    }
    
    // Center the tablet
    tabletX = (options.width - tabletWidth) / 2;
    tabletY = (options.height - tabletHeight) / 2;
    
    // Draw tablet mockup
    ctx.drawImage(tabletImage, tabletX, tabletY, tabletWidth, tabletHeight);
    
    // Calculate scaling factors for icons
    const scaleX = tabletWidth / template.imageDimensions.width;
    const scaleY = tabletHeight / template.imageDimensions.height;
    
    // Load and render all tech icons
    const iconPromises = placedIcons.map(async (placedIcon) => {
      const iconImage = await loadImage(placedIcon.techIconUrl);
      
      // Calculate icon position based on grid
      const { row, col } = placedIcon.gridPosition;
      const { gridConfig, screenBounds } = template;
      
      // Calculate icon position within the screen bounds
      const iconX = screenBounds.x + (col * (gridConfig.iconSize + gridConfig.padding)) + gridConfig.padding;
      const iconY = screenBounds.y + (row * (gridConfig.iconSize + gridConfig.padding)) + gridConfig.padding;
      
      // Scale and position relative to tablet placement
      const scaledIconX = tabletX + (iconX * scaleX);
      const scaledIconY = tabletY + (iconY * scaleY);
      const scaledIconSize = gridConfig.iconSize * Math.min(scaleX, scaleY);
      
      return { iconImage, x: scaledIconX, y: scaledIconY, size: scaledIconSize };
    });
    
    const iconData = await Promise.all(iconPromises);
    
    // Draw all icons
    iconData.forEach(({ iconImage, x, y, size }) => {
      ctx.drawImage(iconImage, x, y, size, size);
    });
    
    // Convert canvas to blob
    return new Promise<ExportResult>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ success: true, blob });
        } else {
          resolve({ success: false, error: 'Failed to create image blob' });
        }
      }, 'image/png', 1.0);
    });
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown export error'
    };
  }
}

/**
 * Load an image and return a Promise that resolves with the HTMLImageElement
 */
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS for external images
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    
    img.src = url;
  });
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to document, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

/**
 * Platform-specific export configurations
 */
export const EXPORT_CONFIGS = {
  twitter: {
    width: 1500,
    height: 500,
    backgroundColor: '#1A1A1D',
    filename: 'my-tech-toolkit-twitter-banner.png'
  },
  linkedin: {
    width: 1584,
    height: 396,
    backgroundColor: '#1A1A1D',
    filename: 'my-tech-toolkit-linkedin-banner.png'
  }
} as const;
