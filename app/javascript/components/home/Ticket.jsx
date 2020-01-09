import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      transformed: [],
      sum: 0
    };
  }

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

  render() {
    const { transformed } = this.state;
    const { classes } = this.props;
    const { sum } = this.state;
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
                <ListItemText name="emir" primary={`${product[1]}x`} />
                <ListItemText name={product} primary={product[0]} />
              </ListItem>
            ))}
            <ListItem
              button
              className={`${classes.total} text-center w-100 m-0`}
            >
              <ListItemText primary={`Total: ${sum} KM`} />
            </ListItem>
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
  }
});

Ticket.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Ticket);
