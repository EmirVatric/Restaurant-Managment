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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      categories: []
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
                <div className={`col-sm-3 ${classes.card}`} key={product.id}>
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
        <div className="col-sm-4"></div>
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
