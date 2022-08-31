import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


//Navigation tab
const Nav = () => {
    const { isLoggedIn, setUser } = useContext(AuthContext);
    const Navigate = useNavigate();

    const onUserLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: '#585757' }} position='static'>
                <Toolbar>
                    {!isLoggedIn && (
                            <Button
                            sx={{ color: 'white' }}
                                onClick={() => Navigate('/login')}
                            >
                                login
                            </Button>
                    )}
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        Events App
                    </Typography>
                    <Button onClick={() => Navigate('/')} color='inherit'>
                        All Guests
                    </Button>
                    <Button onClick={() => Navigate('/events')} color='inherit'>
                        Events
                    </Button>

                    {isLoggedIn && (
                        <Button color='warning' onClick={onUserLogout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Nav;
