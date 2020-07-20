import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Product = () => {
  // Routing for getting the actual id
  const router = useRouter();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
    }
  }, [id]);

  return <h1>{id}</h1>;
};

export default Product;
