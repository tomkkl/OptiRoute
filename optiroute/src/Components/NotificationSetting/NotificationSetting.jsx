import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import emailjs from '@emailjs/browser'

import './NotificationSetting.css';

let current_db_id = null;

const NotificationSetting = ({ onSave = () => { } }) => {
    const [phoneNotification, setPhoneNotification] = useState(false);
    const [emailNotification, setEmailNotification] = useState(false);
    const [titleNotification, setTitleNotification] = useState(false);
    const [date_timeNotification, setDate_TimeNotification] = useState(false);
    const [locationNotification, setLocationNotification] = useState(false);
    const [addressNotification, setAddressNotification] = useState(false);
    const [descriptionNotification, setDescriptionNotification] = useState(false);
    const [emailAddressNotification, setEmailAddressNotification] = useState('');
    const [phoneAddressNotification, setPhonelAddressNotification] = useState('');


    const [selectedInfo, setSelectedInfo] = useState([]);
    const userId = ReactSession.get('user_id');
    console.log(userId)

    useEffect(() => {
        // Fetch current notification settings for the user
        const fetchNotificationSettings = async () => {
            try {
                const response = await fetch(`/api/NotificationSetting?user_id=${userId}`);
                const users = await response.json();
                console.log(users)
                const current_user = users.filter((event) => event.user_id === userId)[0];
                console.log(current_user.email)
                setPhoneNotification(current_user.phone);
                setEmailNotification(current_user.email);
                setTitleNotification(current_user.title);
                setDate_TimeNotification(current_user.date_time);
                setLocationNotification(current_user.location);
                setAddressNotification(current_user.address);
                setDescriptionNotification(current_user.description);
                setEmailAddressNotification(current_user.email_address)
                setPhonelAddressNotification(current_user.phone_address)

                current_db_id = current_user._id;
                console.log(current_db_id)
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
            const response = await fetch(`/api/NotificationSetting/${current_db_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phoneNotification,
                    email: emailNotification,
                    title: titleNotification,
                    date_time: date_timeNotification,
                    location: locationNotification,
                    address: addressNotification,
                    description: descriptionNotification,
                    email_address: emailAddressNotification,
                    phone_address: phoneAddressNotification,

                }),
            });

            if (response.ok) {
                console.log('Notification settings updated successfully');
                window.alert('Settings saved successfully!');
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
            titleNotification,
            date_timeNotification,
            locationNotification,
            addressNotification,
            descriptionNotification,
            emailAddressNotification,
            phoneAddressNotification,

            selectedInfo,
        });
    };

    const sendSMS = async () => {
        const apiUrl = "https://textflow.me/api/send-sms";
        const phoneNumber = "+1" + phoneAddressNotification;
        console.log(phoneNumber)
        const textMessage = "This is a test SMS.";
        const apiKey = "API"; // Replace with your actual API key

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    text: textMessage,
                }),
            });

            if (response.ok) {
                console.log('SMS sent successfully!');
            } else {
                console.error('Failed to send SMS:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending SMS:', error.message);
        }
    };


    const handleSendTestMessage = () => {
        // Add logic to send a test message
        const form = document.createElement('form');
        form.style.display = 'none';

        // Add input fields for message, email, and title
        const messageInput = document.createElement('input');
        messageInput.type = 'text';
        messageInput.name = 'message';
        messageInput.value = 'This is a test message.'; // Replace with your actual message
        form.appendChild(messageInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'text';
        emailInput.name = 'email';
        emailInput.value = emailAddressNotification;// Use the stored email address or replace it with a default/test email
        form.appendChild(emailInput);

        // Append the form to the body
        document.body.appendChild(form);
        emailjs
            .sendForm('service_mg8oh6d', 'template_llr8y8a', form, 'nsNXmsj_H0dyrU3zA')
            .then(
                (response) => {
                    console.log('Email sent successfully:', response);
                    window.alert('Test message sent!');
                },
                (error) => {
                    console.error('Failed to send email:', error);
                    window.alert('Failed to send test message.');
                }
            ).finally(() => {
                // Remove the hidden form from the body after submission
                document.body.removeChild(form);
            })

            ;
        window.alert('Test message sent!');

        sendSMS();



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
            <div className="notification-option">
                <label>
                    Title:
                    <input
                        type="checkbox"
                        checked={titleNotification}
                        onChange={() => setTitleNotification(!titleNotification)}
                    />
                </label>
            </div>
            <div className="notification-option">
                <label>
                    Start Date and Time:
                    <input
                        type="checkbox"
                        checked={date_timeNotification}
                        onChange={() => setDate_TimeNotification(!date_timeNotification)}
                    />
                </label>
            </div>
            <div className="notification-option">
                <label>
                    Location:
                    <input
                        type="checkbox"
                        checked={locationNotification}
                        onChange={() => setLocationNotification(!locationNotification)}
                    />
                </label>
            </div>
            <div className="notification-option">
                <label>
                    Address:
                    <input
                        type="checkbox"
                        checked={addressNotification}
                        onChange={() => setAddressNotification(!addressNotification)}
                    />
                </label>
            </div>
            <div className="notification-option">
                <label>
                    Description:
                    <input
                        type="checkbox"
                        checked={descriptionNotification}
                        onChange={() => setDescriptionNotification(!descriptionNotification)}
                    />
                </label>
            </div>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-option">
                    <label>
                        Email Address:
                        <input
                            type="text"
                            value={emailAddressNotification}
                            onChange={(e) => setEmailAddressNotification(e.target.value)}
                        />
                    </label>
                </div>
                <div className="contact-option">
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={phoneAddressNotification}
                            onChange={(e) => setPhonelAddressNotification(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <button className="save-button" onClick={handleSave}>
                Save Settings
            </button>
            <button className="test-message-button" onClick={handleSendTestMessage}>
                Send Test Message
            </button>
        </div>
    );
};

export default NotificationSetting;
