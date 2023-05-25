import React,{useState} from "react";
import "./App.css";
import ProductList from "./Component/ProductList";
import Cart from "./Component/cart/Cart";
import Home from "./homepage";
import MarerialUIDrawer from "./Component/NewDrawer";
import About from "./About";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MenuDisk from "./MenuDisk";
import Signin from "./Signin";
import Success from "./Component/Success";
import CartCollection from "./AccountCart";
import Profile from "./Component/Profile";
import Restaurantoffer from "./Resturantoffer.js";
import { createMuiTheme } from "@material-ui/core/styles";
import Order from "./Order";
import Checkout from "./Checkout";
import { connect } from "react-redux";
import { addToHotel } from "./store/actions/cartActions";

import { Result, Button } from "antd";
import Producttrackorder from "./Producttrackorder";
import HorizontalScroll from "./HorizontalScroll";
import Teststripe from "./Teststripe";
import { Modal } from 'antd';
import Login from "./Component/Login";
import Restaurantspartner from "./Restaurantspartner";
import ValidatepartnerForm from "./Component/ValidatepartnerForm";
import homepage from "./homepage";
import Privacy from "./Component/Privacy";
import DgAboutus from "./Component/DgAboutus";
import DgDriver from "./Component/DgDriver";
import footer from './Component/footer';
import TermsConditions from './Component/TermsConditions';
import DgCookies from './Component/DgCookies';
import OfferListPage from "./Component/OfferListPage";
import Discountlist from "./Component/Discountlist";
import DeliveryOfferList from "./Component/DeliveryOfferList";
import SocialMediaLogin from "./Component/SocialMediaLogin";
import DealOffer from "./DealOffer";

import Preorderdesign from './Component/Preorderdesign'

function App() {
 
  return (
    <div className="App">
      <MarerialUIDrawer className="drawerdata" />

      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          {/* <Route exact path="/ListResturant">
            <About />
          </Route> */}
          <Route path="/ListResturant" render={(props) => <About {...props}/>}/>
          <Route
            exact
            path="/Menu/:id"
            render={(props) => <MenuDisk id={props.match.params.id} />}
          />
          <Route
            exact
            path="/Trackorder/:id"
            render={(props) => (
              <Producttrackorder utm={props.match.params.id} />
            )}
          />
          {/* <Route exact path="/Menu/:id">
            <MenuDisk />
          </Route> */}

          <Route exact path="/CartAcount">
            <CartCollection />
          </Route>
          <Route exact path="/restpartner">
            <Restaurantspartner />
          </Route>
          <Route exact path="/restpartnervalidatecuisins">
            <ValidatepartnerForm />
          </Route>
          <Route exact path="/teststripe">
            <Teststripe />
          </Route>
          <Route exact path="/scroll">
            <HorizontalScroll />
          </Route>
          <Route exact path="/Trackorder">
            <Producttrackorder />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/terms">
            <TermsConditions />
          </Route>
          <Route exact path="/aboutus">
            <DgAboutus />
          </Route>
          <Route exact path="/cookies">
            <DgCookies />
          </Route>
          <Route exact path="/driver">
            <DgDriver />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
          {/* <Route exact path="/profile">
            <Profile />
          </Route> */}
          <Route exact path="/resturantoffer">
            <Restaurantoffer />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route path="/placeorder" render={(props) => <Order {...props}/>}/>
          {/* <Route exact path="/placeorder" component={Order} /> */}
          <Route exact path="/plist" component={ProductList} />
          <Route exact path="/Deals" component={DealOffer} />
          <Route exact path="/offerlist" component={OfferListPage} />
          <Route exact path="/Dofferlist" component={Discountlist} />
          <Route exact path="/Deliveryofferlist" component={DeliveryOfferList} />  
          <Route exact path="/social" component={SocialMediaLogin} />  
          <Route path="/my-cart" component={Cart} />
          <Route exact path="/lock" component={LockScreen} />
          <Route exact path="/preorderdesign" component={Preorderdesign} />
          <Route component={NoMatch} />
        </Switch>
      </Router>

      
    </div>
  );
}

function LockScreen() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Your Screen Is Locked Please Go back to home"
        extra={
          <Link to="/home">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" Link="/">
            Back Home
          </Button>
        }
      />
      <footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    hotel: state.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToHotel: (product) => {
      dispatch(addToHotel(product));
    },
  };
};
// UPDATE_CART_QUANTITY
export default connect(mapStateToProps, mapDispatchToProps)(App);
