import type { PlacedIcon } from '../components/Canvas/tabletTemplates';
import type { IconAction } from './iconActions';

// History state structure
export interface HistoryState {
  past: PlacedIcon[][];
  present: PlacedIcon[];
  future: PlacedIcon[][];
}

// Maximum history entries to prevent memory issues
const MAX_HISTORY_SIZE = 50;

// Initial state
export const initialHistoryState: HistoryState = {
  past: [],
  present: [],
  future: []
};

// Helper function to create a new PlacedIcon
function createPlacedIcon(
  iconData: { id: number; name: string; url: string },
  row: number,
  col: number
): PlacedIcon {
  return {
    id: `${iconData.id}-${Date.now()}`,
    techIconId: iconData.id,
    techIconName: iconData.name,
    techIconUrl: iconData.url,
    gridPosition: { row, col },
    timestamp: Date.now()
  };
}

// Helper function to limit history size
function limitHistorySize(history: PlacedIcon[][]): PlacedIcon[][] {
  if (history.length > MAX_HISTORY_SIZE) {
    return history.slice(-MAX_HISTORY_SIZE);
  }
  return history;
}

// Main reducer function
export function iconReducer(state: HistoryState, action: IconAction): HistoryState {
  switch (action.type) {
    case 'PLACE_ICON': {
      const { row, col, iconData } = action.payload;
      
      // Check if position is already occupied
      const existingIcon = state.present.find(
        icon => icon.gridPosition.row === row && icon.gridPosition.col === col
      );
      
      if (existingIcon) {
        // This shouldn't happen with PLACE_ICON, but handle gracefully
        return state;
      }
      
      const newIcon = createPlacedIcon(iconData, row, col);
      const newPresent = [...state.present, newIcon];
      
      return {
        past: limitHistorySize([...state.past, state.present]),
        present: newPresent,
        future: [] // Clear future when new action is performed
      };
    }

    case 'REPLACE_ICON': {
      const { row, col, iconData } = action.payload;
      
      const newIcon = createPlacedIcon(iconData, row, col);
      const newPresent = state.present.map(icon =>
        icon.gridPosition.row === row && icon.gridPosition.col === col
          ? newIcon
          : icon
      );
      
      return {
        past: limitHistorySize([...state.past, state.present]),
        present: newPresent,
        future: []
      };
    }

    case 'MOVE_ICON': {
      const { fromRow, fromCol, toRow, toCol } = action.payload;
      
      // Check if target position is occupied
      const targetIcon = state.present.find(
        icon => icon.gridPosition.row === toRow && icon.gridPosition.col === toCol
      );
      
      if (targetIcon) {
        // This should be handled by SWAP_ICONS instead
        return state;
      }
      
      const newPresent = state.present.map(icon =>
        icon.gridPosition.row === fromRow && icon.gridPosition.col === fromCol
          ? { ...icon, gridPosition: { row: toRow, col: toCol } }
          : icon
      );
      
      return {
        past: limitHistorySize([...state.past, state.present]),
        present: newPresent,
        future: []
      };
    }

    case 'SWAP_ICONS': {
      const { sourceIcon, targetIcon } = action.payload;
      
      const newPresent = state.present.map(icon => {
        if (icon.gridPosition.row === sourceIcon.row && icon.gridPosition.col === sourceIcon.col) {
          return { ...icon, gridPosition: { row: targetIcon.row, col: targetIcon.col } };
        }
        if (icon.gridPosition.row === targetIcon.row && icon.gridPosition.col === targetIcon.col) {
          return { ...icon, gridPosition: { row: sourceIcon.row, col: sourceIcon.col } };
        }
        return icon;
      });
      
      return {
        past: limitHistorySize([...state.past, state.present]),
        present: newPresent,
        future: []
      };
    }

    case 'UNDO': {
      if (state.past.length === 0) {
        return state;
      }
      
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      };
    }

    case 'REDO': {
      if (state.future.length === 0) {
        return state;
      }
      
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      };
    }

    default:
      return state;
  }
}
