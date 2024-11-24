import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/NavBar.css";

const Navbar = ({ activeTab, onTabChange }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New subsidy application received", read: false },
        { id: 2, message: "New message from admin", read: false },
        { id: 3, message: "Your request has been approved", read: false },
    ]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    return (
        <div className="navbar"
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "98%",
            backgroundColor: "#333",
            color: "white",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
        }}
        >
            <div className="navbar-logo">
                <Link to="/dashboard">
                    <img src="/path-to-your-logo.png" alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="navbar-tabs" style={{}}>
                <button
                    style={{
                        color: "white",
                        margin: "0 1rem",
                        backgroundColor: activeTab === "regulations" ? "green" : "transparent",
                    }}
                    onClick={() => onTabChange("regulations")}
                >
                    Regulations
                </button>
                <button
                    style={{
                        color: "white",
                        margin: "0 1rem",
                        backgroundColor: activeTab === "subsidies" ? "green" : "transparent",
                    }}
                    onClick={() => onTabChange("subsidies")}
                >
                    Subsidies
                </button>
            </div>

            <div className="navbar-icons">
                <div className="notification-bell" onClick={toggleDropdown}>
                    <FaBell size={24} />
                    <span className="notification-count">
                        {notifications.filter((n) => !n.read).length}
                    </span>
                </div>

                <div className="profile-icon">
                    <FaUserCircle size={24} />
                </div>
            </div>

            {isDropdownVisible && (
                <div className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <p>No notifications</p>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.read ? "read" : "unread"}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                {notification.message}
                                {!notification.read && <span className="mark-as-read">Mark as read</span>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
