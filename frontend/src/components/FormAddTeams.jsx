import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddTeams = () => {
  const [name, setName] = useState("");
  const [ciudadRepresentante, setCiudadRepresentante] = useState("");
  const [categoriaId, setCategoriaId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categorys");
        setCategorias(response.data);
        console.log(
          "Valor de categoriaId después de setCategorias:",
          categoriaId
        ); // Agregar este console.log
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategorias();
  }, [categoriaId]);

  const guardarTeam = async (e) => {
    e.preventDefault();
    // Imprimir el valor de categoriaId
    try {
      console.log("Valor de categoriaId:", categoriaId); // Imprimir el valor de categoriaId
      await axios.post("http://localhost:5000/teams", {
        name: name,
        ciudadRepresentante: ciudadRepresentante,
        categoriaId: categoriaId,
      });
      navigate("/teams");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Equipo</h1>
      <h2 className="subtitle">Agregar nuevo Equipo</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={guardarTeam}>
              <p className='has-text-centered'>{msg}</p>
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="nombre del equipo"></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Ciudad representante</label>
                <div className="control">
                  <input type="text" className="input" value={ciudadRepresentante} onChange={(e) => setCiudadRepresentante(e.target.value)} placeholder="ciudad a la que representa"></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Categoría</label>
                <div className="control">
                  <select className="select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success is-fullwidth">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddTeams;
