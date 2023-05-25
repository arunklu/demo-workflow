import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button ,Modal} from "antd";
import { connect } from "react-redux";
import { addName } from "../store/actions/cartActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import { Alert, Typography } from "antd";
const { Title, Text } = Typography;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://deliveryguru.co.uk">
        DeliveryGuru
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  inputlog: {
    width: "100%",
    marginTop: 20,
  },
}));

function Login(props) {
  let history = useHistory();
  const classes = useStyles();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpvalue, setOtpvalue] = useState(0);
  const [btnname, setBtnname] = useState("LOGIN");
  const [message, setmessage] = useState(null);

  const makeAPICall = () => {
    if (mobile.length === 10) {
      //console.log("make api");
      const apiUrl = "https://deliveryguru.co.uk/dg_api/sms.php";
      fetch(apiUrl, {
        method: "POST",
        body: { to: "44" + mobile },
      })
        .then((response) => {
          setmessage("OTP successfully send on your mobile number");
          setOtp(true);
          setBtnname("Verify Otp");
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  };

  const verifyOtp = () => {
    //console.log("otp api");
    //console.log(mobile)

    const apiUrl =
      "https://deliveryguru.co.uk/dg_api//verifyotp/44" + mobile;
    console.log(apiUrl);
    fetch(apiUrl, {
      method: "get",
      // body: { to: "44" + mobile },
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // }
    })
    .then((res) => res.json())
      .then((response) => {
        
        // console.log(response);
        // props.onCancel();
        // localStorage.setItem("id", 55);
        // localStorage.setItem("name", "test23");
        // localStorage.setItem("email", "test@test.com");
        // localStorage.setItem("number", "7574344346");
        // localStorage.setItem("id", response.data[0].id);
        // localStorage.setItem("name", response.data[0].first_name);
        // localStorage.setItem("email", response.data[0].email);
        // localStorage.setItem("number", response.data[0].mobile);
       // history.push("/home");

       if(response[0].otp === otpvalue){
        props.onCancel();
        setBtnname("LOGIN");
       
        localStorage.setItem("id", response[0].id);
        localStorage.setItem("name", response[0].first_name);
        localStorage.setItem("email", response[0].email);
        localStorage.setItem("number", response[0].mobile);
        setMobile("");
        window.location.reload(false);
       }else{
         setmessage(<span style={{color:"red"}}>Your OTP is not correct. Please enter a valid OTP</span>)
         
       }
        
       
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const onClose = (e) => {
    //console.log(e, "I was closed.");
  };
  //verifyotp/0447574344346
  // const verifyOtp = async () => {
  //   axios
  //     .get("dg_api/verifyotp/44" + mobile)
  //     .then((response) => {
  //       if (response.data[0].otp == otpvalue) {
  //         history.push("/home");
  //       }
  //     })
  //     .catch((error) => {});
  // };

  return (
    <div>
      <Container component="main">
        <CssBaseline />
        <div
          style={{
            maxWidth: "100%",
            textAlign: "left",
            margin: "auto",
          }}
        >
          <p></p>
          {message != null ? (
            <Alert
              message={message}
              type="success"
              closable
              onClose={onClose}
            />
          ) : null}
          <p></p>

          <Title level={2}>Login</Title>
          <Title level={5}>
            We will send you One Time Password on your phone number
          </Title>
        </div>
        <div>
          <form>
            <TextField
              variant="outlined"
              required
              className={classes.inputlog}
              fullWidth
              inputProps={{
                maxLength: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography style={{ fontWeight: 900 }}>44</Typography>
                  </InputAdornment>
                ),
               
              }}
            //   onInput = {(e) =>{
            //     e.target.value = Math.max(0, parseInt(e.target.value == NaN ? 0 : e.target.value) ).toString().slice(0,10)
            //     setMobile(e.target.value == NaN ? 0 : e.target.value);
            // }}
            
              onChange={(event) => {
                
                event.target.value = Math.max(0, isNaN(parseInt( event.target.value)) ? 0 : parseInt( event.target.value)  ).toString().slice(0,10)
               // alert( value === NaN ? "wrong ":event.target.value.replace('NaN', ''));
                setMobile(event.target.value);
                if (event.target.value.length > 10) {
                  setmessage("Something went Wrong !!!");
                }
              }}
              id="mobile"
             
              placeholder="eg. 7XXXXXXXXX"
              label="Mobile Number"
              name="mobile"
              autoFocus
            />
            {otp ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                inputProps={{
                  maxLength: 4,
                }}
                

                onChange={(event) =>{
                  event.target.value = Math.max(0, isNaN(parseInt( event.target.value)) ? 0 : parseInt( event.target.value)  ).toString().slice(0,4 )
                  setOtpvalue(event.target.value)
                  if (event.target.value.length > 4) {
                    setmessage("Your Otp Wrong !!!");
                  }
                
                }}
                onMouseLeave={() => setBtnname("Verify Otp")}
                
                fullWidth
                name="otp"
                label="Otp"
                type="text"
                id="otp"
                autoComplete="current-password"
              />
            ) : null}
            <p></p>
            <Button
              type="primary"
              size={"large"}
              onClick={() =>
                otp ? verifyOtp() : mobile.length === 10  ? makeAPICall() : setmessage("wrong mobile Number Login CareFully !!!!")
              }
            >
              {btnname}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addName: (product) => {
      dispatch(addName(product));
    },
  };
};
// UPDATE_CART_QUANTITY
export default connect(mapStateToProps, mapDispatchToProps)(Login);
