import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../store/actions/cartActions";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Input, Avatar, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  header: {
    paddingBottom: "1px",
    textAlign: "left",
    fontWeight: "bold",
    margin: 1,
  },
  textpara: {
    fontSize: 13,
    textAlign: "left",
    margin: 0,
  },
  delete: {
    right: 10,
    Top: 15,
    color: "#ffc107",
    zIndex: 999,
  },
  img: {
    objectFit: "cover",
    width: "100%",
  },
  price: {
    textAlign: "center",
  },
  btnclass: {
    borderRadius: "60%",
    width: "30px",
    verticalAlign: "middle",
    float: "left",
  },
  btnicon: {
    fontSize: 18,
    background: "orange",
    borderRadius: 10,
    margin: 4,
  },
});
function CartProduct(props) {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  let addontotal = 0;
  const colors = [
    "red",
    "green",
    "#1890ff",
    "black",
    "pink",
    "#3f51b5",
    "orange",
    "#9c27b0",
    "cyan",
    "#e91e63",
    "purple",
    "#009688",
    "#4caf50",
    "#ffeb3b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "voilet",
  ];

  const [productdata, setProductdata] = useState(0);
  const [updatecart, setupdatecart] = useState([]);
  const { TextArea } = Input;
 
  const deletecartdata = (id) => {
    props.removeTocart(id);
    
  };
  
  useEffect(() => {
    //alert(props.cart.length);
    setProductdata(props.cart);
    setupdatecart(localStorage.getItem("cart"));
    // if( Object.keys(props.cart.cart).length == 0 ){
    //    props.cart.push(localStorage.getItem("cart"));
    // }
  });

  const list = useSelector((state) => state.cart.cart);
  const listKeys = Object.keys(list);
  console.log("carddata",props)
  return (
    <>
      {/* <p>{JSON.stringify(props.cartvalue)}</p> */}
      {props.cart !== null &&
        props.cart.map((data, index) => (
          window.location.pathname == "/checkout" ?  
          <Grid
            container
            lg={12}
            style={{
              marginBottom: 5,
              borderBottom: ".5px solid #e7e7e7",
              paddingLeft: 5,
              position: "relative",
            }}
          >
            <Grid lg={7} xs={7}>
              <p className={classes.header}>
                {window.location.pathname == "/checkout" ? (
                  <Badge count={data.productcount}>
                    <Avatar
                      src={
                        "https://deliveryguru.co.uk/admin/images/itemimages/" +
                        data.image
                      }
                      shape="square"
                      size={50}
                    />
                  </Badge>
                ) : (
                  data.productcount + "x"
                ) }
                &nbsp; {data.name}
              </p>
              {data.addon !== null &&
                data.addon.map((data) => (
                  <p className={classes.textpara}>
                    <span style={{marginLeft:10}}>
                 {data.quantity}{" "}{"x"}{" "}{data.value}
                    </span>
                    {/* <span style={{ float: "right" }}>{data.price}</span> */}
                  </p>
                ))}
              {/* {data.addon.length != 0 ? null : (
              <>
                <span className={classes.btnclass}>
                  <AddIcon
                    onClick={() => handleIncrement(data.id)}
                    className={classes.btnicon}
                  />
                </span>
                <span className={classes.btnclass}>{data.qty}</span>
                <span className={classes.btnclass}>
                  <RemoveIcon
                    onClick={handleDecrement}
                    className={classes.btnicon}
                  />
                </span>
              </>
            )} */}
            </Grid>
            <Grid lg={2} xs="none">
              {/* <img src={img} className={classes.img}/>  */}
            </Grid>
            <Grid lg={3} xs={5} style={{ marginTop: -15 }}>
              <h4 className={classes.header} style={{ paddingTop: 8 }}>
                &#163;{" "}
                {(
                  ((addontotal = 0),
                  parseFloat(data.amount) +
                    parseFloat(
                      data.addon != null &&
                        data.addon.reduce((count, value) => {
                          return count + parseFloat(value.price);
                        }, 0.0)
                    )) * data.productcount
                ).toFixed(2)}
                &nbsp;&nbsp;
               <span> <DeleteForeverIcon
                  onClick={(e) => deletecartdata(data.cartindex)}
                  className={classes.delete}
                /></span>
              </h4>

              {/* <span>{data.productcount} x</span> */}
            </Grid>

            <i>{data.Instruct}</i>
            <hr />
          </Grid>
          :data.hotelid == props.hotelid ?
          <Grid
            container
            lg={12}
            style={{
              marginBottom: 5,
              borderBottom: ".5px solid #e7e7e7",
              paddingLeft: 5,
              position: "relative",
            }}
          >
            <Grid lg={7} xs={7}>
              <p className={classes.header}>
                {window.location.pathname == "/checkout" ? (
                  <Badge count={data.productcount}>
                    <Avatar
                      src={
                        "https://deliveryguru.co.uk/admin/images/itemimages/" +
                        data.image
                      }
                      shape="square"
                      size={50}
                    />
                  </Badge>
                ) : (
                  data.productcount + "x"
                )}
                &nbsp; {data.name}
              </p>
              {data.addon != null &&
                data.addon.map((data) => (
                  <p className={classes.textpara}>
                    <span>
                      {/* {++addontotal}) {data.value} */}
                 {data.quantity}{" "}{"x"}{" "}{data.value}
                    </span>
                    {/* <span style={{ float: "right" }}>{data.price}</span> */}
                  </p>
                ))}
              {/* {data.addon.length != 0 ? null : (
              <>
                <span className={classes.btnclass}>
                  <AddIcon
                    onClick={() => handleIncrement(data.id)}
                    className={classes.btnicon}
                  />
                </span>
                <span className={classes.btnclass}>{data.qty}</span>
                <span className={classes.btnclass}>
                  <RemoveIcon
                    onClick={handleDecrement}
                    className={classes.btnicon}
                  />
                </span>
              </>
            )} */}
            </Grid>
            <Grid lg={2} xs="none">
              {/* <img src={img} className={classes.img}/>  */}
            </Grid>
            <Grid lg={3} xs={5} style={{ marginTop: -15 }}>
              <h4 className={classes.header} style={{ paddingTop: 8 }}>
                &#163;{" "}
                {(
                  ((addontotal = 0),
                  parseFloat(data.amount) +
                    parseFloat(
                      data.addon != null &&
                        data.addon.reduce((count, value) => {
                          return count + parseFloat(value.price);
                        }, 0.0)
                    )) * data.productcount
                ).toFixed(2)}
                &nbsp;&nbsp;
                <DeleteForeverIcon
                  onClick={() => deletecartdata(data.cartindex)}
                  className={classes.delete}
                />
              </h4>

              {/* <span>{data.productcount} x</span> */}
            </Grid>
            {data.Instruct && data.Instruct.length > 0 ? <i><span>Note{":"}</span>{" "}{data.Instruct}</i> : null}
           
            <hr />
          </Grid>
          :localStorage.clear()
        ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
