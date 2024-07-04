import { Sequelize } from "sequelize";
import db from "../confing/Database.js";

const {DataTypes} = Sequelize;

const Tickets = db.define('tickets', {
    uuid:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    precio:{
        type: DataTypes.DOUBLE,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 20],
            isNumeric: true
        }
    },
    estado:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
}, {
    //NOMBRE DE LA TABLA IGUAL AL MISMO NOMBRE DEL MODELO
    freezeTableName: true
});



export default Tickets;