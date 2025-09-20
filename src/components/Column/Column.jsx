import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard, editColumn, removeColumn } from "../../store/actions";
import Card from "../Card/Card";
import CardModal from "../CardModal/CardModal";
import "./Column.scss";

const Column = ({ column, cards }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = (title, description, priority) => {
    dispatch(addCard(column.id, title, description, priority));
  };

  const handleEditTitle = () => {
    const newTitle = prompt("Edit column title:", column.title);
    if (newTitle !== null) {
      dispatch(editColumn(column.id, newTitle));
    }
  };

  const handleDeleteColumn = () => {
    if (window.confirm("Delete this column and all its cards?")) {
      dispatch(removeColumn(column.id));
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3 onClick={handleEditTitle}>{column.title}</h3>
        <div className="column-header--button">
        <div className="add-card">
          <button onClick={() => setIsModalOpen(true)}>+</button>
        </div>
        <button className="delete-btn" onClick={handleDeleteColumn}>
          ×
        </button>
        </div>
      </div>
      {column.description && (
        <div
          className="column-description"
          style={{ color: "#555", fontSize: "0.97rem", marginBottom: 10 }}
        >
          {column.description}
        </div>
      )}
      <div className="cards-list">
        {column.cardIds.map((cardId) => (
          <Card key={cardId} card={cards[cardId]} columnId={column.id} />
        ))}
      </div>
      <CardModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCard={handleAddCard}
      />
    </div>
  );
};

export default Column;
