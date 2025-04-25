import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsApiContext = createContext();

export const ProductsApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://rvlistingbackend.campingx.net/main/get_contact_details",
          {
            headers: {
              Authorization: "Bearer 9r3j@92rjierh@jhh#e992QW",
            },
          }
        );

        const updatedProducts = (response.data.data || []).map((product) => ({
          ...product,
          vehicle_length: Number((Math.random() * (70 - 20) + 20).toFixed(2)),
        }));

        setProducts(updatedProducts);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsApiContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsApiContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsApiContext);
};
