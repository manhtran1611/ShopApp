import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProductById,
  selectProductById,
} from "../../../redux/productsSlice";

// * MATERIAL UI
import {
  makeStyles,
  createStyles,
  alpha,
  Theme,
} from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Review } from "../../../interface";
import { fetchReviews, selectAllReviews } from "../../../redux/reviewsSlice";
import { addToCart } from "../../../redux/cartSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90vw",
      height: "87vh",
      maxWidth: " calc(100%-1em)",
      maxHeight: " calc(100%-1em)",
      display: "flex",
      justifyContent: "flex-start",
      alignContent: "center",
      margin: "1em 0 1em 8em",
    },
    image: {
      margin: "3em",
      display: "flex",
      alignContent: "center",
    },
    text: {
      margin: "3em",
      display: "flex",
      alignContent: "center",
      flexDirection: "column",
      marginTop: "2em",
    },
    media: {
      height: "10em",
      width: "9em",
    },
    title: {
      display: "flex",
      fontSize: "2em",
      paddingRight: "1em",
      justifyContent: "space-between",
    },
    price: {
      borderRadius: "0.25em",
      border: "none",
      width: "3em",
      textAlign: "center",
      color: "red",
    },
    description: {
      fontSize: "1.1em",
      margin: "2em",
      padding: "1em",
      borderRadius: "0.25em",
      border: "solid 1px black",
      backgroundColor: "#F8FFF4",
    },
    selector: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: "1em",
      padding: "1em",
    },
    input: {
      margin: "0 1em",
    },
    cartButton: {
      fontSize: "1em",
      margin: "0 1em",
      backgroundColor: "#DB2B39",
      color: "#F8FFF4",
      borderRadius: "1em",
      "&:hover": {
        background: alpha("#DB2B39", 0.7),
      },
    },
    reviewContainer: {
      margin: "1em",
      padding: "2em",
      borderRadius: "0.25em",
      border: "solid 1px #DB2B39",
    },
    review: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      padding: "1em",
    },
    username: {
      fontWeight: "bold",
    },
    reviewText: {
      margin: "1em",
      fontStyle: "italic",
    },
  })
);

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const SingleProductPage: React.FC<Props> = ({ match }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const productId = match.params.id;
  const product = useAppSelector((state) =>
    selectProductById(state, productId)
  );

  const reviews = useAppSelector(selectAllReviews);
  const reviewStatus = useAppSelector((state) => state.reviewReducer.status);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (reviewStatus === "idle") {
      dispatch(fetchReviews(productId));
    }
  }, [reviewStatus, productId, dispatch]);

  if (!product) {
    return (
      <section>
        <h1>Product not found!</h1>
      </section>
    );
  }
  return (
    <section className={classes.container}>
      <div className={classes.image}>
        <img src={product.image} alt={product.name} />
      </div>
      <article className={classes.text}>
        <Typography component={"span"} className={classes.title}>
          <div>{product.name}</div>
          <div className={classes.price}>{product.price}$</div>
        </Typography>
        <Typography component={"span"} className={classes.description}>
          {product.description} Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. At commodi soluta earum ad, repudiandae accusantium
          pariatur aliquam ullam, repellat velit eaque voluptatem dignissimos
          quaerat, dicta cum necessitatibus totam! Modi, ratione!
        </Typography>
        <div className={classes.selector}>
          <Button
            variant="contained"
            className={classes.cartButton}
            onClick={() => dispatch(addToCart(product._id))}
          >
            Add to Cart
          </Button>
        </div>
        <div className={classes.reviewContainer}>
          {reviews ? (
            reviews.map((review: Review) => {
              return (
                <div key={review._id} className={classes.review}>
                  <Typography component="div" className={classes.username}>
                    {review.user.username}
                  </Typography>
                  <Typography component="div" className={classes.reviewText}>
                    {review.text}
                  </Typography>
                </div>
              );
            })
          ) : (
            <Typography component={"span"}>No reviews yet</Typography>
          )}
        </div>
      </article>
    </section>
  );
};
