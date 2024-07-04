import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import { getTagClass } from './TagTable.jsx';

const EventosList = () => {
    const [events, setEvents] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [justificacion, setJustificacion] = useState('');
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        console.log('Usuario:', user);
        if (users.length > 0) {
            getEvents(); // <-- Llama a getEvents() solo cuando users se ha actualizado
        }
    }, [users]);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    }

    const getNombreAsistente = (userId) => {
        const userFound = users.find(user => user.id === userId);
        return userFound ? userFound.name : '';
    };

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events');
            console.log('Eventos obtenidos del servidor:', response.data);
            let userEvents = response.data;
            if (user && user.role !== 'admin') {
                userEvents = response.data.filter(event => event.userId === user.id);
            }
            console.log('Eventos filtrados para el usuario:', userEvents);
            setEvents(userEvents);
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
        }
    }

    const deleteEvent = async (eventId) => {
        await axios.delete(`http://localhost:5000/events/${eventId}`);
        getEvents();
    };

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setJustificacion('');
    };

    const aceptarEvento = async (eventId) => {
        console.log('ID del evento al aceptar:', eventId);
        try {
            await axios.patch(`http://localhost:5000/events/${eventId}`, { aceptado: true, estado: 'activo' });
            getEvents(); // Vuelve a cargar los eventos después de la actualización
        } catch (error) {
            console.error('Error al aceptar el evento:', error.message);
        }
    };

    const rechazarEvento = async (eventId) => {
        console.log('ID del evento a rechazar:', eventId);
        if (!eventId) {
            console.error('El UUID del evento es inválido.');
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/events/${eventId}`, { aceptado: false, estado: 'inactivo', justificacion });
            closeModal(); // Cierra la ventana modal después de rechazar el evento
            getEvents(); // Vuelve a cargar los eventos después de la actualización
        } catch (error) {
            console.error('Error al rechazar el evento:', error.message);
        }
    };


    return (
        <div>
            <h1 className="title">Eventos</h1>
            <h2 className="subtitle">Lista de los eventos</h2>
            {user && user.role === "admin" &&
                <Link to="/events/add" className="button is-primary mb-2">Agregar Nuevo</Link>
            }

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        {user && user.role === "asistente" && events.estado !== "pendiente" &&
                            <th>Aceptar</th>
                        }
                        {user && user.role === "admin" &&
                            <th>Asistente</th>
                        }
                        {user && user.role === "admin" &&
                            <th>Acciones</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        //cada ciclo tiene una clave unica
                        <tr key={event.uuid}>
                            <td>{index + 1}</td>
                            <td>{event.fecha}</td>
                            <td>{event.ubicacion}</td>
                            <td>{event.capacidad}</td>
                            <td>
                                <span className={`tag ${getTagClass(event.estado)}`}>
                                    {event.estado}
                                </span>
                            </td>

                            {user && user.role === "asistente" && event.estado === 'pendiente' &&
                                <td>
                                    <div>
                                        <button className="button is-success" onClick={() => aceptarEvento(event.id)}>Aceptar</button>
                                        <button className="button is-danger" onClick={() => openModal(event)} >Rechazar</button>
                                    </div>
                                </td>
                            }
                            {user && user.role === "admin" &&
                                <td>{getNombreAsistente(event.userId)}</td>
                            }

                            {user && user.role === "admin" &&
                                <td>
                                    <Link to={`/events/edit/${event.id}`} className="button is-small is-info">Editar</Link>
                                    <button onClick={() => deleteEvent(event.id)} className="button is-small is-danger">Eliminar</button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedEvent &&
                <div className={`modal ${selectedEvent ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h2 className="title">Justificar</h2>
                            <div className="field">
                                <label className="label">Justificación</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={justificacion}
                                        onChange={(e) => setJustificacion(e.target.value)}
                                        placeholder="Escribe tu justificación aquí"
                                    ></textarea>
                                </div>
                            </div>
                            <button className="button is-danger" onClick={() => rechazarEvento(selectedEvent.id)}>Enviar</button>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                </div>
            }
        </div>
    )
}

export default EventosList;
