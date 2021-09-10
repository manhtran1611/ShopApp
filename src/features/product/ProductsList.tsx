import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ProductDataService from "../../services/products";
import { Button, CardActionArea, CardMedia } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import { useEffect } from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  root: {
    maxWidth: 345,
    margin: "1em",
  },
  media: {
    height: 140,
  },
});

export const ProductsList = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const retrieveProducts = () => {
    ProductDataService.getAllProduct()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    retrieveProducts();
  }, []);

  return (
    <section>
      <h2>Product Lists</h2>
      <div className={classes.container}>
        {products.map((product: any) => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <div>Price: {product.price}$</div>
                    <div>Quantity: {product.quantity}</div>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  Learn more
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
