import React, { useState } from "react";
import "../styles/Subsidies.css";

const Subsidies = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2024-11-23",
      status: "Pending",
      type: "Farm Subsidy",
      personalInfo: "John Doe, Age 45, Farmer",
      farmDetails: "Farm Location: XYZ, Size: 50 acres, Crop Type: Wheat",
      financialNeeds: "Requesting $5,000 for irrigation system",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-11-20",
      status: "Pending",
      type: "Agriculture Subsidy",
      personalInfo: "Jane Smith, Age 38, Farmer",
      farmDetails: "Farm Location: ABC, Size: 35 acres, Crop Type: Corn",
      financialNeeds: "Requesting $3,000 for seeds",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Approved" } : app))
    );
  };

  const handleReject = (id) => {
    const reason = prompt("Enter rejection reason (optional):");
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Rejected", reason } : app
      )
    );
  };

  const handleView = (id) => {
    const app = applications.find((app) => app.id === id);
    setCurrentApplication(app);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentApplication(null);
  };

  return (
    <div className="dashboard-section">
      <h2>Subsidy Application Management</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.date}</td>
              <td>{app.status}</td>
              <td>{app.type}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleView(app.id)}
                >
                  View
                </button>
                <button
                  className="approve-button"
                  onClick={() => handleApprove(app.id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(app.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Application Details */}
      {modalOpen && currentApplication && (
        <div className="modal">
          <div className="modal-form">
            <h3>Application Details</h3>
            <div>
              <strong>Personal Information:</strong> {currentApplication.personalInfo}
            </div>
            <div>
              <strong>Farm Details:</strong> {currentApplication.farmDetails}
            </div>
            <div>
              <strong>Financial Needs:</strong> {currentApplication.financialNeeds}
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subsidies;
