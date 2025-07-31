import type { PlacedIcon } from '../components/Canvas/tabletTemplates';

// Action types for icon operations
export type IconActionType = 
  | 'PLACE_ICON'
  | 'REPLACE_ICON' 
  | 'MOVE_ICON'
  | 'SWAP_ICONS'
  | 'UNDO'
  | 'REDO';

// Action interfaces
export interface PlaceIconAction {
  type: 'PLACE_ICON';
  payload: {
    row: number;
    col: number;
    iconData: {
      id: number;
      name: string;
      url: string;
    };
  };
}

export interface ReplaceIconAction {
  type: 'REPLACE_ICON';
  payload: {
    row: number;
    col: number;
    iconData: {
      id: number;
      name: string;
      url: string;
    };
    previousIcon: PlacedIcon;
  };
}

export interface MoveIconAction {
  type: 'MOVE_ICON';
  payload: {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
    iconData: PlacedIcon;
  };
}

export interface SwapIconsAction {
  type: 'SWAP_ICONS';
  payload: {
    sourceIcon: {
      row: number;
      col: number;
      data: PlacedIcon;
    };
    targetIcon: {
      row: number;
      col: number;
      data: PlacedIcon;
    };
  };
}

export interface UndoAction {
  type: 'UNDO';
}

export interface RedoAction {
  type: 'REDO';
}

// Union type for all actions
export type IconAction = 
  | PlaceIconAction 
  | ReplaceIconAction 
  | MoveIconAction 
  | SwapIconsAction 
  | UndoAction 
  | RedoAction;

// Action creators
export const iconActions = {
  placeIcon: (row: number, col: number, iconData: { id: number; name: string; url: string }): PlaceIconAction => ({
    type: 'PLACE_ICON',
    payload: { row, col, iconData }
  }),

  replaceIcon: (row: number, col: number, iconData: { id: number; name: string; url: string }, previousIcon: PlacedIcon): ReplaceIconAction => ({
    type: 'REPLACE_ICON',
    payload: { row, col, iconData, previousIcon }
  }),

  moveIcon: (fromRow: number, fromCol: number, toRow: number, toCol: number, iconData: PlacedIcon): MoveIconAction => ({
    type: 'MOVE_ICON',
    payload: { fromRow, fromCol, toRow, toCol, iconData }
  }),

  swapIcons: (
    sourceIcon: { row: number; col: number; data: PlacedIcon },
    targetIcon: { row: number; col: number; data: PlacedIcon }
  ): SwapIconsAction => ({
    type: 'SWAP_ICONS',
    payload: { sourceIcon, targetIcon }
  }),

  undo: (): UndoAction => ({ type: 'UNDO' }),

  redo: (): RedoAction => ({ type: 'REDO' })
};
