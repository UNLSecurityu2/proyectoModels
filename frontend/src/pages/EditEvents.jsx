import React, {useEffect}  from 'react'
import Layout from './Layout'
import FormEditEvents from '../components/FormEditEvents'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
const EditEvents = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state => state.auth));

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
    //se lo hace de esta manera porque el usuario normal estara en nulo cuadno este pendiente
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, navigate, user]);
  
  return (
    <Layout>
        <FormEditEvents/>
    </Layout>
  )
}

export default EditEvents;
