import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import './login.css';
import Nav from '../nav/Nav';

//Login into the app
const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}login`,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            if (data.err) return alert(data.err);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            <Nav />
            <div className='container'>
                <div className='form-container'>
                    <h2>Login to add Guests</h2>
                    <form onSubmit={onFormSubmit}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            id='email'
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    email: event.target.value,
                                }))
                            }
                            value={userData.email}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            id='password'
                            value={userData.password}
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    password: event.target.value,
                                }))
                            }
                            required
                        />
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
