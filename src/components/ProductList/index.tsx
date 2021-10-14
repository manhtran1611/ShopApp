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
    width: "90vw",
    maxWidth: " calc(100%-1em)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    margin: "1em 0 1em 8em",
  },
  card: {
    width: "10em",
    margin: "1em",
    backgroundColor: "snow",
  },
  media: {
    height: 140,
  },
  title: {
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "#3f50b5",
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "snow",
    background: "linear-gradient(to right, #F37335, #FDC830)",
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
    <section className={classes.container}>
      {products.map((product: Product) => {
        return (
          <Card className={classes.card} key={product._id}>
            <CardActionArea>
              <Link to={`/products/${product._id}`} className={classes.link}>
                <CardMedia
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography component={"span"} className={classes.title}>
                    {product.name}
                  </Typography>
                  <Typography
                    component={"div"}
                    variant="body2"
                    color="textSecondary"
                  >
                    Price: {product.price}$
                  </Typography>
                  <Typography
                    component={"div"}
                    variant="body2"
                    color="textSecondary"
                  >
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
            <CardActions className={classes.buttonWrapper}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => dispatch(addToCart(product._id))}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </section>
  );
};
