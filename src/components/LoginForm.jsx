import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from './hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [error, setError] = useState(false);
    const URL = 'https://test.v5.pryaniky.com'
    const authURL = `${URL}/ru/data/v3/testmethods/docs/login`

    const navigate = useNavigate()
    const location = useLocation()
    const { signIn } = useAuth()
    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = {
            user: form.userName.value,
            password: form.userPassword.value,
        }


        try {

            let response = await fetch(authURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            let resp = await response.json();

            if (resp.error_code === 0) {
                signIn(data.user, resp.data.token, () => navigate(fromPage, { replace: true }));
            } else {
                setError(true);
                setTimeout(() => setError(false), 2000)

            }
        } catch (error) {
            setError(true);
            setTimeout(() => setError(false), 2000)
        }


    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                // sx={{ color: error ? 'error.main' : 'primary.main' }}
            >
                Login
            </Typography>
            <TextField
                name="userName"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                    '& .MuiInputLabel-root': { color: error ? 'error.main' : 'text.secondary' }, // Цвет метки
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: error ? 'error.main' : 'text.secondary' }, // Цвет границы
                        '&:hover fieldset': { borderColor: error ? 'error.main' : 'primary.main' }, // Цвет границы при наведении
                        '&.Mui-focused fieldset': { borderColor: error ? 'error.main' : 'primary.main' } // Цвет границы при фокусе
                    },
                    '& .MuiInputBase-input': { color: error ? 'error.main' : 'text.primary' } // Цвет текста
                }}
            />
            <TextField
                name="userPassword"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                    '& .MuiInputLabel-root': { color: error ? 'error.main' : 'text.secondary' }, // Цвет метки
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: error ? 'error.main' : 'text.secondary' }, // Цвет границы
                        '&:hover fieldset': { borderColor: error ? 'error.main' : 'primary.main' }, // Цвет границы при наведении
                        '&.Mui-focused fieldset': { borderColor: error ? 'error.main' : 'primary.main' } // Цвет границы при фокусе
                    },
                    '& .MuiInputBase-input': { color: error ? 'error.main' : 'text.primary' } // Цвет текста
                }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign In
            </Button>
        </Box>
    );
}

export default LoginForm;