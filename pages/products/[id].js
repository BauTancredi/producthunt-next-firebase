import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "@emotion/styled";

import Layout from "../../components/layout/Layout";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;
const H2 = styled.h2`
  margin: 2rem 0;
`;

const PVotes = styled.p`
  text-align: center;
`;

const ProductContainter = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  // Routing for getting the actual id
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) setProduct(product.data());
        else setError(true);
      };
      getProduct();
    }
  }, [id]);

  if (Object.keys(product).length === 0) return "Loading...";

  const {
    comments,
    created,
    name,
    company,
    url,
    image,
    urlImage,
    votes,
    description,
    createdBy,
  } = product;

  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <H1>{name}</H1>
          <ProductContainter>
            <div>
              <p>Published {formatDistanceToNow(new Date(created))} ago</p>
              <p>
                Published by: {createdBy.displayName} from {company}
              </p>
              <img src={urlImage} />
              <p>{description}</p>

              <h2>Add comments</h2>
              <form>
                <Field>
                  <input type="text" name="message" />
                </Field>
                <InputSubmit type="submit" value="Add comment" />
              </form>

              <H2>Comments</H2>
              {comments.map((comment) => (
                <li>
                  <p>{comment.name}</p>
                  <p>Writed by: {comment.userName}</p>
                </li>
              ))}
            </div>
            <aside>
              <Button target="_blank" bgColor="true" href={url}>
                Visit URL
              </Button>

              <PVotes>{votes} Votes</PVotes>
              <Button>Vote</Button>
            </aside>
          </ProductContainter>
        </div>
      </>
    </Layout>
  );
};

export default Product;
