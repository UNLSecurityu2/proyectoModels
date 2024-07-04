import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


const FormEditEvents = () => {

    const [fecha, setFecha] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                const filteredUsers = response.data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
                console.log("Valor de categoriaId después de setUsuarios:", userId); // Agregar este console.log
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchUsers();
    }, [userId]);


    useEffect(() => {
        const getEventById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/events/${id}`)
                console.log(response.data);
                const formattedDate = new Date(response.data.fecha).toISOString().slice(0, 16);

                setFecha(formattedDate);
                setUbicacion(response.data.ubicacion);
                setCapacidad(response.data.capacidad);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getEventById();
    }, [id]);

    const updateEvents = async (e) => {
        e.preventDefault();
        try {
            //datos que queremos enviar
            await axios.patch(`http://localhost:5000/events/${id}`, {
                aceptado: false,
                estado: 'pendiente',
                fecha: fecha,
                ubicacion: ubicacion,
                capacidad: capacidad,
                userId: userId,
            });
            navigate('/events');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    return (
        <div>
            <h1 className="title">Eventos</h1>
            <h2 className="subtitle">Editar Evento</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateEvents}>
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
                                    <input type="text" className="input" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} placeholder='capacidad'></input>
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
                                    <button type="submit" className="button is-success is-fullwidth">Actualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditEvents
