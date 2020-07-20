import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Image = styled.img`
  width: 200px;
`;

const ProductDetails = ({ product }) => {
  const {
    id,
    comments,
    created,
    name,
    company,
    url,
    image,
    urlImage,
    votes,
    description,
  } = product;

  console.log(product);
  return (
    <li>
      <div>
        <div>
          <Image src={urlImage} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>

          <div>
            <img src="/static/img/comentario.png" />
            <p>{comments.length} Comments</p>
          </div>

          <p>Published {formatDistanceToNow(new Date(created))} ago</p>
        </div>
      </div>
      <div>
        <div>&#9650;</div>
        <p>{votes}</p>
      </div>
    </li>
  );
};

export default ProductDetails;
