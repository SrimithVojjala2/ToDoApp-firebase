import { Box, Button, Popover, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { Auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const Logout = async () => {
    try {
      await signOut(Auth).then(() => navigate("/signin"));
    } catch (err) {
      alert(err.message);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "steelblue",
          fontSize: "26px",
          color: "white",
        }}
        maxWidth
      >
        <Typography style={{ fontSize: "25px", marginLeft: "20px" }}>
          ToDoApp
        </Typography>
        <Box
          marginLeft={"auto"}
          marginRight={"40px"}
          border={"2px solid white"}
          padding={"9px"}
          height={"35px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
          variant="contained"
          style={{ marginLeft: "auto" }}
          onClick={handleClick}
        >
          v
        </Box>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          style={{marginTop:'6px'}}
        >
          <div style={{ padding: "10px" }}>
            <Button onClick={Logout}>Logout</Button>
          </div>
        </Popover>
      </Box>
    </>
  );
};

export default Header;
