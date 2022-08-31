import React, {useState, useContext } from 'react';
import { AuthContext } from '../../App';
import {useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './register.css';


//Register Guest to the event
const Register = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        events_id: '',
        name: '',
        surname: '',
        email: '',
        DOB: '',
    });

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}register`,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            if (data.err) return alert('User is not created!');
            navigate('/');
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
      <div className='container'>
        {isLoggedIn && (<div className='form-container-register'>
            {/* <Link to='/'>Back to Guests</Link> */}
            <h2 className='event'>Register Guest to the Event!</h2>
            <form onSubmit={onFormSubmit}>
                <input
                    type='number'
                    name='Event ID'
                    placeholder='Event ID'
                    id='event'
                    onChange={(event) =>
                        setUserData((prev) => ({
                            ...prev,
                            events_id: event.target.value,
                        }))
                    }
                    value={userData.events_id}
                    required
                />
                <input
                    type='text'
                    name='name'
                    placeholder='Guest Name'
                    id='name'
                    onChange={(event) =>
                        setUserData((prev) => ({
                            ...prev,
                            name: event.target.value,
                        }))
                    }
                    value={userData.name}
                    required
                />
                <input
                    type='text'
                    name='surname'
                    placeholder='Guest Surname'
                    id='surname'
                    onChange={(event) =>
                        setUserData((prev) => ({
                            ...prev,
                            surname: event.target.value,
                        }))
                    }
                    value={userData.surname}
                    required
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Guest Email'
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
                    type='text'
                    name='DOB'
                    placeholder='Date of birth Y-M-D'
                    id='DOB'
                    onChange={(event) =>
                        setUserData((prev) => ({
                            ...prev,
                            DOB: event.target.value,
                        }))
                    }
                    value={userData.DOB}
                    required
                />
                <Button type='submit' variant='secondary' size='lg'>
                    Register
                </Button>
            </form>
            </div>)}
        
        </div>
        </>
    );
};

export default Register;
