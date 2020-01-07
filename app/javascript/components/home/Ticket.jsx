import React, { Component } from "react";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    return <div>emir</div>;
  }
}

export default Ticket;
