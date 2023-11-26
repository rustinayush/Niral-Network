import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './portfolio.css'; // Import your CSS file for styling

const Portfolio = ({ onLogout }) => {
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // Set initial details visibility to false for all items
            const initialShowDetails = response.data.map(() => false);
            setShowDetails(initialShowDetails);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleDetails = (index) => {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index] = !updatedShowDetails[index];
        setShowDetails(updatedShowDetails);
    };

    const hideDetails = (index) => {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index] = false;
        setShowDetails(updatedShowDetails);
    };

    return (
        <div className="portfolio-container">
            <div className="topConatiner">
                <h2 >Welcome to Your Portfolio</h2>
                <button onClick={onLogout} className="logout-button">Logout</button>
            </div>

            <h2 className='user-detail-heading'>User Data of My Company</h2>
            <div className="card-container">
                {data.map((item, index) => (
                    <div className="card" key={item.id}>
                        <h2>{item.name}</h2>
                        <h3>{item.username}</h3>
                        <p>{item.email}</p>
                        {showDetails[index] ? (
                            <div>
                                <p>Address: {item.address.street}, {item.address.city}</p>
                                <p>Phone: {item.phone}</p>
                                <button className='btn' onClick={() => hideDetails(index)}>Hide Details</button>
                            </div>
                        ) : (
                            <button className='btn' onClick={() => toggleDetails(index)}>More Details</button>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
