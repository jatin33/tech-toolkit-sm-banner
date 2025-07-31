import React, { useState } from 'react'
import { exportCanvasToImage, downloadBlob, EXPORT_CONFIGS } from '../../utils/canvasExport'
import type { PlacedIcon } from '../Canvas/tabletTemplates'
import { DEFAULT_TEMPLATE } from '../Canvas/tabletTemplates'

type Props = {
    imageUrl: string;
    placedIcons: PlacedIcon[];
    disabled?: boolean;
};

function DownloadTwitter({ imageUrl, placedIcons, disabled = false }: Props) {
    const [isExporting, setIsExporting] = useState(false);
    
    const handleDownload = async () => {
        if (disabled || isExporting) return;
        
        setIsExporting(true);
        
        try {
            const result = await exportCanvasToImage(
                placedIcons,
                DEFAULT_TEMPLATE,
                EXPORT_CONFIGS.twitter
            );
            
            if (result.success && result.blob) {
                downloadBlob(result.blob, EXPORT_CONFIGS.twitter.filename);
            } else {
                console.error('Export failed:', result.error);
                // TODO: Add user-facing error notification
            }
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsExporting(false);
        }
    };
    
    return (
        <button 
            onClick={handleDownload}
            disabled={disabled || isExporting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                disabled 
                    ? 'bg-[#333333] text-[#666666] cursor-not-allowed' 
                    : 'bg-[#007AFF] text-white hover:bg-[#0066CC] cursor-pointer'
            }`}
            title={disabled ? 'Fill all 8 grid positions to download' : 'Download Twitter banner'}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            {isExporting ? 'Exporting...' : 'Download for Twitter'}
        </button>
    )
}

export default DownloadTwitter
