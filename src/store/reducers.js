import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';

function boardReducer(state = {
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
      createdAt: '2025-09-19T09:17:00.000Z'
    },
    'card-2': {
      id: 'card-2',
      title: 'Task 2',
      description: '',
      createdAt: '2025-09-19T09:17:00.000Z'
    },
    'card-3': {
      id: 'card-3',
      title: 'Task 3',
      description: '',
      createdAt: '2025-09-19T09:17:00.000Z'
    }
  }
}, action) {
  switch (action.type) {
    case 'ADD_CARD': {
      const { columnId, title, description } = action.payload;
      const newCardId = `card-${Date.now()}`;
      return {
        ...state,
        columns: state.columns.map(col =>
          col.id === columnId
            ? { ...col, cardIds: [...col.cardIds, newCardId] }
            : col
        ),
        cards: {
          ...state.cards,
          [newCardId]: {
            id: newCardId,
            title,
            description,
            createdAt: new Date().toISOString()
          }
        }
      };
    }
    case 'REMOVE_CARD': {
      const { cardId } = action.payload;
      return {
        ...state,
        columns: state.columns.map(col => ({
          ...col,
          cardIds: col.cardIds.filter(id => id !== cardId)
        })),
        cards: Object.fromEntries(
          Object.entries(state.cards).filter(([id]) => id !== cardId)
        )
      };
    }
    case 'MOVE_CARD': {
      const { sourceColId, destColId, cardId, index } = action.payload;
      const sourceCol = state.columns.find(col => col.id === sourceColId);
      const destCol = state.columns.find(col => col.id === destColId);
      // Remove from source column
      const newSourceCardIds = sourceCol.cardIds.filter(id => id !== cardId);
      // Add to destination column at specified index
      const newDestCardIds = [...destCol.cardIds];
      newDestCardIds.splice(index, 0, cardId);
      return {
        ...state,
        columns: state.columns.map(col => {
          if (col.id === sourceColId) return { ...col, cardIds: newSourceCardIds };
          if (col.id === destColId) return { ...col, cardIds: newDestCardIds };
          return col;
        })
      };
    }
    case 'EDIT_CARD': {
      const { cardId, title, description } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            title,
            description
          }
        }
      };
    }
    case 'ADD_COLUMN': {
      const { title, description } = action.payload;
      const newColId = `col-${Date.now()}`;
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: newColId,
            title,
            description,
            cardIds: []
          }
        ]
      };
    }
    case 'REMOVE_COLUMN': {
      const { columnId } = action.payload;
      const column = state.columns.find(col => col.id === columnId);
      const cardsToRemove = column.cardIds;
      const remainingCards = Object.fromEntries(
        Object.entries(state.cards).filter(([id]) => !cardsToRemove.includes(id))
      );
      return {
        ...state,
        columns: state.columns.filter(col => col.id !== columnId),
        cards: remainingCards
      };
    }
    case 'EDIT_COLUMN': {
      const { columnId, title } = action.payload;
      return {
        ...state,
        columns: state.columns.map(col =>
          col.id === columnId ? { ...col, title } : col
        )
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  board: boardReducer,
  tasks: tasksReducer
});

export default rootReducer;
