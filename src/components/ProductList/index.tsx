import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product } from "../../interface";

//  * Redux
import { fetchProducts, selectAllProducts } from "../../redux/productsSlice";

//  * MATERIAL UI
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, CardActionArea, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "grid",
    maxWidth: "100vw",
    width: "100vw",
    height: "100vh",
  },
  root: {
    maxWidth: "9em",
    margin: "1em",
  },
  media: {
    height: 140,
  },
  title: {
    fontWeight: "bold",
  },
});

export const ProductsList = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector((state) => state.productsReducer.status);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <section>
      <h2>Product Lists</h2>
      <div className={classes.container}>
        {products.map((product: Product) => {
          return (
            <div>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography className={classes.title}>
                      <div>{product.name}</div>
                    </Typography>
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
                  <Link to={`/products/${product._id}`}>
                    <Button size="small" color="primary">
                      Learn more
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};
