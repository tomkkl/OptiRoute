import React from 'react';
import './About.css';
import temp from '../Assets/temp.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Team = () => {
    <Sidebar />
    const teamMembers = [
        {
            name: "Tom Linn",
            title: "Scrum Master",
            description: "Tom leads our team...pending description completion"
        },
        {
            name: "Andrew Bradley",
            title: "Full-Stack Developer",
            description: "Andrew is the...pending description completion"
        },
        {
            name: "Ben Lin",
            title: "Full-Stack Developer",
            description: "Ben is the...pending description completion"
        },
        {
            name: "Jianxiang Tao",
            title: "Full-Stack Developer",
            description: "Jianxiang is the...pending description completion"
        },
    ];

    return (
        <div className="team-container">
            <Sidebar />
            {teamMembers.map(member => (
                <div className="team-member" key={member.name}>
                    <img src={temp} alt={member.name} className="team-member-image" />
                    <h3 className="team-member-name">{member.name}</h3>
                    <h4 className="team-member-title">{member.title}</h4>
                    <p className="team-member-description">{member.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Team;
