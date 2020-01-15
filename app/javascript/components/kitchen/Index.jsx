import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import consumer from "../../channels/consumer";

import { get } from "../../utils/dataTransfer";

class Kitchen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
    this.createSocket = this.createSocket.bind(this);
  }

  componentDidMount() {
    get("/api/tickets").then(res => {
      this.setState({ tickets: res.data });
    });
    this.createSocket();
  }

  createSocket() {
    const stateChange = data => {
      this.setState({
        tickets: [...this.state.tickets, data]
      });
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
        {this.state.tickets.length > 0 ? (
          <div className="row">
            {this.state.tickets.map((ticket, index) => (
              <div key={index} className="col-sm-3">
                {ticket.products.map((product, pIndex) => (
                  <div key={pIndex}>{product.name}</div>
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
