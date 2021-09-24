import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectProductById } from "./productsSlice";

// * MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  root: {
    maxWidth: "10 em",
    maxHeight: "10 em",
    margin: "1em",
  },
  media: {
    height: "8.75em",
  },
});

interface MatchParams {
  productId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const SingleProductPage: React.FC<Props> = ({ match }: Props) => {
  const classes = useStyles();
  const { productId } = match.params;
  const product = useAppSelector((state) =>
    selectProductById(state, productId)
  );
  console.log(product);

  if (!product) {
    return (
      <section>
        <h1>Product not found!</h1>
      </section>
    );
  }
  return (
    <section className={classes.container}>
      <article>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
          <Typography>{product.name}</Typography>
        </Card>
      </article>
    </section>
  );
};
