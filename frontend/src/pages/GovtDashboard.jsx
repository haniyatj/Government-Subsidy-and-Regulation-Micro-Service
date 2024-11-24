// Dashboard.js
import React from "react";
import RegulationManagement from "../components/Regulations";
import SubsidyManagement from "../components/Subsidies";
import Navbar from "../components/NavBar"; // Import Navbar
import "../styles/Dashboard.css"; // Import the Dashboard CSS

const Dashboard = () => {
  return (
    <><Navbar /><div className="dashboard-container">

      <h2>Welcome to the Government Official Dashboard</h2>


      <div className="management-sections">
        <RegulationManagement />  {/* Regulation Management Section */}
        <SubsidyManagement />     {/* Subsidy Management Section */}
      </div>
    </div></>
  );
};

export default Dashboard;
