import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../store/actions/cartActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import img from "../image/DG logo  black 2 changes (1).png";
import { useHistory } from "react-router-dom";
import { Badge, Popover, Button } from "antd";
import { Route, Redirect } from 'react-router'
import CartProduct from "./CartProduct";
import { ShoppingCartOutlined } from "@ant-design/icons";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  header: {
    color: "#000",
    background: "#fff",
    position: "relative",
    top: 0,
    boxShadow: "none",
    display: "block",
  },
  button: {
    fontFamily: "lobster",
    borderRadius: "12px",
    marginRight: 3,
    textTransform: "capitalize",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontFamily: "monospace",
    fontWeight: "900",
    color: "#fff",
  },
  "@media (max-width: 667px)": {
    header: {
      display: "none",
    },
  },
  menu: {
    color: "#000",
    fontSize: "17px",
    fontWeight: "bold",
    margin: "2px 6px",
    textDecoration: "none",
  },
  serchplace: {
    marginLeft: "89px",
  },
});

function Headerpart(props) {
  const classes = useStyles();
  let history = useHistory();

  const logout=()=>{
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
  }
  return (
    <>
      <AppBar position="stiky" className={classes.header} id="headerdata">
        <Toolbar>
          <img
            src={img}
            style={{ objectFit: "contain" }}
            onClick={() => history.push("/home")}
          />
          <Typography variant="h4" className={classes.title}></Typography>

          <a className={classes.menu} href="/">
            Home
          </a>

          <a className={classes.menu} onClick={()=>logout()}  >
                Logout
              </a>
          {props.cart.length > 0 ? (
            <Badge count={props.cart.length}>
              {" "}
              <Popover
                placement="bottom"
                title={
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    Cart Items
                  </p>
                }
                content={
                  <>
                    <CartProduct cartvalue={props.cart} />
                    <Button
                      type="danger"
                      onClick={() => history.push("/checkout")}
                      block
                    >
                      Checkout
                    </Button>
                  </>
                }
                trigger="click"
              >
                <a className={classes.menu}>
                  {" "}
                  Cart <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                </a>
              </Popover>
            </Badge>
          ) : null}
        </Toolbar>
      </AppBar>
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
