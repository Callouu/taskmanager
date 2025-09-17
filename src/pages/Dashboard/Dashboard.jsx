import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addColumn } from "../../store/actions";
import Modal from "../../components/Modal/Modal";
import Column from "../../components/Column/Column";
import { useState } from "react";
import "./Dashboard.scss";

function Dashboard() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.columns);
  const cards = useSelector((state) => state.board.cards);

  const [modalOpen, setModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnDesc, setNewColumnDesc] = useState("");

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      dispatch(addColumn(newColumnTitle, newColumnDesc));
      setNewColumnTitle("");
      setNewColumnDesc("");
      setModalOpen(false);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <div className="add-column">
          <button onClick={() => setModalOpen(true)}>Add Column</button>
        </div>
        <div className="columns-container">
          {columns.map((column) => (
            <Column key={column.id} column={column} cards={cards} />
          ))}
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>Add a column</h2>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Column title"
            style={{ width: "100%", marginBottom: 12 }}
          />
          <textarea
            value={newColumnDesc}
            onChange={(e) => setNewColumnDesc(e.target.value)}
            placeholder="Description (optional)"
            style={{ width: "100%", marginBottom: 12, minHeight: 60 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleAddColumn}>Add</button>
            <button onClick={() => setModalOpen(false)} type="button">Cancel</button>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
}

export default Dashboard;
