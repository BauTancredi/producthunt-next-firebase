import React from "react";

import useProducts from "../hooks/useProducts";

import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";

export default function Home() {
  const { products } = useProducts("created");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {products.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
