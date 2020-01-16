import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import consumer from "../../channels/consumer";

import { get } from "../../utils/dataTransfer";

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.transposedData.length > 0 ? (
          <div className="row">
            {this.state.transposedData.map(ticket => (
              <div key={ticket.id} className="col-sm-3">
                {ticket.products.map((product, index) => (
                  <div key={index}>
                    <span>{product[1]} x </span>
                    <span>{product[0]}</span>
                  </div>
                ))}
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
    width: "100%"
  }
});

export default withStyles(classes)(Kitchen);
