import React from 'react';
import { useDispatch } from 'react-redux';
import { editCard, removeCard } from '../../store/actions';
import './Card.scss';

const Card = ({ card, columnId }) => {
  const dispatch = useDispatch();
  
  const handleEdit = (e) => {
    const newContent = prompt('Edit card content:', card.content);
    if (newContent !== null) {
      dispatch(editCard(card.id, newContent));
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
        {card.content}
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        ×
      </button>
    </div>
  );
};

export default Card;
