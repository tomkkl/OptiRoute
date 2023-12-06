import React, { useState } from 'react';
import Modal from 'react-modal';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { SketchPicker } from 'react-color';
import './AddColorModal.css'; // Import your CSS file for modal styling
import { ReactSession } from "react-client-session"

Modal.setAppElement('#root');

const AddColorModal = ({ isOpen, closeModal, addColor }) => {
    const [colorName, setNewCategory] = useState('');
    const [colorCode, setSelectedColor] = useState('');
    const userId = ReactSession.get("user_id");


    const handleAddColor = () => {
        if (colorName && colorCode) {
            const confirmation = window.confirm(`Add color "${colorName}" with code "${colorCode}"?`);
            console.log(userId)
            const colorDetails =
                { userId, colorName, colorCode };

            addColor(colorDetails);
            closeModal();
            window.alert(`Color "${colorName}" added successfully!`);
            window.location.reload(); // Reload the page
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Add Color"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Add Category and Color</h2>
                <div>
                    <label>New Category:</label>
                    <input type="text" value={colorName} onChange={(e) => setNewCategory(e.target.value)} />
                </div>
                <div>
                    <label>Select Color:</label>
                    <SketchPicker
                        color={colorCode}
                        onChange={(color) => setSelectedColor(color.hex)}
                    />
                </div>
                <button onClick={handleAddColor}>Add</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
    );
};

export default AddColorModal;
