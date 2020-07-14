import React from "react";
import Link from "next/link";

import Search from "../ui/Search";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>

          <Search />
          <Navbar />
        </div>

        <div>
          <p>Hi: Bau</p>
          <button type="button">Sign out</button>
          <Link href="/">Login</Link>
          <Link href="/">Crete account</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
