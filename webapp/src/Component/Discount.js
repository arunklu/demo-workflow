import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Collapse, Space, Avatar, Tag, Button } from "antd";
import { DownloadOutlined, AlignLeftOutlined } from "@ant-design/icons";
import filter from "../image/filter.png";
const { Panel } = Collapse;
const useStyles = makeStyles({
  cardpadding: {
    margin: "7px 20px !important",
    width: "90%",
    background: "transparent",
    boxShadow: "none",
    textAlign: "left",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 14,
  },
  carddata: {
    padding: "5px 4px",
    marginTop: "20px",
  },
  headingdatapart: {
    paddingLeft: 20,
    paddingBottom: 6,
    width: "100%",
    textAlign: "left",
    margin: "13px 0",
    fontWeight: 900,
  },
  headingdesign: {
    background: "#fff",
    borderRadius: "9px 9px 0 0",
    borderBottom: "none",
    minHeight: 37,
    boxShadow: "0px 0px 1px 1px #af9b9b",
  },
  headingdesign2: {
    background: "#fff",
    borderRadius: 9,
    minHeight: 37,
    boxShadow: "0px 0px 1px 1px #af9b9b",
  },
  headingdesign1: {
    background: "#fff",
    borderRadius: "0 0 9px 9px",
    minHeight: 37,
    borderTop: "none",
    boxShadow: "0px 0px 1px 1px #af9b9b",
  },
});
export default function Discount(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    gender: "",
  });
  const [value, setValue] = React.useState(0);
  const [charge, setcharge] = useState(null);
  const [cuisine, setcuisine] = useState(null);
  const [distance, setdistance] = useState(null);
  const [status, setstatus] = useState(false);
  const [status1, setstatus1] = useState(false);
  const [status2, setstatus2] = useState(false);
  const [status3, setstatus3] = useState(false);
  const [status4, setstatus4] = useState(false);
  const [status5, setstatus5] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
    props.minimumorder(event.target.value);
  };

  const [Price, setPrice] = React.useState(0);

  const handlePrice = (event) => {
    setPrice(event.target.value);
    props.discount(Price, Discount, value, Rate);
  };
  const handlecharge = (event) => {
    setcharge(event.target.value);
    props.handlecharges(event.target.value);
  };

  const handledistance = (event) => {
    setdistance(event.target.value);
  };
  const handlecuisine = (event) => {
    //alert(event.target.value);
    setcuisine(event.target.value);
    props.handlecuisine(event.target.value);
  };
  const [Discount, setDiscount] = React.useState(0);

  const handleDiscount = (event) => {
   // alert(event.target.value);
    setDiscount(event.target.value);
    props.discount(Price, event.target.value, value, Rate);
  };

  const [Rate, setRate] = React.useState(0);

  const handleRate = (event) => {
    setRate(event.target.value);
    // //console.log(event.target.value);
    props.discount(Price, Discount, value, Rate);
  };

  const setGender = (event) => {
    //console.log(event.target.value);
    setValues({ ...values, gender: event.target.value });
    //console.log(values);
  };

  const Resetdata = () => {
    setPrice(0);
    setValue(0);
    setDiscount(0);
    setRate(0);
    props.discount(Price, Discount, value, Rate);
  };
  return (
    <>
      <h3 className={classes.headingdatapart}>
        <Avatar src={filter} size={30} />
        &nbsp; Filters{" "}
        <Button
          type="bordered"
          style={{ float: "right", marginRight: 20, borderRadius: 5 }}
          onClick={() => Resetdata()}
        >
          <b>Reset</b>
        </Button>
      </h3>
      {/* <h3 className={classes.headingdatapart}>
        Total {props.count == null ? 0 : props.count} Restaurant match
      </h3> */}

      {/* <Space direction="vertical">
    <Collapse collapsible="header" defaultActiveKey={['1']}>
      <Panel header="This panel " key="1">
        <p>sdfsdfsdfsdfsdf  sdfsdf s df sdfsd fsdf sd fsd fsdfsd fsd </p>
      </Panel>
    </Collapse>
    <Collapse >
      <Panel header="This panel can't be collapsed" key="1">
        <p>sdfsd fsdfsd fsdfsd fsd f sd fsd fsd fsd fsd fsd fs d fsdf</p>
      </Panel>
    </Collapse>
  </Space> */}

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus(!status)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Minimum Order </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup name="value" value={value} onChange={handleChange}>
                <FormControlLabel value="5" control={<Radio />} label=" 5" />
                <FormControlLabel value="10" control={<Radio />} label=" 10" />
                <FormControlLabel value="20" control={<Radio />} label=" 20" />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion className={classes.cardpadding}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.headingdesign}
        >
          <Typography className={classes.heading}> Price </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form">
            <FormControl>
              <RadioGroup name="price" value={Price} onChange={handlePrice}>
                <FormControlLabel
                  value="100"
                  control={<Radio />}
                  label="0 to 100"
                />
                <FormControlLabel
                  value="200"
                  control={<Radio />}
                  label="100 to 200"
                />
                <FormControlLabel
                  value="300"
                  control={<Radio />}
                  label="200 to 300"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion> */}

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus1(!status1)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status1 == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Discount & Saving</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup
                name="discount"
                value={Discount}
                onChange={handleDiscount}
              >
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="    5%  "
                />
                <FormControlLabel
                  value="10"
                  control={<Radio />}
                  label="    10%   "
                />
                <FormControlLabel
                  value="15"
                  control={<Radio />}
                  label="   15%   "
                />
                <FormControlLabel
                  value="20"
                  control={<Radio />}
                  label="   20%   "
                />
                <FormControlLabel
                  value="25"
                  control={<Radio />}
                  label="   25%   "
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus2(!status2)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status2 == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Customer Rating</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup name="Rate" value={Rate} onChange={handleRate}>
                <FormControlLabel value="1" control={<Radio />} label="   1" />
                <FormControlLabel value="2" control={<Radio />} label="   2" />
                <FormControlLabel value="3" control={<Radio />} label="   3" />
                <FormControlLabel value="4" control={<Radio />} label="    4" />
                <FormControlLabel value="5" control={<Radio />} label="   5" />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus3(!status3)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status3 == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Delivery Charges</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup name="Charges" value={charge} onChange={handlecharge}>
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="   No Charge"
                />
                <FormControlLabel value="1" control={<Radio />} label="   1" />
                <FormControlLabel value="2" control={<Radio />} label="   2" />
                <FormControlLabel value="3" control={<Radio />} label="   3" />
                <FormControlLabel value="4" control={<Radio />} label="    4" />
                <FormControlLabel value="5" control={<Radio />} label="   5" />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus4(!status4)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status4 == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Distance</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup
                name="Distance"
                value={distance}
                onChange={handledistance}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="   1 miles"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="   2 miles"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="   3 miles"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="    4 miles"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="   5 miles"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={classes.cardpadding}
        onClick={() => setstatus5(!status5)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={
            status5 == false ? classes.headingdesign2 : classes.headingdesign
          }
        >
          <Typography className={classes.heading}>Cuisines</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.headingdesign1}>
          <Box component="form">
            <FormControl>
              <RadioGroup
                name="Cuisine"
                value={cuisine}
                onChange={handlecuisine}
              >
                {props.cuisines != null &&
                  props.cuisines.map((data) => (
                    <FormControlLabel
                      value={data.name}
                      control={<Radio />}
                      label={"   " + data.name}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
