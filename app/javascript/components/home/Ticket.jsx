import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { post } from "../../utils/dataTransfer";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: 0,
      transformed: [],
      sum: 0
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidUpdate(prevProps) {
    const { ticket, transformed, sum } = this.props.data;

    if (prevProps.data !== this.props.data) {
      this.setState({
        data: ticket,
        transformed: transformed,
        sum: sum
      });
    }
  }

  handleClick(product) {
    this.props.handleDelete(product);
  }

  handleSubmit(e) {
    e.preventDefault();
    const ticket = { products: this.state.data, delivery: this.state.value };
    post("/api/tickets", ticket, ticket).then(res => {
      if (res.status == "created") {
        this.props.handleTicketSubmitted();
      }
    });
  }

  render() {
    const { transformed, sum, value } = this.state;
    const { classes } = this.props;
    return (
      <div className="shadow p-0">
        {transformed.length > 0 ? (
          <List
            component="nav"
            className={`${classes.root} m-0 p-0 w-100`}
            aria-label="contacts"
          >
            {transformed.map((product, index) => (
              <ListItem
                button
                key={index}
                name={product}
                className="border-bottom w-100 m-0"
                onClick={e => this.handleClick(product[0])}
              >
                <ListItemText primary={`${product[1]}x`} />
                <ListItemText name={product} primary={product[0]} />
              </ListItem>
            ))}
            <ListItem
              button
              className={`${classes.total} text-center w-100 m-0`}
            >
              <ListItemText primary={`Total: ${sum} KM`} />
            </ListItem>
            <AppBar position="static" color="default" className="shadow-none">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Sala" className={classes.tab} />
                <Tab label="Dostava" className={classes.tab} />
              </Tabs>
            </AppBar>
            <Button
              color="primary"
              className="w-100 p-3"
              onClick={e => this.handleSubmit(e)}
            >
              Make an Order
            </Button>
          </List>
        ) : null}
      </div>
    );
  }
}

const classes = theme => ({
  root: {
    width: "100%"
  },
  total: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  tab: {
    "&:focus": {
      outline: "none"
    }
  }
});

Ticket.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Ticket);
