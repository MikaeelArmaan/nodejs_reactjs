import React, { useState } from 'react'
import styles from './Login.module.scss';
import { useGoogleLogin } from '@react-oauth/google';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from '../../store';
import { AUTH_ERROR } from '../../actions/types';
import logo from '../../assets/images/logo.png';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Chip, Divider, TextField, textFieldClasses } from '@mui/material';


const Login = ({ isAuthenticated, loadUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Login with google
    // const login = useGoogleLogin({
    //     onSuccess: (res) => {
    //         loadUser(res.access_token);
    //     },
    //     onError: () => {
    //         store.dispatch({ type: AUTH_ERROR })
    //     }
    // })

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
    
        // Call your login action here
        loadUser(username, password);
      };


   // const login =  loadUser(username,password);
   if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <div className={styles.container}>
            <div className={styles['login-container']}>
                <div className={styles.logo}>
                    <img src={logo} alt='' />
                    <p>Think Future Technologies</p>
                </div>

                <p className={styles.brand}>admin <span>login</span></p>
                <Box component="form"  noValidate  sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        size="small"
                        variant='outlined'
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={styles['textField']}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        size="small"
                        variant='outlined'
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        className={styles['textField']}
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        size='medium'
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
                <Divider>
                    <Chip label="OR" color='primary' variant='outlined' />
                </Divider>
                {/* <div className={styles['google-login-btn']}>
                    <button onClick={login}><GoogleIcon /><span>Log In with Google</span></button>
                </div> */}
            </div>
            <div className={styles['login-background-image']}></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { loadUser })(Login);