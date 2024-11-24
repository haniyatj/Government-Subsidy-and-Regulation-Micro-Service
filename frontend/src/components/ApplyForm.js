import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./FarmerNavbar";

const ApplyForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        farmerId: "",
        subsidyType: "",
        cnicDocuments: [],
        landDocuments: [],
        status: "pending",
    });

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle CNIC file input change
    const handleCnicFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            cnicDocuments: [...prevData.cnicDocuments, ...files],
        }));
    };

    // Handle Land Ownership file input change
    const handleLandFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            landDocuments: [...prevData.landDocuments, ...files],
        }));
    };

    // Submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Navigate or handle form submission logic
        // navigate('/some-path'); 
    };

    const handleTabChange = (tab) => {
        if (tab === "regulations") {
            navigate("/FarmerDashoard");
        } else if (tab === "subsidies") {
            navigate("/FarmerDashoard");
        }
    };

    return (
        <div style={styles.container}>
            <Navbar activeTab="subsidies" onTabChange={handleTabChange} />
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Subsidy Application Form</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Farmer ID</label>
                        <input
                            type="text"
                            name="farmerId"
                            value={formData.farmerId}
                            onChange={handleChange}
                            placeholder="Enter your Farmer ID"
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Subsidy Type</label>
                        <select
                            name="subsidyType"
                            value={formData.subsidyType}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        >
                            <option value="">Select Subsidy Type</option>
                            <option value="organic_farming">Organic Farming</option>
                            <option value="irrigation_system">Irrigation System</option>
                            <option value="soil_health">Soil Health Improvement</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>CNIC Copy</label>
                        <p style={styles.helperText}>
                            Please upload a clear copy of your CNIC (PDF, JPG, PNG).
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.png"
                            onChange={handleCnicFileChange}
                            style={styles.fileInput}
                        />
                        <ul style={styles.fileList}>
                            {formData.cnicDocuments.map((file, index) => (
                                <li key={index} style={styles.fileItem}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Land Ownership Documents</label>
                        <p style={styles.helperText}>
                            Upload ownership proof such as registry documents or lease agreements (PDF, JPG, PNG).
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.png"
                            onChange={handleLandFileChange}
                            style={styles.fileInput}
                        />
                        <ul style={styles.fileList}>
                            {formData.landDocuments.map((file, index) => (
                                <li key={index} style={styles.fileItem}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={styles.submitGroup}>
                        <button type="submit" style={styles.submitButton}>
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        width: "400px",
        padding: "20px",
    },
    heading: {
        textAlign: "center",
        fontSize: "1.6rem",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputGroup: {
        marginBottom: "20px",
    },
    label: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "8px",
    },
    helperText: {
        fontSize: "0.9rem",
        color: "#888",
        marginBottom: "8px",
    },
    input: {
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
    },
    fileInput: {
        padding: "5px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "100%",
    },
    fileList: {
        listStyleType: "none",
        paddingLeft: "0",
        marginTop: "10px",
    },
    fileItem: {
        fontSize: "0.9rem",
        color: "#333",
        marginBottom: "5px",
    },
    submitGroup: {
        display: "flex",
        justifyContent: "center",
    },
    submitButton: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%",
    },
};

export default ApplyForm;
