import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { Login } from '../redux/Auth/Login.jsx';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  const [disableButton,setdisableButton] = useState(false)
  const handleSubmit =async (event) => {
    event.preventDefault();
    setdisableButton(true)
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    await Login({email,password})
    setdisableButton(false)
  };
  const styles ={
    link:{
      marginTop: '10px', 
      fontSize: '16px',
      fontWeight:'500',
      textDecoration:'none',
      color:'steelblue',
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* {error && <Alert severity='error'>{error}</Alert>} */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableButton}
            >
              { disableButton ? 'Logging in...' : 'Sign In' }
            </Button>
          </Box>
          <NavLink style={{...styles.link}} to='/signup'>create new user?</NavLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
}