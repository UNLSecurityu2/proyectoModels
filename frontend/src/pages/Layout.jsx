import React, {useEffect}  from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import PropTypes from 'prop-types';


const Layout = ({children}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  //primero despacho para poder validar
  useEffect(()=> {
    dispatch(getMe());
    //dependencias
  }, [dispatch]);

  useEffect(()=> {
    if (isError) {
      //redirijimos al inicio
      navigate("/");
    }
  }, [isError, navigate]);
  
  return (
    <React.Fragment>
        <Navbar/>
        <div className="columns mt-6" style={{minHeight: "100vh"}}>
            <div className="column is-2"><Sidebar/></div>
            <div className="column has-background-light">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
