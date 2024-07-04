import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";

const CategorysList = () => {
    const [categorys, setCategorys] = useState([]);
    const {user} = useSelector((state) => state.auth);
    useEffect(()=>{
        getCategorys();
    }, []);

    const getCategorys = async()=>{
        const response = await axios.get('http://localhost:5000/categorys');
        setCategorys(response.data);
    }

    const deleteCategorys = async(eventId) =>{
        await axios.delete(`http://localhost:5000/categorys/${eventId}`);
        getCategorys();
    };
    return (
        <div>
            <h1 className="title">Categorias</h1>
            <h2 className="subtitle">Lista de las categorias</h2>
            <Link to="/categorys/add" className="button is-primary mb-2">Agregar Nueva categoria</Link>
            
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nombre</th>
                        <th>Limite</th>
                        {user && user.role === "admin" && 
                        <th>Acciones</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category, index)=>(
                        //cada ciclo tiene una clave unica
                        <tr key={category.uuid}>
                        <td>{index + 1}</td>
                        <td>{category.nombre}</td>
                        <td>{category.limite}</td>
                        {user && user.role === "admin" && 
                        <td>
                            <Link to={`/categorys/edit/${category.uuid}`} className="button is-small is-info">Editar</Link>
                            <button onClick={()=> deleteCategorys(category.uuid)} className="button is-small is-danger">Eliminar</button>
                        </td>
                        }
                     </tr>
                    ))}  
                </tbody>
            </table>
        </div>
    );
};

export default CategorysList
