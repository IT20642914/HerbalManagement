/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import MasterAPI from "../../utill/Api";
import productsList from "./productsList";

export default function searchProduct() {
  const { search_text } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // MasterAPI()
    //   .get(`/product/search/${search_text}`)
    //   .then((res) => setProducts(res.data))
    //   .catch((error) => setProducts([]));
  }, [search_text]);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Box ml={4}>
            <h3>
              {products.length} items found for "{search_text}"
            </h3>
          </Box>
          <productsList oldProducts={products} />
        </>
      ) : (
        <h3>Sorry, no products available!</h3>
      )}
    </div>
  );
}