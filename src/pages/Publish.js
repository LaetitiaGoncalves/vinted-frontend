import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleSentPicture = async (event) => {
    try {
      event.preventDefault();
      setIsPictureSending(true);
      const formData = new FormData();
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

        {
          title,
          description,
          price,
          condition,
          city,
          brand,
          size,
          color,
          picture: formData,
        },

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
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="marque"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="taille"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            placeholder="couleur"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Etat"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Publish;
