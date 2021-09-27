export interface Owner {
  id: string;
  number: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  reviews: Review[];
  owner: Owner;
  date: Date;
}

export interface Review {
  author: {
    id: string;
    username: string;
  };
  text: string;
  date: Date;
}
export interface User {
  name: string;
  password: string;
}
