import React from "react";
import Link from "next/link";

const Layout = (props) => {
  return (
    <>
      <h1>Header</h1>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/us">
          <a>Us</a>
        </Link>
      </nav>
      <main>{props.children}</main>;
    </>
  );
};

export default Layout;
