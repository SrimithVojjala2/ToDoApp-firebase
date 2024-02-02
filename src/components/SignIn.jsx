import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
// import { useState } from 'react';
import { Login,signInWithGoogle } from "../redux/Auth/Login.jsx";
import { useState } from "react";
import GoogleIcon from "../images/GoogleIcon.svg";
import { Alert } from "@mui/material";
const defaultTheme = createTheme();

export default function SignIn() {
  const [disableButton, setdisableButton] = useState(false);
  const [error,seterror] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    seterror('')
    setdisableButton(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const response = await Login({ email, password });
    if(response !== undefined){
      seterror(response)
      console.error(response);
    }
    setdisableButton(false);
  };

  const styles = {
    link: {
      fontSize: "16px",
      fontWeight: "500",
      textDecoration: "underline",
      color: "steelblue",
    },
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
          {/* {error && <Alert severity='error'>{error}</Alert>} */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error !== '' && <Alert severity="error" style={{marginTop:'10px',marginBottom:'10px'}}>{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              {disableButton ? "Logging in..." : "Sign In"}
            </Button>
          </Box>
          <Box display={"flex"} flexDirection={"column"} marginTop={"20px"}>
            <Typography
              variant="body1"
              color={"steelblue"}
              style={{ fontWeight: "500" }}
            >
              Sign in with other ways ?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={signInWithGoogle}
            >
              <img
                src={GoogleIcon}
                alt="Google"
                style={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "max-width",
                  boxShadow: "1px 2px 2px 2px rgb(210, 212, 210)",
                  cursor:'pointer'
                }}
              />
            </div>
          </Box>
          <NavLink style={{ ...styles.link }} to="/signup">
            create new user?
          </NavLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
