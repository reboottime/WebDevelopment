const products: IProduct[] = [
  {
    name: "Apple",
    price: 1.2,
    unit: "$/lb",
  },
  {
    name: "Banana",
    price: 1.1,
    unit: "$/lb",
  },
];

export function getProducts() {
  return new Promise<IProduct[]>((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 100);
  });
}
