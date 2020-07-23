import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useProducts from "../hooks/useProducts";

import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";

const Search = () => {
  const router = useRouter();

  const {
    query: { q },
  } = router;

  const { products } = useProducts("created");
  const [result, setResult] = useState([]);
  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });

    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {result.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
