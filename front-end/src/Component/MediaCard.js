import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  paper: {
    background: "wheat",
    padding: 0,
    textAlign: "left",
    margin: "19px 7px",
  },
  paralink: {
    float: "right",
    color: "orange",
  },
  media: {
    height: "400px",
    width: "100%",
    objectFit: "cover",
  },
  headname: {
    fontFamily: "emoji",
    fontSize: "37px",
    fontWeight: "700",
  },
  headtitle: {
    color: "#000",
    fontSize: "17px",
    fontWeight: "400",
  },
});
export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <>
      <Grid item lg={6}>
        <Paper className={classes.paper}>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.headname}
              >
                {props.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.headtitle}
              >
                {props.title}
                <a className={classes.paralink}>Get All App</a>
              </Typography>
            </CardContent>
            <img className={classes.media} alt="complex" src={props.image} />
          </CardActionArea>
        </Paper>
      </Grid>
    </>
  );
}
