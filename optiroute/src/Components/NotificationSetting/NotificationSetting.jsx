import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';

import './NotificationSetting.css';

const NotificationSetting = ({ onSave = () => { } }) => {
    const [phoneNotification, setPhoneNotification] = useState(false);
    const [emailNotification, setEmailNotification] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState([]);
    const userId = ReactSession.get('user_id');
    console.log(userId)

    useEffect(() => {
        // Fetch current notification settings for the user
        const fetchNotificationSettings = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                const user = await response.json();
                console.log(user)
                setPhoneNotification(user.notificationPhone);
                setEmailNotification(user.notificationEmail);
                // Add logic to fetch and set other notification-related data if needed
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchNotificationSettings();
    }, [userId]);

    const handleSave = async () => {
        // Update notification settings
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notificationPhone: phoneNotification,
                    notificationEmail: emailNotification,
                    // Include other notification-related data if needed
                }),
            });

            if (response.ok) {
                console.log('Notification settings updated successfully');
            } else {
                console.error('Failed to update notification settings');
            }
        } catch (error) {
            console.error('Error updating notification settings:', error);
        }

        // Call the onSave callback if needed
        onSave({
            phoneNotification,
            emailNotification,
            selectedInfo,
        });
    };

    return (
        <div className="notification-settings-container">
            <h2>Notification Settings</h2>
            <div className="notification-option">
                <label>
                    Phone Notification:
                    <input
                        type="checkbox"
                        checked={phoneNotification}
                        onChange={() => setPhoneNotification(!phoneNotification)}
                    />
                </label>
            </div>
            <div className="notification-option">
                <label>
                    Email Notification:
                    <input
                        type="checkbox"
                        checked={emailNotification}
                        onChange={() => setEmailNotification(!emailNotification)}
                    />
                </label>
            </div>
            <div className="notification-info">
                <h3>Select Information for Notification</h3>
                {/* Render checkboxes for selecting notification information */}
            </div>
            <button className="save-button" onClick={handleSave}>
                Save Settings
            </button>
        </div>
    );
};

export default NotificationSetting;
