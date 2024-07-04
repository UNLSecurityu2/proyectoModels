import React, {useEffect}  from 'react'
import Layout from './Layout'
import FormEditUser from '../components/FormEditUser'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditarUsuario = () => {
  
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
    <Layout>
        <FormEditUser/>
    </Layout>
  )
}

export default EditarUsuario
