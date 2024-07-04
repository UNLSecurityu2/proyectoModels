import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      //datos que queremos enviar
      await axios.post("http://localhost:5000/users", {
        name: name,
        cedula: cedula,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        telefono: telefono,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Usuarios</h1>
      <h2 className="subtitle">Agregar nuevo usuario</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={guardarUsuario}>
              <p className='has-text-centered'>{msg}</p>
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Cedula</label>
                <div className="control">
                  <input type="text" className="input" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder='Cedula'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Fecha de nacimiento</label>
                <div className="control">
                  <input type="datetime-local" className="input" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} placeholder='Fecha nacimiento'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Dirección</label>
                <div className="control">
                  <input type="text" className="input" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder='Dirección'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Teléfono</label>
                <div className="control">
                  <input type="text" className="input" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder='Teléfono'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                </div>
              </div>
              <div className="field">
                <label className="label"> Contraseña</label>
                <div className="control">
                  <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Confirmar Contraseña</label>
                <div className="control">
                  <input type="password" className="input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='*******'></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="admin">Admin</option>
                      <option value="asistente">Asistente</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type='submit' className="button is-success is-fullwidth">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
