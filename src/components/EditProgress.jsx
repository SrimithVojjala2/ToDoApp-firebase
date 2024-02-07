/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateProgress } from "../redux/CRUD/EditValue";

function EditProgress({
  id,
  progressValue,
  progressDialog,
  setprogressDialog,
}) {
  const [updateValue, setupdateValue] = useState("");

  useEffect(() => {
    setupdateValue(progressValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <>
      <Dialog open={progressDialog} onClose={() => setprogressDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
            <Typography variant="h5" style={{marginBottom: '10px'}}>
                Change to ToDo status
            </Typography>
            <Typography variant="subtitle1" style={{marginBottom:'10px'}}> 
                Please select your status
            </Typography>
          <Container>
            <Select
                fullWidth
              id="updateProgres"
              value={updateValue}
              onChange={(e) => {
                setupdateValue(e.target.value);
              }}
            >
              <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Not yet"}>Not yet</MenuItem>
            </Select>
          </Container>
        </DialogContent>
        <DialogActions style={{marginTop: '20px'}}>
          <Button
            variant="contained"
            style={{backgroundColor:'steelblue'}}
            onClick={() => {
              setprogressDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{backgroundColor:'steelblue'}}
            onClick={() => {
              updateProgress(id, updateValue);
              setprogressDialog(false);
            }}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProgress;
