import { useReducer, useCallback, useEffect } from 'react';
import { iconReducer, initialHistoryState } from '../utils/iconReducer';
import { iconActions } from '../utils/iconActions';
import type { PlacedIcon } from '../components/Canvas/tabletTemplates';

export interface UseIconHistoryReturn {
  placedIcons: PlacedIcon[];
  canUndo: boolean;
  canRedo: boolean;
  historyLength: number;
  placeIcon: (row: number, col: number, iconData: { id: number; name: string; url: string }) => void;
  replaceIcon: (row: number, col: number, iconData: { id: number; name: string; url: string }, previousIcon: PlacedIcon) => void;
  moveIcon: (fromRow: number, fromCol: number, toRow: number, toCol: number, iconData: PlacedIcon) => void;
  swapIcons: (sourceIcon: { row: number; col: number; data: PlacedIcon }, targetIcon: { row: number; col: number; data: PlacedIcon }) => void;
  undo: () => void;
  redo: () => void;
}

export function useIconHistory(): UseIconHistoryReturn {
  const [state, dispatch] = useReducer(iconReducer, initialHistoryState);

  // Action creators wrapped with dispatch
  const placeIcon = useCallback((
    row: number, 
    col: number, 
    iconData: { id: number; name: string; url: string }
  ) => {
    dispatch(iconActions.placeIcon(row, col, iconData));
  }, []);

  const replaceIcon = useCallback((
    row: number, 
    col: number, 
    iconData: { id: number; name: string; url: string },
    previousIcon: PlacedIcon
  ) => {
    dispatch(iconActions.replaceIcon(row, col, iconData, previousIcon));
  }, []);

  const moveIcon = useCallback((
    fromRow: number, 
    fromCol: number, 
    toRow: number, 
    toCol: number, 
    iconData: PlacedIcon
  ) => {
    dispatch(iconActions.moveIcon(fromRow, fromCol, toRow, toCol, iconData));
  }, []);

  const swapIcons = useCallback((
    sourceIcon: { row: number; col: number; data: PlacedIcon },
    targetIcon: { row: number; col: number; data: PlacedIcon }
  ) => {
    dispatch(iconActions.swapIcons(sourceIcon, targetIcon));
  }, []);

  const undo = useCallback(() => {
    dispatch(iconActions.undo());
  }, []);

  const redo = useCallback(() => {
    dispatch(iconActions.redo());
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Check for Mac (metaKey) or Windows/Linux (ctrlKey)
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;

      if (isModifierPressed && !event.shiftKey && !event.altKey) {
        if (event.key === 'z' || event.key === 'Z') {
          event.preventDefault();
          undo();
        } else if (event.key === 'y' || event.key === 'Y') {
          event.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [undo, redo]);

  return {
    placedIcons: state.present,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historyLength: state.past.length,
    placeIcon,
    replaceIcon,
    moveIcon,
    swapIcons,
    undo,
    redo
  };
}
