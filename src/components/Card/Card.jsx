import React from 'react';
import { useDispatch } from 'react-redux';
import { editCard, removeCard } from '../../store/actions';
import './Card.scss';

const Card = ({ card, columnId }) => {
  const dispatch = useDispatch();
  
  const handleEdit = (e) => {
    const newTitle = prompt('Edit card title:', card.title);
    const newDescription = prompt('Edit card description:', card.description);
    if (newTitle !== null) {
      dispatch(editCard(card.id, newTitle, newDescription));
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this card?')) {
      dispatch(removeCard(card.id));
    }
  };

  return (
    <div className="card">
      <div className="card-content" onClick={handleEdit}>
        <div className="card-title">{card.title}</div>
        {card.description && (
          <div className="card-description">{card.description}</div>
        )}
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        ×
      </button>
    </div>
  );
};

export default Card;
