import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoBarChartSharp, IoHome, IoLogOut, IoAmericanFootballSharp, IoPeople,  } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { Logout, reset } from "../features/authSlice";
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);


    const LogOut= () =>{
        dispatch(Logout());
        dispatch(reset());
        navigate("/");
    }
    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to="/dashboard"><IoHome />Dashboard</NavLink></li>
                    <li><NavLink to="/events"><IoAmericanFootballSharp />Eventos</NavLink></li>
                </ul>
                
                {user && user.role === "admin" && 
                    <div>
                        <p className="menu-label">
                            Administration
                        </p>
                        <ul className="menu-list">
                            <li><NavLink to="/users"><IoPerson/>Usuarios</NavLink></li>
                        </ul>
                        <ul className="menu-list">
                            <li><NavLink to="/categorys"><IoBarChartSharp/>Categorias</NavLink></li>
                        </ul>
                        <ul className="menu-list">
                            <li><NavLink to="/teams"><IoPeople/>Equipos</NavLink></li>
                        </ul>
                    </div>
                }
                <p className="menu-label">
                    Configuracion
                </p>
                <ul className="menu-list">
                    <li><button onClick={LogOut} className="button is-white"><IoLogOut/>Cerrar sesión</button></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar
