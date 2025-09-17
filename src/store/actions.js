// Action Types
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const EDIT_COLUMN = 'EDIT_COLUMN';

// Action Creators
export const addCard = (columnId, content) => ({
  type: ADD_CARD,
  payload: { columnId, content }
});

export const removeCard = (cardId) => ({
  type: REMOVE_CARD,
  payload: { cardId }
});

export const moveCard = (sourceColId, destColId, cardId, index) => ({
  type: MOVE_CARD,
  payload: { sourceColId, destColId, cardId, index }
});

export const editCard = (cardId, content) => ({
  type: EDIT_CARD,
  payload: { cardId, content }
});

export const addColumn = (title, description = "") => ({
  type: ADD_COLUMN,
  payload: { title, description }
});

export const removeColumn = (columnId) => ({
  type: REMOVE_COLUMN,
  payload: { columnId }
});

export const editColumn = (columnId, title) => ({
  type: EDIT_COLUMN,
  payload: { columnId, title }
});
