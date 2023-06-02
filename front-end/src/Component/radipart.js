import React from "react";
import {
  Paper,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

export default function radipart() {
  return (
    <>
      <Paper component={Box} className="cspacecard">
        <Box component="form">
          <FormControl>
            <h3>Minimum Order Amount</h3>
            <RadioGroup value="gender">
              <FormControlLabel
                label="5     10"
                control={<Radio />}
                value="male"
              />
              <FormControlLabel
                label="10     20"
                control={<Radio />}
                value="female"
              />
              <FormControlLabel
                label="30     40"
                control={<Radio />}
                value="other"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    </>
  );
}
