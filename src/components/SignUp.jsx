import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { Auth } from "../config/firebase";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const defaultTheme = createTheme();

export default function SignUp() {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const [error,seterror] = useState('')

  const handleSubmit =async (event) => {
    event.preventDefault();
    seterror('')
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try{
    await createUserWithEmailAndPassword(Auth,email,password)
    .then(() => navigate('/'))
    }catch(err){
      seterror(err.message)
      console.error(err.message);
    }
    setLoading(false)
  };

  const styles ={
    link:{
      marginTop: '10px', 
      fontSize: '16px',
      fontWeight:'500',
      textDecoration:'none',
      color:'steelblue',
      '&:hover':{color:'red'}
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error!=='' && <Alert severity="error" style={{marginTop:'10px',marginBottom:'10px'}}>{error}</Alert>}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' :'Sign Up'}
            </Button>
          </Box>
          <NavLink style={{...styles.link}} to='/signin'>Already a user   ?</NavLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
