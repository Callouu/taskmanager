import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import logoWhite from '../../assets/tm_logo_white.png'

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
      <div className="sidebar-header">
        <button className="toggle-sidebar-btn" onClick={onToggleCollapse}>
          {isCollapsed ? (
            <span className="material-icons">menu</span>
          ) : (
            <div className="sidebar-icon">
              <img className="sidebar-logo" src={logoWhite} alt="TaskManager Logo"/>
              <span className="sidebar-title">Dashboards</span>
            </div>
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <button
          className="create-dashboard-btn"
          onClick={() => setIsCreating(true)}
        >
          <span className="material-icons">add</span>
          New dashboard
        </button>
      )}

      {!isCollapsed && (
        <>
          {isCreating && (
            <div className="create-dashboard-form">
              <input
                type="text"
                value={newDashboardName}
                onChange={(e) => setNewDashboardName(e.target.value)}
                placeholder="Enter dashboard name"
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
                  <span className="material-icons">description</span>
                  <span className="dashboard-name">{dashboard.name}</span>
                </div>
                <div className="dashboard-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditDashboard(dashboard.id, dashboard.name);
                    }}
                    title="Edit"
                  >
                    <span className="material-icons">edit</span>
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDashboard(dashboard.id);
                    }}
                    title="Delete"
                  >
                    <span className="material-icons">close</span>
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
