import React from "react";
import { global, css, Global } from "@emotion/core";

import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --grey: #3d3d3d;
            --grey2: #6f6f6f;
            --orange: #da552f;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            line-height: 1.5;
          }

          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
          }
        `}
      />
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
