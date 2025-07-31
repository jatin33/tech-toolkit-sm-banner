import DownloadTwitter from './DownloadTwitter';
import DownloadLinkedIn from './DownloadLinkedIn';
import type { PlacedIcon } from '../Canvas/tabletTemplates';

type Props = {
    onUndo: () => void;
    onRedo: () => void;
    imageUrl: string;
    placedIcons: PlacedIcon[];
    canUndo?: boolean;
    canRedo?: boolean;
};

function Footer({ onRedo, onUndo, imageUrl, placedIcons, canUndo = false, canRedo = false }: Props) {
    // Check if all 8 grid positions are filled
    const isGridFull = placedIcons.length === 8;
    return (<footer className="h-[70px] bg-[#1A1A1D] border-t border-[#55555A] flex items-center justify-between px-8">
        {/* Left side - empty for now */}
        <div className="flex-1"></div>

        {/* Center - Undo/Redo */}
        <div className="flex items-center gap-4">
            <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                    canUndo 
                        ? 'bg-[#2D2D3D] text-[#AAAAAA] border-[#55555A] hover:bg-[#3A3A3F] hover:text-white cursor-pointer' 
                        : 'bg-[#1A1A1D] text-[#555555] border-[#333333] cursor-not-allowed'
                }`}
                onClick={canUndo ? onUndo : undefined}
                disabled={!canUndo}
                title={canUndo ? 'Undo (Ctrl+Z)' : 'No actions to undo'}>
                <span className="text-lg">↶</span>
                <span className="text-sm font-medium">Undo</span>
            </button>
            <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                    canRedo 
                        ? 'bg-[#2D2D3D] text-[#AAAAAA] border-[#55555A] hover:bg-[#3A3A3F] hover:text-white cursor-pointer' 
                        : 'bg-[#1A1A1D] text-[#555555] border-[#333333] cursor-not-allowed'
                }`}
                onClick={canRedo ? onRedo : undefined}
                disabled={!canRedo}
                title={canRedo ? 'Redo (Ctrl+Y)' : 'No actions to redo'}>
                <span className="text-lg">↷</span>
                <span className="text-sm font-medium">Redo</span>
            </button>
        </div>

        {/* Right side - Download buttons */}
        <div className="flex-1 flex justify-end gap-3">
            <DownloadTwitter imageUrl={imageUrl} placedIcons={placedIcons} disabled={!isGridFull} />
            <DownloadLinkedIn imageUrl={imageUrl} placedIcons={placedIcons} disabled={!isGridFull} />
        </div>
    </footer>
    )
}

export default Footer
