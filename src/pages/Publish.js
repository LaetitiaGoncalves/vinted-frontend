import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);

  const handleSentPicture = async (event) => {
    try {
      event.preventDefault();
      setIsPictureSending(true);
      const formData = new FormData();
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("image envoyée");
      console.log(response.data);
      setData(response.data);
      setIsPictureSending(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Vends ton article</h1>
      <div className="publish-form">
        <form onSubmit={handleSentPicture}>
          <input
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
            }}
            type="file"
          />
          {isPictureSending === true ? (
            <h1>Image en cours d'uplaod</h1>
          ) : (
            data && <img src={data.picture} style={{ width: "200px" }} alt="" />
          )}
          <input type="submit" />
        </form>
        <div>
          <input type="text" name="title" id="title" placeholder="Titre" />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
          />
        </div>
        <div>
          <input type="text" placeholder="marque" />
          <input type="text" placeholder="taille" />
          <input type="text" placeholder="couleur" />
          <input type="text" placeholder="Etat" />
          <input type="text" placeholder="Lieu" />
        </div>
        <div>
          <input type="text" placeholder="Prix" />
        </div>
      </div>
    </div>
  );
};

export default Publish;
