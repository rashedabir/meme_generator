import React from "react";

function ImageCart({ mime, onClick }) {
  return (
    <div className="col pb-5 text-center mx-auto">
      <img width="320px" src={mime.url} alt={mime.name} onClick={onClick} />
    </div>
  );
}

export default ImageCart;
