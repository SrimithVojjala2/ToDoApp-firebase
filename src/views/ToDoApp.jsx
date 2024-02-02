import { Box, Container, CssBaseline } from "@mui/material";
import Header from "../components/Header";
import MainBody from "../components/MainBody";
import UpperBody from "../components/UpperBody";

function ToDoApp() {
  return (
    <>
      <CssBaseline>
        <Container style={{ maxWidth: "100%" }} disableGutters>
          <Box display={"flex"} height={50}>
            <Header />
          </Box>
          <Box>
            <UpperBody />
          </Box>
        </Container>
        <Container>
          <MainBody />
        </Container>
      </CssBaseline>
    </>
  );
}

export default ToDoApp;
