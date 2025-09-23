import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addColumn, addDashboard, removeDashboard, editDashboard, selectDashboard } from "../../store/actions";
import Modal from "../../components/Modal/Modal";
import Column from "../../components/Column/Column";
import DashboardSidebar from "../../layouts/Sidebar/Sidebar";
import "./Dashboard.scss";

function Dashboard() {
  const dispatch = useDispatch();
  const { dashboardId } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const columns = useSelector((state) => {
    try {
      const selectedDashboardId = state.dashboards.selectedDashboardId;
      const boardStates = state.dashboards.boardStates;
      return (boardStates && boardStates[selectedDashboardId] && boardStates[selectedDashboardId].columns) || [];
    } catch (error) {
      console.error('Error accessing columns:', error);
      return [];
    }
  });
  const cards = useSelector((state) => {
    try {
      const selectedDashboardId = state.dashboards.selectedDashboardId;
      const boardStates = state.dashboards.boardStates;
      return (boardStates && boardStates[selectedDashboardId] && boardStates[selectedDashboardId].cards) || {};
    } catch (error) {
      console.error('Error accessing cards:', error);
      return {};
    }
  });
  const dashboards = useSelector((state) => state.dashboards.dashboards);
  const selectedDashboardId = useSelector((state) => state.dashboards.selectedDashboardId);

  const [modalOpen, setModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnDesc, setNewColumnDesc] = useState("");
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);
  const [editingDashboardId, setEditingDashboardId] = useState(null);
  const [editingDashboardName, setEditingDashboardName] = useState("");

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      dispatch(addColumn(newColumnTitle, newColumnDesc));
      setNewColumnTitle("");
      setNewColumnDesc("");
      setModalOpen(false);
    }
  };

  const handleCreateDashboard = (name) => {
    dispatch(addDashboard(name));
  };

  const handleDeleteDashboard = (id) => {
    if (dashboards.length > 1) {
      dispatch(removeDashboard(id));
    } else {
      alert("You must have at least one dashboard.");
    }
  };

  const handleEditDashboard = (id, currentName) => {
    setIsEditingDashboard(true);
    setEditingDashboardId(id);
    setEditingDashboardName(currentName);
  };

  const handleSaveEditDashboard = () => {
    if (editingDashboardName.trim()) {
      dispatch(editDashboard(editingDashboardId, editingDashboardName));
      setIsEditingDashboard(false);
      setEditingDashboardId(null);
      setEditingDashboardName("");
    }
  };

  const handleSelectDashboard = (id) => {
    dispatch(selectDashboard(id));
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const selectedDashboard = dashboards.find(d => d.id === selectedDashboardId) || dashboards[0];

  // Update selected dashboard when URL changes
  useEffect(() => {
    if (dashboardId) {
      // Try to find dashboard by full ID first
      let dashboard = dashboards.find(d => d.id === dashboardId);
      // If not found, try to find by ID with "dashboard-" prefix
      if (!dashboard) {
        dashboard = dashboards.find(d => d.id === `dashboard-${dashboardId}`);
      }
      // If found, select it
      if (dashboard) {
        dispatch(selectDashboard(dashboard.id));
      }
    }
  }, [dashboardId, dashboards, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        <div style={{ display: 'flex'}}>
          <DashboardSidebar
            dashboards={dashboards}
            onCreateDashboard={handleCreateDashboard}
            onDeleteDashboard={handleDeleteDashboard}
            onEditDashboard={handleEditDashboard}
            onSelectDashboard={handleSelectDashboard}
            selectedDashboardId={selectedDashboardId}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
          <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="board-title">
              <h1>{selectedDashboard ? selectedDashboard.name : "My Dashboard"}</h1>
              <div className="add-column">
                <button onClick={() => setModalOpen(true)}>
                  <span className="material-icons">add</span>
                  Add Column
                </button>
              </div>
            </div>
            <div className="columns-container">
              {columns.map((column) => (
                <Column key={column.id} column={column} cards={cards} />
              ))}
            </div>
          </div>
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
        <Modal open={isEditingDashboard} onClose={() => setIsEditingDashboard(false)}>
          <h2>Edit Dashboard</h2>
          <input
            type="text"
            value={editingDashboardName}
            onChange={(e) => setEditingDashboardName(e.target.value)}
            placeholder="Dashboard name"
            style={{ width: "100%", marginBottom: 12 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleSaveEditDashboard}>Save</button>
            <button onClick={() => setIsEditingDashboard(false)} type="button">Cancel</button>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
}

export default Dashboard;
