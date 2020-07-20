import React, { useEffect, useState, useContext } from "react";

import { FirebaseContext } from "../firebase";

import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtainProducts = () => {
      firebase.db
        .collection("products")
        .orderBy("created", "desc")
        .onSnapshot(manageSnapshot);
    };
    obtainProducts();
  }, []);

  function manageSnapshot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setProducts(products);
  }

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
