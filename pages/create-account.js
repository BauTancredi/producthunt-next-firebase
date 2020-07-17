import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

//Validation
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validation/validateCreateAccount";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const CreateAccount = () => {
  function createAccount() {
    console.log("Creating account...");
  }

  const {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

  const { name, email, password } = values;

  return (
    <div>
      <Layout>
        <>
          <H1>Create Account</H1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Field>

            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default CreateAccount;
