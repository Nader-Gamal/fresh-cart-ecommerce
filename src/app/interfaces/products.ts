export interface Products {
  imageCover: string;
  title: string;
  price: string;
  ratingsAverage: string;
  category: Category;
  id: string;
}

interface Category {
  name: string;
}
