import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';

// Initial dashboards state
const initialDashboardsState = {
  dashboards: [
    { id: 'dashboard-1', name: 'My First Dashboard' }
  ],
  selectedDashboardId: 'dashboard-1',
  // Store board states for each dashboard
  boardStates: {
    'dashboard-1': {
      columns: [
        {
          id: 'col-1',
          title: 'To Do',
          cardIds: ['card-1', 'card-2']
        },
        {
          id: 'col-2',
          title: 'In Progress',
          cardIds: ['card-3']
        },
        {
          id: 'col-3',
          title: 'Done',
          cardIds: []
        }
      ],
      cards: {
        'card-1': {
          id: 'card-1',
          title: 'Task 1',
          description: 'Test',
          priority: 'medium',
          createdAt: '2025-09-19T09:17:00.000Z'
        },
        'card-2': {
          id: 'card-2',
          title: 'Task 2',
          description: '',
          priority: 'medium',
          createdAt: '2025-09-19T09:17:00.000Z'
        },
        'card-3': {
          id: 'card-3',
          title: 'Task 3',
          description: '',
          priority: 'medium',
          createdAt: '2025-09-19T09:17:00.000Z'
        }
      }
    }
  }
};

function dashboardsReducer(state = initialDashboardsState, action) {
  switch (action.type) {
    case 'ADD_DASHBOARD': {
      const newDashboard = action.payload;
      // Create a new board state for the new dashboard
      const newBoardState = {
        columns: [],
        cards: {}
      };
      return {
        ...state,
        dashboards: [...state.dashboards, newDashboard],
        boardStates: {
          ...state.boardStates,
          [newDashboard.id]: newBoardState
        },
        selectedDashboardId: newDashboard.id // Select the newly created dashboard
      };
    }
    case 'REMOVE_DASHBOARD': {
      const { id } = action.payload;
      const updatedDashboards = state.dashboards.filter(dashboard => dashboard.id !== id);
      
      // If we're removing the selected dashboard, select the first one
      let newSelectedId = state.selectedDashboardId;
      if (state.selectedDashboardId === id) {
        newSelectedId = updatedDashboards.length > 0 ? updatedDashboards[0].id : null;
      }
      
      return {
        ...state,
        dashboards: updatedDashboards,
        selectedDashboardId: newSelectedId
      };
    }
    case 'EDIT_DASHBOARD': {
      const { id, name } = action.payload;
      return {
        ...state,
        dashboards: state.dashboards.map(dashboard =>
          dashboard.id === id ? { ...dashboard, name } : dashboard
        )
      };
    }
    case 'SELECT_DASHBOARD': {
      const { id } = action.payload;
      return {
        ...state,
        selectedDashboardId: id
      };
    }
    case 'ADD_CARD': {
      const { columnId, title, description, priority } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const newCardId = `card-${Date.now()}`;
      const updatedBoardState = {
        ...boardState,
        columns: boardState.columns.map(col =>
          col.id === columnId
            ? { ...col, cardIds: [...col.cardIds, newCardId] }
            : col
        ),
        cards: {
          ...boardState.cards,
          [newCardId]: {
            id: newCardId,
            title,
            description,
            priority,
            createdAt: new Date().toISOString()
          }
        }
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'REMOVE_CARD': {
      const { cardId } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const updatedBoardState = {
        ...boardState,
        columns: boardState.columns.map(col => ({
          ...col,
          cardIds: col.cardIds.filter(id => id !== cardId)
        })),
        cards: Object.fromEntries(
          Object.entries(boardState.cards).filter(([id]) => id !== cardId)
        )
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'MOVE_CARD': {
      const { sourceColId, destColId, cardId, index } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const sourceCol = boardState.columns.find(col => col.id === sourceColId);
      const destCol = boardState.columns.find(col => col.id === destColId);
      // Remove from source column
      const newSourceCardIds = sourceCol.cardIds.filter(id => id !== cardId);
      // Add to destination column at specified index
      const newDestCardIds = [...destCol.cardIds];
      newDestCardIds.splice(index, 0, cardId);
      
      const updatedBoardState = {
        ...boardState,
        columns: boardState.columns.map(col => {
          if (col.id === sourceColId) return { ...col, cardIds: newSourceCardIds };
          if (col.id === destColId) return { ...col, cardIds: newDestCardIds };
          return col;
        })
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'EDIT_CARD': {
      const { cardId, title, description, priority } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const updatedBoardState = {
        ...boardState,
        cards: {
          ...boardState.cards,
          [cardId]: {
            ...boardState.cards[cardId],
            title,
            description,
            priority
          }
        }
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'ADD_COLUMN': {
      const { title, description } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const newColId = `col-${Date.now()}`;
      const updatedBoardState = {
        ...boardState,
        columns: [
          ...boardState.columns,
          {
            id: newColId,
            title,
            description,
            cardIds: []
          }
        ]
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'REMOVE_COLUMN': {
      const { columnId } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const column = boardState.columns.find(col => col.id === columnId);
      const cardsToRemove = column.cardIds;
      const remainingCards = Object.fromEntries(
        Object.entries(boardState.cards).filter(([id]) => !cardsToRemove.includes(id))
      );
      
      const updatedBoardState = {
        ...boardState,
        columns: boardState.columns.filter(col => col.id !== columnId),
        cards: remainingCards
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    case 'EDIT_COLUMN': {
      const { columnId, title } = action.payload;
      const selectedDashboardId = state.selectedDashboardId;
      const boardStates = state.boardStates;
      
      // Check if boardState exists for the selected dashboard
      if (!boardStates || !boardStates[selectedDashboardId]) {
        return state; // Return state unchanged if boardState doesn't exist
      }
      
      const boardState = boardStates[selectedDashboardId];
      
      const updatedBoardState = {
        ...boardState,
        columns: boardState.columns.map(col =>
          col.id === columnId ? { ...col, title } : col
        )
      };
      
      return {
        ...state,
        boardStates: {
          ...state.boardStates,
          [selectedDashboardId]: updatedBoardState
        }
      };
    }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  tasks: tasksReducer,
  dashboards: dashboardsReducer
});

export default rootReducer;
