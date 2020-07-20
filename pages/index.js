import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

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
    const products = snapshots.docs.map((doc) => {
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
        <h1>Inicio</h1>
      </Layout>
    </div>
  );
}
