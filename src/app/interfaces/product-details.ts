export interface ProductDetails {
  image: [''];
  imageCover: string;
  title: string;
  description: string;
  category: productCategory;
  ratingsAverage: string;
  price: string;
}

interface productCategory {
  name: string;
}
