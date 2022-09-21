import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handlePublish = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);

      const response = await axios.post(
        "https://vinted-api-laetitia-goncalves.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer" + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
      alert("Offre publiée avec succès !");
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="container publish-page">
      <h1>Vends ton article</h1>
      <div className="publish-form">
        <form onSubmit={handlePublish}>
          <input
            onChange={(event) => {
              setPicture(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
            type="file"
          />
          <img src={preview} alt="" />

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
          <input
            type="text"
            name="brand"
            placeholder="marque"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            name="size"
            placeholder="taille"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="text"
            name="color"
            placeholder="couleur"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Etat"
            name="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lieu"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prix"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input type="submit" className="submit-publish" />
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
