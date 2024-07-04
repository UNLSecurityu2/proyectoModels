//importamos el metodo de sequalize
import { Sequelize } from "sequelize";
// conexion a database desde el archivo config


import db from "../confing/Database.js";
import Tickets from "./TicketsModel.js";
//destructurar los tipos de datos
const {DataTypes} = Sequelize;

//creamos la variables y podemos el nombre de la tabla
//el segndo campo  y el tecero
const Users = db.define('users', {
    uuid:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100],
            isAlpha: true
        }
    },
    cedula:{
        type: DataTypes.INTEGER,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isNumeric: true,
            len: [10, 10]
        }
    },
    fechaNacimiento:{
        type: DataTypes.DATE,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            isDate: true,
        }
    },
    direccion:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    telefono:{
        type: DataTypes.INTEGER,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isNumeric: true,
            len: [10, 10]
        }
    },
    email:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isAlpha: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Tickets);
//Tickets.belongsTo(Users, {foreignKey: 'userid'})

export default Users;

