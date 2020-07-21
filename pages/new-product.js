import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";

import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";
import Error404 from "../components/layout/404";

import { FirebaseContext } from "../firebase";

//Validation
import useValidation from "../hooks/useValidation";
import validateCreateProduct from "../validation/validateCreateProduct";

const INITIAL_STATE = {
  name: "",
  company: "",
  image: "",
  url: "",
  description: "",
};

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

export default function NewProduct() {
  // Images state
  const [imageName, setImageName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const [error, setError] = useState(false);
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateCreateProduct, createProduct);

  const { name, company, image, url, description } = values;

  const router = useRouter();

  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    if (!user) return router.push("/login");

    // New product object
    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      createdBy: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
    };

    // Insert to DB
    firebase.db.collection("products").add(product);

    return router.push("/");
  }

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = (progress) => setProgress({ progress });

  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  };

  const handleUploadSuccess = (imageName) => {
    setProgress(100);
    setUploading(false);
    setImageName(imageName);
    firebase.storage
      .ref("products")
      .child(imageName)
      .getDownloadURL()
      .then((url) => {
        setUrlImage(url);
      });
  };

  if (!user) return <Error404 />;

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
          <>
            <H1>New product</H1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>General Info</legend>
                <Field>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.name && <Error>{errors.name}</Error>}

                <Field>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.company && <Error>{errors.company}</Error>}

                <Field>
                  <label htmlFor="image">Image</label>
                  <FileUploader
                    accept="image/*"
                    id="image"
                    name="image"
                    randomizefilename="true"
                    storageRef={firebase.storage.ref("products")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Field>

                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.url && <Error>{errors.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>Your product</legend>

                <Field>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Create product" />
            </Form>
          </>
        )}
      </Layout>
    </div>
  );
}
