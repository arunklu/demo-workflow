import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "96%",
      margin: 0,
      padding: "20px",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    label: {
      verticalAlign: "middle",
    },
    dropdown: {
      padding: 20,
      background: "#fff",
      border: "none",
    },
  })
);

export default function Dropdowncmp() {
  const classes = useStyles();
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          placeholder="Sorted By Best Match"
          className={classes.dropdown}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={null}>Sorted By Best Match</MenuItem>
          <MenuItem value={10}>Reviews</MenuItem>
          <MenuItem value={20}>Distance</MenuItem>
          <MenuItem value={30}>Estimated Delivery Time </MenuItem>
          <MenuItem value={30}>MIn Order Amount </MenuItem>
          <MenuItem value={30}>Delivery Cost</MenuItem>
          <MenuItem value={30}>Product Price </MenuItem>
          <MenuItem value={30}>Alphabetical </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
