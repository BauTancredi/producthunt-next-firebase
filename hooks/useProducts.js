import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../firebase";

const useProducts = (order) => {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtainProducts = () => {
      firebase.db
        .collection("products")
        .orderBy(order, "desc")
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

  return {
    products,
  };
};

export default useProducts;
