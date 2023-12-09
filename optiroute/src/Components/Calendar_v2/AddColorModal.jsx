import React, { useEffect, useState } from 'react';
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const userId = ReactSession.get("user_id");

    useEffect(() => {
        // Fetch categories here
        fetch('/api/colors')
            .then(response => response.json())
            .then(data => {
                // Filter categories to include only those owned by the current user
                const userCategories = data.filter(category => category.user_id === userId);
                setCategories(userCategories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [userId]); // Add userId as a dependency to refresh when user changes
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

    const handleDeleteCategory = async () => {
        if (selectedCategory) {
            const confirmation = window.confirm(`Are you sure you want to delete the category "${selectedCategory}"?`);
            if (confirmation) {
                // Find the ID of the selected category
                const categoryToDelete = categories.find(category => category.colorName === selectedCategory);
                if (categoryToDelete) {
                    // Make the DELETE request to the server
                    fetch(`/api/colors/${categoryToDelete._id}`, {
                        method: "DELETE",
                    })
                        .then(response => {
                            if (response.ok) {
                                // Update categories state to remove the deleted category
                                setCategories(categories.filter(category => category._id !== categoryToDelete._id));
                                alert(`Category "${selectedCategory}" deleted successfully.`);
                                // Reset selected category
                                setSelectedCategory('');
                            } else {
                                // Handle server errors
                                alert('Error deleting category. Please try again.');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('Error deleting category. Please try again.');
                        });
                } else {
                    alert(`Category "${selectedCategory}" not found.`);
                }
            }
        } else {
            alert('Please select a category to delete.');
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

                <div className="field-container">
                    <label className="label">New Category:</label>
                    <input type="text" value={colorName} onChange={(e) => setNewCategory(e.target.value)} />
                </div>

                <div className="field-container sketch-picker-container">
                    <label className="label">Select Color:</label>
                    <SketchPicker
                        color={colorCode}
                        onChange={(color) => setSelectedColor(color.hex)}
                    />
                </div>

                <div className="field-container">
                    <label className="label">Select Category to Delete:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>{category.colorName}</option>
                        ))}
                    </select>
                </div>

                <div className='button-container'>
                    <button onClick={handleAddColor}>Add</button>
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={handleDeleteCategory}>Delete</button>
                </div>
            </div>

        </Modal>
    );
};

export default AddColorModal;