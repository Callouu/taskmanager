import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, editColumn, removeColumn } from '../../store/actions';
import Card from '../Card/Card';
import './Column.scss';

const Column = ({ column, cards }) => {
  const dispatch = useDispatch();
  const [newCardContent, setNewCardContent] = useState('');

  const handleAddCard = () => {
    if (newCardContent.trim()) {
      dispatch(addCard(column.id, newCardContent));
      setNewCardContent('');
    }
  };

  const handleEditTitle = () => {
    const newTitle = prompt('Edit column title:', column.title);
    if (newTitle !== null) {
      dispatch(editColumn(column.id, newTitle));
    }
  };

  const handleDeleteColumn = () => {
    if (window.confirm('Delete this column and all its cards?')) {
      dispatch(removeColumn(column.id));
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3 onClick={handleEditTitle}>{column.title}</h3>
        <button className="delete-btn" onClick={handleDeleteColumn}>
          ×
        </button>
      </div>
      {column.description && (
        <div className="column-description" style={{ color: "#555", fontSize: "0.97rem", marginBottom: 10 }}>
          {column.description}
        </div>
      )}
      <div className="cards-list">
        {column.cardIds.map(cardId => (
          <Card key={cardId} card={cards[cardId]} columnId={column.id} />
        ))}
      </div>
      <div className="add-card">
        <input
          type="text"
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
          placeholder="Add a card..."
        />
        <button onClick={handleAddCard}>Add</button>
      </div>
    </div>
  );
};

export default Column;
