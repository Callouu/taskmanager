import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./CardModal.scss";

function CardModal({ open, onClose, onAddCard }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    if (title.trim()) {
      onAddCard(title, description, priority);
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <h2>Add a Card</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Card title"
        style={{ width: "100%", marginBottom: 12 }}
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        style={{ width: "100%", marginBottom: 12, minHeight: 80 }}
        onKeyPress={handleKeyPress}
      />
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Priority: </label>
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
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleAdd}>Add Card</button>
        <button onClick={handleCancel} type="button">Cancel</button>
      </div>
    </Modal>
  );
}

export default CardModal;