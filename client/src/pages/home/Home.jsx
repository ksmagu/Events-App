import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import './home.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCreate, MdOutlineDeleteForever, MdEvent } from 'react-icons/md';
import Nav from '../nav/Nav';

const Home = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    // Fetch guests
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URI}guests`
                );
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    //Delete Guest
    const onDelete = async (id) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}guest/${id}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await response.json();
            if (data.affectedRows > 0) {
                setUsers((prev) => prev.filter((user) => user.id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Nav />
            <h1 className='container'>All Guests</h1>
            <div className='container'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            {isLoggedIn && <th>Email</th>}
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Date of Birth</th>
                            <th>Event</th>
                            <th>Event date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            ({
                                id,
                                email,
                                name,
                                surname,
                                DOB,
                                title,
                                date,
                            }) => {
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        {isLoggedIn && <td>{email}</td>}
                                        <td>{name}</td>
                                        <td>{surname}</td>
                                        <td>{DOB}</td>
                                        <td>{title}</td>
                                        <td>{date}</td>

                                        {isLoggedIn && (
                                            <td>
                                                <Button
                                                    variant='Light'
                                                    size='sm'
                                                >
                                                    <Link to={`/update/${id}`}>
                                                        <MdCreate />
                                                    </Link>
                                                </Button>
                                            </td>
                                        )}
                                        {isLoggedIn && (
                                            <td>
                                                <Button
                                                    variant='danger'
                                                    size='sm'
                                                    onClick={() => onDelete(id)}
                                                >
                                                    <MdOutlineDeleteForever />
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            <div className='icon'>
                <MdEvent />
            </div>{' '}
            <Link className='alink' to='/events'>
                Check out all Events!
            </Link>
            <p className='footer'>@ Copyright 2022 Kristina</p>

        </div>
    );
};

export default Home;
