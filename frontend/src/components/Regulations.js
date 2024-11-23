import React, { useState } from "react";
import "../styles/Regulations.css";

const Regulations = () => {
  const [regulations, setRegulations] = useState([
    {
      id: 1,
      title: "Pesticide Regulation 1",
      description: "Regulation for pesticide use in agriculture.",
      createdDate: "2023-01-01",
      updatedDate: "2023-01-05",
      effectiveDate: "2023-02-01",
      category: "Pesticide",
    },
    {
      id: 2,
      title: "Land Use Regulation 1",
      description: "Regulation for land use in agricultural zones.",
      createdDate: "2023-02-01",
      updatedDate: "2023-02-10",
      effectiveDate: "2023-03-01",
      category: "Land Use",
    },
    // Add more dummy data as needed
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentRegulation, setCurrentRegulation] = useState(null);

  const handleAddRegulation = () => {
    setCurrentRegulation(null); // Clear form
    setModalOpen(true);
  };

  const handleEditRegulation = (regulation) => {
    setCurrentRegulation(regulation); // Pre-fill form
    setModalOpen(true);
  };

  const handleSaveRegulation = (e) => {
    e.preventDefault();
    const newRegulation = {
      id: currentRegulation?.id || Date.now(),
      title: e.target.title.value,
      description: e.target.description.value,
      createdDate: e.target.createdDate.value,
      updatedDate: e.target.updatedDate.value,
      effectiveDate: e.target.effectiveDate.value,
      category: e.target.category.value,
    };

    if (currentRegulation) {
      setRegulations((prev) =>
        prev.map((reg) => (reg.id === currentRegulation.id ? newRegulation : reg))
      );
    } else {
      setRegulations((prev) => [...prev, newRegulation]);
    }
    setModalOpen(false);
  };

  const handleDeleteRegulation = (id) => {
    if (window.confirm("Are you sure you want to delete this regulation?")) {
      setRegulations((prev) => prev.filter((reg) => reg.id !== id));
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Regulation Management</h2>
      <button className="add-button" onClick={handleAddRegulation}>
        Add New Regulation
      </button>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Effective Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regulations.map((reg) => (
            <tr key={reg.id}>
              <td>{reg.title}</td>
              <td>{reg.description}</td>
              <td>{reg.createdDate}</td>
              <td>{reg.updatedDate}</td>
              <td>{reg.effectiveDate}</td>
              <td>{reg.category}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditRegulation(reg)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteRegulation(reg.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSaveRegulation} className="modal-form">
            <h3>{currentRegulation ? "Edit Regulation" : "Add Regulation"}</h3>
            <label>Title</label>
            <input
              type="text"
              name="title"
              defaultValue={currentRegulation?.title || ""}
              required
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              defaultValue={currentRegulation?.description || ""}
              required
            />
            <label>Created Date</label>
            <input
              type="date"
              name="createdDate"
              defaultValue={currentRegulation?.createdDate || ""}
              required
            />
            <label>Updated Date</label>
            <input
              type="date"
              name="updatedDate"
              defaultValue={currentRegulation?.updatedDate || ""}
            />
            <label>Effective Date</label>
            <input
              type="date"
              name="effectiveDate"
              defaultValue={currentRegulation?.effectiveDate || ""}
              required
            />
            <label>Category</label>
            <select name="category" defaultValue={currentRegulation?.category || ""}>
              <option value="Pesticide">Pesticide</option>
              <option value="Land Use">Land Use</option>
              <option value="Crop Protection">Crop Protection</option>
              <option value="Other">Other</option>
            </select>
            <div className="modal-actions">
              <button type="submit" className="save-button">Save</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Regulations;
