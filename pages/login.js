import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";

import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/ui/Form";

import firebase from "../firebase";

//Validation
import useValidation from "../hooks/useValidation";
import validateLogin from "../validation/validateLogin";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const H1 = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

export default function Login() {
  const [error, setError] = useState(false);
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateLogin, login);

  const { email, password } = values;

  async function login() {
    try {
      const user = await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Error authenticating the user", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <H1>Login</H1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.email && <Error>{errors.email}</Error>}

            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.password && <Error>{errors.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Login" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
