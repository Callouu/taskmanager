import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCard } from '../../store/actions';
import CardDetailsModal from '../CardDetailsModal/CardDetailsModal';
import './Card.scss';

const Card = ({ card, columnId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="card">
        <div className="card-content" onClick={openModal}>
          <div className="card-header">
            <div className="card-title">{card.title}</div>
            {card.priority && (
              <div className={`card-priority ${card.priority}`}>
                {card.priority.toUpperCase()}
              </div>
            )}
          </div>
          {card.description && (
            <div className="card-description">{card.description}</div>
          )}
          {card.createdAt && (
            <div className="card-date">{formatDate(card.createdAt)}</div>
          )}
        </div>
      </div>
      <CardDetailsModal 
        open={isModalOpen} 
        onClose={closeModal} 
        card={card} 
        columnId={columnId}
      />
    </>
  );
};

export default Card;
