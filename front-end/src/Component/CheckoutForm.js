import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { Tabs, Radio, Card, Form, Input, Button, Select, Avatar } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

import CardSection from "./CardSection";
import { values } from "lodash";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  handleSubmit = async (event, values) => {
    event.preventDefault();
    const billingDetails = {
      name: values.name,
    };
    const { stripe, elements } = this.props;
    console.log("prpps", this.props);
    if (!stripe || !elements) {
      return;
    }
    const clientSecret = "sk_test_5GWK5P5Yoo6TU0RV6Zn5ml7b";

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details:billingDetails
    });

    if (!error) {
      console.log("token", paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("https://api.stripe.com/v1/payment_intents", {
          id,
          amount: 10,
        });
        console.log(data);

      } catch (error) {
        console.log("error",error);

      }
    }
  };

  // handleToken = async (token, addresses) => {
  //   console.log("token", token);
  //   const response = await axios.post("https://api.stripe.com/v1/charge", {
  //     token,
  //     addresses,
  //   })
  //   console.log("response",response)
  //   const { status } = response.data
  //   if (status === "success") {
  //     alert("Success! Check email for details", { type: "success" });
  //   } else {
  //     alert("Something went wrong", { type: "error" });
  //   }
  // };
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event, this.state)}>
        <CardSection />
        <Form.Item
          name="Name On Card"
          label="Name On Card"
          rules={[{ required: true }]}
        >
          <input required={true}
            style={{ width: "30vw" }}
            value={this.state.name}
            onChange={(event) => {
              this.setState({ name: event.target.value });
            }}
          />
        </Form.Item>
        <Button
          type="danger"
          htmlType="submit"
          disabled={!this.props.stripe}
          block
        >
          Payment
        </Button>
      </form>
      
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
