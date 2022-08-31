import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { useNavigate} from 'react-router-dom';
import Register from '../register/Register';
import Nav from '../nav/Nav';

import './events.css';

// All events from database
const Events = () => {
    const Navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URI}events`
                );
                const data = await response.json();
                setEvents(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
        <Nav/>
            <h2 className='container'>Upcoming Events</h2>
            <div className='output'>
                {events.map((event) => (
                    <div className='event-card'>
                        <div className='image'>
                            <img src={event.image} alt='pic' />
                        </div>
                        <h1>{event.id}</h1>
                        <h2 key={event.id}>{event.title}</h2>
                        <p>Date: {event.date}</p>
                        {isLoggedIn && (<button className='button' onClick={() => Navigate(`/events/${event.id}/${event.title}`)}>Check who's coming!</button>)}
                    </div>
                ))}
                <Register />
            </div>
        </>
    );
};

export default Events;
