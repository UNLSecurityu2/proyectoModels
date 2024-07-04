import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddEvents = () => {
    const [nombre, setNombre] = useState("");
    const [limite, setLimite] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const guardarCategoria = async (e) => {
        e.preventDefault();
        try {
            //datos que queremos enviar
            await axios.post("http://localhost:5000/categorys", {
                nombre: nombre,
                limite: limite,
            });
            navigate("/categorys");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Categoria</h1>
            <h2 className="subtitle">Agregar nueva categoria</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={guardarCategoria}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input type="text" className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre categoria"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Limite</label>
                                <div className="control">
                                    <input type="text" className="input" value={limite} onChange={(e) => setLimite(e.target.value)} placeholder="Limite de equipos para la categoria"></input>
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
    )
}

export default FormAddEvents
