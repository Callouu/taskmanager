import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard, removeCard } from "../../store/actions";
import Modal from "../Modal/Modal";
import "./CardDetailsModal.scss";

function CardDetailsModal({ open, onClose, card, columnId }) {
  const dispatch = useDispatch();
  
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [priority, setPriority] = useState(card?.priority || "medium");
  
  if (!card) return null;

  // Format the date for display
  const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
  
  // Handle save changes
  const handleSave = () => {
    dispatch(editCard(card.id, title, description, priority));
    setIsEditing(false);
  };
  
  // Handle cancel editing
  const handleCancel = () => {
    setTitle(card.title);
    setDescription(card.description);
    setPriority(card.priority || "medium");
    setIsEditing(false);
  };
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Delete this card?')) {
      dispatch(removeCard(card.id));
      onClose();
    }
  };
  
  // Initialize edit state when card changes
  React.useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setPriority(card.priority || "medium");
    }
  }, [card]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="card-details-modal">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="card-title-input"
              placeholder="Card title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="card-description-input"
              placeholder="Card description"
            />
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: 4 }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="card-modal-actions">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2>{card.title}</h2>
            {(card.description || card.description === '') && (
              <div className="card-description">
                {card.description ? (
                  <p>{card.description}</p>
                ) : (
                  <p className="empty-description">No description</p>
                )}
              </div>
            )}
            <div className="card-priority" style={{ marginBottom: 12 }}>
              <strong>Priority:</strong>
              <span className={`priority-value ${card.priority}`}>
                {card.priority ?
                card.priority?.charAt(0).toUpperCase() + card.priority?.slice(1) 
                : "Medium"}
              </span>
            </div>
            <div className="card-meta">
              <span className="card-date">Created: {formatDate(card.createdAt)}</span>
            </div>
            <div className="card-modal-actions">
              <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default CardDetailsModal;