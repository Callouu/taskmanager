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

  return (
    <>
      <div className="card">
        <div className="card-content" onClick={openModal}>
          <div className="card-title">{card.title}</div>
          {card.description && (
            <div className="card-description">{card.description}</div>
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
