import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddEvents = () => {
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const filteredUsers = response.data.filter(
          (user) => user.role !== "admin"
        );
        setUsers(filteredUsers);
        console.log("Valor de categoriaId después de setUsuarios:", userId); // Agregar este console.log
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchUsers();
  }, [userId]);

  const guardarEvento = async (e) => {
    e.preventDefault();
    try {
      console.log("Valor de categoriaId:", userId);
      //datos que queremos enviar
      await axios.post("http://localhost:5000/events", {
        fecha: fecha,
        ubicacion: ubicacion,
        capacidad: capacidad,
        userId: userId,
      });
      navigate("/events");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Eventos</h1>
      <h2 className="subtitle">Agregar nuevo Evento</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={guardarEvento}>
              <p className='has-text-centered'>{msg}</p>
              <div className="field">
                <label className="label">Fecha</label>
                <div className="control">
                  <input type="datetime-local" className="input" value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="fecha"></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Ubicacion</label>
                <div className="control">
                  <input type="text" className="input" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ubicación"></input>
                </div>
              </div>

              <div className="field">
                <label className="label">Capacidad</label>
                <div className="control">
                  <input type="text" className="input" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} placeholder='capacidad (max 200)'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Asistente</label>
                <div className="control">
                  <select className="select" value={userId} onChange={(e) => setUserId((e.target.value))}>
                    <option value="">Seleccionar asistente</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
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

export default FormAddEvents;
