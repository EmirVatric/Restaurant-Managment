import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import consumer from "../../channels/consumer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { get, del } from "../../utils/dataTransfer";

class Kitchen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      transposedData: []
    };
    this.createSocket = this.createSocket.bind(this);
  }

  componentDidMount() {
    get("/api/tickets").then(res => {
      this.setState({ tickets: res.data }, () => {
        this.transposeTicket(this.state.tickets);
      });
    });
    this.createSocket();
  }

  transposeTicket(tickets) {
    let data = [];
    tickets.forEach(ticket => {
      let transformedData = {};
      ticket.products.forEach(product => {
        if (product.name in transformedData) {
          transformedData[product.name] += 1;
        } else {
          transformedData[product.name] = 1;
        }
      });
      data.push({
        id: ticket.id,
        delivery: ticket.delivery,
        products: Object.entries(transformedData)
      });
    });

    this.setState({
      transposedData: data
    });
  }

  createSocket() {
    const stateChange = data => {
      this.setState(
        {
          tickets: [...this.state.tickets, data]
        },
        () => {
          this.transposeTicket(this.state.tickets);
        }
      );
    };
    consumer.subscriptions.create("KitchenChannel", {
      connected() {},

      disconnected() {},

      received(data) {
        stateChange(data);
      }
    });
  }

  handleRemoveTicket(ticket) {
    del(`/api/tickets/${ticket.id}`).then(res => {
      this.setState(
        {
          tickets: res.data
        },
        () => {
          this.transposeTicket(res.data);
        }
      );
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.transposedData.length > 0 ? (
          <div className="row mt-3">
            {this.state.transposedData.map(ticket => (
              <div
                className="p-1 col-sm-3"
                key={ticket.id}
                onClick={event => this.handleRemoveTicket(ticket)}
              >
                <List
                  className={`${
                    ticket.delivery == null || ticket.delivery == false
                      ? "bg-primary"
                      : "bg-warning"
                  }  p-0 rounded`}
                >
                  {ticket.products.map((product, index) => (
                    <ListItem key={index} className="w-100 m-0">
                      <ListItemText primary={`${product[1]}x`} />
                      <ListItemText primary={product[0]} />
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const classes = theme => ({
  root: {
    background: "gray",
    padding: "2%",
    minWidth: "100vw",
    minHeight: "100vh"
  },
  house: {
    height: "auto",
    display: "flex",
    flexDirection: "column"
  }
});

export default withStyles(classes)(Kitchen);
