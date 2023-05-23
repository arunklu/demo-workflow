import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import emptycart from "../image/empty-cart.png";
import Grid from "@material-ui/core/Grid";
import "./menulist.css";
import Cartproduct from "./CartProduct";
import Leftbar from "./Leftbar";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function a11yProps1(index) {
  return {
    id: `vertical-tab1-${index}`,
    "aria-controls": `vertical-tabpanel1-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "100%",
  },
  tab: {
    width: "100%",
    height: "120px",
  },
  heading: {
    fontWeight: "bold",
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid lg={4}>
          <Leftbar />
        </Grid>
        {/* <Grid lg={4}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
      
         
        <Tab label={<Menucard/>} {...a11yProps(1)}  />
        <Tab label={<Menucard />} {...a11yProps(2)} />
        <Tab label={<Menucard />} {...a11yProps(3)} />
        <Tab label={<Menucard />}{...a11yProps(4)} />
        <Tab label={<Menucard />} {...a11yProps(5)} />
        <Tab label={<Menucard />} {...a11yProps(6)} />
      </Tabs>
      </Grid >
      <Grid lg={4}>
      <TabPanel value={value} index={0}>
      <Menucard />


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Chicken Beast1</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <Chickenlist />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Chicken Beast1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Chickenlist />
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Chicken Beast1</Typography>
        </AccordionSummary>
      </Accordion>







      </TabPanel>
      <TabPanel value={value} index={1}>
        
      <Menucard />


<Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography className={classes.heading}>Chicken Beast1</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <Chickenlist />
  </AccordionDetails>
</Accordion>
<Accordion>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel2a-content"
    id="panel2a-header"
  >
    <Typography className={classes.heading}>Chicken Beast1</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <Chickenlist />
  </AccordionDetails>
</Accordion>
<Accordion >
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel3a-content"
    id="panel3a-header"
  >
    <Typography className={classes.heading}>Chicken Beast1</Typography>
  </AccordionSummary>
  <AccordionDetails>
  <Chickenlist />
  </AccordionDetails>
</Accordion>








      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      </Grid> */}
      </Grid>
      <div lg={4}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Delivery" {...a11yProps(1)} />
          <Tab label="Collection" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={value} index={1}>
          <img src={emptycart} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Cartproduct />
        </TabPanel>
      </div>
    </div>
  );
}
