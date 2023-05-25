import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import "./chickenproduct.css";
const useStyles = makeStyles({
  btnclass: {
    borderRadius: "60%",
    width: "30px",
    verticalAlign: "middle",
    paddingRight: 5,
  },
  btnicon: {
    fontSize: 18,
    background: "orange",
    borderRadius: 10,
    margin: 4,
  },
  radiofield: {
    display: "grid !important",
  },
  mainclass: {
    width: "100%",
    padding: 10,
    paddingBottom: 0,
    borderBottom: ".5px solid #e3e3e3",
  },
  floatleft: {
    float: "left",
    width: "49%",
    textAlign: "left",
  },
  floatright: {
    float: "right",
    width: "49%",
    textAlign: "right",
  },
  lefttext: {
    fontWeight: 600,
    fontSize: 17,
  },
  righttext: {
    fontWeight: 500,
    fontSize: 13,
    paddingTop: 5,
  },
});

export default function Chickenproduct(props) {
  const [value, setValue] = useState("female");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement1 = () => {
    setCount1((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement1 = () => {
    if (count1 > 0) {
      setCount1((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement2 = () => {
    setCount2((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement2 = () => {
    if (count2 > 0) {
      setCount2((prevCount) => prevCount - 1);
    }
  };
  return (
    <>
      <FormControl className={classes.radiofield} component="fieldset">
        <FormLabel component="legend" className="producthead">
          <span className={classes.lefttext} variant="subtitle2">
            {props.name}
          </span>
          <br />
          <span className={classes.righttext} variant="overline">
            {props.desc}
          </span>{" "}
        </FormLabel>

        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          {props.addon != null &&
            props.addon.map((data) => (
              <span className={classes.mainclass}>
                <span className={classes.floatleft}>
                  {" "}
                  <FormControlLabel
                    value={data.addon_name}
                    control={<Radio />}
                    label={data.addon_name}
                  />
                </span>{" "}
                <span className={classes.floatright}>
                  <span className={classes.btnclass}>
                    <AddIcon
                      onClick={handleIncrement}
                      className={classes.btnicon}
                    />
                  </span>
                  <span className={classes.btnclass}>{count}</span>
                  <span className={classes.btnclass}>
                    <RemoveIcon
                      onClick={handleDecrement}
                      className={classes.btnicon}
                    />
                  </span>
                  {data.addon_price !== "0.00" ? "$ " + data.addon_price : null}
                </span>
              </span>
            ))}

          {/* <span className={classes.mainclass} >
                   <span className={classes.floatleft}>
                    <FormControlLabel value="male" control={<Radio />} label="Very Hot Jerk" /></span> <span className={classes.floatright}>
                    <span className={classes.btnclass} >
                    <AddIcon  onClick={handleIncrement1} className={classes.btnicon}/>
                        </span>
                        <span className={classes.btnclass}>
                        {count1}
                        </span>
                        <span  className={classes.btnclass}>
                        <RemoveIcon onClick={handleDecrement1} className={classes.btnicon}/>
                        </span>
                        $26</span>
                   </span>
                   <span className={classes.mainclass} >
                   <span className={classes.floatleft}>
                    <FormControlLabel value="other" control={<Radio />} label="Hot Jerk" /></span> <span className={classes.floatright}>
                        
                    <span className={classes.btnclass} >
                    <AddIcon onClick={handleIncrement2}  className={classes.btnicon}/>
                        </span>
                        <span className={classes.btnclass}>
                        {count2}
                        </span>
                        <span  className={classes.btnclass}>
                        <RemoveIcon onClick={handleDecrement2} className={classes.btnicon}/>
                        </span>
                        $26</span>
                   </span> */}
        </RadioGroup>
      </FormControl>
    </>
  );
}
