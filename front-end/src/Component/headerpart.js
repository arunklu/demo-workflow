import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../store/actions/cartActions";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
import facebook from './Facebook';
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import logo from "../image/DG logo  black 2 changes (1).png";
import { Modal, Badge } from "antd";
import Login from "./Login";
import Facebook from "./Facebook";
import Google from "./Google";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },

  header: {
    color: "#000",
    background: "transparent !important",
    position: "absolute",
    margin: "auto",
    top: 0,
    boxShadow: "none",
    display: "block",
    position: "relative",
  },
  button: {
    fontFamily: "lobster",
    borderRadius: "30px",
    padding: "6px 30px",
    marginRight: 3,
    textTransform: "capitalize",
    background: "#ff9800",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    paddingLeft: "2%",
    fontFamily: "monospace",
    fontWeight: "900",
    color: "#fff",
  },
  menu: {
    color: "#000",
    fontSize: "17px",
    fontWeight: "bold",
    margin: "2px 6px",
    textDecoration: "none",
  },
  imgcss: {
    height: "50px",
    objectFit: "contain",
  },
  "@media (max-width: 667px)": {
    header: {
      display: "none",
    },
  },
});

function Headerpart(props) {
  const classes = useStyles();
  const [isLOGINModalVisible, setLoginIsModalVisible] = useState(false);
  let history = useHistory();
  const showModal = () => {
    setLoginIsModalVisible(true);
  };

  const handleOk = () => {
    setLoginIsModalVisible(false);
  };

  const handleCancel = () => {
    setLoginIsModalVisible(false);
  };
  const logout=()=>{
    localStorage.clear();
    window.location.reload(false);
  }
  // const sendhome=()=>{
  //   history.pushState("/home")
  // }
  
  return (
    <>
      <AppBar position="stiky" className={classes.header} id="headerdata">
        <Toolbar>
          <Typography variant="h6" className={classes.title} href="/">
            <img src={logo} className={classes.imgcss} />
          </Typography>
          {localStorage.getItem("id") == undefined ||
          localStorage.getItem("id") == "" ||
          localStorage.getItem("id") === null ? (
            <>
            <Button onClick={() => history.push("/Deals")}>Deals</Button> 
           
              
            <Button
              onClick={() => setLoginIsModalVisible(true)}
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Sign In
            </Button>
            
            </>
          ) : (
            <>
            <a className={classes.menu} href="/Deals">
                Deals
              </a>
              {/* <a className={classes.menu} href={"/placeorder/"+localStorage.getItem("id")}>
                Account
              </a> */}
              <a className={classes.menu} onClick={()=>logout()}>
                Logout
              </a>

              {/* { props.cart.length > 0 ? <Badge count={props.cart.length}>  <a className={classes.menu}> Cart </a></Badge> :null}
               */}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Modal
        title="Login"
        visible={isLOGINModalVisible}
       
        style={{height:'100%'}}
        //footer={null}
         onOk={handleOk} onCancel={handleCancel}
      >
        <Login onCancel={handleCancel} />
    <hr />
    <p style={{textAlign:'center',fontWeight:'bold'}}>Login With SocialMedia</p>
        <p style={{textAlign:'left'}}>
                    <span><Google /></span><br /><span style={{textAlign:'center'}}><Facebook /></span>
              </p>

              
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    updateToCart: (productId) => {
      dispatch(updateCartQuantity(productId));
    },
    removeTocart: (productId) => {
      dispatch(removeFromCart(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Headerpart);
