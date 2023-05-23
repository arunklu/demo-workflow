// import React from "react";
// import { makeStyles, Theme } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Avatar from "@material-ui/core/Avatar";
// import img from "../image/img2.jpg";
// import Header from "./Aboutheader";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: any) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: "flex",
//     height: 224,
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//   },
//   borderrot: {
//     background: "#fff",
//   },
//   root: {
//     width: "100%",
//     maxWidth: "100%",
//     backgroundColor: theme.palette.background.paper,
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

// export default function Profile() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//   };
//   return (
//     <>
//       <Header />

//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         className={classes.tabs}
//       >
//         <Tab
//           label={
//             <ListItem button>
//               <ListItemIcon>
//                 <AddShoppingCartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Id" />
//             </ListItem>
//           }
//           {...a11yProps(0)}
//         />
//         <Tab
//           label={
//             <ListItem button>
//               <ListItemIcon>
//                 <ShoppingCartIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order Name" />
//             </ListItem>
//           }
//           {...a11yProps(1)}
//         />
//         <Tab
//           label={
//             <ListItem button>
//               <ListItemIcon>
//                 <LocationOnIcon />
//               </ListItemIcon>
//               <ListItemText primary="Location" />
//             </ListItem>
//           }
//           {...a11yProps(2)}
//         />
//         <Tab
//           label={
//             <List
//               component="nav"
//               aria-labelledby="nested-list-subheader"
//               //   subheader={
//               //     <ListSubheader component="div" id="nested-list-subheader">
//               //       Nested List Items
//               //     </ListSubheader>
//               //   }
//               className={classes.root}
//             >
//               <ListItem button onClick={handleClick}>
//                 <ListItemIcon>
//                   <AccountCircleIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Edit Profile" />
//                 {open ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={open} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem button className={classes.nested}>
//                     <ListItemIcon>
//                       {/* <StarBorder /> */}
//                       <Avatar src={img} />
//                     </ListItemIcon>
//                     <ListItemText primary="Anish" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </List>
//           }
//           {...a11yProps(3)}
//         />
//         <Tab
//           label={
//             <ListItem button>
//               <ListItemIcon>
//                 <ExitToAppIcon />
//               </ListItemIcon>
//               <ListItemText primary="Logout" />
//             </ListItem>
//           }
//           {...a11yProps(4)}
//         />
//       </Tabs>
//       <TabPanel value={value} className={classes.borderrot} index={0}>
//         Order Id
//       </TabPanel>
//       <TabPanel value={value} className={classes.borderrot} index={1}>
//         Order Name
//       </TabPanel>
//       <TabPanel value={value} className={classes.borderrot} index={2}>
//         Location
//       </TabPanel>
//       <TabPanel value={value} className={classes.borderrot} index={3}>
//         Profile
//       </TabPanel>
//       <TabPanel value={value} className={classes.borderrot} index={4}>
//         Logout
//       </TabPanel>
//     </>
//   );
// }
