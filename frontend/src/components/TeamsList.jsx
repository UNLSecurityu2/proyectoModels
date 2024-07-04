import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const TeamsList = () => {
    const [teams, setTeams] = useState([]);
    const [categorias, setCategorias] = useState([]);
    useEffect(()=>{
        getTeams();
    }, []);

    useEffect(() => {
        getCategorias();
    }, []);


    const getTeams = async()=>{
        const response = await axios.get('http://localhost:5000/teams');
        setTeams(response.data);
    }
    
    const getCategorias = async () => {
        const response = await axios.get('http://localhost:5000/categorys');
        setCategorias(response.data);
    }

    const deleteTeams = async(teamId) =>{
        await axios.delete(`http://localhost:5000/teams/${teamId}`);
        getTeams();
    };

    const getNombreCategoria = (categoryId) => {
        const categoria = categorias.find(cat => cat.id === categoryId);
        return categoria ? categoria.nombre : '';
    };

    return (
        <div>
            <h1 className="title">Equipos</h1>
            <h2 className="subtitle">Lista de los Equipos inscritos</h2>
            <Link to="/teams/add" className="button is-primary mb-2">Agregar Nuevo</Link>
            
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Ciudad representante</th>
                        <th>Categorias</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index)=>(
                        //cada ciclo tiene una clave unica
                        <tr key={team.uuid}>
                        <td>{index + 1}</td>
                        <td>{team.name}</td>
                        <td>{team.ciudadRepresentante}</td>
                        <td>{getNombreCategoria(team.categoryId)}</td>
                        <td>
                            <Link to={`/teams/edit/${team.uuid}`} className="button is-small is-info">Editar</Link>
                            <button onClick={()=> deleteTeams(team.uuid)} className="button is-small is-danger">Eliminar</button>
                        </td>
                     </tr>
                    ))}  
                </tbody>
            </table>
        </div>
    );
};

export default TeamsList
