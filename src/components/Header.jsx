import React from "react";
import mime from "../asstes/mime.mp4";

function Header() {
  return (
    <header>
      <video autoPlay loop muted>
        <source src={mime} type="video/mp4" />
      </video>
      <h1>meme generator</h1>
    </header>
  );
}

export default Header;
