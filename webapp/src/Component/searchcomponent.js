import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";
import "./seacrcomponent.css";
import TextField from "@material-ui/core/TextField";
import { Button, Avatar } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import Location from "../image/location.png";
import { isMobile } from "react-device-detect";
import zIndex from "@material-ui/core/styles/zIndex";
const dnoneimages = {
  left: "80%",
  top: -60,

  "@media (min-width: 500px)": {
    left: "10% !important",
    bottom: "-60 !important",
  },
};
export default class searchcomponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: null, data: [], status: false, pincode: null };
  }
  showplaceId(id) {
    this.setState({ pincode: id, status: true });
    this.setState({ status: true });
    localStorage.setItem("Picodwiseshowprisuct", id);
  }

  handleChange = (address) => {
    console.log("Address" + JSON.stringify(address));
    let temp = address;
    temp = temp.replace(/\s+/g, "");

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        console.log(
          "Success",
          latLng.lng,
          window.sessionStorage.setItem("lat", latLng.lat),
          window.sessionStorage.setItem("lng", latLng.lng)
        )
      )
      .then((placeId) => geocodeByPlaceId(this.state.pincode))
      .catch((error) => console.error("Error", error));
    this.setState({ address: address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng.lat))
      .catch((error) => console.error("Error", error));
    this.setState({ address: address });
  };

  componentDidMount() {
    //  this.setState({address:this.props.location.state.id})
  }

  handlestatus = () => {
    if (this.state.address != null && this.state.address.length > 2) {
      this.setState({
        status: true,
      });
    }
  };
  render() {
    if (
      this.state.status != false &&
      this.state.address != null &&
      this.state.address.length != " "
    ) {
      return (
        <Redirect
          to={{
            pathname: "/ListResturant",
            state: { id: this.state.pincode },
          }}
        />
      );
    }
    return (
      <>
        <PlacesAutocomplete
          className="search"
          placeholder="Search via postcode"
          value={this.state.address}
          onChange={this.handleChange}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <TextField
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                xs={11}
                id="outlined-search"
                label={null}
                placeholder="search Resturant & Dishes"
                className="searchbar"
                variant="outlined"
                {...getInputProps({
                  placeholder: "Enter Your postcode",
                  className: "location-search-input",
                })}
              />

              <div
                className="autocomplete-dropdown-container"
                style={isMobile ? { zIndex: 999 } : { zIndex: 1 }}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        padding: "27px 0px !important",
                        zIndex: 999,
                        margin: "0px 10px",
                        backgroundColor: "#ff",
                        cursor: "pointer",
                        borderBottom: ".5px solid #e7e7e7",
                      }
                    : {
                        padding: "27px 0px !important",
                        zIndex: 999,
                        margin: "0px 10px",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        borderBottom: ".5px solid #e7e7e7",
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span
                        style={{
                          padding: "27px 0px",
                          margin: 9,
                          marginLeft: 0,
                          color: "#000",
                          zIndex: 999,
                        }}
                        onClick={() =>
                          this.showplaceId(suggestion.terms[2].value.toUpperCase())
                        }
                      >
                        <Avatar
                          src={Location}
                          size={35}
                          style={{ margin: "11px 0px" }}
                        />
                        {suggestion.description}
                        {/* {console.log(JSON.stringify(suggestion.terms[0].value))} */}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Button
          type="primary"
          className="dnoneimages"
          size="large"
          onClick={() =>
            this.showplaceId(this.state.address.toUpperCase())
          }
        >
          Let's Go <ArrowRightOutlined />
        </Button>
      </>
    );
  }
}
