import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'id','name', 'cedula', 'fechaNacimiento', 'direccion', 'telefono', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
        attributes: ['uuid','id', 'name', 'cedula', 'fechaNacimiento', 'direccion', 'telefono', 'email', 'role'],
        where: {
            uuid: req.params.id
        }
    });
        //estado de ok
        res.status(200).json(response);
    } catch (error) {
        //algo ha salido mal en el lado del servidor
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) =>{
    const {name, cedula, fechaNacimiento, direccion, telefono, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "las contrasenias no coinciden"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            cedula: cedula,
            fechaNacimiento: fechaNacimiento,
            direccion: direccion,
            telefono: telefono,
            email: email,
            password: hashPassword,
            role: role
        })
        //nuevo recurso creado en el servidor
        res.status(201).json({msg: "usuario registrado"});
    } catch (error) {
        res.status(400).json({msg: "algo salio mal"});
    }
}

export const updateUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "usuario no elegido o encontrado"}) 
    const {name, cedula, fechaNacimiento, direccion, telefono, email, password, confPassword, role} = req.body;
    let hashPassword;
    //si el usuario no realiza cambios en su clave
    if (password === "" || password === null) {
        hashPassword = user.password;
    }else{
        hashPassword = await argon2.hash(password);
    }

    if (password !== confPassword) return res.status(400).json({msg: "las contrasenias no coinciden"});
    try {
        await user.update({
            name: name,
            cedula: cedula,
            fechaNacimiento: fechaNacimiento,
            direccion: direccion,
            telefono: telefono,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where : {
                id: user.id
            }
        });
        res.status(200).json({msg: "usuario actualizado"})
    } catch (error) {
        res.status(400).json({msg: "usuario no actualizado"})
    }
}

export const deleteUser = async(req, res) =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "usuario no elegido o encontrado"})     
    try {
        await user.destroy({
           where : {
                id: user.id
            }
        });
        res.status(200).json({msg: "usuario elimiando"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}