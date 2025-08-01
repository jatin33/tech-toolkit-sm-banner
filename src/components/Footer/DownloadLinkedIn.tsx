import React, { useState } from 'react'
import { exportCanvasToImage, downloadBlob, EXPORT_CONFIGS } from '../../utils/canvasExport'
import type { PlacedIcon } from '../Canvas/tabletTemplates'
import { DEFAULT_TEMPLATE } from '../Canvas/tabletTemplates'
import { usePostHog } from 'posthog-js/react';

type Props = {
    imageUrl: string;
    placedIcons: PlacedIcon[];
    disabled?: boolean;
};

function DownloadLinkedIn({ imageUrl, placedIcons, disabled = false }: Props) {
    const [isExporting, setIsExporting] = useState(false);
    const posthog = usePostHog();

    const handleDownload = async () => {
        if (disabled || isExporting) return;
        
        setIsExporting(true);
        posthog.capture('linkedin_download_clicked', {
            button_name: 'Download for Twitter',
            page: 'homepage'
        });

        try {
            const result = await exportCanvasToImage(
                placedIcons,
                DEFAULT_TEMPLATE,
                EXPORT_CONFIGS.linkedin
            );
            
            if (result.success && result.blob) {
                downloadBlob(result.blob, EXPORT_CONFIGS.linkedin.filename);
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
            title={disabled ? 'Fill all 8 grid positions to download' : 'Download LinkedIn banner'}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            {isExporting ? 'Exporting...' : 'Download for LinkedIn'}
        </button>
    )
}

export default DownloadLinkedIn
