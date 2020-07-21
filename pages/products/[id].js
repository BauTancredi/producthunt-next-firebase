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

const WrittenBy = styled.span`
  font-weight: bold;
`;

const Comment = styled.li`
  border: 1px solid #e1e1e1;
  padding: 2rem;
`;

const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});

  // Routing for getting the actual id
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

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
  }, [id, product]);

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
    hasVoted,
  } = product;

  const voteProduct = () => {
    if (!user) return router.push("/login");

    // Get votes and sum
    const newTotal = votes + 1;

    // Validate if actual user has voted
    if (hasVoted.includes(user.uid)) return;

    // Add user to hasVoted array
    const newHasVoted = [...hasVoted, user.uid];

    // Update DB
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: newTotal, hasVoted: newHasVoted });

    // Update state
    setProduct({
      ...product,
      votes: newTotal,
    });
  };

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  // Add comment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) return router.push("/login");

    // Info extra for comment
    comment.userId = user.uid;
    comment.userName = user.displayName;

    // Add comment to array
    const newComments = [...comments, comment];

    // Update DB
    firebase.db
      .collection("products")
      .doc(id)
      .update({ comments: newComments });

    // Update state
    setProduct({
      ...product,
      comments: newComments,
    });
  };

  // Identifies if the comment is from the creator.
  const isCreator = (id) => {
    if (createdBy.id == id) {
      return true;
    }
  };

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

              {user && (
                <>
                  <h2>Add comments</h2>
                  <form onSubmit={handleSubmit}>
                    <Field>
                      <input
                        type="text"
                        name="message"
                        onChange={handleChange}
                      />
                    </Field>
                    <InputSubmit type="submit" value="Add comment" />
                  </form>
                </>
              )}

              <H2>Comments</H2>

              {comments.lentgh === 0 ? (
                "There are no comments"
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <Comment key={`${comment.userId}-${index}`}>
                      <p>{comment.message}</p>
                      <p>
                        Writed by: <WrittenBy>{comment.userName}</WrittenBy>
                      </p>
                      {isCreator(comment.userId) && (
                        <ProductCreator>Creator</ProductCreator>
                      )}
                    </Comment>
                  ))}
                </ul>
              )}
            </div>
            <aside>
              <Button target="_blank" bgColor="true" href={url}>
                Visit URL
              </Button>

              <PVotes>{votes} Votes</PVotes>

              {user && <Button onClick={voteProduct}>Vote</Button>}
            </aside>
          </ProductContainter>
        </div>
      </>
    </Layout>
  );
};

export default Product;
