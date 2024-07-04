import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const FormAddEvents = () => {


    const [name, setName] = useState("");
    const [ciudadRepresentante, setCiudadRepresentante] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getTeamById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/teams/${id}`)
                console.log("objeto", response.data);
                setName(response.data.name);
                setCiudadRepresentante(response.data.ciudadRepresentante);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getTeamById();
    }, [id]);


    const actualizarTeam = async (e) => {
        e.preventDefault();
        try {
            //datos que queremos enviar
            await axios.patch(`http://localhost:5000/teams/${id}`, {
                name: name,
                ciudadRepresentante: ciudadRepresentante,
            });
            navigate('/teams');
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
                        <form onSubmit={actualizarTeam}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre"></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Ciudad representante</label>
                                <div className="control">
                                    <input type="text" className="input" value={ciudadRepresentante} onChange={(e) => setCiudadRepresentante(e.target.value)} placeholder="Ciudad representante"></input>
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
