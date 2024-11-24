import React, { useState } from "react";
import Navbar from "../components/FarmerNavbar";
import ApplyForm from "../components/ApplyForm"
import { useNavigate } from 'react-router-dom';

// Regulation Component
const RegulationItem = ({ regulation }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();




    return (
        <div
            style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                margin: "1rem 0",
                textAlign: "left",
            }}
        >
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2c3e50", marginBottom: "0.5rem" }}>
                {regulation.title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                {showMore ? regulation.description : `${regulation.description.slice(0, 50)}...`}
                <span
                    style={{ color: "green", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? " Show less" : " Read more"}
                </span>
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Effective Date: {regulation.effectiveDate}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Category: {regulation.category}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Type: {regulation.type}
            </p>
        </div>
    );
};

// Subsidy Component
const SubsidyItem = ({ subsidy }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div
            style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                margin: "1rem 0",
                textAlign: "left",
            }}
        >
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2c3e50", marginBottom: "0.5rem" }}>
                {subsidy.title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                {showMore ? subsidy.description : `${subsidy.description.slice(0, 50)}...`}
                <span
                    style={{ color: "green", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? " Show less" : " Read more"}
                </span>
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Application Deadline: {subsidy.applicationDeadline}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Amount: ${subsidy.amount}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Category: {subsidy.category}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#888", marginBottom: "0.5rem" }}>
                Region: {subsidy.region}
            </p>
            <button
                style={{
                    marginTop: "1rem",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                }}
                onClick={() => navigate('/ApplyForm')} // Correctly defined onClick
            >
                Apply
            </button>
        </div>
    );
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("regulations");

    const dummyRegulations = [
        {
            id: "1",
            title: "Pesticide Usage Regulation",
            description: "Guidelines for responsible and safe pesticide application to minimize environmental impact and ensure food safety.",
            effectiveDate: "2024-01-01",
            category: "pesticide",
            type: "guideline",
            createdAt: "2023-12-01T10:00:00Z",
            updatedAt: "2023-12-10T10:00:00Z",
        },
        {
            id: "2",
            title: "Land Management Policy",
            description: "Rules for sustainable land use, including practices such as crop rotation, soil health maintenance, and conservation techniques.",
            effectiveDate: "2024-02-15",
            category: "land_management",
            type: "policy",
            createdAt: "2023-12-05T12:00:00Z",
            updatedAt: "2023-12-12T12:00:00Z",
        },
        {
            id: "3",
            title: "Crop Protection Standards",
            description: "Regulations on approved methods and substances for crop protection to ensure agricultural productivity and consumer safety.",
            effectiveDate: "2024-03-01",
            category: "crop_protection",
            type: "standard",
            createdAt: "2023-12-15T14:00:00Z",
            updatedAt: "2023-12-20T14:00:00Z",
        },
    ];

    const dummySubsidies = [
        {
            id: "1",
            title: "Organic Farming Subsidy",
            description: "Support of up to $5000 for organic farming initiatives, focusing on sustainability and eco-friendly agricultural practices.",
            applicationDeadline: "2024-05-01",
            amount: 5000,
            category: "sustainability",
            region: "nationwide",
            createdAt: "2023-11-01T09:00:00Z",
            updatedAt: "2023-11-15T09:00:00Z",
        },
        {
            id: "2",
            title: "Irrigation System Subsidy",
            description: "Financial aid of up to $10000 for adopting advanced irrigation systems to enhance water efficiency.",
            applicationDeadline: "2024-07-01",
            amount: 10000,
            category: "water_management",
            region: "regional",
            createdAt: "2023-10-20T11:00:00Z",
            updatedAt: "2023-11-10T11:00:00Z",
        },
        {
            id: "3",
            title: "Soil Health Improvement Grant",
            description: "Up to $2000 for soil testing and implementation of recommended soil health improvements.",
            applicationDeadline: "2024-06-15",
            amount: 2000,
            category: "land_management",
            region: "specific zones",
            createdAt: "2023-11-05T13:00:00Z",
            updatedAt: "2023-11-25T13:00:00Z",
        },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div
            style={{
                backgroundColor: "#f9f9f9",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
            }}
        >
            <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
            <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
                {activeTab === "regulations" && (
                    <>
                        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem",marginTop:"10%", color: "#333", fontWeight: "bold" }}>
                            Latest Regulations
                        </h2>
                        {dummyRegulations.map((regulation) => (
                            <RegulationItem key={regulation.id} regulation={regulation} />
                        ))}
                    </>
                )}
                {activeTab === "subsidies" && (
                    <>
                        <h2 style={{ fontSize: "1.8rem",marginTop:"10%", marginBottom: "1.5rem", color: "#333", fontWeight: "bold" }}>
                            Available Subsidies
                        </h2>
                        {dummySubsidies.map((subsidy) => (
                            <SubsidyItem key={subsidy.id} subsidy={subsidy} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
