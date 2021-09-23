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
  owner: Owner;
  date: Date;
}
