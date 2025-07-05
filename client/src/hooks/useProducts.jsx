import { useState, useEffect } from "react";
import ProductService from "../services/products.service";

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = ProductService.getProducts((productsData) => {
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  return products;
}

export default useProducts;
