import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../nav/Nav';

const UpdateGuest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [guestData, setGuestData] = useState({
        email: '',
        name: '',
        surname: '',
        DOB: '',
    });

    //Fetch specific guest by id 
    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URI}guest/${Number(id)}`
                );
                const data = await response.json();
                setGuestData((prev) => ({
                    ...prev,
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    DOB: data.DOB,
                }));
            } catch (err) {
                console.log(err);
            }
        };
        fetchGuests();
    }, [id]);

    const onFormSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email: guestData.email,
            name: guestData.name,
            surname: guestData.surname,
            DOB: guestData.DOB,
        };
        try {
            //Update Guest
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}guest/${Number(id)}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            if (data.err) return alert('User is not updated!');
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
                    <h2>Update Guest</h2>
                    <form onSubmit={onFormSubmit}>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={(event) =>
                                setGuestData((prev) => ({
                                    ...prev,
                                    email: event.target.value,
                                }))
                            }
                            value={guestData.email}
                            required
                        />
                        <input
                            type='text'
                            name='name'
                            id='name'
                            onChange={(event) =>
                                setGuestData((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                }))
                            }
                            value={guestData.name}
                            required
                        />
                        <input
                            type='text'
                            name='surname'
                            id='surname'
                            onChange={(event) =>
                                setGuestData((prev) => ({
                                    ...prev,
                                    surname: event.target.value,
                                }))
                            }
                            value={guestData.surname}
                            required
                        />
                        <input
                            type='text'
                            name='DOB'
                            id='DOb'
                            onChange={(event) =>
                                setGuestData((prev) => ({
                                    ...prev,
                                    DOB: event.target.value,
                                }))
                            }
                            value={guestData.DOB}
                            required
                        />
                        <button type='submit'>Update</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateGuest;
