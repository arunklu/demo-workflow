import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  imagecomponent: {
    objectFit: "cover",
    borderRadius: "22px",
    height: 120,
    marginTop: 10,
  },
  textoverimg: {
    position: "absolute",
    left: "2%",
    top: "90px",
    color: "#fff",
  },
  imagebootomtext: {
    textAlign: "left",
    color: "#e3e3e3",
    fontSize: "14px",
    float: "left",
    paddingLeft: 7,
  },
  trackbutton: {
    background: "orange",
    color: "#fff",
    borderRadius: 7,
    padding: "6px 12px",
    margin: 7,
  },
  textleft: {
    textAlign: "left",
    paddingLeft: "5%",
    clear: "both",
  },
  textright: {
    textAlign: "right",
    paddingRight: "5%",
    verticalAlign: "top",
  },
});

export default function OrderHistory(props) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={props.banner}
            className={classes.imagecomponent}
            title="Contemplative Reptile"
          />
          <Typography
            className={classes.textoverimg}
            variant="h5"
            component="h2"
          >
            {props.hotename}
          </Typography>
          <span>
            <span variant="overline" className={classes.imagebootomtext}>
              {" "}
              Order : #{props.orderid} |
            </span>
            <span variant="overline" className={classes.imagebootomtext}>
              {" "}
              {props.day} at {props.time} |
            </span>
            <span variant="overline" className={classes.imagebootomtext}>
              Order Type : {props.ordertype == 1 ? "Delivery" : null}{" "}
            </span>
          </span>
          <CardContent style={{ paddingTop: "50px" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              className={classes.textleft}
            >
              BBQ Chicken
              <br />
              <span variant="overline" className={classes.imagebootomtext}>
                No Cheese <br />
                Potato Fried ($3.00)
              </span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              className={classes.textright}
            >
              $26
            </Typography>
          </CardContent>
          <hr style={{ width: "90%" }} />
          <CardContent className={classes.maintext}>
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              className={classes.textleft}
            >
              BBQ Chicken
              <br />
              <span variant="overline" className={classes.imagebootomtext}>
                No Cheese <br />
                Potato Fried ($3.00)
              </span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              className={classes.textright}
            >
              $26
            </Typography>
          </CardContent>
          <hr style={{ width: "90%" }} />

          <CardContent className={classes.maintext}>
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              className={classes.textleft}
            >
              Total
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h6"
              className={classes.textright}
            ></Typography>
          </CardContent>
        </CardActionArea>

        <Button
          size="small"
          color="primary"
          className={classes.trackbutton}
          style={{ float: "left" }}
        >
          Re-Order
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.trackbutton}
          style={{ float: "right" }}
        >
          Track Order
        </Button>
      </Card>
    </>
  );
}
