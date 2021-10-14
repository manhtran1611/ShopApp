import React from "react";
import { useEffect } from "react";
import { Product } from "../../interface";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import Pagination from "@mui/material/Pagination";

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
  pagination: {
    color: "snow",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "7em",
    marginBottom: "5em",
  },
});

export const ProductsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const products = useAppSelector(selectAllProducts);

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const page = useQuery().get("page") || "0";
  const pageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    history.push({
      search: `?page=${page - 1}`,
    });
  };

  useEffect(() => {
    if (page !== null) {
      dispatch(fetchProducts(page));
    }
  }, [page, dispatch]);

  return (
    <div>
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
      <Pagination
        count={3}
        color="primary"
        className={classes.pagination}
        onChange={pageChange}
      />
    </div>
  );
};
