export interface Cart {
  numOfCartItems: number;
  data: Data;
}
interface Data {
  totalCartPrice: number;
  products: product[];
  _id: string;
}

interface product {
  count: number;
  price: number;
  product: innerProduct;
}

interface innerProduct {
  title: string;
  imageCover: string;
  category: Category;
  id: string;
}
interface Category {
  name: string;
}
