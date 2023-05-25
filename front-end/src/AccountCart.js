import React, { Component } from "react";
import Account from "./Component/Account";
import Cartcollection from "./Component/CartCollection";
import Grid from "@material-ui/core/Grid";
import Header from "./Component/Aboutheader";
import Footer from "./Component/footer";
export default class AccountCart extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid container lg={12}>
          <Grid lg={9}>
            <Account />
          </Grid>

          <Grid lg={3}>
            <Cartcollection />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
