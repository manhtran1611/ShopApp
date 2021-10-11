export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  reviews: Review[];
  user: OutputUser;
  date: Date;
}

export interface Review {
  _id: string;
  user: {
    id: string;
    username: string;
  };
  text: string;
  date: Date;
}
export interface InputUser {
  name: string;
  password: string;
}
export interface OutputUser {
  _id: string;
  name: string;
}
