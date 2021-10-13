import React from "react";
import { useEffect } from "react";
import { Product } from "../../interface";
import { Link } from "react-router-dom";

//  * Redux
import { fetchProducts, selectAllProducts } from "../../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice";
//  * MATERIAL UI
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, CardActionArea, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles({
  container: {
    width: "1440px",
    maxWidth: " calc(100%-1em)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    margin: "0 auto",
    padding: "0 1em",
  },
  root: {
    maxWidth: "10em",
    margin: "1em",
  },
  media: {
    height: 140,
  },
  title: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
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
            <div key={product._id}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography component={"span"} className={classes.title}>
                      <div>{product.name}</div>
                    </Typography>
                    <Typography
                      component={"span"}
                      variant="body2"
                      color="textSecondary"
                    >
                      <div>Price: {product.price}$</div>
                      <div>Quantity: {product.quantity}</div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => dispatch(addToCart(product._id))}
                  >
                    Add to Cart
                  </Button>
                  <Link
                    to={`/products/${product._id}`}
                    className={classes.link}
                  >
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
