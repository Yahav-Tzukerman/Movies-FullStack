import { useState, useEffect } from "react";
import CategoryService from "../services/categories.service";

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = CategoryService.getCategories((categoriesData) => {
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  return categories;
}

export default useCategories;
