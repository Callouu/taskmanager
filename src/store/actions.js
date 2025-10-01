// Action Types
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const EDIT_COLUMN = 'EDIT_COLUMN';

// Dashboard Actions
export const ADD_DASHBOARD = 'ADD_DASHBOARD';
export const REMOVE_DASHBOARD = 'REMOVE_DASHBOARD';
export const EDIT_DASHBOARD = 'EDIT_DASHBOARD';
export const SELECT_DASHBOARD = 'SELECT_DASHBOARD';

// Action Creators
export const addCard = (columnId, title, description = "", priority = "medium") => ({
  type: ADD_CARD,
  payload: { columnId, title, description, priority }
});

export const removeCard = (cardId) => ({
  type: REMOVE_CARD,
  payload: { cardId }
});

export const moveCard = (sourceColId, destColId, cardId, index) => ({
  type: MOVE_CARD,
  payload: { sourceColId, destColId, cardId, index }
});

export const editCard = (cardId, title, description = "", priority = "medium") => ({
  type: EDIT_CARD,
  payload: { cardId, title, description, priority }
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

// Dashboard Action Creators
export const addDashboard = (name) => ({
  type: ADD_DASHBOARD,
  payload: { id: `dashboard-${Date.now()}`, name }
});

export const removeDashboard = (id) => ({
  type: REMOVE_DASHBOARD,
  payload: { id }
});

export const editDashboard = (id, name) => ({
  type: EDIT_DASHBOARD,
  payload: { id, name }
});

export const selectDashboard = (id) => ({
  type: SELECT_DASHBOARD,
  payload: { id }
});
