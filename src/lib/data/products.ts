import type { Product } from "#lib/types/product.ts";

// Fictional sample products for development; prices are demo values, not live listings.
export const products : Product[] = [
  {
      id: "carlsberg-premium",
      name: "Carlsberg Premium Beer",
      brand: "Carlsberg",
      category: "Beer",
      price: 540,
      abv: 4.8,
      image: "/products/413.jpg"
    },
    {
      id: "ryders-wild-apple",
      name: "Ryder's Wild Apple",
      brand: "Ryder's",
      category: "Beer",
      price: 730,
      abv: 8.8,
      image: "/products/336.jpg"
    },
    {
      id: "lion-lager",
      name: "Lion Lager",
      brand: "Lion",
      category: "Beer",
      price: 320,
      abv: 4.8,
      image: "/products/475.jpg"
    },
    {
      id: "lion-stout",
      name: "Lion Stout",
      brand: "Lion",
      category: "Beer",
      price: 730,
      abv: 8.8,
      image: "/products/476.jpg"
    },
    {
      id: "somersby-apple",
      name: "Somersby Apple Cider",
      brand: "Somersby",
      category: "Cider",
      price: 600,
      abv: 4.5,
      image: "/products/BE113.webp"
    },
    {
      id: "somersby-blackberry",
      name: "Somersby Blackberry Cider",
      brand: "Somersby",
      category: "Cider",
      price: 600,
      abv: 4.5,
      image: "/products/BE114.jpg"
    }
];
