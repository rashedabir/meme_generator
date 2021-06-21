import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCart from "./ImageCart";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

function Mimes() {
  const [mime, setMimes] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getMeme = async () => {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      setMimes(res.data.data.memes);
    };
    getMeme();
  }, []);

  const memeGen = async (e) => {
    e.preventDefault();
    const params = {
      template_id: template.id,
      text0: topText,
      text1: bottomText,
      username: "RashedAbir",
      password: "01629341869",
    };
    const response = await fetch(
      `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
    );
    const mime = await response.json();
    setData(mime.data.url);
  };

  return (
    <div className="container py-5">
      {template && (
        <>
          <form onSubmit={memeGen} className="pb-3 text-center mx-auto">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="top text"
                required
                value={topText}
                onChange={(e) => {
                  setTopText(e.target.value);
                }}
              />
              <label for="floatingInput">Top Text</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={bottomText}
                placeholder="bottom text"
                onChange={(e) => {
                  setBottomText(e.target.value);
                }}
              />
              <label for="floatingInput">Bottom Text</label>
            </div>
            <button type="submit" className="btn btn-success text-uppercase mb-3">
              <i className="fas fa-cogs"></i> create meme
            </button>
          </form>
          {data ? null : <ImageCart mime={template} />}
          {data ? (
            <div className="col pb-5 text-center mx-auto">
              <img className="img-fluid" width="400px" src={data} alt={data} />
            </div>
          ) : null}
        </>
      )}
      {!template ? (
        <h3 className="text-center mx-auto pb-5 text-uppercase">
          pick a template
        </h3>
      ) : null}
      <div className="row">
        {!template &&
          mime.map((mime) => {
            return (
              <ImageCart
                mime={mime}
                onClick={() => {
                  setTemplate(mime);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Mimes;
