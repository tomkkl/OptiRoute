import React from 'react';
import './About.css';
import ben from '../Assets/ben.jpeg';
import tom from '../Assets/tom.jpeg';
import andrew from '../Assets/andrew.jpeg';
import john from '../Assets/john.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Team = () => {
    <Sidebar />
    const teamMembers = [
        {
            name: "Tom Linn",
            title: "Scrum Master",
            description: "Tom leads our standup meetings and develops optiroute confluently with the entire team.",
            image: tom
        },
        {
            name: "Andrew Bradley",
            title: "Backend Engineer",
            description: "Andrew is a dedicated engineer that specializes in MongoDB connections with the ReactJS framework.",
            image: andrew
        },
        {
            name: "Jianxiang Tao",
            title: "Frontend Engineer",
            description: "Jianxiang, or John, is a hard working developer that focuses on maintaining clean front-end code design, making it easy for Andrew to connect it all",
            image: john
        },
        {
            name: "Ben Lin",
            title: "Fullstack Developer",
            description: "Ben is a fullstack developer that works on all parts of the app, learning both frontend and backend components.",
            image: ben
        },
    ];
    

    return (
        <div className="main-container">
            <Sidebar />
            <div className="team-container">
                {teamMembers.map(member => (
                    <div className="team-member" key={member.name}>
                        <img src={member.image} alt={member.name} className="team-member-image" />
                        <h3 className="team-member-name">{member.name}</h3>
                        <h4 className="team-member-title">{member.title}</h4>
                        <p className="team-member-description">{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
