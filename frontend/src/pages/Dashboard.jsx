import React, {useEffect} from 'react'
import Layout from './Layout'
import Welcome from '../components/Welcome'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Dashboard = () => {
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
      <Welcome/>
    </Layout>
  )
}
export default Dashboard;
