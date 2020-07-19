import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";

import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

import firebase from "../firebase";

//Validation
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validation/validateCreateAccount";

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
  const [error, setError] = useState(false);
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

  const { name, company, image, url, description } = values;

  async function createAccount() {}

  return (
    <div>
      <Layout>
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
                <input
                  type="file"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>

              {errors.image && <Error>{errors.image}</Error>}

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
      </Layout>
    </div>
  );
}
