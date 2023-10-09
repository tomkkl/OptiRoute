import React from 'react';
import './Description.css';

const Description = () => {
    return (
        <div className="description-container">
            <h2>optiroute: The Future of Integrated Scheduling and Navigation</h2>
            <p>In today's fast-paced world, busy professionals and students often find themselves caught between inefficient scheduling systems and standalone mapping applications. While tools like Google Maps and Google Calendar dominate their respective domains, a unified solution that merges both worlds has been conspicuously absent.</p>

            <h3>Seamless Integration: Planner Meets Navigator</h3>
            <p>OptiRoute is not just another scheduling system; it's an intelligent planner that understands the spatial needs of its users. By allowing individuals to input their daily events and destinations:</p>
            <ul>
                <li>OptiRoute generates the most efficient routes and timelines.</li>
                <li>Provides a visual representation of your entire day, ensuring no event or appointment is overlooked.</li>
            </ul>

            <h3>Anticipate, Plan, Execute</h3>
            <p>What truly sets OptiRoute apart is its foresight. Unlike conventional apps that demand daily manual input:</p>
            <ul>
                <li>OptiRoute streamlines the entire process.</li>
                <li>Integrates event planning with optimized navigation.</li>
            </ul>
        </div>
    );
};

export default Description;
