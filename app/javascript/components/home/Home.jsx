import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { get } from "../../utils/dataTransfer";
import Ticket from "./Ticket";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      categories: [],
      ticket: [],
      transformed: [],
      sum: 0
    };
  }

  componentDidMount() {
    get("/api/categories").then(response =>
      this.setState({ categories: response.data })
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  sumChange(arr) {
    const sum = arr.reduce((a, b) => a + (b.price || 0), 0);

    this.setState({
      sum: sum
    });
  }

  transformedData(data) {
    let transformedData = {};
    data.forEach(product => {
      if (product.name in transformedData) {
        transformedData[product.name] += 1;
      } else {
        transformedData[product.name] = 1;
      }
    });
    this.setState({
      transformed: Object.entries(transformedData)
    });
  }

  handleProductClick = value => {
    this.transformedData([...this.state.ticket, value]);
    this.sumChange([...this.state.ticket, value]);

    this.setState({
      ticket: [...this.state.ticket, value]
    });
  };

  handleDelete(e) {
    let index = null;
    for (let el in this.state.ticket) {
      if (this.state.ticket[el].name == e) {
        index = el;
        break;
      }
    }
    this.state.ticket.splice(index, 1);
    let ticket = this.state.ticket;

    this.transformedData(ticket);
    this.sumChange(ticket);

    this.setState({
      ticket: ticket
    });
  }

  handleTicketSubmitted() {
    this.setState({
      ticket: [],
      transformed: [],
      sum: 0
    });
  }

  render() {
    const { value, categories } = this.state;
    const { classes } = this.props;
    return (
      <div className="row">
        <div className="col-sm-8">
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="full width tabs example"
            >
              {categories.map(category => (
                <Tab
                  label={category.name}
                  className={classes.tab}
                  key={category.id}
                />
              ))}
            </Tabs>
          </AppBar>
          {categories[value] !== undefined &&
          categories[value].products.length > 0 ? (
            <div className={`row mt-3 ${classes.container}`}>
              {categories[value].products.map(product => (
                <div
                  className={`col-sm-3 ${classes.card}`}
                  onClick={e => this.handleProductClick(product)}
                  key={product.id}
                >
                  <Card className={classes.card}>
                    <CardContent className="d-flex flex-column h-100 justify-content-between">
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography variant="h6" component="h5">
                        Cijena: {product.price}KM
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div>U ovoj kategoriji nema prozvoda.</div>
          )}
        </div>
        <div className="col-sm-4">
          <Ticket
            data={this.state}
            handleDelete={this.handleDelete.bind(this)}
            handleTicketSubmitted={this.handleTicketSubmitted.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const classes = theme => ({
  tab: {
    "&:focus": {
      outline: "none"
    }
  },
  container: {
    height: "100%",
    maxHeight: "180px"
  },
  card: {
    height: "100%",
    padding: "0.5%"
  },
  media: {
    height: 140
  }
});

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Home);
