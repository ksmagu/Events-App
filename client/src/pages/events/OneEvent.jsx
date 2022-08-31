import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../nav/Nav';

//One specific event guests
const OneEvent = () => {
    const { id, title } = useParams();
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URI}event/guest/${Number(id)}`
                );
                const data = await response.json();
                console.log(data)
                setEventData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, [id]);

    return (
        <>
        <Nav/>
        <h1 className='container'>Guests attending {title} </h1>
       <div className='container'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventData.map(
                            ({
                                id,
                                email,
                                name,
                                surname,
                                DOB,
                            }) => {
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{email}</td>
                                        <td>{name}</td>
                                        <td>{surname}</td>
                                        <td>{DOB}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            </>
    );
};

export default OneEvent;
