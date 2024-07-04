import { Sequelize } from "sequelize";
import db from "../confing/Database.js";
import Mensualitys from "./MensualityModel.js";

const {DataTypes}  = Sequelize;

const Sponsors = db.define('sponsors', {
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
            len: [3, 100]
        }
    },
    direccion:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 35]
        }
    },
    telefono:{
        type: DataTypes.INTEGER,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [10, 10],
            isNumeric: true
        }
    },
    email:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    nombreRepresentante:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            isAlpha: true
        }
    },
}, {
    freezeTableName: true
});
Mensualitys.hasOne(Sponsors);


export default Sponsors;
