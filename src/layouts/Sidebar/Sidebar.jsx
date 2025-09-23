import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

function DashboardSidebar({
  dashboards,
  onCreateDashboard,
  onDeleteDashboard,
  onEditDashboard,
  onSelectDashboard,
  selectedDashboardId,
  isCollapsed,
  onToggleCollapse,
}) {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState("");

  const handleCreateDashboard = () => {
    if (newDashboardName.trim()) {
      onCreateDashboard(newDashboardName);
      setNewDashboardName("");
      setIsCreating(false);
    }
  };

  const handleSelectDashboard = (dashboardId) => {
    onSelectDashboard(dashboardId);
    navigate(`/dashboard/${dashboardId}`);
  };

  return (
    <div className={`dashboard-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-sidebar-btn" onClick={onToggleCollapse}>
        {isCollapsed ? "▸" : "◂"}
      </button>
      <div className="sidebar-header">
        {!isCollapsed && <h2>Dashboards</h2>}
        {!isCollapsed && (
          <button
            className="create-dashboard-btn"
            onClick={() => setIsCreating(true)}
          >
            + Create
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          {isCreating && (
            <div className="create-dashboard-form">
              <input
                type="text"
                value={newDashboardName}
                onChange={(e) => setNewDashboardName(e.target.value)}
                placeholder="Dashboard name"
                autoFocus
              />
              <div className="form-actions">
                <button onClick={handleCreateDashboard}>Create</button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewDashboardName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="dashboard-list">
            {dashboards.map((dashboard) => (
              <div
                key={dashboard.id}
                className={`dashboard-item ${
                  selectedDashboardId === dashboard.id ? "selected" : ""
                }`}
                onClick={() => handleSelectDashboard(dashboard.id)}
              >
                <div className="dashboard-info">
                  <span className="dashboard-name">{dashboard.name}</span>
                </div>
                <div className="dashboard-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditDashboard(dashboard.id, dashboard.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDashboard(dashboard.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardSidebar;
