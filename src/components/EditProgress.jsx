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
        <DialogActions>
          <Button
            onClick={() => {
              setprogressDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
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
