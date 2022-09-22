import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [preview, setPreview] = useState(null);
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
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
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
          <h2>Choisis une photo</h2>
          <input
            onChange={(event) => {
              setPicture(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
            type="file"
          />
          <p style={{ color: "white", fontSize: 12 }}>
            Format accepté: jpeg ou jpg
          </p>
          <img src={preview} alt="" style={{ marginTop: 10 }} />
          <h2>Titre</h2>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="T-shirt de la marque..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2>Description</h2>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Vends T-shirt neuf, taille..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h2>Marque</h2>
          <input
            type="text"
            name="brand"
            placeholder="Adidas"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <h2>Taille</h2>
          <input
            type="text"
            name="size"
            placeholder="38"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <h2>Couleur</h2>
          <input
            type="text"
            name="color"
            placeholder="Rouge"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <h2>État</h2>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>Neuf</option>
            <option>Bon état</option>
            <option>Satisfaisant</option>
          </select>
          <h2>Lieu</h2>
          <input
            type="text"
            placeholder="Paris"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <h2>Prix</h2>
          <input
            type="text"
            placeholder="5"
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
